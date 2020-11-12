---
title: APScheduler Basic Concepts
permalink: /projects/apscheduler/concepts.html
prev: /projects/apscheduler/
---

# APScheduler Basic Concepts

APScheduler has five basic concepts:

* job
* job store
* scheduler
* trigger
* executor

The following diagram outlines the relations between these concepts.

![APScheduler Class Graph](/static/images/apscheduler-oo.png)

The `BaseScheduler`, `BaseExecutor`, `BaseJobStore` and `BaseTrigger` defines the interfaces for Schedulers, Executors, JobStores, and Triggers. The subclasses of these base classes implement for each specific framework.

**Job** defines what to run. It has the information such as the function to execute, along with the parameters and a bunch of scheduling parameters. The function can be either a function object or an import string.

**JobStores** serialize, save, update, and deserialize the jobs. By default, APScheduler saves them in memory, though all job states will be lost when the process restarts. Otherwise, you can choose Mongodb, Redis, Rethinkdb, Zookeeper, or any RDMBS that SQLAlchemy supports, such as SQLite, MySQL, Postgres, etc.

**Executors** execute the jobs. It manages the life cycles of jobs. By default, you can use thread or process as executors.

**Trigger** instructs the scheduler when is the next time a job should run. All jobs have their own triggers. You can specify the trigger in the form of every N seconds, or in crontab syntax.

**Schedulers** rule all stuff. You can think of it as a stable API provided by APScheduler for configuring JobStores, Executors and adding jobs. The subclasses of the BaseScheduler enable the APScheduler instance running in specific environments. For example, AsyncIOScheduler enables the scheduler running in an asyncio loop; BackgroundScheduler runs the scheduler in a thread. As the name suggested, the others are running as a blocking process, in a Qt loop, in a tornado loop,  in a twisted loop, or as a gevent greenlet. Scheduler usually come with its own **executor**, for example, AsyncIOScheduler runs jobs via AsyncIOExecutor.
