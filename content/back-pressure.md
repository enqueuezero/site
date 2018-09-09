---
title: Back-Pressure
date: 2018-09-09
category: Computer Science
tags: reactive
summary: Producer-consumer model is very helpful to decouple the system components. However, the situation is quite often in which producer produces jobs more rapidly than consumers can consume them. It's a challenge to manage a large number of unconsumed jobs.
---

## Context

Producer-consumer model is very helpful to decouple the system components. However, the situation is quite often in which producer produces jobs more rapidly than consumers can consume them. It's a challenge to manage a large number of unconsumed jobs.

Back-pressure is one of the strategies that can mitigate the problem of quick-producing meeting slow-consuming.

## Patterns

Back-pressure is a feedback mechanism that allows systems to sense the burst job load and gracefully respond to caller.

Some common-seen strategies includes:

* Reject the job producing and cascade all the way up to user layer. The throttling algorithm can be `sample`, `throttle-last`, `throttle-first`, etc. 
* Automatically spawn other resources to distribute the load.
* Respond with `503 Service Unavailable` when Web / RESTful Service is under heavy load.

## Solutions

The system need to degrade itself when under heavy load. Back-pressure can help way from such case.

### Rx

Rx Observables are responsive objects listening on queue-alike data structures. They could be overwhelmed by other fast-producing Observables.

See more [Backpressure throttling algorithm](https://github.com/ReactiveX/RxJava/wiki/Backpressure) on how to fine-tune the parameters of Rx operators.

## Conclusions

Applying back-pressure is one effective technique to handle high-load. We tend to handle already accepted requests and transactions first, and reject those can't be handled. If you have many components and the producing-consuming speed might mismatch, consider back-pressure.

## References

* [Applying Back Pressure When Overloaded](https://dzone.com/articles/applying-back-pressure-when)
* [Reactive Manifesto](https://www.reactivemanifesto.org/glossary#Back-Pressure)
