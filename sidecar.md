---
title: Sidecar
permalink: /sidecar.html
date: 2018-11-25
category: Architecture
tags: cloud
---

# Sidecar

## Context

In engineering, we want our application well de-coupled. It usually means letting the right tool or component doing the right thing, and more importantly, do one thing and do it well. Almost every application needs to share some standard components, for example, logging, metrics collector, circuit breaker, etc. It's a challenge that how to manage these peripheral tasks if we don't want to implement them in every application.

## Overview

Sidecar is a term for a one-wheeled device attached to the side of a motorcycle. [1] In engineering, it signifies a deployment model that one or more separate processes or containers deployed along with the application.

![An NSU Moterenwerke 601 motorcycle from the 1930s fitted with a Steib Metallbau sidecar](/static/images/sidecar-motorcycle.jpg 'Sidecar')

[1]: https://en.wikipedia.org/wiki/Sidecar

## Solution

* Place peripheral tasks like logging, monitoring, proxy, circuit breaker inside a standalone process or container.
* The independent process or container co-locate with the supporting application.
* Provide a generic interface for sending data whatever the programming language of the app is.

In the container era, service mesh software such as Linkerd, Istio, are often deployed as sidecars.

### Kubernetes Logging Architecture

Kubernetes doesn't have a built-in centralized logging. The easiest way to implement a cluster-level logging is by using node logging agents installing as sidecars per node. In particular, the sidecar container runs a logging agent like `fluentd`, which is configured to pick up logs from an application container. Note that after picking up, the logging data are sent to a logging backend outside of the cluster.

![Sidecar container with a logging agent](/static/images/sidecar-logging-with-sidecar-agent.png)

## Patterns

### Independent Runtime

The sidecar has its heap and stack, and will not share its runtime with the application. The sidecar is attached to the app and communicate via IPC(inter-process communication).

The application can run without sidecar component, though it will partially downgrade.

### Same Lifecycle

The sidecar has the same lifecycle as the supporting application. Once the app is created or retired, so the sidecar is.

### Same Namespace

The sidecar and the application are running in the same namespace, meaning the sidecar can gauge the memory usage, CPU usage, and disk I/O usage of the application.

Since containers are running in Linux namespace, it's often deploying sidecar as a standalone container running in the same namespace as the application.

### Low Overhead

The sidecar is deployed per-host or per-pod. As a result, the network latency between the sidecar and the application is not much, which is in theory equal to the performance of any IPC communication.

Note that low overhead doesn't mean it brings no cost.

### Library v/s Sidecar

You can install and configure libraries to archive similar functions provided by sidecar. It means less integration work and overhead.

## Conclusions

By introducing sidecar, applications don't need to implement peripheral tasks again and again. It's an excellent way to simplify the implementation of the app, though it increases the complexity of operations.

## References

* [Sidecar](https://docs.microsoft.com/en-us/azure/architecture/patterns/sidecar)
