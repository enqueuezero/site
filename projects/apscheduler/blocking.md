---
title: APScheduler Blocking Scheduler
permalink: /projects/apscheduler/blocking.html
prev: /projects/apscheduler/
---

# APScheduler Blocking Scheduler

`BlockingScheduler` is one of the very basic scheduler provided by APScheduler.
It runs forever once started, unless notified by system signals or errors.

Below is an example of a blocking scheduler.

```python
from datetime import datetime

from apscheduler.schedulers.blocking import BlockingScheduler

sched = BlockingScheduler()

def tick():
    print('Tick! The time is: %s' % datetime.now())

def main():
    sched.add_job(tick, 'interval', seconds=3)
    try:
        sched.start()
    except (KeyboardInterrupt, SystemExit):
        pass

if __name__ == '__main__':
    main()
```

In this example, `sched` is a `BlockingScheduler` instance. It triggers the job every 3 seconds. It only stops when you type Ctrl-C from your keyboard or send SIGINT to the process.

This scheduler is intended to be used when APScheduler is the only task running in the process.
It blocks all other code from running unless the others are running in separated threads.
