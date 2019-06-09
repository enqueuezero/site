---
title: Build Up! The Guide to Great Software Design
---

# Build Up! The Guide to Great Software Design

## Introduction

For decases, software engineers have written over millions of software as assaults on diffrent problems. Programming, as an intellectual activity, appears to solve at particular problems at hands and create workable software.  Unlike the buildings made by concrete, many software end up with being discarded. Does it mean we have to see the whole point of programming as a move towards void? Fortunately, there are many guidelines that have been exploited to ease such anxiety. A software with a beatiful design lives long and prosper. After several decases, people are still using some elegantly designed software, such as vi, awk, etc.

The software is initiated from a spark, hatched in the mind and implemented by adding code line by line. As humans acculamating experience and thought, the software grows its complexity. Some software could have a billion lines of code. Even for those software being carefully handcrafted, the symbols will evolve from variables to functions, to classes, to executables, to services, to APIs, until to something we can only perceive but cannot fully understand. How should the software be less complicated since the first line of code? Should the software use "client / server" model, or is it enough to run on client solely? Should the software build from top-down or from bottom-up? What interface should the software provide, a command-line interface, am embedded library, an one-off process, a long-running daemon? You name it. A programmer can write good code, but he needs years to accumulate these knowledge to experience, still not even close to a great software design.

There is unfortunately no easy way to choose which technology and model can simplify the software. However, there are certain patterns and techniques that can help controlling the complexity. Most engineers might have already applied these principles all the time, but they don't realize that this is what they're doing. After all, each single principle is not hard to understand. By explicitly *describing* and *analyzing* principles, we'll be more aware of skills and techniques we already possessed, and elimanate counter-principles that get in the way. 

In the next chapters, we will take a look at these useful principles and analyze how they're applied by real-world open-source software. In short, each principle tells you how to program in a way that is easy to follow and serves the purpose of designing and building great software. Among all of the design guidelines, people prefer those materials that are concrete and definitive when dealing with real-world challenges. Now, let's give a glance on some randomly picked guidelines from latter chapters.

------

"*Make It Work; Make It Right; Make It Fast.*" This formulation of statement has existed for a very long time as part of the Unix Philosophy. "Make It Work" teaches us it doesn't mater what the form of the early implementation is, whater it's ugly or neat, as long as it works. "Make It Right" says the second step is to make the code more clear and fix for corner cases. Finally, "Make It Fast" says the performance of the program is of importance; of course, we only speed up where it is needed.

"*Let Autonomous Process React to Events.*" This principle describes an architectural pattern of using event-driven approach when building a large scaling system. Each process publishes an event when there is a significant change in state; the other processes can subscribe and react to these events, possibly publishing to a new event. Such a principle tends to yield a system that has loosely coupled software components and services. Some open-source software such as Kubernetes are in essence a massive set of autonomous processes running on nodes.

"*Server Is Not A Neccessity.*" This principle describes when opting for library design is just enough for some use cases. For example, ZeroMQ is a brokerless messaging queue library; SQLite is a serverless database library. Neither of the libraries require running a standalone server process. By embedding the library in the creation of a still great program, we remove the administrative overhead, reduce the network round-trips, and get ride of *single point of failure (SPOF)*.

------

It's impossible to list all principles in one place. A principle is only meaningful under certain circumstances, and there are infinite number of problem domains that we will have to tackle with. Without analytical inspecting, we'll end up of spending endless time learning all these techniques. Instead, we will discuss a tactic way called *analytical programming*, in which I will show you how to analyze any problem you are facing and find proper solutions for it.

No mather you are a rookie programmer or a vetteran architect, I hope the principles presented could shed a light on the problems you're dealing with, and possibly help you develop a good taste.

---

## Table Of Content

* [Server is not a neccessity](server-is-not-a-neccessity.md)

