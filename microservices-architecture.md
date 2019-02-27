---
title: Microservices Architecture
---

# Microservices Architecture

## Context

From end-user point of view, he doesn't know how the backend of the application runs.
It might be just a single server hosting the entire website in the very early stage,
or a dozen of servers in a data center, or more luckily, if the company survives long enough,
several large cluster running in different regions.

The application evolves all the time when delivering business capabilities. During the
transition, we might see the backend evolving from a monolithic application to a
collection of decoupled services, with mature pipelines, infrastructure, etc.

## Overview

Microservices architecture is an architectural style that structured applications as a set of loosely decoupled services. The advantage of microservices architecture is it enables large and complex application to continuously scale and evolve.

### Microservices v/s Monolithic

Microservices architecture yields to a style that application is comprised of a collection of loosely coupled services.
Monolithic architecture yields to a style that application is as a single deployable unit.

There is a debate on where the application should start from a monolithic style or microservices style, and there is no clear answer.
Some people argue that application should start from a single app and evolve itself into microservices as needed.
Some people think that every application can start from microservices architecture.

It is essential to know the pros and cons of microservices and monolithic.
The monolithic style is simple to develop, deploy. However, it'll quickly become a problem to over-use resources.
The microservices style yields to a collection of the most efficient, independent components and enables the continuous delivery and deployment of large, complex application. However, it increases complexity into the system.

## Solutions

[Please donate this project. It takes time and efforts writing these articles.](/)

## Conclusions

The microservices architecture is a well-proved architecture style by many companies.
It's very likely a single application might eventually evolve to considering we're in
cloud-era.
