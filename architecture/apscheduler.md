---
title: The Architecture of APScheduler
permalink: /concrete-architecture/apscheduler.html
category: Architecture
date: 2018-09-15
---

# The Architecture of APScheduler

[[toc]]

## Introduction

APScheduler is a job scheduling library that schedules Python code to run either one-time or periodically. It's primarily used in websites, desktop applications, games, etc. It can be considered as a crontab in-process, except that it's not scheduling OS commands but Python functions. The key takeaway is APScheduler is a library, not a command-line tool, not a daemon, not a service. It merely provides some building blocks for you to schedule your Python code. It has to run within the process of your application.

A typical APScheduler instance houses tens of jobs, which execute regular Python functions. There is no limit on the numbers of jobs an APScheduler instance can schedule; it only depends on the actual load of the machine. By default, APScheduler stores all jobs in-memory. If you want your jobs survive from process restarts and keep triggerring from the last time there were triggered,  you can store these jobs in a database, such as any RDBMS, redis, MongoDB, etc.

You must install APScheduler into the environment of your application, either globally or using virtualenv. 

```bash
$ python3 -mvenv venv
$ source venv/bin/activate
$ pip install apscheduler
```

Depending on how your applications runs, it can run as a thread, or an asyncio task, or else. When initialized, APScheduler doesn't do anything unless you add the Python functions as jobs. Once all the jobs are added, you need to "start" the scheduler. For a simple example of how to use APScheduler, here is a snippet of code that just works. Let's create a file `app.py`.

```python
from urllib.request import urlopen
from apscheduler.schedulers.blocking import BlockingScheduler

scheduler = BlockingScheduler()

@scheduler.scheduled_job("interval", seconds=10)
def keep_warm():
    urlopen("https://enqueuezero.com", timeout=10)
    
scheduler.start()
```

This makes sure a url is requested every 10 seconds. The program runs as a blocking process. If you want to co-exist them with your application, you can consider using `BackgroundScheduler`, `AsyncIOScheduler`, etc.

Here are some examples in the wild.

* Run it in AWS and replace Cronjob. [1]

## Object-Oriented Programming

Below is the graph of the relations between all major classes in APScheduler codebase [2].

![APScheduler Class Graph](/static/images/apscheduler-oo.png)

The `BaseScheduler`, `BaseExecutor`, `BaseJobStore` and `BaseTrigger` defines the interfaces for Schedulers, Executors, JobStores, and Triggers. The subclasses of these base classes implement for each specific framework.

Choosing which scheduler, job store(s), executor(s) and trigger(s) to use depends on the user's current technology stack. If your demand is over all of the implementations, you need to extend those base classes. [3]

## Basic Concepts

### Job

Job houses the functions to execute, the function parameters to pass in, and a bunch of scheduling parameters. The functions could be either a function object or an import string; the function arguments are essential for the function calls; and the scheduling parameters are for controlling scheduler behaviors.

In the below example, 

* `tick` is the Python function to scheduler;
* `args=(1, )` is the function parameter;
* `trigger='interval', seconds=3` are the scheduling parameters.

```python
def tick(parameter): print(parameter)

scheduler.add_job(
    function,
    args=(1, ),
    trigger='interval',
    seconds=3
)
```

### Trigger

A trigger instructs the scheduler when is the next time a job should run. All  jobs have their own triggers. As shown earlier, "interval" is one of the triggers. You can also specify the trigger in the form of crontab syntax.

For example, in above example, if the job fires at `"2000-01-01T00:00:00Z"`, then the trigger with 3 seconds as interval should report that the next time is `"2000-01-01T00:00:03Z"`.

### Scheduler

Schedulers rules all stuff. You can think of it as a stable API provided by APScheduler for configuring JobStores, Executors and adding jobs.

The **scheduler** manages **executor** and **jobstore**. The subclasses of the BaseScheduler enable the APScheduler instance running in specific environments.

For example, AsyncIOScheduler enables the scheduler running in an asyncio loop; BackgroundScheduler runs the scheduler in a thread. As the name suggested, the others are running as a blocking process, in a Qt loop, in a tornado loop,  in a twisted loop, or as a gevent greenlet. Scheduler usually come with its own **executor**, for example, AsyncIOScheduler runs jobs via AsyncIOExecutor.

### JobStore

JobStore houses the scheduled jobs. Without any configuration, APScheduler saves them in memory. As shown in above code, `scheduler.add_job` won't trigger the function but save the job data into the memory.

Similarly, you need to choose where to store these jobs. In-memory is the simplest solution, though all job states will be lost when the process restarts. Otherwise, you can choose Mongodb, Redis, Rethinkdb, Zookeeper, or any RDMBS that SQLAlchemy supports, such as SQLite, MySQL, Postgres, etc.

In below example, APScheduler adds a JobStore named `sqlalchemy`. The job added later chooses `sqlalchemy` as its JobStore. The JobStore persists the job into an SQLite database.

```python
scheduler.add_jobstore('sqlalchemy', url='sqlite:////sched.db')
scheduler.add_job(function, args=(1, ), trigger='interval', seconds=3, jobstore='sqlalchemy')
```

### Executor

Executors run the jobs. They manage the life cycles of jobs. By default, you can use thread or process as executors.

## Framework Over Utility

