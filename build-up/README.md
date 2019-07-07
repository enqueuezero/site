---
title: Build Up! The Guide to Great Software Design
---

# Build Up! The Guide to Great Software Design

## Introduction

For decades, software engineers have written over millions of software as assaults on diffrent problems. Programming, as an intellectual activity, appears to solve particular problems at hands and creates workable software.  Unlike the buildings made by concrete, many software end up with being discarded quickly. Does it mean we have to see the whole point of programming as a move towards void? Fortunately, there are many guidelines that have been exploited to ease such anxiety. A software with a beatiful design lives long and prosper. After several decases, people are still contributing codes to some elegantly designed software, such as vi, nginx, etc.

The software is initiated from a spark, hatched in the mind and implemented by adding code. As humans acculamating experience and thoughts, the software grows its complexity. Some software could have billions lines of code. Even for the software being carefully handcrafted, the symbols will evolve from some simple variables to something we can only perceive but cannot fully understand. How should the software be less complicated during the feature enrichment? How to handle a large volume of traffic and still capable of operating in a 24x7 time manner? How to handle a large volume of data storage and still capable of performing computation fast? Should the software build from top-down or from bottom-up? What interfaces should the software provide, a command-line interface, am embedded library, an one-off process, or a long-running daemon? How to develop the software with less pain in the ass? How to operation a system with less cost? How to release new features quickly to meet the demands of the market? How to retrofit applications to more and more computation environments, such as PaaS, serverless, Kubernetes, etc.

There is unfortunately no easy way to choose which technology and models can simplify the software. However, there are certain patterns and techniques that can help controlling the complexity. Most engineers might have already applied these principles all the time, but they don't realize that this is what they're doing. After all, each single principle is not hard to understand. By explicitly *describing* and *analyzing* principles, we'll be more aware of skills and techniques we already possessed, and elimanate counter-principles that get in the way. 

**Part I.** In the following chapters, we will take a look at these useful principles and analyze how they're applied by the real-world open-source software. In short, each principle tells you how to program in a way that is easy to follow and serves the purpose of designing and building great software. Among all of the design guidelines, people prefer those materials that are concrete and definitive when dealing with real-world challenges. 

**Part II.** A principle is only meaningful under certain circumstances, but there are infinite number of problem domains that we will have to tackle with. Without analytical inspecting, we'll end up of spending endless time learning all these techniques. Instead, we will develop a tactic way called *analytical programming*, in which we'll walk through some useful skills that can be used to analyze any problems you might face and yield to some proper solutions.

**Who should read this book?** The audiences include software engineers, software architects, and technical managers. If you need to contribute code and make decisions about the software you work on, then this book is for you. In particular, this book has a bias toward designing server (or backend) applications that is intended for performing computations and manipulating data. No matter you are a rookie programmer or a vetteran architect, I hope the principles presented could shed a light on the problems you're dealing with, and possibly help you develop a good taste.

---

## Table Of Content

### Overview

* [So, What is Design?](what-is-design.md)
* [Diagrams, Components, and Connectors](diagrams-components-connectors.md)
* [Useful Connectors](useful-connectors.md)
* [Useful Components](useful-components.md)
* [The Role of A Designer](the-role-of-a-designer.md)

### Message Queues

* [Message Queue Basics](message-queue-basics.md)
* [Message Queue Solutions](message-queue-solutions.md)
* [Message Queue Use Case](message-queue-use-case.md)
* [Task Queues](task-queues.md)

### Principles

* [Server is not a neccessity](server-is-not-a-neccessity.md)
* [Let Autonomous Process React to Events](let-autonomous-process-react-to-events.md)
* [Make It Work; Make It Right; Make It Fast](make-it-work-make-it-right-make-it-fast.md)
* [Protocol Upgrade](protocol-upgrade.md)
