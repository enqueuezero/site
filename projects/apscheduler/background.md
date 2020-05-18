---
title: APScheduler Background Scheduler
permalink: /projects/apscheduler/background.html
---

# APScheduler Background Scheduler

`BackgroundScheduler` is a scheduler provided by APScheduler that runs in the background as a separate thread.

The method `.start()` returns immediately after executed, and a new thread is created. Note that when the main thread exits, the BackgroundScheduler thread exits too.
The parameter `.start(daemon=True)` makes sure the entire program exits when all threads exits.

Below is an example of a background scheduler.

```python
import time
from datetime import datetime

from apscheduler.schedulers.background import BackgroundScheduler

sched = BackgroundScheduler()

def tick():
    print('Tick! The time is: %s' % datetime.now())

def main():
    sched.add_job(tick, 'interval', seconds=3)
    sched.start()

    try:
        while True:
            time.sleep(2)
    except (KeyboardInterrupt, SystemExit):
        sched.shutdown()

if __name__ == '__main__':
    main()
```

In this example, `sched` is a `BackgroundScheduler` instance. The main thread runs a while-loop sleeping forever; the scheduler thread triggers the job every 3 seconds. It only stops when you type Ctrl-C from your keyboard or send SIGINT to the process.

This scheduler is intended to be used when APScheduler has to co-exist with other applications.
It runs in the background so that the main thread is not blocking.
