---
title: WSGI
category: Computer Science
tags: wsgi, web
date: 2018-09-20
status: draft
---

WSGI or Web Server Gateway Interface is a specification of [PEP 3333] that defines how the web server communicates with Python web applications.

In this post, we will cover below topics:

* Basic concepts in WSGI
* Things not defined in WSGI
* Booming Web Frameworks
* Pros and Cons
* Conclusions

## Overview

* WSGI is a contract of the HTTP application API in Python world.
* WSGI is not an application, a server, or a software.
* WSGI has application side and server side.
    * Application side provides a function and return a value.
    * Server side provides the function parameters and handle the returned value.
* [PEP 3333] defines all aspects on WSGI.
    * However, you don't necessarily need to read the full spec just for knowing what it is.

## Basic Concepts

### Data Flow

Below is a simplified graph of components defined in WSGI.

<img src='https://g.gravizo.com/svg?@startuml; actor User; participant "Server" as A; participant "Application" as B; User -> A: Raw HTTP Request; activate A; A -> B: Call WSGI app(env, start_response); activate B; B --> A: Return Iterable; deactivate B; A --> User: Raw HTTP Response; deactivate A; @enduml '>

### Web Server

The web server is a server application that listen on a socket binding `host:port`.
Once an HTTP request lands on the socket, the web server calls function `app(environ, start_response)`.

* The `app` is registered by application before running the web server.
* The `environ` dict wraps raw HTTP requests, including methods, url, query string, body, etc.
* The `start_response` callable accepts two parameter: `status_code` and `response_headers`.

### Application

TODO

### Environment

The `env` dict contains OS environ variables and HTTP request information.

### Response Iterable

The iterable as the response makes WSGI available for both streaming response and non-streaming response. The string, list, or any Python iterable object can be used as responses.

Below is the pseudo code of how web server transforms and sends iterable to client:

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

The implementation is to let middleware expose same interface and do extra work, pretty like what Python decorator does.
It implies that eventually you would expose middleware app as WSGI server side entrypoint.

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

WSGI leaves a lot of things TBD as it's in essential to define an entry point for your vanilla application.

## Booming Web Frameworks and Servers

Web frameworks are booming since the invent of WSGI. Every framework has its philosophy and design. However, they expose same interface defined by WSGI.

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

## Pros and Cons

* Advantages
    * Standardize and unified interface.
* Disadvantages
    * Only support synchronize paradigm. Not support for async paradigm.

## References

* [Learn about WSGI](https://wsgi.readthedocs.io/en/latest/learn.html)
* [A Detailed Study of WSGI - Web Server Gateway Interface of Python](https://www.cabotsolutions.com/2017/11/a-detailed-study-of-wsgi-web-server-gateway-interface-of-python)
* [Asynchronous WSGI](https://quantmind.github.io/pulsar/apps/wsgi/async.html)
* [What makes WSGI is synchronous in nature?](https://stackoverflow.com/questions/34109324/what-makes-wsgi-is-synchronous-in-nature)
* [Primer to Asynchronous Applications](https://bottlepy.org/docs/dev/async.html)

[PEP 3333]: https://www.python.org/dev/peps/pep-3333
