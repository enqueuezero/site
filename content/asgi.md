---
title: ASGI
category: Computer Science
tags: web
date: 2018-09-22
status: draft
---

## Context

WSGI is widely used in Python Web Programming as first choice of the interface around web servers, frameworks and applications.
However, it sticks into synchronous programming and make itself hard to support new protocols like WebSocket.

ASGI is a successor of WSGI. Its goal is to provide unified interface for asynchronous programming in Python world.

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
* `event` is a dict.containing incoming events.

## WebSocket

WebSocket is a protocol that requires a long established connection between the client and the server.

## ASGI `<=>` WSGI

To be more success, ASGI don't want to lose the existing WSGI consumers. It would be good if WSGI and ASGI can shift in between each other in some extent.

The library `asgiref` provides WSGI-to-ASGI adaptor. It has below usage.

```python
asgi_application = WsgiToAsgi(wsgi_application)
```

Under the hood, `wsgi_application` is running in a synchronous threadpool.

They're after all incompatible in certain cases like file handling. However, something is better than nothing.

## Two-Callable

You might be wondering why ASGI has to use two-callable API - it's less straightforward than single-callable API anyway.

My explanation is that in the essence of asynchronous programming it's all about [lazy evaluation](https://en.wikipedia.org/wiki/Lazy_evaluation). We implement lazy evaluation by wrapping the logic into a callable and evaluate later.

The extra callable reflects the awkward (but practical) thinking of asynchronous programming.

## Conclusions

## References

* [ASGI Introduction](https://asgi.readthedocs.io/en/latest/introduction.html)
