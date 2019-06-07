---
title: Build Up! The Guide to Great Software Design
---

# Build Up! The Guide to Great Software Design

## Foreword

For decases, software engineers have written over millions of software as assaults on diffrent problems. Programming, as an intellectual activity, appears to solve at particular problems at hands and create workable software.  Unlike the Pyramid, or the Louvre, many software ended up with being discarded. Does it mean we have to see the whole point of programming as a move towards void? Fortunately, there are many guidelines that have been exploited to ease such anxiety. A software with beatiful design lives long and prosper. After several decases, people are still using some elegantly designed software, such as vi, awk, etc.

Let's see the fundamental subject matters of great software design; it involves us with three foci of phenomena: the hardware, the software, and the network. It reminds us it's also a metopher to ourself as human beings: the brain, the mind, and the collaboration. Every software is initiated from brains, hatched in the minds, and evolved through collaborations.  As humans acculamating experience and thought, the software grows its complexity as well. It happens for even those software being carefully handcrafted that only a portion of people can partially understand the software as a whole. The symbols evolves from variables to functions, to classes, to executables, to services, to APIs, to something we can only perceive but cannot fully understand.

Unlike painting or knitting, the will to make the software extensible brings many programmers many design issues. Should the software use "client / server" model, or is it enough to run on client solely? Should the software build from top-down or from bottom-up? What interface should the software provide, a command-line interface, am embedded library, an one-off process, a long-running daemon? You name it. A programmer can write good code, but he needs years to accumulate these knowledge to experience, still not even close to a great software design.

There is unfortunately no easy way to choose which technology to be adopted when writing software. However, there are certain patterns and techniques that can help designing software. Most engineers might have already applied these principles all the time, but they don't realize that this is what they're doing. After all, each single principle is not hard to understand. By explicitly *describing* and *analyzing* principles, we'll be more aware of skills and techniques we already possessed, and elimanate counter-principles that get in the way. 

No mather you are a rookie programmer or a vetteran architect, I hope the principles presented could shed a light on the problems you're dealing with, and possibly help you develop a good taste. In short, each principle tells you how to program in a way that is easy to follow and serves the purpose of designing and building great software. Among all of the design guidelines, people prefer those materials that are concrete and definitive when dealing with real-world challenges. In the next chapters, we will take a look at these useful principles and analyze how they're applied by real-world open-source software.

Now, let's give a glance on some randomly picked guidelines from latter chapters.

------

"*Make It Work; Make It Right; Make It Fast.*" This formulation of statement has existed for a very long time as part of the Unix Philosophy. "Make It Work" teaches us it doesn't mater what the form of the early implementation is, whater it's ugly or neat, as long as it works. "Make It Right" says the second step is to make the code more clear and fix for corner cases. Finally, "Make It Fast" says the performance of the program is of importance; of course, we only speed up where it is needed.

"*Let Autonomous Process React to Events.*" This principle describes an architectural pattern of using event-driven approach when building a large scaling system. Each process publishes an event when there is a significant change in state; the other processes can subscribe and react to these events, possibly publishing to a new event. Such a principle tends to yield a system that has loosely coupled software components and services. Some open-source software such as Kubernetes are in essence a massive set of autonomous processes running on nodes.

"*Server Process Is Not A Neccessity.*" This principle describes when opting for library design is just enough for some use cases. For example, ZeroMQ is a brokerless messaging queue library; SQLite is a serverless database library. Neither of the libraries require running a standalone server process. By embedding the library in the creation of a still great program, we remove the administrative overhead, reduce the network round-trips, and get ride of *single point of failure (SPOF)*.

------

It's impossible to list all principles in one place. A principle is only meaningful under certain circumstances, and there are infinite number of problem domains that we will have to tackle with. Without analytical inspecting, we'll end up of spending endless time learning all these techniques. Instead, we will discuss a tactic way called *analytical programming*, in which I will show you how to analyze any problem you are facing and find proper solutions for it.



Ju

Auckland, New Zealand

---

## Short Table of Contents



## Table of Contents

