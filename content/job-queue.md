---
title: Job Queue
category: Computer Science
tags: queue
date: 2018-09-09
---

## Context

In request-response model server usually has  very short time to run transactions, and thus it doesn't have enough time to handle time-consuming jobs. For example, the web server needs to respond in less than 30 seconds, while an API importing his/her data might need to take 5 minutes.

Job Queue is a general solution to solve the problem.

## Overview

A Job queue, sometimes task queue or batch queue, is a data structure containing jobs to run outside the common request-response cycle. 

A job is a data structure containing running context, and usually encoded as strings or byte streams in job queue.

A job producer initializes jobs, serializes them and sends them out. The producer can be the HTTP process, desktop GUI main process, or anything that is required to be responsive.

A job consumer receives jobs from the job queue, deserializes them and runs jobs in isolated environment.

## Use

* Do offline calculations, for example, training machine learning models, updating loads of records in database, etc.
* Interact with third-party services, for example, sending emails or text messages.
* Let backup system do actual work without idling the compute resources.

## Common Pattern

Below involves a set of popular job queue frameworks like Python-RQ, Celery, and Sidekiq. By comparing their APIs and design philosophies, we could have a deeper understanding of job queue.

### Setup Message Queue

First, run a Message Queue software. It can be Redis, RabbitMQ, ZeroMQ, Disque, etc. Without the Message Queue running, the publisher can't publish jobs and the consumer would very likely crash. However, Job Queue won't launch Message Queue for you usually, meaning you need to manually bring up Message Queue instance before running a Job Queue.

### Setup Queue and Connection

Job Queue usually requires you to define a `queue` object. The setup function usually needs the connection parameters of Message Queue and return the job queue object. This queue object encapsulates all functionalities a producer needs.

For example, in Python-RQ,

```python
from redis import Redis
from rq import Queue

rq = Queue(connection=Redis())
```

For example, in Celery,

```python
from celery import Celery

celery = Celery('tasks', broker='pyamqp://guest@localhost//')
```

Note that some frameworks many have already created a Job Queue so you only need to configure it. For example, in Sidekiq,

```ruby
require 'sidekiq'

Sidekiq.configure_server do |config|
  config.redis = { url: 'redis://redis.svc:6379/0' }
end
```

### Publish the job

Almost all framework try to simplify the effort of publishing the job. The API has two common kinds:

* Enqueue Plain Function
* Make Plain Function Asynchronous

###! Enqueue Plain Function

Define plain function, and use the queue to enqueue function call.

For example, in Python-RQ,

```python
def count_words_at_url(url):
    return len(requests.get(url).content.split())

rq.enqueue(count_words_at_url, 'https://enqueuezero.com')
```

###! Make Plain Function Asynchronous

Decorate plain function with the queue to make it asynchronous.

For example, in Celery,

```python
@celery.task
def count_words_at_url(url):
    return len(requests.get(url).content.split())

count_words_at_url.delay('https://enqueuezero.com')
```

For example, in Sidekiq,

```python
class CountWordsAtURLWorker
  include Sidekiq::Worker
  def perform(url)
    open(url) do |r|
        r.read.split.size
    end
  end
end

CountWordsAtURLWorker.perform_async('https://enqueuezero.com')
```

### Dedicated Worker as Consumer

Most Job Queue softwares take over the worker completely, meaning you only need to start the workers and let them run. The worker will start executing the job in the background on fetching one from MQ. You might want to run it as a daemon or under process supervisors.

For example, in Python-RQ,

```bash
$ pipenv run rq worker
```

For example, in Celery,

```bash
$ pipenv run celery -A tasks worker
```

For example, in Sidekiq,

```bash
$ bundle exec sidekiq
```

### Monitoring

Since Job Queue process runs in the background, so monitoring is a battery-included feature. It often provides you some job statistics like below:

* How many jobs in progress, or failed.
* How many workers in idle, or busy.
* How many jobs it has handled.
* etc.

