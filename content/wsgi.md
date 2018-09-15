---
title: WSGI
category: Computer Science
tags: wsgi, web
---

Note: This post is WIP.

// TODO: minimal introduction of WSGI.
// TODO: img of WSGI

## Why WSGI?

## Basic Concepts

### Overview

// TODO: a graph of the relationship between gateway and application.

### Gateway

// TODO: introduction of gateway interface

### Application

// TODO: introduction of application interface

### Data Flow

// TODO: a graph of the data flow

### Environment

// TODO: explain the environ dict

### Response Iterable

// TODO: explain the iterable
// TODO: show the difference between `return [body]` and `return body`

### Middlewares

// TODO: why we need'em.

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
