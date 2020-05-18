---
title: Object-Oriented Programming in APScheduler
permalink: /projects/apscheduler/oop.html
prev: /projects/apscheduler/
---

# Object-Oriented Programming in APScheduler

APScheduler uses object oriented programming in its implementation. The following diagram outlines the relations between all major classes in APScheduler codebase.

![APScheduler Class Graph](/static/images/apscheduler-oo.png)

The `BaseScheduler`, `BaseExecutor`, `BaseJobStore` and `BaseTrigger` defines the interfaces for Schedulers, Executors, JobStores, and Triggers. The subclasses of these base classes implement for each specific framework.

Job stands in the very center of all these classes. Job houses the functions to execute, the function parameters to pass in, and a bunch of scheduling parameters. The functions could be either a function object or an import string; the function arguments are essential for the function calls; and the scheduling parameters are for controlling scheduler behaviors.

Triggers instruct the scheduler when is the next time a job should run. All  jobs have their own triggers. As shown earlier, "interval" is one of the triggers. You can also specify the trigger in the form of crontab syntax.

Executors run the jobs. They manage the life cycles of jobs. By default, you can use thread or process as executors.

Schedulers rules all stuff. You can think of it as a stable API provided by APScheduler for configuring JobStores, Executors and adding jobs. The subclasses of the BaseScheduler enable the APScheduler instance running in specific environments. For example, AsyncIOScheduler enables the scheduler running in an asyncio loop; BackgroundScheduler runs the scheduler in a thread. As the name suggested, the others are running as a blocking process, in a Qt loop, in a tornado loop,  in a twisted loop, or as a gevent greenlet. Scheduler usually come with its own **executor**, for example, AsyncIOScheduler runs jobs via AsyncIOExecutor.

JobStore houses the scheduled jobs. Without any configuration, APScheduler saves them in memory. As shown in above code, `scheduler.add_job` won't trigger the function but save the job data into the memory. Similarly, you need to choose where to store these jobs. In-memory is the simplest solution, though all job states will be lost when the process restarts. Otherwise, you can choose Mongodb, Redis, Rethinkdb, Zookeeper, or any RDMBS that SQLAlchemy supports, such as SQLite, MySQL, Postgres, etc.