It's an intended design goal to make APScheduler a cross-platform, cross-application scheduler framework, rather than a daemon or service itself. It's meant to reside in an existing application.

You can, of course, run APScheduler BlockingScheduler only and let it as a dedicated background service. But APScheduler always allows you to co-exist the job scheduling with you applications.

The good part is it can extend itself to almost any use cases. The downside is that it needs you to do more development work.

## Time Is of the Essence

Although the scheduler is all about executing the job at a specific time, it doesn't guarantee the job will be executed definitely. Two factors may change the result:

* **Current running job numbers**.
* **Current system load**.

If the system load is high, the scheduler process doesn't get enough CPU resource and thus some jobs don't get a chance to be triggered. It's recommended not to put CPU-bound operations at the same machine of where APScheduler is running.

Or you have a fixed number of thread pool workers; when there are too many jobs firing at the same time, some jobs have to wait. It's similar to the case of queueing-up. It's recommended measuring the number and the latency of the scheduled jobs in the production. Scale up the machine or distribute jobs to different machines when the load gets high.

Besides, the operating system does not guarantee it suspends the process exactly the same amount of time specified by `timeout`. [4]

## Executor Models

Internally, there are two primary models of how scheduler schedules jobs in APScheduler. You don't necessary need to know how it works in order to use. Despite of the different implementations, they have same interface and provide same functionality.

The scheduler has a method `process_jobs` triggerring jobs and returning how many seconds to sleep. 

The other function `sleep` or `run_after_timeout` will idle the scheduler for a few seconds.

### Sleep-Process Model

The sleep-process model is implemented as a while-loop of sleeping and job processing. Below is a pseudo code of how it works.

```python
wait_seconds = DEFAULT
while True: 
    sleep(wait_seconds)
    wait_seconds = process_jobs()
```

It waits a few seconds; then it processes jobs. Once the current tick is over, it sleep for a while when possible. It's commonly seen in any blocking application. Please check to the implementation of [blocking.py](https://github.com/agronholm/apscheduler/blob/master/apscheduler/schedulers/blocking.py) for example.

### Callback Model

The callback model is implemented in a callback-chain convention. Below is a pseudo code of how it works.

```python
def start(timeout=DEFAULT):
    run_after_timeout(timeout, wakeup)

def wakeup():
    timeout = process_jobs()
    start(timeout)

start()
```

It waits a few seconds, then it wakes up and processes jobs. Usually, there is an event loop running behind. It's commonly seen in non-blocking applications. Please check the implementation of [tornado.py](https://github.com/agronholm/apscheduler/blob/master/apscheduler/schedulers/tornado.py) for example.

## Locking for Job State Modifications

### Missing Job Executions

Since the scheduler sometimes misses triggering jobs, APScheduler leaves the question to the end-users if the job should be triggered when the job passed the time.

```
|----x-------()?------x--------x------|

x: job triggered
(): job miss triggered
?: should the job be triggered afterward?
```

To solve this problem, APScheduler provides a controlling parameter `misfire_grace_time` for each job. If the job passed the scheduled time but still within the `misfire_grace_time`, then it would be triggered still.

Additionally, you can choose another option by using controlling parameter `coalescing` to roll all missed executions into one.

### Concurrent Job Executions

Sometimes the job might be triggered even when another instance of the job is running. It happens when the job takes a long time to run and the next job just catches up.

```
|----x--------()--------xx?-----x------|

x: job triggered
(): job miss triggered
?: should the two jobs both run?
```

To solve this problem, APScheduler provides another controlling parameter `max_instances` for end users.

### Internal Lock

To support `misfire_grace_time`, `coalescing`, and `max_instances`, APScheduler puts a lot of efforts into managing job state and their run times.

Since the jobs might runs concurrently, APScheduler has to acquire a lock onto jobstore for any job data modifications.

## Event Listeners

Except for the job management API, APScheduler also provides a lightweight event system for a certain number of events.

APScheduler fires events on certain occasions so that user code can listen to them.

Below is an example of how apscheduler report job errors via prometheus:

```
def report_error(event):
    if event.exception:
        PROM_ERROR_METRICS.inc()

scheduler.add_listener(report_error, EVENT_JOB_ERROR)
```

## Conclusions

### Some ideas

You might want to implement one of below challenges as your side project.

* More subclasses for executor, trigger, jobstore.
* A universal solution of running jobs in distributed worker nodes.
* A web interface for APScheduler.
* A RESTful API for managing APScheduler jobs.
* Make a service on top of APScheduler and let it run in Kubernetes cluster.
* The monitoring of APScheduler is weak. Provide a solution to enhance it. [5]

### Lesson learned

* Decide if you're going to build a utility, a service, or a framework before start writing the first line of code.
* Check if Object-oriented programming suites the case. If you have a variety of framework to support, consider it.
* Simplify the corner cases and make proper strategy and controlling parameters for them.
* Embed an event system for users so that they can do something on certain occasions.

[1]: https://engblog.nextdoor.com/we-don-t-run-cron-jobs-at-nextdoor-6f7f9cc62040
[2]: https://github.com/agronholm/apscheduler
[3]: https://apscheduler.readthedocs.io/en/latest/extending.html
[4]: https://stackoverflow.com/questions/1719071/how-is-sleep-implemented-at-the-os-level
[5]: https://prometheus.io/docs/practices/instrumentation/#offline-processing
