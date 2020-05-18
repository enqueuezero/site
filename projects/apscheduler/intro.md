---
title: An Introduction to APScheduler
permalink: /projects/apscheduler/intro.html
prev: false
next: /projects/apscheduler/oop.html
---

# An Introduction to APScheduler

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
