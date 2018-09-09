---
title: Periodic Scheduler
category: Computer Science
tags: scheduler
date: 2018-08-21
---

## Context

It’s a fundamental requirement that we need to run a command at a specific time.

## Overview

Periodical Scheduler schedules code to be executed periodically. It has below features:

* Job managing, meaning adding new jobs, removing old ones, or modifying existing ones.
* Job storing.
* Run as a long-running process.

## Solutions

### Crontab

Crontab is a Unix utility that gets installed in almost every Unix / Linux distribution.

* You can run `crontab -e` to edit jobs, which will prompt you an editor.
    * To remove jobs, you need to remove those lines defining jobs.
    * To add a new job, you will need to add a new line of definition in the form like `*/5 * * * * /opt/my-lib/bin/my-prog`. The first five fields are minute, hour, the day of a month, month, and the day of a week. The last field is the command.
* In most Linux distros, per user crontab are typically stored in `/var/spool/cron/crontabs/{username}`.
* The long-running process is a daemon called `crond`.

Check the manual of [crontab](http://man7.org/linux/man-pages/man5/crontab.5.html).

### Kubernetes CronJob

Kubernetes Cron Job is like crontab file in my forms except that it runs in a Kubernetes cluster.

* To manage the Kubernetes CronJob, you need to write a YAML file and apply to the Kubernetes API Master.
* Jobs are stored in Etcd.
* The Kubernetes API Master does the scheduling work.

Check the documentation of [Running Automated Tasks with a CronJob](https://kubernetes.io/docs/tasks/job/automated-tasks-with-cron-jobs/).

### Scheduler Libraries

Scheduler libraries let you schedule code to be executed later. Below are some typical implementations:

* APScheduler for Python
* Whenever for Ruby

* To manage the jobs, you usually need to call functions like `add_job`, `remove_job`, etc.
    * Some libraries enables you managing jobs at runtime. Some applications ships with a web UI to manage jobs.
* The definition of scheduler libraries varies but is generally flexible. It supports cron-style definition, and also an embed DSL for managing jobs. You might get a chance to define jobs in the form like `every 1.hour { run 'my job' }`.
* The libraries generally need to run as a single process and managed by supervisor software.

The libraries are useful when you want to integrate scheduler into your application.

## Patterns

* A single periodic job can create multiple instances. Therefore, to avoid duplicate running jobs, we need to ensure that the jobs are idempotent, meaning they can run several times without side-effect.
* The periodic scheduler generally runs as a single instance.
* The instances for a periodic job usually runs in a thread or process for isolation.
* Limiting the number of concurrently executing instances is essential. If a task runs over the window, you need to decide if the scheduler needs to trigger the next job.
* Sometimes the scheduler might miss triggering job executions. You need to determine whether the scheduler needs to trigger the missed job.
* Logging for the scheduler is a bonus. It can help end users do troubleshooting.

## Conclusions

Using crontab is the easiest way to schedule periodic jobs. The limitation is that you can’t control the resource usage and it’s less flexible. To run periodic jobs in a fine-controlled environment, you might want to choose Kubernetes CronJob. To leverage the power of periodic scheduler, you might want to integrate a scheduler library into your application.
