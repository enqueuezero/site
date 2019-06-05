---
title: Build Up! The Guide to Great Software Design
---

# Build Up! The Guide to Great Software Design

For decases, software engineers have written over billions lines of code in different projects. There are many guidelines that have been exploited when writing these software. Among all of them, people love the most elegant and the easiest to follow when dealing with real-world challenges.

Most engineers might have already applied principles proposed all the time, but they don't realize that this is what they're doing. By explicitly describing and analyzing principles, we'll be more aware of skills and techniques we already possessed, and elimanate counter-principles that get in the way. 

This is rather a handbook of advises than a collection of nonsenses. No mather you are a rookie programmer or a vetteran architect, I hope the advices presented could shed a light on the problems you're dealing with. In short, each principle tells you how to program in a way that is easy to follow and serves the purpose of designing and building great software.

Now, let's give a glance on some randomly picked guidelines from latter chapters.

---

"*Make It Work; Make It Right; Make It Fast.*" This formulation of statement has existed for a very long time as part of the Unix Philosophy. "Make It Work" teaches us it doesn't mater what the form of the early implementation is, whater it's ugly or neat, as long as it works. "Make It Right" says the second step is to make the code more clear and fix corner cases. Finally, "Make It Fast" says the performance of the program is important; of course, only speed up where it is needed.

"*Let Autonomous Process React to Events.*" This principle describes an architectural pattern of using event-driven approach when building a large scale system. Each process publishes an event when there is a significant change in state; the other processes can subscribe and react to these events, possibly publishing to a new event. Such a principle tends to yield a system that has loosely coupled software components and services. Some open-source software such as Kubernetes are in essence a massive set of autonomous processes running on nodes.

"*Server Process Is Not A Neccessity.*" This principle describes when opting for library design is just enough for some use cases. For example, ZeroMQ is a brokerless messaging queue library; SQLite is a serverless database library. Neither of the library requires running a standalone server process. By embedding the library, the application removes the administrative overhead, reduces the network round-trips, and gets ride of *single point of failure (SPOF)*.

---

There is unfortunately no easy way to choose which technology to be adopted when writing software. However, there are certain patterns and techniques that can help designing software.  In the next chapters, we will take a look at these useful principles and analyze how they're applied by real-world open-source software.