---
title: Diagram, Components, and Connectors
---

# Diagram, Components, and Connectors

How do we describe the design of software? We implement the software by writing code, With hindsight, we can of course perceive the overall design by reading the code, configuration, document, and inspect the runtime data structures. But that takes a lot of efforts, and doesn't help at the early stage, especially no code is written yet.

Drawing a diagram is a very good solution. A **diagram** is a symbolic representation of the software using visualization techniques. This technique has been used since ancient time, and it's still the most powerful tool. Human beings are very good at reading information deduce patterns from images.

We tends to use some the most simplest elements to design software. For example, blocks and lines. Blocks can be in shape of sqaure, circle or eclipse, color-filled, etc. Lines can be solid, dashed, dotted, weighted, arrowed, curved, etc.

In the software design diagram, a block refers to a **component**, a building block of the software. A line refers to a **connector**, the conceptual connection between multiple components. Some description text are marked around the blocks and the lines.

A **component** encapsulates a piece of the system that serves as a building block when building the system. From a developer's perspective, components are programming language elements, such as classes, objects, modules, or a set of related functions. From an operator's perspective, components are nodes, processes, containers, services, etc.

Components are deployable, in the form of a library package or a binary executable.

Components are incomplete pieces. A single component is usually insufficient to run when lacking of other components in the system.

Components are composable. They are meant to interact with each other.

Components are contract-driven. Each component should have a well-defined interface in order to communicate.

A **connector** encapsulates the interactions and data exchange between components. From a developer's perspective, connectors can be declared as import statements, or sockets. From an operator's perspective, connectors are wires, gateways, proxies, etc.

*Local procedure call* (LPC) is a connector that connects all of the components coexist in the same address spaces. We expect the communication of LPC is very reliable and extremely fast. It never corrupts the  integrity of the data. Function calls (functional programming) and method calls (object-oriented programming) are typical LPC examples.

*Remote procedure call* (RPC) is a connector that connects components that lives in different processes in a tightly-coupled way. The RPC connector in nature yields to the client / server programming model; a client send a request to a server, and then the server send response back to the client. When using RPC, network latency and packet losses are very common challenges and thus adds many restrictions to the client and the server.

*Queue* is a connector that connects components that lives in different processes in a loosely-coupled way. The queue connector in nature yields to the publisher / consumer programming model; a publisher push a message to the queue, and then the consumer pull the message from the queue. It adds constrains to the design, such as pushing speed faster than pull spend, message loss, etc.

Connectors, like components, are first citizens in the software design. In a typical software system, we expect a larger number of connectors than components existed in a software.

We'll discuss components and connectors in the later chapters.