The Job Queue framework often provides two kinds of interfaces:

* A command-line interface that can show job statistics, often with color bars.
* A web dashboard running in parallel with worker processes. This also requires to run an extra admin web process alongside with the Job Queue. The basic theory is to let the admin web process connect to Message Queue for statistics.

### Job Context

Below lists some common seen job context data:

* `job.id` is a reference. We use it to query job context from Message Queue as well. UUID is usually to be the ID generator.
* `job.function` is a reference of object that tells consumer how to run the job. It can be an import string, or a code object.
* `job.args` are a list of parameters to be passed into Job functions.
* `job.ttl`, or time-to-live, is the maximum time of job presenting. The job will be dropped or raise error if the TTL is exceeded. This is mainly to prevent job stuck in the queue.
* `job.timeout` is the maximum time of job execution in worker.
* `job.status` describes if the job is in running, or has run successfully, or failed, etc. The field status reflects the life cycle of a job.
* `job.result` stores the return value of job function call.

### Result Storage

Job functions may return values. Some Job Queue frameworks support storing results into a backend. Some frameworks simply have no support for result storage for it might increase the complexity of implementation. Anyway, since we have the job id in the context, it's quite easy to store the id-result into key-value database for the Job Queue. It requires setting a storage backend when the Job Queue is setup.

### Error Handling

Job Queue has below solutions for failed jobs usually:

* Customize error hook function.
* Log error tracebacks or integrate with Error Tracing system.
* Backoff and retry the job if necessary.
* Move dead jobs to a failed queue.

When job failed, it's unrealistic to keep trying running the job. It's usually the maintainer's responsibility to intervene, either to purge the job or fix the code and re-run the job.

## Comparisons

Below lists popular Job Queue frameworks.

* [Celery](http://www.celeryproject.org/)
    * Advantages
        * Popular.
    * Disadvantages
        * Over-engineering. Do you really need Celery? Give Python-RQ a look.
        * Complex dependencies and code layers.
        * Hard to debug.
        * Complicated configuration.
        * Can build an async call hell if you wish.
* [Python-RQ](https://python-rq.org/)
    * Advantages
        * Simple, all document read through in 15min.
        * Easy to debug.
    * Disadvantages
        * Support only Redis as broker.
        * No delayed jobs. Do you think RQ is enough for you? Give celery a look.
        * Unreliable delivery.
* [Dramatiq](https://dramatiq.io/)
    * Advantages
        * Simple.
        * Kinda in the middle of Python-RQ and Celery.
        * Task prioritization.
        * Rate limiting.
        * Can retry.
    * Disadvantages
        * Limited Message Queue broker choices.
* [Taskmaster](https://github.com/dcramer/taskmaster)
    * Advantages
        * designed for handling one-off tasks with large sets of tasks
    * Disadvantages
        * Poor document
* [Sidekiq](https://sidekiq.org/)
    * Advantages
        * Popular
        * Rich document
    * Disadvantages
        *  thread unsafety
* [Resque](http://resque.github.io/)
    * Advantages
        * Beautiful web dashboard
        * Simple
    * Disadvantages
        * Support only Redis as broker.
* [DelayedJob](https://github.com/collectiveidea/delayed_job)
    * Advantages
        * Easy to use
        * Good Rails integration
    * Disadvantages
        * Performance

Other solutions:

* [Sucker Punch](https://github.com/brandonhilkert/sucker_punch)
* [Girl Friday](https://github.com/mperham/girl_friday)
* [JQM](http://jqm.readthedocs.io/en/master/)
* [Bee-Queue](https://github.com/bee-queue/bee-queue)
* [Bull](https://github.com/OptimalBits/bull)
* [Kue](https://github.com/Automattic/kue)

## Conclusion

Job queue is an essential component to extend request-response model for handling time-consuming jobs. Choose a Job Queue framework that has API and features you like, and make sure that you have solutions to overcome the disadvantages.
