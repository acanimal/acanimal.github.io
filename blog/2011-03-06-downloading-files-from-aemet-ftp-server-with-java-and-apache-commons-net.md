---
layout: post
title: Downloading files from AEMET FTP server with Java and Apache Commons Net
date: 2011-03-06 19:57
tags:
- apache
- commons
- ftp
- java
- net
---
Some time ago the <a href="http://www.aemet.es">AEMET</a>, the Spanish government meteorological agency, release many of its data publicly: weather radar, weather stations, lightnings, ...  The way they do is simple and effective: public the contents on a FTP server and update on regular intervals of time.  Talking with a colleague we decide to create (on our very few free time) a simple web page that allows people to see the current values of the weather stations. A map of Spain with some dots representing weather stations and a graph with showing data from the selected station.

> **Update: This service was stopped in 2012 by Spanish government 😔**

<h2>The data</h2>
<p>The kind of data we are looking for is stored in the '<em>/datos_observacion/observaciones_diezminutales</em>' folder of the FTP sever. Within it we can found two types of folders, ended with '<em>diezminutales</em>' or '<em>estaciones</em>'. We will work with the first one.  For every day we will found a '<em>YYYYMMDD_diezminutales</em>' folder which contains the day data specify by <em>YYYYMMDD</em>. Inside it new files are created names '<em>YYYYMMDDHHmm_datos.csv.gz</em>' which contains all the weather stations data for the 10minutes interval.  We also need to take into account one more consideration. A file is not immutable, that means you can read a file with some data (or file  size) and in 1 hour it can have more new data (bigger file size) because some new data has recovery and corresponds to that interval.</p>
<h2>The design</h2>
<p>The idea is to create some simple program that given a date (YYYYMMDD) synchronizes the corresponding remote  '<em>YYYYMMDD_diezminutales</em>' folder with a local one. This way we can maintain locally and update copy of the files.  Once files are locally stored a different process, that means a different post :), is responsible to handle data in the right way to be used by the web application.  The summary of steps are:</p>
<ol>
<li>Given a YYYYMMDD check if the remote  '<em>YYYYMMDD_diezminutales</em>' folder exists. If so, then synchronize it locally:
<ol>
<li>Create a local '<em>YYYYMMDD_diezminutales</em>' folder if not exists.</li>
<li>For every file on remote folder:
<ol>
<li>Download if it doesn't exists or his size has changes.</li>
<li>Otherwise, ignore if it.</li>
</ol>
</li>
</ol>
</li>
</ol>
<h2>The implementation</h2>
<p>Because I'm more experienced with Java I have used it to code a little program to do the previously commented synchronization. To make FTP request I have used the <a href="http://commons.apache.org/net/">Apache Commons Net</a> project. From its web page we can read:</p>
<blockquote><p>Apache Commons Net implements the client side of many basic Internet protocols.</p></blockquote>
<h3>The Main class</h3>
<p>This is the starter point. User must execute the program specifying a year-month-day to check YYYY-MM-DD, something like:</p>
<pre class="brush:shell">java -jar "aemet_v1.jar" 2011-01-25</pre>
<p>Lets talk a bit about the main program. The first to do is to ensure user has specified a valid date:</p>
<pre class="brush:java">if (args.length != 1) {
    Logger.getLogger(Main.class.getName()).log(Level.SEVERE, "You must supply once argument like YYYY-MM-DD.");
    System.exit(1);
}
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
Date date = sdf.parse(args[0]);</pre>
<p>Second, we create the folder structure which will hold the local files copy:</p>
<pre class="brush:java">File localFolder = new File("./localDownloads");
localFolder.mkdir();

