---
title: Build Up! The Guide to Great Software Design
---

# Build Up! The Guide to Great Software Design

For decases, software engineers have written over billions lines of code as assaults on diffrent problems. Unlike the Pyramid, or the Louvre, most code ended up with being discarded. Does it mean we have to see the whole point of programming as a move towards void? Fortunately, there are many guidelines that have been exploited to ease such anxiety. A software with beatiful design lives long and prosper. After several decases, people are still using some elegantly designed tools, such as vi, awk, etc. Among all of the design guidelines, people prefer those materials that are concrete and definitive when dealing with real-world challenges.

This is rather a handbook of advises than a collection of nonsenses. No mather you are a rookie programmer or a vetteran architect, I hope the advices presented could shed a light on the problems you're dealing with, and possibly help you develop a good taste. In short, each principle tells you how to program in a way that is easy to follow and serves the purpose of designing and building great software.

Most engineers might have already applied these principles all the time, but they don't realize that this is what they're doing. By explicitly describing and analyzing principles, we'll be more aware of skills and techniques we already possessed, and elimanate counter-principles that get in the way. 

There is unfortunately no easy way to choose which technology to be adopted when writing software. However, there are certain patterns and techniques that can help designing software.  In the next chapters, we will take a look at these useful principles and analyze how they're applied by real-world open-source software.

Now, let's give a glance on some randomly picked guidelines from latter chapters.

------

"*Make It Work; Make It Right; Make It Fast.*" This formulation of statement has existed for a very long time as part of the Unix Philosophy. "Make It Work" teaches us it doesn't mater what the form of the early implementation is, whater it's ugly or neat, as long as it works. "Make It Right" says the second step is to make the code more clear and fix for corner cases. Finally, "Make It Fast" says the performance of the program is of importance; of course, we only speed up where it is needed.

"*Let Autonomous Process React to Events.*" This principle describes an architectural pattern of using event-driven approach when building a large scaling system. Each process publishes an event when there is a significant change in state; the other processes can subscribe and react to these events, possibly publishing to a new event. Such a principle tends to yield a system that has loosely coupled software components and services. Some open-source software such as Kubernetes are in essence a massive set of autonomous processes running on nodes.

"*Server Process Is Not A Neccessity.*" This principle describes when opting for library design is just enough for some use cases. For example, ZeroMQ is a brokerless messaging queue library; SQLite is a serverless database library. Neither of the library requires running a standalone server process. By embedding the library, the application removes the administrative overhead, reduces the network round-trips, and gets ride of *single point of failure (SPOF)*.

------

It's impossible to list all principles at one place. A principle is only meaningful under certain circumstances, and there are infinite number of problem domains that we will have to tackle with. Without analytical inspecting, we'll end up of brute forcing whatever principles we have in our pocket, and eventually make not-so-good software design. We will discuss a tactic way called analytical programming, in which I will show you how to analyze any problem you are facing and find proper solutions for it.

