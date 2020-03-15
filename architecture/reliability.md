---
title: Reliability
permalink: /architecture/reliability.html
---

# Reliability

## Context

Users expect the service providing reliable functions. In general, it means:

* The service behaves as designed or as it always is.
* Submitting wrong data won't make the application crash.
* The service works well under normal loads.
* The service responds users' requests quickly.

## Overview

Reliability defines if the system continuous to work correctly.

The [availability](/availability.html) concerns the uptime and latency, while reliability concerns the correctness and integrity of the system behaviors.

To provide a reliable service, the system should be fault-tolerant, or resilient.

## Patterns

### Fault

Fault is when the system goes wrong. The fault-tolerant, or resilient, means a system can cope with these faults in certain cases.

Here, we highlight "in certain cases" because even the most resilient system can't defend itself from any faults. For example, if a big earthquake causes the entire Internet broken, how does the service suppose to work as expected? Usually we define below cases as faults:

* Hardware faults. The server host is malfunctioning, possibly due to memory blips, disk failure, high/low temperature, loss of power, wire not connected, etc.
* Cluster faults. The data center is in outage, possibly due to thunder strikes, too many snows on roof, regional grid outage, etc.
* OS faults. The server is hanging, possibly due to 100% CPU occupied, out of memory, etc.
* Application faults. The service is hanging, possibly due to a dead loop, unexpected high loads, etc.
* Human Errors. Human makes errors often, and in fact, makes more faults than others.

### Failure

[Please donate this project. It takes time and efforts writing these articles.](/)

## Conclusions

Providing a reliable service requires not to just do everything that keeps system available, but also introducing more thorough validations and reviews. A lot of engineering practises makes the service more reliable, for example, code review, continuous integration, security review, health checking, alerting, etc. By leveraging the monitoring & alerting system, we can reduce the time that system is deviated from spec. If necessary, degrade the surrounding features and let the service process only critical business logics.
