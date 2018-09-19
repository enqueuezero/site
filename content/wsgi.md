---
title: WSGI
category: Computer Science
tags: wsgi, web
---

WSGI or Web Server Gateway Interface is a specification of [PEP 3333] that defines how the web server communicates with Python web applications.

In this post, we will cover below topics:

* Basic concepts in WSGI
* Things not defined in WSGI
* Booming Web Frameworks
* Pros and Cons
* Conclusions

## Overview

* WSGI is a contract of the API.
* WSGI is not an application, a server, or a software.
* WSGI has application side and server side.
    * Application side provides a function and return a value.
    * Server side provides the function parameters and handle the returned value.
* [PEP 3333] defines all aspects on WSGI.
    * However, you don't necessarily need to read the full spec just for knowing what it is.

## Basic Concepts

Below is a simplified graph of components defined in WSGI.

// TODO: a graph of the relationship between gateway and application.

### Web Server

The web server is a server application that listen on a socket binding `host:port`.
Once an HTTP request lands on the socket, the web server calls function `app(environ, start_response)`.

* The `app` is registered by application before running the web server.
* The `environ` dict wraps raw HTTP requests, including methods, url, query string, body, etc.
* The `start_response` callable accepts two parameter: `status_code` and `response_headers`.

### Application

// TODO: introduction of application interface

### Data Flow

// TODO: a graph of the data flow

### Environment

The `env` dict contains OS environ variables and HTTP request information.

### Response Iterable

The iterable as the response makes WSGI available for both streaming response and non-streaming response. The string, list, or any Python iterable object can be used as responses.

Below is the pseudo code of how web server transforms and sends iterable to client:

```
# server side code
iterable = app(env, start_response)
for chunk in iterable:
    client.send_bytes(chunk)
```

For non-streaming response, you would more want to return `return ["hello world"]` than to `return "hello word"`. The latter case would lead to sending one byte at a time to the client.

### Middlewares

WSGI makes pre-processing and post-processing easy.
Things people usually do but not wanna introduce into app code include gzip, throttle, rate limiting, proxy, etc.

The implementation is to let middleware expose same interface and do extra work, pretty like what Python decorator does.
It implies that eventually you would expose middleware app as WSGI server side entrypoint.

```
def app(env, start_response):
    # your app code

def my_middleware(env, start_response): # this will be used as entrypoint
    # do pre-processing
    iterable = app(env, start_response)
    # do post-processing
```

### Example

// TODO: a gist

// TODO: an asciinema of gist running

## PEP 333

## PEP 3333

## The Need for `PATH_INFO` and `SCRIPT_NAME`

// TODO: explain the difference between WSGI and CGI.
//  CGI: each file becomes an entry.
//  WSGI: only one file becomes the entry.

## Won't WSGI Replace SCGI?

// TODO: No. wsgi <-> scgi

## Threadsafe

// TODO: explain WSGI is threadsafe.

## URL Dispatching

// TODO: explain why It's not specified.
//  It's up to web frameworks.
//  Refer to [url dispatcher](url-dispatcher.html)

## Booming Web Frameworks


## Advantages and Disadvantages

* Advantages
    * Unified Interfaces
* Disadvantages
    * Only support sync

## References

* [Learn about WSGI](https://wsgi.readthedocs.io/en/latest/learn.html)
* [A Detailed Study of WSGI - Web Server Gateway Interface of Python](https://www.cabotsolutions.com/2017/11/a-detailed-study-of-wsgi-web-server-gateway-interface-of-python)
* [Asynchronous WSGI](https://quantmind.github.io/pulsar/apps/wsgi/async.html)
* [What makes WSGI is synchronous in nature?](https://stackoverflow.com/questions/34109324/what-makes-wsgi-is-synchronous-in-nature)
* [Primer to Asynchronous Applications](https://bottlepy.org/docs/dev/async.html)

[PEP 3333]: https://www.python.org/dev/peps/pep-3333
