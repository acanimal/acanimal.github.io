---
title: Downloading files from AEMET FTP server with Java and Apache Commons Net
pubDatetime: 2011-03-06T19:57:00Z
description: "Some time ago the AEMET, the Spanish government meteorological agency, release many of its data publicly: weather radar, weather stations, lightnings, ... The way they do is simple and effective:…"
tags:
  - apache
  - commons
  - ftp
  - java
  - net
---

Some time ago the [AEMET](http://www.aemet.es), the Spanish government meteorological agency, release many of its data publicly: weather radar, weather stations, lightnings, ... The way they do is simple and effective: public the contents on a FTP server and update on regular intervals of time. Talking with a colleague we decide to create (on our very few free time) a simple web page that allows people to see the current values of the weather stations. A map of Spain with some dots representing weather stations and a graph with showing data from the selected station.

> **Update: This service was stopped in 2012 by Spanish government 😔**

## The data

The kind of data we are looking for is stored in the '_/datos\_observacion/observaciones\_diezminutales_' folder of the FTP sever. Within it we can found two types of folders, ended with '_diezminutales_' or '_estaciones_'. We will work with the first one. For every day we will found a '_YYYYMMDD\_diezminutales_' folder which contains the day data specify by _YYYYMMDD_. Inside it new files are created names '_YYYYMMDDHHmm\_datos.csv.gz_' which contains all the weather stations data for the 10minutes interval. We also need to take into account one more consideration. A file is not immutable, that means you can read a file with some data (or file  size) and in 1 hour it can have more new data (bigger file size) because some new data has recovery and corresponds to that interval.

## The design

The idea is to create some simple program that given a date (YYYYMMDD) synchronizes the corresponding remote  '_YYYYMMDD\_diezminutales_' folder with a local one. This way we can maintain locally and update copy of the files. Once files are locally stored a different process, that means a different post :), is responsible to handle data in the right way to be used by the web application. The summary of steps are:

1.  Given a YYYYMMDD check if the remote  '_YYYYMMDD\_diezminutales_' folder exists. If so, then synchronize it locally:
    1.  Create a local '_YYYYMMDD\_diezminutales_' folder if not exists.
    2.  For every file on remote folder:
        1.  Download if it doesn't exists or his size has changes.
        2.  Otherwise, ignore if it.

## The implementation

Because I'm more experienced with Java I have used it to code a little program to do the previously commented synchronization. To make FTP request I have used the [Apache Commons Net](http://commons.apache.org/net/) project. From its web page we can read:

> Apache Commons Net implements the client side of many basic Internet protocols.

### The Main class

This is the starter point. User must execute the program specifying a year-month-day to check YYYY-MM-DD, something like:

```bash
java -jar "aemet_v1.jar" 2011-01-25
```

Lets talk a bit about the main program. The first to do is to ensure user has specified a valid date:

```java
if (args.length != 1) {
    Logger.getLogger(Main.class.getName()).log(Level.SEVERE, "You must supply once argument like YYYY-MM-DD.");
    System.exit(1);
}
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
Date date = sdf.parse(args[0]);
```

Second, we create the folder structure which will hold the local files copy:

```java
File localFolder = new File("./localDownloads");
localFolder.mkdir();

File localFolderObservacions = new File(localFolder, "observaciones_diezminutales");
localFolderObservacions.mkdir();
```

Finally, we get the files through the use of  '_AdquisicioObservaciones_' class:

```java
AdquisicioObservaciones adq = new AdquisicioObservaciones(localFolderObservacions);
adq.get(date);
```

Putting all together:

```java
public static void main(String[] args) {
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
}
```

### The Utils class

This is a helper class with some methods used around the code. Mainly it helps creating and setting dates in UTC (because this is the format used by AEMET) and also contains a method that uncompress GZIP files:

```java
public static boolean uncompressGzFile(File localfile, File targetlocalfile) {
    GZIPInputStream in = null;
    OutputStream out = null;
    try {
        in = new GZIPInputStream(new FileInputStream(localfile));
        out = new FileOutputStream(targetlocalfile);
        // Transfer bytes from the compressed file to the output file
        byte[] buf = new byte[1024];
        int len;
        while ((len = in.read(buf)) > 0) {
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
}
```

### The AdquisicioObservaciones class

In class constructor we must specify the local folder were files must be synchronized. Later, we can execute the '_get_' method as many times we want and for any day we desire. The '_get_' method, as we commented,  needs a date to work:

```java
public void get(Date date) {
    this.date = date;
    logger.log(Level.INFO, "{0} - Start: {1}", new Object[]{AdquisicioObservaciones.class.getName(), Utils.getCurrentFormattedDate()});
    handleFiles();
    logger.log(Level.INFO, "{0} - End: {1}", new Object[]{AdquisicioObservaciones.class.getName(), Utils.getCurrentFormattedDate()});
}
```

Mainly it stores the date on a class attribute, prints some log information and delegates the hard work to the '_handleFiles_' method. First thing this method does is to create a FTP connection and change the remote working directory to '_datos\_observacion/observaciones\_diezminutales_' and within it change to the desired day:

```java
ftpclient = new FTPClient();

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
}
```

Note we set the transfer mode to binary with:

```java
ftpclient.setFileTransferMode(FTPClient.BINARY_FILE_TYPE);
```

which is important because files are GZIP compressed. Then if local folder for the specified day doesn't exists it creates one:

```java
// Create local directori for the day.
String dayFolder = Utils.getStringFromDate(this.date);
File folderDay = new File(this.localFolder, dayFolder);
if (!folderDay.exists()) {
    if (!folderDay.mkdir()) {
        logger.log(Level.SEVERE, "Can''t create the daily folder ''{0}''", folderDay.getAbsolutePath());
        return;
    }
}
```

Finally the big part comes here. The code gets the list of remote files and check which one doesn't exist locally or has changed it size:

```java
FTPFile[] files = ftpclient.listFiles();
for (int i = 0; i < files.length; i++) {
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
    } else if (Math.abs(localfile.length() - size) > 1) {
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
}
```

The next important method is '_downloadFile_', which requires two parameters the remote FTP file and the local file name where we want to store data. The remote files is retrieved using the FTPClient's '_retrieveFile_' method and uncompressed with the helper method _Utils.uncompressGzFile()_:

```java
logger.log(Level.INFO, "Downloading file ''{0}'' at ''{1}''",
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
}
```

## Conclusions

The program is far beyond to be a serious program to maintain a database with all the weather stations data, but can you on how to download files from FTP server using Java.

More work must be done to get also the metadata information from the weather stations (name, location, etc) and merge together with the observations. Hope that will be shown in a next post.

Finally, simply to say the code is plenty of log messages which can make code cumbersome but gives lot of information about the synchronization process. A typicall output is something like:

```text
06-mar-2011 20:46:28 org.aemetaquisition.AdquisicioObservaciones get
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
INFO: org.aemetaquisition.AdquisicioObservaciones - End: 2011-03-06 20:47:51
```

## Download

- Source code: [here](http://www.acuriousanimal.com/code/aemet_v1/aemet_v1.rar). It is bundled as a NetBeans project but can you open with any text editor.
- Binaries: [here](http://www.acuriousanimal.com/code/aemet_v1/aemet_v1_jar.rar). Remember to execute the code you must set the day to check, like:

```bash
java -jar "aemet_v1.jar" 2011-01-25
```

    If you execute the program for the same day, only the new files or those with size modified will be processed again.

## References

- [http://commons.apache.org/net/](http://commons.apache.org/net/)
- [](http://commons.apache.org/net/)[http://www.aemet.es](http://www.aemet.es/)
