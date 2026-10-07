---
title: Symfony2, Doctrine, FOSUserBundle and fixtures for functional testing
pubDatetime: 2013-10-17T22:21:00Z
description: I have an application built with Symfony2 framework which uses the Doctrine2 ORM for persistence. The issue is I need to make functional tests allowing to purge and initialize the database with…
tags:
  - doctrine
  - php
  - symfony2
  - testing
---

I have an application built with Symfony2 framework which uses the Doctrine2 ORM for persistence.  
The issue is I need to make [functional tests](http://symfony.com/doc/current/book/testing.html#functional-tests)  
allowing to purge and initialize the database with doctrine fixtures.

### Before to start

In the project I have used the [FosUserBundle](https://github.com/FriendsOfSymfony/FOSUserBundle), to allow better user login, registration, etc and [DoctrineFixturesBundle](http://symfony.com/doc/current/bundles/DoctrineFixturesBundle/index.html), which allow to fill a database with fixtures based on our Doctrine entities.

To load doctrine fixtures into database you need to execute the command line:

```
php app/console doctrine:fixtures:load
```

That means for each test you need to clean up the database and load the fixtures manually.

> Our objective is the automate this process before executing each test.

### Doctrine fixtures and the creation of FOSUserBundle users

Because we are using Doctrine fixtures we need a class that implements `FixtureInterface` interface (see [documentation](http://symfony.com/doc/current/bundles/DoctrineFixturesBundle/index.html#writing-simple-fixtures)). The problem is we want to create FOSUserBundle user instances and that requires we have access to the container to get a reference to the user management service, so we need to set access to the container too. Nothing we can't find in the documentation:

```
use Doctrine\Common\DataFixtures\FixtureInterface;
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
        $this->container = $container;
    }

    public function load(ObjectManager $manager) {

        $userManager = $this->container->get('fos_user.user_manager');

        // Create a new user
        $user = $userManager->createUser();
        $user->setUsername('user');
        $user->setEmail('user@domain.com');
        $user->setPlainPassword('user_password');
        $user->setEnabled(true);

        $manager->persist($user);
        $manager->flush();
```

### The test class

In your test class you need to define the `setUp` method that is responsible to prepare the database fixtures.  
The setup method makes two important things, first purge the tables on the database to remove any previous changes make by previous tests and, second, initialize the database with a set of fixtures.

```
class YourTestClass extends WebTestCase {

    private $em;

    /**
     * Set up database and fixtures before each test
     */
    public function setUp() {

        $client = self::createClient();
        $container = $client->getKernel()->getContainer();
        $em = $container->get('doctrine')->getManager();

        // Purge tables
        $purger = new \Doctrine\Common\DataFixtures\Purger\ORMPurger($em);
        $executor = new \Doctrine\Common\DataFixtures\Executor\ORMExecutor($em, $purger);
        $executor->purge();

        // Load fixtures
        $loader = new \Doctrine\Common\DataFixtures\Loader;
        $fixtures = new \Path\To\Your\Fixtures\MyFixtures();
        $fixtures->setContainer($container);
        $loader->addFixture($fixtures);
        $executor->execute($loader->getFixtures());
    }

    ...
}
```

Note how

> we need to inject a reference to the container in the fixtures class.

It is necessary to make it by hand. The dependency isn't injected automatically because we are running a PHPUnit test, not a Symfony2 application.