File localFolderObservacions = new File(localFolder, "observaciones_diezminutales");
localFolderObservacions.mkdir();</pre>
<p>Finally, we get the files through the use of  '<em>AdquisicioObservaciones</em>' class:</p>
<pre class="brush:java">AdquisicioObservaciones adq = new AdquisicioObservaciones(localFolderObservacions);
adq.get(date);</pre>
<p>Putting all together:</p>
<pre class="brush:java">public static void main(String[] args) {
    try {
        if (args.length != 1) {
            Logger.getLogger(Main.class.getName()).log(Level.SEVERE, "You must supply once argument like YYYY-MM-DD.");
            System.exit(1);
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date date = sdf.parse(args[0]);

        File localFolder = new File("./localDownloads");
        localFolder.mkdir();

        File localFolderObservacions = new File(localFolder, "observaciones_diezminutales");
        localFolderObservacions.mkdir();

        Calendar c = Utils.getCurrentCalendarUTC();
        c.setTime(date);

        AdquisicioObservaciones adq = new AdquisicioObservaciones(localFolderObservacions);
        adq.get(date);

    } catch (ParseException ex) {
        Logger.getLogger(Main.class.getName()).log(Level.SEVERE, ex.getMessage());
    }
}</pre>
<h3>The Utils class</h3>
<p>This is a helper class with some methods used around the code. Mainly it helps creating and setting dates in UTC (because this is the format used by AEMET) and also contains a method that uncompress GZIP files:</p>
<pre class="brush:java">public static boolean uncompressGzFile(File localfile, File targetlocalfile) {
    GZIPInputStream in = null;
    OutputStream out = null;
    try {
        in = new GZIPInputStream(new FileInputStream(localfile));
        out = new FileOutputStream(targetlocalfile);
        // Transfer bytes from the compressed file to the output file
        byte[] buf = new byte[1024];
        int len;
        while ((len = in.read(buf)) &gt; 0) {
            out.write(buf, 0, len);
        }
        return true;
    } catch (IOException ex) {
        logger.severe(ex.getMessage());
        logger.log(Level.SEVERE, "There was a problem while uncompressing file ''{0}'' to ''{1}''. Exception message ''{2}''.",
                new Object[]{localfile.getName(), targetlocalfile.getName(), ex.getMessage()});
        return false;
    } finally {
        // Close the file and stream
        if (in != null) {
            try {
                in.close();
            } catch (IOException ex) {
            }
        }
        if (out != null) {
            try {
                out.close();
            } catch (IOException ex) {
            }
        }
    }
}</pre>
<h3>The AdquisicioObservaciones class</h3>
<p>In class constructor we must specify the local folder were files must be synchronized. Later, we can execute the '<em>get</em>' method as many times we want and for any day we desire.  The '<em>get</em>' method, as we commented,  needs a date to work:</p>
<pre class="brush:java">public void get(Date date) {
    this.date = date;
    logger.log(Level.INFO, "{0} - Start: {1}", new Object[]{AdquisicioObservaciones.class.getName(), Utils.getCurrentFormattedDate()});
    handleFiles();
    logger.log(Level.INFO, "{0} - End: {1}", new Object[]{AdquisicioObservaciones.class.getName(), Utils.getCurrentFormattedDate()});
}</pre>
<p>Mainly it stores the date on a class attribute, prints some log information and delegates the hard work to the '<em>handleFiles</em>' method. First thing this method does is to create a FTP connection and change the remote working directory to '<em>datos_observacion/observaciones_diezminutales</em>' and within it change to the desired day:</p>
<pre class="brush:java">ftpclient = new FTPClient();

// Connect to server
ftpclient.connect(server);
ftpclient.setFileTransferMode(FTPClient.BINARY_FILE_TYPE);

// Loggin
if (!ftpclient.login("anonymous", null)) {
    logger.severe("Can't log into FTP");
    return;
}
// Change directory
if (!ftpclient.changeWorkingDirectory(folder)) {
    logger.log(Level.SEVERE, "Can''t change to folder ''{0}''.", folder);
    return;
}
// Change to day directory
String remoteDayFolder = Utils.getStringFromDate(this.date) + "_diezminutales";
if (!ftpclient.changeWorkingDirectory(remoteDayFolder)) {
    logger.log(Level.SEVERE, "Can''t change to day folder ''{0}''.", remoteDayFolder);
    return;
}</pre>
<p>Note we set the transfer mode to binary with:</p>
<pre class="brush:java">ftpclient.setFileTransferMode(FTPClient.BINARY_FILE_TYPE);</pre>
<p>which is important because files are GZIP compressed. Then if local folder for the specified day doesn't exists it creates one:</p>
<p>&nbsp;</p>
<pre class="brush:java">// Create local directori for the day.
String dayFolder = Utils.getStringFromDate(this.date);
File folderDay = new File(this.localFolder, dayFolder);
if (!folderDay.exists()) {
    if (!folderDay.mkdir()) {
        logger.log(Level.SEVERE, "Can''t create the daily folder ''{0}''", folderDay.getAbsolutePath());
        return;
    }
}</pre>
<p>Finally the big part comes here. The code gets the list of remote files and check which one doesn't exist locally or has changed it size:</p>
<pre class="brush:java">FTPFile[] files = ftpclient.listFiles();
for (int i = 0; i &lt; files.length; i++) {
    FTPFile ftpfile = files[i];
    long size = ftpfile.getSize();
    File localfile = new File(folderDay, ftpfile.getName());
    boolean mustBeRead = false;

    // Check if file is a real data file
    if (!ftpfile.getName().contains("_datos")) {
        continue;
    }

    totalFiles++;
    if (!localfile.exists()) {
        logger.log(Level.INFO, "File ''{0}'' doesn't exist locally",
                new Object[]{ftpfile.getName()});
        mustBeRead = true;
    } else if (Math.abs(localfile.length() - size) &gt; 1) {
        // Ha vegades la diferencia del fitxer remot i el local difereixen en 1 byte pero son iguals.
        logger.log(Level.INFO, "File ''{0}'' size changed (before: {1}b, after: {2}b)",
                new Object[]{ftpfile.getName(), localfile.length(), size});
        mustBeRead = true;
    } else {
        logger.log(Level.INFO, "Ignored file ''{0}''", ftpfile.getName());
        totalIgnored++;
    }

    // If we need to read the file then control if any error occurs.
    if (mustBeRead) {
        try {
            downloadFile(ftpfile, localfile);
            totalDownloaded++;
        } catch (IOException ex) {
            totalErrors++;
        } finally {
            mustBeRead = false;
        }
    }
}</pre>
<p>The next important method is '<em>downloadFile</em>', which requires two parameters the remote FTP file and the local file name where we want to store data. The remote files is retrieved using the FTPClient's '<em>retrieveFile</em>' method and uncompressed with the helper method <em>Utils.uncompressGzFile()</em>:</p>
<pre class="brush:java">logger.log(Level.INFO, "Downloading file ''{0}'' at ''{1}''",
        new Object[]{ftpfile.getName(), Utils.getCurrentFormattedDate()});

fos = new FileOutputStream(localfile);
ftpclient.retrieveFile(ftpfile.getName(), fos);

logger.log(Level.INFO, "Downloaded finished at ''{0}'' , size:''{1} ''bytes , timestamp: ''{2}''.",
        new Object[]{Utils.getCurrentFormattedDate(), ftpfile.getSize(), ftpfile.getTimestamp().getTime()});

// Uncompress file
String targetName = localfile.getName().replaceAll(".gz", "");
File targetlocalfile = new File(localfile.getParentFile(), targetName);
if (Utils.uncompressGzFile(localfile, targetlocalfile)) {
    //
    // TODO - Here you can handle the file.
} else {
    // If there is any error uncompressing file then remove files to
    // ensure it will be downloaded again.
    localfile.delete();
    targetlocalfile.delete();
}</pre>
<h2>Conclusions</h2>
<p>The program is far beyond to be a serious program to maintain a database with all the weather stations data, but can you on how to download files from FTP server using Java.</p>
<p>More work must be done to get also the metadata information from the weather stations (name, location, etc) and merge together with the observations. Hope that will be shown in a next post.</p>
<p>Finally, simply to say the code is plenty of log messages which can make code cumbersome but gives lot of information about the synchronization process. A typicall output is something like:</p>
<pre class="brush:plain">06-mar-2011 20:46:28 org.aemetaquisition.AdquisicioObservaciones get
INFO: org.aemetaquisition.AdquisicioObservaciones - Start: 2011-03-06 20:46:28
06-mar-2011 20:46:29 org.aemetaquisition.AdquisicioObservaciones handleFiles
INFO: File '201103040000_datos.csv.gz' doesnt exist locally
06-mar-2011 20:46:29 org.aemetaquisition.AdquisicioObservaciones downloadFile
INFO: Downloading file '201103040000_datos.csv.gz' at '2011-03-06 20:46:29'
06-mar-2011 20:46:29 org.aemetaquisition.AdquisicioObservaciones downloadFile
INFO: Downloaded finished at '2011-03-06 20:46:29' , size:'13.322 'bytes , timestamp: '5/03/11 0:36'.
06-mar-2011 20:46:29 org.aemetaquisition.AdquisicioObservaciones handleFiles
...
...
...
INFO: Downloaded finished at '2011-03-06 20:47:51' , size:'13.596 'bytes , timestamp: '5/03/11 12:36'.
06-mar-2011 20:47:51 org.aemetaquisition.AdquisicioObservaciones handleFiles
INFO: Total files 144, Total downloaded 144, Total ignored 0, Total errors: 0
06-mar-2011 20:47:51 org.aemetaquisition.AdquisicioObservaciones get
INFO: org.aemetaquisition.AdquisicioObservaciones - End: 2011-03-06 20:47:51</pre>
<h2>Download</h2>
<ul>
<li>Source code: <a href="http://www.acuriousanimal.com/code/aemet_v1/aemet_v1.rar">here</a>. It is bundled as a NetBeans project but can you open with any text editor.</li>
<li>Binaries: <a href="http://www.acuriousanimal.com/code/aemet_v1/aemet_v1_jar.rar">here</a>. Remember to execute the code you must set the day to check, like:
<pre class="brush:shell">java -jar "aemet_v1.jar" 2011-01-25</pre>
<p>If you execute the program for the same day, only the new files or those with size modified will be processed again.</li>
</ul>
<h2>References</h2>
<ul>
<li><a href="http://commons.apache.org/net/">http://commons.apache.org/net/</a></li>
<li><a href="http://commons.apache.org/net/"></a><a href="http://www.aemet.es/">http://www.aemet.es</a></li>
</ul>
