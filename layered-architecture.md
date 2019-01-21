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

The layered architecture has several other names, such as [onion architecture], [the clean architecture], n-tier architecture, multi-layered architecture, multi-tier architecture, etc. It requires the components of the application organized layer by layer, in which only the upstream layer can make calls to the downstream layers.

## Concepts

### Layer

Layer, or plane, is a logical structuring of components that is deployed or organized in the same place.

Tier refers to a physical structuring of components, though people often interchange layer or tier in software architecture.

## Use

### MVC, or Model View Controller.

* model layer
* view layer
* controller layer

### OSI Model

* physical layer
* data link layer
* network layer
* transport layer
* session layer
* presentation layer
* application layer

### TCP/IP
* link layer
* internet layer
* transport layer
* application layer

### Operating Systems

* kernel layer
* user-space layer

### Uni-directional Dependency

In layered architecture, nothing in the downstream layer can make calls to the upstream layer. However, it's okay to make calls in the same layer or across multiple layers from upstream to downstream.

<mermaid>
graph TB
    l0[Layer 0]
    l1[Layer 1]
    lm[Layer ...]
    lN-1[Layer N-1]
    lN[Layer N]
    lN --> lN-1
    lN-1 --> lm
    lm --> l1
    l1 --> l0
</mermaid>

However, error propagation is a special case. If there is an error in an layer, then it should propagate it to the upstream. The upstream layer decides if it can handle the error. If so, then the error stops propagation to the upper layers, otherwise, the error keeps propagation to the top layer, usually something showing in the user interface.

<mermaid>
graph BT
    l0[Layer 0]
    l1[Layer 1]
    lm[Layer ...]
    lN-1[Layer N-1]
    lN[Layer N]
    l0 --error--> l1
    l1 --error--> lm
    lm --error--> lN-1
    lN-1 --error--> lN
</mermaid>


If a new feature comes in, and it's something that cannot fit into any existing layers, you can add a new layer into the big picture.


<mermaid>
graph TB
    l0[Layer 0]
    l1[Layer 1]
    lm[Layer ...]
    lNew[New Layer]
    lN-1[Layer N-1]
    lN[Layer N]
    lN --> lN-1
    lN --> lNew
    lNew --> lN-1
    lN-1 --> lm
    lm --> l1
    l1 --> l0
</mermaid>

In general, no name in the upper layer is allowed to appear in the lower layer, which includes variables, functions, classes, or even comment. Breaking such rule causes [leaky abstraction], meaning lower layer failed to hide details from the upper layer.

## Pros and Cons

* Pros
    * Separate of concern. We only need to consider a smaller scope in each layer, which makes the problem much more straightforward.
    * More testable. As a result, each layer has less case to test and thus more testable.
* Cons
    * Management cost if there are too many layers.
    * Leaky abstraction can disturb your layered intent.

## Conclusion

In layered architecture, a layer serves the layer above it and is served by the layer below it. [1] The data flow is simple and easy to trace by always making calls from top to bottom in a single direction. Such architecture leads to a clean and elegant design.

[1]: https://en.wikipedia.org/wiki/OSI_model
[onion architecture]: http://blog.thedigitalgroup.com/understanding-onion-architecture
[the clean architecture]: https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html
[leaky abstraction]: https://en.wikipedia.org/wiki/Leaky_abstraction

