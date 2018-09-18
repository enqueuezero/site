---
title: WSGI
category: Computer Science
tags: wsgi, web
---

WSGI or Web Server Gateway Interface is a specification of [PEP 3333] that defines how the web server communicates with Python web applications.

## Overview

* WSGI is a contract of the API.
* WSGI is not an application, a server, or a software.

[PEP 3333] defines all aspects on WSGI.
However, you don't necessarily need to read the full spec just for knowing what it is.

Below is a simplified graph of components defined in WSGI.

// TODO: a graph of the relationship between gateway and application.

## Basic Concepts

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

// TODO: explain the environ dict

### Response Iterable

The iterable as the response makes WSGI available for both streaming response and non-streaming response. The string, list, or Python iterable object can be used as responses.

Below is the pseudo code of how web server returns iterable to client:

```
iterable = app(env, start_response)
for chunk in iterable:
    client.send_bytes(chunk)
```

For non-streaming response, you would more want to return `return ["hello world"]` than to `return "hello word"`. The latter case would lead to sending one byte at a time to the client.

### Middlewares

// TODO: why we need'em.

### Example

// TODO: a gist

// TODO: an asciinema of gist running

## PEP 333

## PEP 3333

## Influenced by LISP

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
