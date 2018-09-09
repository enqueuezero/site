---
title: Asynchronous and Synchronous
slug: async-and-sync
date: 2018-06-19
category: Computer Science
tags: async sync
---

## Context

In computing, program doing input / output, or I/O, has five major ways:

* Blocking I/O
* Non-blocking I/O
* I/O Multiplex
* Signal-driven I/O
* Asynchronous I/O

Check [I/O Models] if you don't understand them.

In programming language, the last I/O - Asynchronous I/O and others derive two programming models: synchronous and asynchronous.

* Synchronous execution.
* Asynchronous execution.

## Introduction

The major difference between synchronous and asynchronous is how they handle tasks.

### Synchronous

Executing synchronously describes the sequence of code execution in one-by-one order. The execution of code must wait until previous operation finish, and won't execute next operation until itself finish.

### Asynchronous

Executing asynchronously refers to as submitting a task to a runner, and then immediately running next task without knowing the result of previous task. The submitted task will be completed or aborted at a certain time later.

## Solutions

Below examples describe how to read the content of a file in synchronous and asynchronous API styles.

### Synchronous

Using synchronous API is the simplest solution. If you want to know the execution of code, just look through lines of code one by one.

```
import requests
response = requests.get('https://enqueue.zero')
print(len(response.content.split()))
```

### Asynchronous - Callback

Using callback as asynchronous is the easiest way to understand asynchronous. We can follow below rules to track the execution of code:

* All asynchronous execution can only be scheduled when a event loop is running.
* There is no asynchronous code execution when event loop stopped.
* The start of the code happens on when we call it. Make sure the event loop is running.
* When asynchronous code execution is finish, a callback function will be called.
* There must be no blocking I/O code in either task or callback.

Below code is using tornado.

```
import tornado.ioloop
from tornado.httpclient import AsyncHTTPClient

def handle_response(response):
    print(len(response.body.split()))

http_client = AsyncHTTPClient()
http_client.fetch('https://enqueue.zero', handle_response)

tornado.ioloop.IOLoop.instance().start()
```

Note that some languages have asynchronous in-built, such as node.js. Thus, you don't need to maintain event loop at all.

```
const https = require('https');

https.get('https://enqueuezero.com', (res) = {
    // handle response
});
```

* Advantages
    * Easy to understand
* Disadvantages
    * Callback everywhere leads to ugly code.

### Asynchronous - Futures and Promises

Future, or promise, or deferred, refers to a data structure for managing asynchronous task state and result. The data structure is created when the asynchronous task is submitted to event loop. It maintains the running state of job. It stores the result if the job runs successfully, or error information if the job runs failure. A future can also be mixed with callback.

```
import tornado.ioloop
from tornado.concurrent import Future
from tornado.httpclient import AsyncHTTPClient

def async_fetch_future(url):
    http_client = AsyncHTTPClient()
    my_future = Future()
    fetch_future = http_client.fetch(url)
    fetch_future.add_done_callback(
        lambda f: my_future.set_result(f.result()))
    return my_future

def handle_response(response):
    print(len(response.body.split()))

future = async_fetch_future('https://enqueuezero.com')
future.add_done_callback(lambda f: handle_response(f.result()))

tornado.ioloop.IOLoop.instance().start()
```

In some programming languages, the model could be named as `Promise()`, or `Deferred()`, but they're actually the same thing.

* Advantages
    * Future can maintain errors as well.
    * Future can maintain execution status.
* Disadvantages
    * Complex

### Async and Await

Async and await are a pair of keywords that are introduced by many programming languages. It enables you to write asynchronous code just like writing synchronous code. Below is a demonstration.

```
import aiohttp
import asyncio

async def fetch():
    async with aiohttp.ClientSession() as session:
        async with sesion.get('https://enqueuezero.com') as response:
            return len((await response.text()).split())

asyncio.get_event_loop().run_until_complete(fetch)
```

Be aware that the synchronous functions and asynchronous functions must be in two different worlds. Especially when handling I/O, they should never be mixed. For example, below synchronous call will block the event loop and hence hang all scheduled asynchronous.

```
async def fetch():
    requests.get('https://enqueuezero.com')
```

* Advantages
    * Language built-in async support solution.
* Disadvantages
    * Need to separate sync and async functions.
    * Need to write `async` and `await` everywhere. Missing any one could lead to disaster.

### Performance

The implementation of asynchronous can be

* multi-threading
* single-threading + event loop.

Non-blocking asynchronous operations takes far less time than blocking methods. Yet it still depends on the implementation of specific program.

Although we won't call synchronous functions in asynchronous functions, we can still wrap synchronous functions running in a thread to make it asynchronous. Introducing this technique usually will harm the performance, but it make the code more flexible.

## Conclusions

Synchronous code is simple to read but less performant. Asynchronous code is frustrating to read and write but has high performance. Today, many web servers choose to manage HTTP connections through asynchronous model. If you care performance very much and the bottleneck is at I/O, think about asynchronous; otherwise writing synchronous code can save you a lot of time.

## References

* [Asynchronous vs synchronous execution waht does it really mean](https://stackoverflow.com/questions/748175/asynchronous-vs-synchronous-execution-what-does-it-really-mean)
* [Asynchronous python](https://hackernoon.com/asynchronous-python-45df84b82434)
* [Tornado async guide](http://www.tornadoweb.org/en/stable/guide/async.html)
* [aiohttp](https://aiohttp.readthedocs.io/en/stable/)
* [Futures and promises](https://en.wikipedia.org/wiki/Futures_and_promises)
* [Nodejs blocking vs nonblocking](https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/)

[I/O Models]: io-models.html
