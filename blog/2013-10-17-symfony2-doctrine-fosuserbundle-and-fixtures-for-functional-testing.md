---
layout: post
title: Symfony2, Doctrine, FOSUserBundle and fixtures for functional testing
date: 2013-10-17 22:21
tags:
- doctrine
- php
- symfony2
- testing
---
I have an application built with Symfony2 framework which uses the Doctrine2 ORM for persistence.
The issue is I need to make <a href="http://symfony.com/doc/current/book/testing.html#functional-tests">functional tests</a>
allowing to purge and initialize the database with doctrine fixtures.</p>

<h3>Before to start</h3>
<p>In the project I have used the <a href="https://github.com/FriendsOfSymfony/FOSUserBundle">FosUserBundle</a>, to allow better user login, registration, etc and <a href="http://symfony.com/doc/current/bundles/DoctrineFixturesBundle/index.html">DoctrineFixturesBundle</a>, which allow to fill a database with fixtures based on our Doctrine entities.</p>
<p>To load doctrine fixtures into database you need to execute the command line:</p>
<pre class="prettyprint">php app/console doctrine:fixtures:load</pre>
<p>That means for each test you need to clean up the database and load the fixtures manually.</p>
<blockquote><p>Our objective is the automate this process before executing each test.</p></blockquote>
<h3>Doctrine fixtures and the creation of FOSUserBundle users</h3>
<p>Because we are using Doctrine fixtures we need a class that implements <code>FixtureInterface</code> interface (see <a href="http://symfony.com/doc/current/bundles/DoctrineFixturesBundle/index.html#writing-simple-fixtures">documentation</a>). The problem is we want to create FOSUserBundle user instances and that requires we have access to the container to get a reference to the user management service, so we need to set access to the container too. Nothing we can't find in the documentation:</p>
<pre class="prettyprint">use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class MyFixtures implements FixtureInterface, ContainerAwareInterface {

    /**
     * @var ContainerInterface
     */
    private $container;

    /**
     * {@inheritDoc}
     */
    public function setContainer(ContainerInterface $container = null) {
        $this-&gt;container = $container;
    }

    public function load(ObjectManager $manager) {

        $userManager = $this-&gt;container-&gt;get('fos_user.user_manager');

        // Create a new user
        $user = $userManager-&gt;createUser();
        $user-&gt;setUsername('user');
        $user-&gt;setEmail('user@domain.com');
        $user-&gt;setPlainPassword('user_password');
        $user-&gt;setEnabled(true);

        $manager-&gt;persist($user);
        $manager-&gt;flush();</pre>
<h3>The test class</h3>
<p>In your test class you need to define the <code>setUp</code> method that is responsible to prepare the database fixtures.<br />
The setup method makes two important things, first purge the tables on the database to remove any previous changes make by previous tests and, second, initialize the database with a set of fixtures.</p>
<pre class="prettyprint">class YourTestClass extends WebTestCase {

    private $em;

    /**
     * Set up database and fixtures before each test
     */
    public function setUp() {

        $client = self::createClient();
        $container = $client-&gt;getKernel()-&gt;getContainer();
        $em = $container-&gt;get('doctrine')-&gt;getManager();

        // Purge tables
        $purger = new \Doctrine\Common\DataFixtures\Purger\ORMPurger($em);
        $executor = new \Doctrine\Common\DataFixtures\Executor\ORMExecutor($em, $purger);
        $executor-&gt;purge();

        // Load fixtures
        $loader = new \Doctrine\Common\DataFixtures\Loader;
        $fixtures = new \Path\To\Your\Fixtures\MyFixtures();
        $fixtures-&gt;setContainer($container);
        $loader-&gt;addFixture($fixtures);
        $executor-&gt;execute($loader-&gt;getFixtures());
    }

    ...
}</pre>
<p>Note how</p>
<blockquote><p>we need to inject a reference to the container in the fixtures class.</p></blockquote>
<p>It is necessary to make it by hand. The dependency isn't injected automatically because we are running a PHPUnit test, not a Symfony2 application.</p>
