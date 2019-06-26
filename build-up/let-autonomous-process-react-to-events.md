---
title: Let Autonomous Process React to Events
---

# Let Autonomous Process React to Events

This principle describes an architectural pattern of using event-driven approach when building a large scaling system. Each process publishes an event when there is a significant change in state; the other processes can subscribe and react to these events, possibly publishing to a new event. Such a principle tends to yield a system that has loosely coupled software components and services. Some open-source software such as Kubernetes are in essence a massive set of autonomous processes running on nodes.