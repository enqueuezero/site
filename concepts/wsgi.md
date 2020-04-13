---
title: WSGI
permalink: /concepts/wsgi.html
category: Programming
date: 2018-09-20
---

# WSGI


WSGI or Web Server Gateway Interface is a specification of [PEP 3333] that defines how the web server communicates with Python web applications.

[[toc]]

## Overview

* WSGI is a contract of the HTTP application API in Python world.
* WSGI is not an application, a server, or a software.
* WSGI has application side and server side.
    * Application-side provides a function and return a value.
    * Server-side sends the function parameters in and handle the returned value.
* [PEP 3333] defines all aspects on WSGI.
    * However, you don't necessarily need to read the full spec just for knowing what it is.

## Basic Concepts

### Data Flow

Below is a simplified graph of components defined in WSGI.

<img src='https://g.gravizo.com/svg?@startuml; actor User; participant "Server" as A; participant "Application" as B; User -> A: Raw HTTP Request; activate A; A -> B: Call WSGI app(env, start_response); activate B; B --> A: Return Iterable; deactivate B; A --> User: Raw HTTP Response; deactivate A; @enduml '>

### Web Server

The web server is a server application that listens on a socket binding `host:port`.
Once an HTTP request lands on the socket, the web server calls function `app(environ, start_response)`.

* The `app` is registered by the application before running the web server.
* The `environ` dict wraps raw HTTP requests, including methods, URL, query string, body, etc.
* The `start_response` callable accepts two parameter: `status_code` and `response_headers`.

### Response Iterable

The iterable as the response makes WSGI available for both streaming response and non-streaming response. The string, list, or any Python iterable object can be used as responses.

Below is the pseudo code of how web server transforms and sends iterable to the client:

```python
# server side code
iterable = app(env, start_response)
for chunk in iterable:
    client.send_bytes(chunk)
```

For non-streaming response, you would more want to return `return ["hello world"]` than to `return "hello word"`. The latter case would lead to sending one byte at a time to the client.

### Middlewares

WSGI makes pre-processing and post-processing easy.
Things people usually do but not wanna introduce into app code include gzip, throttle, rate limiting, proxy, etc.

The implementation is to let middleware expose the same interface and do extra work, pretty like what Python decorator does.
It implies that eventually, you would expose the middleware app as WSGI server side entry point.

```python
def app(env, start_response):
    # your app code

def my_middleware(env, start_response): # this will be used as entrypoint
    # do pre-processing
    iterable = app(env, start_response)
    # do post-processing
```

## Things not defined in WSGI

WSGI does not define below concepts:

* URL routing
* Templating
* Request object
* Response object
* Session
* Cookie
* Database
* MVC
* Application testing
* Form handling
* Error handling
* Application configuration
* Application security
* ...

WSGI leaves a lot of things TBD as it's only to define an entry point for your vanilla application.

## Booming Web Frameworks and Servers

Web frameworks are booming since the invent of WSGI. Every web framework has its philosophy and design. However, they expose the same interface defined by WSGI.

And so as web servers. People wrote dozens of web servers that supports WSGI.

As a result, you can choose a framework and a web server from hundreds of options.

Among them, some are gorgeous.

* Web Frameworks
    * Django
    * Flask
    * Pyramid
    * Falcon
* Web Servers
    * uWSGI
    * Gunicorn
    * wsgiref

### Async Incompatible

WSGI does not naturally fit async programming.

We just can't change the function interface to a async coroutine like below due to the breaking change of the API.

```
# NOT WORKING
async def app(env, start_response):
    return Interable
```

However, it doesn't mean WSGI cannot run in Async server.
A possible way is to wrap `app` running in a threadpool and manage the `Thread` by async event loop.
Note that everything running in `app` is still synchronous.

## Comparisons

### WSGI v/s Ring

[Ring](https://github.com/ring-clojure/ring) is low-level interface and library for building web applications in the Clojure programming language. It's similar to WSGI in Python.

Unlike WSGI having `app`, `env`, `start_response` and `Interable`, Ring has other four concepts: `Handler`, `Request`, `Response`, `Middleware`, among which the `Handler` is very like `app`. However, the `Handler` only accepts `Request` as the parameter and returns `Response`. Both `Request` and `Response` are a dictionary-like object. Please refer to [Ring wiki](https://github.com/ring-clojure/ring/wiki/Concepts) for more details about these concepts.

As a comparison, Ring provides higher level concepts than WSGI.

### WSGI v/s Rack

[Rack](https://rack.github.io/) provides a minimal interface between web servers and Ruby web applications. It's also similar to WSGI in Python.

In Rack, you need to provide an `app` as well, which is the same in WSGI.  Rack requires `app` taking an environment hash as the parameter, and returning an `Array` in the form like `[status_code, headers, body]`. The `status_code` is a string form of HTTP response code, the hash of headers is for HTTP response headers, and the body must be able to respond to `each` method (just like `Iterable` in Python).

We can see that Rack reduces the `start_response` parameter but moves the necessary information into the return value.

## Pros and Cons

* Advantages
    * Standardize and unified interface.
* Disadvantages
    * Only support synchronize paradigm. Not support for the async paradigm.


## References

* [Learn about WSGI](https://wsgi.readthedocs.io/en/latest/learn.html)
* [A Detailed Study of WSGI - Web Server Gateway Interface of Python](https://www.cabotsolutions.com/2017/11/a-detailed-study-of-wsgi-web-server-gateway-interface-of-python)
* [Asynchronous WSGI](https://quantmind.github.io/pulsar/apps/wsgi/async.html)
* [What makes WSGI is synchronous in nature?](https://stackoverflow.com/questions/34109324/what-makes-wsgi-is-synchronous-in-nature)
* [Primer to Asynchronous Applications](https://bottlepy.org/docs/dev/async.html)

[PEP 3333]: https://www.python.org/dev/peps/pep-3333
