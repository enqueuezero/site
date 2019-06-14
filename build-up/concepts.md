---
title: Architectural Concepts
---

# Architectural Concepts





**Component.** A component encapsulates a piece of the system that serves as a building block when building the system. From a developer's perspective, components are programming language elements, such as classes, objects, modules, or a set of related functions. From an operator's perspective, components are nodes, processes, containers, services, etc.

Components are deployable, in the form of a library package or a binary executable.

Components are incomplete pieces. A single component is usually insufficient to run when lacking of other components in the system.

Components are composable. They are meant to interact with each other.

Components are contract-driven. Each component should have a well-defined interface in order to communicate.

**Node.** A node is a basic unit of a data structure, such as tree or linked list. A node contains some data and may link to other nodes. It's merely a concept in  a data structure; so its use depends on how we give it context.

Nodes are physical hosts, because hosts have program installed (data) and connected by wires (link).

Nodes are individual entities in a distributed system, because each entity have its own memory (data) and connected by sockets (link).

Components and nodes have differences. A component is an artifact. Anything that consists of the system is a component. While a node is just a concept. For example, in a Kubernetes system, a node is a data structure that represents worker machine that lives only in Kubernetes runtime. 

In short, componets are concrete, and nodes are conceptual. We usually use the term node under some context.

**Relationship.** A relationship refers to an association or acquaintance between two components. 

We use the term **dependence** describing the strong relationship that component A can't run without component B, for example, statement `import "moduleB"`in the source code of `moduleA` ; or `"dependencies": {"libraryB": "~=0.1.0"}` in the project metafile of `projectA`. 

**Host.** A host is a physical device that performs computation. It has various forms, such as an IoT device, network equipment, a smartphone, a laptop, a server box in a rack in a data center.

**Operating System.** The operating system (OS) is the low-level software that manages the hardware of the host and software sources. The OS kernel plays a vital role in scheduling processes and resources. The utilities provided by the OS distributions make the OS easy to use. Popular operating systems include Linux, Windows, macOS and BSD-family. 

**Process.** The process is a "living" program that is being executed. It has runtime memory that loads both the code of the program and the user data. The process runs on an OS and may be made up of several threads that execute instructions concurrently. A typical UNIX process is forked by another process, except the init process. Foreground process blocks the interactive shell from using until the task is done. Background process runs in the background, usually runs as a daemon and managed by process supervisor software such as systemd, supervisord, or runit.

**Container.** A container is a unit of software that has program and all its dependencies packaged.