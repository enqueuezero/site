---
title: ASGI
permalink: /concepts/asgi.html
category: Computer Science
date: 2018-09-22
---

# ASGI

[[toc]]

## Context

WSGI is the de facto standard interface in Python Web Programming around web servers, frameworks, and applications.
However, it sticks into synchronous programming and makes itself hard to support new protocols like WebSocket.

ASGI is a successor of WSGI. Its goal is to provide a unified interface for asynchronous programming in Python world.

## Overview

```python
class Application:

    def __init__(self, scope):
        self.scope = scope

    async def __call__(self, receive, send):
        event = await receive()
        ...
        await send({"type": "websocket.send", ...})
```

* Unlike interface `app(env, start_response)` in WSGI, now in ASGI it has such form: `app(scope)(send, receive)`.
* `scope` contains details about incoming requests.
* `app(scope)` returns a coroutine callable for future data handling.
* `send` and `receive` are two awaitable functions that handling incoming events and outgoing events.
* `event` is a dict containing incoming events.

## ASGI v/s WSGI

ASGI is a superset of WSGI, that is, ASGI can handle more cases than WSGI.

Part of the HTTP design of ASGI is to align to WSGI specification, which makes it possible that some users want to run WSGI applications in ASGI servers.
Most WSGI data in `environ` have corresponding data in ASGI `scope`.

### ASGI `<=>` WSGI

The library `asgiref` provides WSGI-to-ASGI adaptor. It has below usage.

```python
asgi_application = WsgiToAsgi(wsgi_application)
```

Under the hood, `wsgi_application` is running in synchronous thread pools.  After the transformation, the `asgi_application` turns to a two-callable object.

The WSGI-to-ASGI adaptor is incompatible in some instances like file handling due to the fundamental difference of how I/O is performed. However, something is better than nothing.

## WebSocket

ASGI splits the API into two callables, one for when the connection is established, the other one for when the event comes.
Such model naturally fits the WebSocket protocol.

* When the client initially opens a connection to the ASGI server, the ASGI server maintains the connection per se as `scope`.
* When the client communicates with the ASGI server, the ASGI server maintains the communication per se as `receive` and `send`. 

## Two-Callable

You might be wondering why ASGI has to use two-callable API - it's less straightforward than single-callable API anyway.

My explanation is that in the essence of asynchronous programming it's all about [lazy evaluation](https://en.wikipedia.org/wiki/Lazy_evaluation). We implement lazy evaluation by wrapping the logic into a callable and evaluate later.

The first callable is not an asynchronous function at all. It's the similar thing like WSGI app.
The extra callable reflects the awkward (but practical) thinking of asynchronous programming. It must not contain any blocking calls.

Such design allows the data being sent and received at any time and hence supports the asynchronous programming.

## Conclusions

ASGI is the next kin of WSGI. The specification defines a two-callable API in between web servers and asynchronous web applications. Its primary goal is to support HTTP, WebSocket, and more web standard protocols.

## References

* [ASGI Introduction](https://asgi.readthedocs.io/en/latest/introduction.html)
