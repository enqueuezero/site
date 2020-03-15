---
title: Programming
---

# Programming

## [2PL](/concepts/2PL.html)

The 2PL or Two-Phase Locking is a method to reach serializability.
The 2PL is straightforward like its name - it has two phases.

* Phase 1, growing phase.
    * New locks may be acquired.
    * None of them can be released.
* Phase 2, shrinking phase.
    * Existing locks may be released.
    * No new locks can be acquired.

## [Actor Model](/concepts/actor-model.html)

The actor is an isolated concurrent unit scheduled by the programming language.  The actor model is yet another concurrency solution. The benefit is lock-free. The downside is only a few tools or framework support it. Either way, if you're stuck at lock when doing concurrent programming, try actor model.

## [ASGI](/concepts/asgi.html)

ASGI is the next kin of WSGI. The specification defines a two-callable API in between web servers and asynchronous web applications. Its primary goal is to support HTTP, WebSocket, and more web standard protocols.

## [Asynchronous and Synchronous](/concepts/async-and-sync.html)

The major difference between synchronous and asynchronous is how they handle tasks.

Executing synchronously describes the sequence of code execution in one-by-one order. The execution of code must wait until previous operation finish, and won't execute next operation until itself finish.

Executing asynchronously refers to as submitting a task to a runner, and then immediately running next task without knowing the result of previous task. The submitted task will be completed or aborted at a certain time later.

## [Coroutine](/concepts/coroutine.html)

Coroutines implement multi-tasking by consuming less resource. The downside is that it introduces yield / resume into your code. If thread or process cannot meet your multi-tasking requirements, try coroutine, although it also means rewrite you application very likely.

## [FFI](/ffi.html)

If you have performance bottleneck when running the CPU-intensive calculation in VM language, and ALSO feels VM interpreter runs so slow, take a look at FFI! If you want to write your own interpreter language, also try to integrate libffi as a bonus!

## [File Access Permission](/file-access-permission.md)

This article describes File Access Permissions in UNIX. Here, file means regular file, directory file, block special file, character special file, FIFO, Socket, and Symbolic Link. As "Everything is a file" in UNIX, it's import to understand the File Access Permissions. Different from other articles, this one is going to explain the design of the File Access Permissions.

When we talk about File Access Permissions, people always think of the nine permission bits of each file - `rwxrwxrwx`. However, these permission bits are not the whole thing. The missing part are file IDs and process IDs. To complete the analysis of File Access Permissions,  we need both file and process. In this article, we describe file IDs, permission bits, and process IDs, and finally introduce a typical example.

## [Fuzzy Search](/concepts/fuzzy-search.html)

Fuzzy search can be applied whenever there is a search box. Under the hood, the fuzzy
search requires approximate string matching. Among all algorithms, the Bitap algorithm
is perhaps the best-known for approximate string matching.  However, it doesn't
fit the case in which the searching dataset is huge since it requires a full scanning.
Python function `get_close_matches` in standard lib `difflib` is the handiest tool
ready to use.

Installing fuzzy search plugin or utilities save a few seconds every time and thus several
hours and days in your work and life.

## [Heat Maps](/concepts/heatmap.html)

Heat Map is a powerful tool for visualizing three-dimensional data. When performing analysis on latency, offset, utilization over time, don't forget Heat Maps!

## [Language Grammar](/language-grammar.html)

Implement your own language might sound crazy but it's very doable. With these mature libraries, you don't necessarily need to understand complicated parser theory but still can create something! If you're interested in create a grammar syntax of specification and protocols, learn these libraries and try to build a tiny prototype to demonstrate your ideas.

## [Lock-free Queues](/lock-free-queues.html)

Lock-Free queues provides us better performance for concurrent queue which is non-blocking and linearizable. Although it introduces ABA problem, we have some workaround solutions for it. In general, if if don't want to lock your queue in concurrent programming, try lock-free queue algorithm.

## [Markdown Parser](/markdown-parser.html)

In practice, most Markdown parser programs use regular expression or regex for parsing. There are some more options like [PEG](https://github.com/jgm/peg-markdown), etc. In this post, we'll write a simple but extensive markdown parser in nim-lang that can perform basic parsing. Beyond that, we'll also discuss how to improve the code to support more Markdown notations and dialects.

## [Pseudo-Random Numbers](/pseudo-random-numbers.html)

PRNG or Pseudo-random number generators are used for generating numbers distributed randomly.

* The PRNG generates "random" numbers which would recur eventually over a period.
* The Mersenne Twister and LCG are the two popular PRNG algorithms.
* Don't use PRNG for cryptographic operations.

## [Raft and Stream Paradigm](/raft-and-stream-paradigm.html)

Have you ever think about implement Raft in Stream data structure? It's so fun.

## [Secure SOCKS5 Proxy](/secure-socks5-proxy.html)

By secretly deploying a secure SOCKS5 proxy server and choosing a strong cipher algorithm, people can break through severe network blockade. Shadowsocks could be your first choice.

## [The Difference between SLI, SLO, and SLA](/the-difference-between-sli-slo-and-sla.html)

The SLA, SLO, and SLI are related concepts though they're different concepts.

* SLA or service level agreement is a contract that the service provider promises customers on service availability, performance, etc.
* SLO or service level object is a goal that service provider wants to reach.
* SLI or service level indicator is a measurement the service provider uses for the goal.

## [Timezone](/concepts/timezone.html)

As the earth is a sphere, different places in the world will have different clocks. Human invented timezone to split the globe into 24 areas by regions. The UTC or Coordinated Universal Time is the primary time standard by which the world regulates clocks and time.

Programmers need to be aware of the timezone and what it means to the time they handle. In this case, the timezone libraries can help to ease the problem.

## [URL Dispatcher](/concepts/url-dispatcher.html)

Most modern web frameworks provide a component called `Router` or `URLDispatcher` to resolve a function or method to handle requests to URLs.

There are many means to determine which function to execute for an URL.

* Regex Resolution
* Template Resolution
* Directory Resolution
* Function Resolution

## [WSGI](/concepts/wsgi.html)

WSGI or Web Server Gateway Interface is a specification of [PEP 3333] that defines how the web server communicates with Python web applications.

* WSGI is a contract of the HTTP application API in Python world.
* WSGI is not an application, a server, or a software.
* WSGI has application side and server side.
    * Application-side provides a function and return a value.
    * Server-side sends the function parameters in and handle the returned value.
* [PEP 3333] defines all aspects on WSGI.
    * However, you don't necessarily need to read the full spec just for knowing what it is.

[PEP 3333]: https://www.python.org/dev/peps/pep-3333
