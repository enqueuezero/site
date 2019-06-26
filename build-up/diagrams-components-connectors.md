---
title: Diagram, Components, and Connectors
---

# Diagrams, Components, and Connectors

How do we represent the software design? With hindsight, we can, of course, perceive the overall design by reading the code, configuration, document, and inspect the runtime data structures after code is written. But that takes a lot of efforts and doesn't help at the early stage.

Drawing a diagram is a solution. A *diagram* is a symbolic representation of the software using visualization techniques. Human beings are very good at discovering information from images.

We tend to design the software by using simple graphical elements — for example, blocks and lines. Blocks can be in shape of a square, a circle or a eclipse, color-filled, etc. Lines can be dashed, dotted, weighted, arrowed, curved, etc. *UML* is a popular tool that represents the system in different views.

In the software design diagram, a block represents to a component, a building block of the software that serves for computation. A line represents a connector, the conceptual connection between multiple components for transfering data. Some text are around the blocks and the lines for giving a supplement description.

A *component* encapsulates a piece of the system that serves as a building block for the system. From a developer's perspective, components are programming language elements, such as classes, objects, modules, or a set of related functions. From an operator's perspective, components are nodes, processes, containers, services, etc.

When we speak of component, we often mix using component types and component instances. The component types are defined in the code, while the component instances run in the runtime.

A *connector* encapsulates the interactions and data exchange between components. From a developer's perspective, connectors can be declared as import statements or sockets. From an operator's perspective, connectors are wires, gateways, proxies, or even a collection of components that serves as a data exchanging channel etc.

Connectors, like components, are first citizens in the software design. It can have internal components if needed and thus simplies the design of the system. Without connectors, there will be too much components in one diagram.

---

**Case Study: Architecture of SQLite.** Let's take SQLite's architecture diagram as an example. The below diagram shows the main components of SQLite and how they interoperate.

![SQLite architecture](https://www.sqlite.org/images/arch2.gif)

SQLite (v3) consists of eleven components grouping in four categories: Core, SQL compiler, Backend, and Accessories. All these components are described as shadowed blocks, and the categories are described as color-filled blocks.

The arrowed connectors marks how data flows from one component to the next. It starts from *Interface* and ends at *OS Interface*. The in and out connectors between *Core* and *SQL Compilers* provides a zoom-in view on *SQL Command Processor*. The missing connectors on *Accessories* and the other components are intentionally removed to reduce distraction from reading the main data flow, which is a very common used trick.

In short, this diagram is a neat modeling of the design of SQLite. We only discussed how to describe the software design by drawing diagram here. If you'd like to know more about the architecture of SQLite, don't miss the document <https://www.sqlite.org/arch.html>. It attaches one to three short paragraphs describing each component.