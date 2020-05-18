---
title: Run APScheduler With Gunicorn
permalink: /projects/apscheduler/gunicorn.html
---

# Run APScheduler With Gunicorn

APScheduler library presumes a threaded or async model, which doesn’t work well in the scenario of running with lots of web workers.
If APScheduler is to run together with web workers, there will be each APScheduler instance launched per web worker.

For example, Gunicorn is widely used a WSGI runner, which runs in pre-forked model.
It may start with 10 workers, and fork the WSGI app for 10 times per worker process.
It ends up with 10 APScheduler instances as well.

To handle this, it’s a common practice to separate APScheduler from the web workers.

The solution 1 is to run APScheduler in a dedicated process.
You may choose to start a process running only a single BlockingScheduler instance.

The solution 2 is to run APScheduler in the Gunicorn master process, rather than worker processes.
The Gunicorn hook function `on_starting()` is called before the master process is initialized.
Whatever called inside is not forked into worker process.
You may choose to start a BackgroundScheduler inside the `on_starting()` hook function.
