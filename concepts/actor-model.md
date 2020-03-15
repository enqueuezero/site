---
title: Actor Model
permalink: /concepts/actor-model.html
date: 2018-06-24
category: Programming
tags: concurrency
---

# Actor Model

[[toc]]

## Context

Concurrency means we could run multiple tasks upon single CPU core.

Multiprocess and multithreading are the two most popular ways of doing concurrency. It leverages Operating System's process and thread (lightweight process). The problem is that data sharing is a problem, especially in multithreading. We need to apply locks to the shared data.

The actor model is another concurrency technology.

## Introduction

The actor is an isolated concurrent unit scheduled by the programming language. 

It's far more lightweight than processes or threads, so you can have hundreds of thousands of actors running simultaneously.

Actors are isolated from each other, meaning no actor can access other actors' data in memory. Instead, if needed, they communicate with each other via message passing.

## Solutions

### Erlang, Elixir

In the telecom industry, we find heavy use of Erlang. The actor model makes the system more reliable. Below hello world example shows the two fundamental operators: send and receive.

```
pid = spawn fn ->
  receive do
    {:hello, msg} -> IO.puts(msg)
  end
end

send pid, {:hello, "world"}
```

### Akka

Akka is de facto actor model implementation in Java and Scala. 

It has a similar operator like Erlang and Elixir. Check [Akka Quickstart with Scala] for Hello World example. It's a little bit complicated than elixir example above.

### Skynet

[Skynet] is a lightweight C-implemented actor system. 

## Patterns

### Small Memory Footprint

OS process or thread needs to have minimum a few megabytes memory in OS.

Actors are tiny in contrast. It varies from implementations, but it generally needs only a few hundreds of bytes. That's why it can have hundreds of thousands of actors when consuming 1GB memory.

An actor has very few data in its data structure:

* State
* Behaviour
* Mailbox

### Mailbox and Message Passing

Every actor has a mailbox, just like a mailbox in front of every house. It's a FIFO message queue that stores message sending from other actors.

The sequence of messages delivered to a mailbox determines the code be synchronized. The actor reacts by the following Message and suspends when no new Message.

Generally, the mailbox is a lock-free queue. Check [Lock-Free Queues] If you want to know more.

### Schedule System

The schedule system schedules when to run an actor. As a developer, you wouldn't necessarily need to use schedule system generally.

The scheduling system has two major implementations:

* Use underlying OS threads.
* VM implement its micro-threads.

### Ready Queue & Waiting Queue

Schedule system maintains two queues:

* `ready_queue`.
* `waiting_queue`.

Below is a possible set of rules:

* Scheduler picks the HEAD of `ready_queue` to run inside VM for a given time slice.
* Scheduler moves the head of `ready_queue` to the END of `ready_queue` if the Proc can't finish in a given time slice.
* Scheduler moves the HEAD of `ready_queue` to the END of `waiting_queue` if `recv` blocks the Proc.
* Scheduler moves a Proc from `waiting_queue` to `ready_queue` if it receives a message or waiting for the timeout.

Note that at a specific moment, there is only one instruction of a Proc is running in single CPU core. On a multiple CPU core machine, VM can create various schedulers.

### Let it crash

An actor might crash, just like process might crash. `Let it crash` is a philosophy of isolating bad actors from crashing but leaving all other actors running as usual. Usually, a supervisor watches all actors. If an actor crashed, then it will try to do something based on your configured strategy, for example, restarting the actor.

### Distribution

The actor doesn't care where the message comes. It can be from another actor in the same process or from another process in another machine.

This feature combining let-it-crash philosophy makes actor a perfect solution to build a robust distributed system.

## Conclusions

The actor model is yet another concurrency solution. The benefit is lock-free. The downside is only a few tools or framework support it. Either way, if you're stuck at lock when doing concurrent programming, try actor model.

[Lock-Free Queues]: lock-free-queues.html
[Skynet]: https://github.com/cloudwu/skynet
[Akka Quickstart with Scala]: https://developer.lightbend.com/guides/akka-quickstart-scala/index.html
