---
title: Raft and Stream Paradigm
permalink: /raft-and-stream-paradigm.html
category: Computer Science
date: 2018-08-15
---

# Raft and Stream Paradigm

The stream is a data structure that evaluates data when we need them. Below is a typical Python Stream.

```
from functools import lru_cache

class Stream:

    def __init__(self, head, restfn=None):
        self.head = head
        self.restfn = restfn

    @property
    def stopped(self):
        return self.restfn is None

    @property
    @lru_cache()
    def rest(self):
        assert not self.stopped, 'No rest for stopped stream.'
        return self.restfn()
```

Considering the usage, it often leads to a recursive definition. For example, a stream that keeps returning number `1` has below form:

```
def one_stream():
    return Stream(1, one_stream)
```

We can get `head` for the evaluated value, and `rest` for the rest of the stream.

```
>>> one_s = one_stream()
>>> print(one_s.head)
1
>> print(one_s.rest.head)
1
>>> print(one_s.rest.rest.head)
1
```

You might notice that `one_stream` creates an infinite stream, meaning the stream never stops generating `1`. We can indicate a stopped stream by setting `restfn` to `None`. Below example shows a stopwatch stream that eventually stopped after a given period.

```
from time import time

def stopwatch_stream(period, start=None):
    now = time()
    start = start or now
    left = max(0, period - (now - start))
    rest = lambda: stopwatch_stream(period, start)
    return Stream(left, rest if left > 0 else None)

>>> stopwatch_s = stopwatch_stream(10)
>>> stopwatch_s.head
10.0
>>> stopwatch_s.rest.head
5.976487159729004
>>> stopwatch_s.rest.rest.head
1.7044363021850586
>>> stopwatch_s.rest.rest.rest.head
0
>>> stopwatch_s.rest.rest.rest.stopped
True
```

The stream approach takes a different way of combining modules from Object-Oriented programming. We need to think of the history of time series for a module, rather than the states at any specific moment. Although we still handle states one by one, we don't care when the state change happens. The `stopwatch_stream` allows the caller only caring the `left` time for the period.

We build a datagram_stream on top of the `stopwatch_stream` below. It creates a stream that either is stopped or has received a datagram.

```
import json

def receive(udp_server, timeout):
    udp_server.settimeout(timeout)
    try:
        return udp_server.recvfrom(8192)
    except socket.timeout:
        return None

def datagram_stream(udp_server, timeout, left=None):
    left = left or stopwatch_stream(timeout)
    data = receive(udp_server, left.head) if not left.stopped else None
    rest = lambda: datagram_stream(udp_server, second, left.rest)
    return Stream(data, rest if data else None)
```

Given a raft follower stream, it only cares the datagram stream and either turn it into a new follower stream if received any datagram or converts to a new candidate stream.

```
def follower_stream(state):
    datagrams = datagram_stream(timeout=state.election_interval)
    timeout = datagrams.stopped
    state = reduce_stream(handle_datagram, datagrams, init=state)
    rest = lambda: candidate_stream(state) if timeout else follower_stream(state)
    return Stream(state, rest)
```

The `reduce_stream` can be very similar to the `reduce` function in functional programming. The `handle_datagram` transform an old `state` into a new `state` based on the received datagram. The `candidate_stream` creates a new stream that performs candidate behaviors.

Similarly, we can implement the candidate stream and leader stream in such way.

```
def candidate_stream(state):
    state = elect_self(state)
    datagrams = datagram_stream(timeout=state.election_interval)
    timeout = datagrams.stopped
    state = reduce_stream(handle_datagram, datagrams, init=state)
    def rest():
        if timeout: return candidate_stream(state)
        elif state.is_follower: return follower_stream(state)
        else: return leader_stream(state)
    return Stream(state, rest)

def leader_stream(state):
    state = send_heartbeat(state)
    datagram_stream = datagram_stream(timeout=state.heartbeat_interval)
    state = reduce_stream(handle_datagram, datagrams, init=state)
    rest = lambda: follower_stream(state) if state.is_follower else leader_stream(state)
    return Stream(state, rest)
```

The candidate requests to vote for itself and then waiting for votes before timeout. The leader sends heartbeats to all other nodes and then waiting for the response before timeout.

By applying the Stream paradigm, we now only need to focus on implementing `def handle_datagram(state, datagram) -> state`, which is purely functional and testable. I'll leave the implementation of it for you as a practice. :) Enjoy hacking!
