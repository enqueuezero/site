---
title: The Architecture of APScheduler
permalink: /architecture/apscheduler.html
category: Architecture
tags: scheduler
date: 2018-09-15
---

# The Architecture of APScheduler

[[toc]]

## Overview

APScheduler is a job scheduling framework that executes code either one-off or periodically. People often integrate it into an existing Python application for running interval jobs.

In this post, we will cover below topics:

* What are the basic concepts of APScheduler?
* How does object-oriented programming help extending the use cases?
* How does the scheduler determine the next run time of jobs?
* What if a job miss fired?
* What if too many jobs running simultaneously?

## Use

* Desktop application written in Python can sync data from server per-minute jobs.
* Web application written in Python can renew hot-sale list every hour on a landing page.
* Gaming server-side application written in Twisted (A Python network framework) can re-create monsters back to the scene every 5 minutes.
* Run it in AWS and replace Cronjob. [1]

## Concepts

### Job

Job houses the functions to execute, the function parameters to pass in, and a bunch of controlling parameters.

The functions could be either an imported function or a string of import path. The function arguments are essential for the execution. The controlling parameters are for controlling scheduler behaviors.

In below example, `tick` is the Python function to scheduler, `args=(1, )` is the function parameter, and `trigger='interval', seconds=3` are the controlling parameters.

```python
def tick(parameter):
    # do something

scheduler.add_job(function, args=(1, ), trigger='interval', seconds=3, )
```

### Trigger

Triggers contain essential time information for the scheduler. Each job has its trigger. 

The most important thing a trigger does is to tell the scheduler when is the next time this job should run.

For example, in above example, if the job fires at `"2000-01-01T00:00:00Z"`, then the trigger with 3 seconds as interval should report that the next time is `"2000-01-01T00:00:03Z"`.

### Scheduler

Schedulers rules all stuff. You can think of it as a stable API provided by APScheduler for configuring JobStores, Executors and adding jobs.

### JobStore

JobStore houses the scheduled jobs. Without any configuration, APScheduler saves them in memory. As shown in above code, `scheduler.add_job` won't trigger the function but save the job data into the memory.

In below example, APScheduler adds a JobStore named `sqlalchemy`. The job added later chooses `sqlalchemy` as its JobStore. The JobStore persists the job into an SQLite database.

```python
scheduler.add_jobstore('sqlalchemy', url='sqlite:////sched.db')
scheduler.add_job(function, args=(1, ), trigger='interval', seconds=3, jobstore='sqlalchemy')
```

### Executor

Executors run the jobs. They manage the life cycles of jobs. By default, you can use thread or process as executors.

## Object-Oriented Programming

Below is the graph of the relations between all major classes in APScheduler codebase [2].

![APScheduler Class Graph](/static/images/apscheduler-oo.png)

* The `BaseScheduler`, `BaseExecutor`, `BaseJobStore` and `BaseTrigger` implements major functionalities of corespondent concepts.
* The subclasses of base class adapt the base implementation to specific frameworks or libraries to cover more use cases.
* The scheduler manages executor and jobstore.
* The jobstore stores all of the jobs.
* Each job has its trigger.

Choosing a proper scheduler, job store(s), executor(s) and trigger(s) depends on the user's current technology stack.

If all of the implementations cannot fit user's demand, then it's easy to follow the same pattern to extend them. [3]

## Executor Models

There are two primary models of how scheduler schedules jobs in APScheduler.

In below two models, the scheduler internal method `process_jobs` trigger jobs and return seconds to sleep. The other function `sleep` or `run_after_timeout` would idle the scheduler for a few seconds.

### Sleep-Process Model

The sleep-process model is implemented in an infinite loop of sleeping and job processing.

```python
timeout = DEFAULT
while True: 
    sleep(timeout)
    timeout = process_jobs()
```

It's commonly seen in blocking applications. Please check to the implementation of [blocking.py](https://github.com/agronholm/apscheduler/blob/master/apscheduler/schedulers/blocking.py) for example.

### Callback Model

The callback model is implemented in a callback-chain convention.

```python
def start(timeout=DEFAULT):
    run_after_timeout(timeout, wakeup)

def wakeup():
    timeout = process_jobs()
    start(timeout)

start()
```

It's commonly seen in non-blocking applications. Please check the implementation of [tornado.py](https://github.com/agronholm/apscheduler/blob/master/apscheduler/schedulers/tornado.py) for example.

## Time Is of the Essence

Although the scheduler is all about executing the job at a specific time, it doesn't guarantee the job will be executed definitely. That's one of the most important things you need to have in your mind. Two primary factors would affect it:

* The scheduler implementation.
* **Current running job numbers**.
* **Current system load**.

If the system load is high, the scheduler might choose to drop some jobs since it needs to execute new jobs. It's similar to the case of queueing-up.It's recommended not to put CPU-bound operations in the same machine of where APScheduler is running.

Besides, the sleep operation depends on OS or VM scheduler, which is much low-level scheduler behind the scene. The OS does not guarantee it suspends the process exactly the same amount of time specified by `timeout`. [4]

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

## Framework Over Utility

It's an intended design goal to make APScheduler a cross-platform, cross-application scheduler framework, rather than a daemon or service itself. It's meant to reside in an existing application. It says you need to integrate it into your codebase, instead of running it as a dedicated server.

The good part is it can extend itself to almost any use cases. The sad part is that it needs you to do more development work.

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
