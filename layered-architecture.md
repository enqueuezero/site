---
title: Layered Architecture
permalink: /layered-architecture.html
category: Architecture
tags: architecture, mvc, osi, tcp, os
date: 2018-09-10
---

# Layered Architecture

[[toc]]

## Overview

The layered architecture has several other names, such as [onion architecture], [the clean architecture], etc. The basic theory is, you organize the components layer by layer in which only the upstream layer can make calls to the downstream layers.

Most systems are designed in the layered architecture.

## Use

* MVC, model-view-controller, which I assume most website you see adopts this pattern.
    * model layer
    * view layer
    * controller layer
* OSI
    * physical layer
    * data link layer
    * network layer
    * transport layer
    * session layer
    * presentation layer
    * application layer
* TCP/IP
    * link layer
    * internet layer
    * transport layer
    * application layer
* OS
    * kernel layer
    * user-space layer

### Uni-directional Dependency

In layered architecture, nothing in the lower layer can make calls to the upper layer. However, cross-layer up-down calls or equivalent-layer calls are allowed.

More strictly, no name in the upper layer is allowed to appear in the lower layer, which includes variables, functions, classes, or even comment. However, error propagation is a special case.

Below are some examples of the directions of the calls.

![Uni-directional Examples](/static/images/layered-architecture-uni-directional.png)

Breaking such rule causes [leaky abstraction], meaning lower layer failed to hide details from the upper layer. 

## Advantage and Disadvantage

* Advantage
    * Separate of concern. We only need to consider a smaller scope in each layer, which makes the problem much more straightforward.
    * More testable. As a result, each layer has less case to test and thus more testable.
* Disadvantage
    * Bad separation can make the original problem more complicated.
    * Uni-directional from top to bottom sometimes needs you to make some workaround.
    * Leaky abstraction can disturb your layered intent.

## Conclusion

In layered architecture, a layer serves the layer above it and is served by the layer below it. [1] The data flow is simple and easy to trace by making call from top to bottom in a single direction. Such architecture leads to a clean and elegant design.

[1]: https://en.wikipedia.org/wiki/OSI_model
[onion architecture]: http://blog.thedigitalgroup.com/understanding-onion-architecture
[the clean architecture]: https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html
[leaky abstraction]: https://en.wikipedia.org/wiki/Leaky_abstraction

