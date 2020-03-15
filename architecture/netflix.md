---
title: The Architecture of Netflix
permalink: /architecture/netflix.html
category: Architecture
tags: architecture
date: 2018-10-08
status: draft
---


Netflix is a website playing online videos. As a website, it needs dealing with many challenges, for example,

* Serve a massive amount of video concurrent playing with low latency.
* Make the service highly available across 200+ countries.

In this post, we will discover the architecture of Netflix.

## Overview

## Cloud Computing

Netflix originally built two data centers but gave up vesting since when cloud computing emerged.  But after a three-day downtime, Netflix decided to migrate to cloud because cloud provides reliable infrastructure.

### Resources

Netflix uses EC2, DynamoDB, Cassandra, and S3 a lot.

* Netflix runs all of its services on EC2 instances.
* Netflix distributes relational data in DynamoDB and Cassandra, including accounts, billings, and all non-blob data.
* Netflix stores static resources like videos in S3 storage.

### Evacuation

Netflix services run on three regions, including North Virginia, Portland Oregon, and Dublin Ireland. It can fully evacuate to another regions when one region is down. In each region, there are three availability zones.

## Edge Routing

## Open Connect and CDN

## Microservices

## Video Transcoding

Netflix transforms each video into thousands of files. Each file is an optimization of original video based on below factors:

* Audio Formats.
* Resolutions.
* Devices.
* Subtitles.

For example, if you're watching a video on iPhone in 3G mode, then you'll see a video that fits the case the best.

The video transcoding works under a long pipeline. Below is a high level diagram.

<!-- <img src='https://g.gravizo.com/svg?
digraph G {
    Source_Video [shape=box];
    Chunk_1 [shape=box];
    Chunk_2 [shape=box];
    Chunk_N [shape=box];
    Chunk_1_fmt_1 [shape=box];
    Chunk_1_fmt_2 [shape=box];
    Chunk_1_fmt_N [shape=box];
    Chunk_2_fmt_1 [shape=box];
    Chunk_2_fmt_2 [shape=box];
    Chunk_2_fmt_N [shape=box];
    Chunk_N_fmt_1 [shape=box];
    Chunk_N_fmt_2 [shape=box];
    Chunk_N_fmt_N [shape=box];
    fmt_1 [shape=box];
    fmt_2 [shape=box];
    fmt_N [shape=box];
    file_1 [shape=box];
    file_2 [shape=box];
    file_N [shape=box];
    Source_Video -> Chunk_1 [label=split];
    Source_Video -> Chunk_2 [label=split];
    Source_Video -> Chunk_N [label=split];
    Chunk_1 -> Chunk_1_fmt_1 [label=encode];
    Chunk_1 -> Chunk_1_fmt_2 [label=encode];
    Chunk_1 -> Chunk_1_fmt_N [label=encode];
    Chunk_2 -> Chunk_2_fmt_1 [label=encode];
    Chunk_2 -> Chunk_2_fmt_2 [label=encode];
    Chunk_2 -> Chunk_2_fmt_N [label=encode];
    Chunk_N -> Chunk_N_fmt_1 [label=encode];
    Chunk_N -> Chunk_N_fmt_2 [label=encode];
    Chunk_N -> Chunk_N_fmt_N [label=encode];
    Chunk_1_fmt_1 -> fmt_1 [label=merge,color=".7 .3 1.0"];
    Chunk_2_fmt_1 -> fmt_1 [label=merge,color=".7 .3 1.0"];
    Chunk_N_fmt_1 -> fmt_1 [label=merge,color=".7 .3 1.0"];
    Chunk_1_fmt_2 -> fmt_2 [label=merge,color=".4 .7 1.0"];
    Chunk_2_fmt_2 -> fmt_2 [label=merge,color=".4 .7 1.0"];
    Chunk_N_fmt_2 -> fmt_2 [label=merge,color=".4 .7 1.0"];
    Chunk_1_fmt_N -> fmt_N [label=merge,color=".8 .5 1.0"];
    Chunk_2_fmt_N -> fmt_N [label=merge,color=".8 .5 1.0"];
    Chunk_N_fmt_N -> fmt_N [label=merge,color=".8 .5 1.0"];
    fmt_1 -> file_1 [label=validate,color=".7 .3 1.0"];
    fmt_2 -> file_2 [label=validate,color=".4 .7 1.0"];
    fmt_N -> file_N [label=validate,color=".8 .5 1.0"];
}'/> -->

## Infrastructure

## Chaos Automation Engineering

## Canary Automation Deployment

## Artworks

## Recommendation

## Lesson Learnt

## References

* [Netflix: What Happens When You Press Play?](http://highscalability.com/blog/2017/12/11/netflix-what-happens-when-you-press-play.html)
* [Rethinking Netflix’s Edge Load Balancing](https://medium.com/netflix-techblog/netflix-edge-load-balancing-695308b5548c)
* [Netflix’s Production Technology = Voltron](https://medium.com/netflix-techblog/netflixs-production-technology-voltron-ab0e091d232d)
* [Streaming Video Experimentation at Netflix: Visualizing Practical and Statistical Significance](https://medium.com/netflix-techblog/streaming-video-experimentation-at-netflix-visualizing-practical-and-statistical-significance-7117420f4e9a)
* [Keystone Real-time Stream Processing Platform](https://medium.com/netflix-techblog/keystone-real-time-stream-processing-platform-a3ee651812a)
* [Part 2: Scheduling Notebooks at Netflix](https://medium.com/netflix-techblog/scheduling-notebooks-348e6c14cfd6)
* [Evolution of Application Data Caching : From RAM to SSD](https://medium.com/netflix-techblog/evolution-of-application-data-caching-from-ram-to-ssd-a33d6fa7a690)
* [Auto Scaling Production Services on Titus](https://medium.com/netflix-techblog/auto-scaling-production-services-on-titus-1f3cd49f5cd7)
* [Titus, the Netflix container management platform, is now open source](https://medium.com/netflix-techblog/titus-the-netflix-container-management-platform-is-now-open-source-f868c9fb5436)
* [The End of Video Coding?](https://medium.com/netflix-techblog/the-end-of-video-coding-40cf10e711a2)
* [Lessons from Building Observability Tools at Netflix](https://medium.com/netflix-techblog/lessons-from-building-observability-tools-at-netflix-7cfafed6ab17)
* [Open Sourcing Zuul 2](https://medium.com/netflix-techblog/open-sourcing-zuul-2-82ea476cb2b3)
* [Full Cycle Developers at Netflix — Operate What You Build](https://medium.com/netflix-techblog/full-cycle-developers-at-netflix-a08c31f83249)
* [Automated Canary Analysis at Netflix with Kayenta](https://medium.com/netflix-techblog/automated-canary-analysis-at-netflix-with-kayenta-3260bc7acc69)
* [Using Machine Learning to Improve Streaming Quality at Netflix](https://medium.com/netflix-techblog/using-machine-learning-to-improve-streaming-quality-at-netflix-9651263ef09f)
* [Project Nimble: Region Evacuation Reimagined](https://medium.com/netflix-techblog/project-nimble-region-evacuation-reimagined-d0d0568254d4)
* [Distributing Content to Open Connect](https://medium.com/netflix-techblog/distributing-content-to-open-connect-3e3e391d4dc9)
* [Serving 100 Gbps from an Open Connect Appliance](https://medium.com/netflix-techblog/serving-100-gbps-from-an-open-connect-appliance-cdb51dda3b99)
* [Scaling Event Sourcing for Netflix Downloads, Episode 2](https://medium.com/netflix-techblog/scaling-event-sourcing-for-netflix-downloads-episode-2-ce1b54d46eec)
* [Scaling Event Sourcing for Netflix Downloads, Episode 1](https://medium.com/netflix-techblog/scaling-event-sourcing-for-netflix-downloads-episode-1-6bc1595c5595)
* [Starting the Avalanche: Application DDoS In Microservice Architectures](https://medium.com/netflix-techblog/starting-the-avalanche-640e69b14a06)
* [ChAP: Chaos Automation Platform](https://medium.com/netflix-techblog/chap-chaos-automation-platform-53e6d528371f)
* [Developer Experience Lessons Operating a Serverless-like Platform At Netflix](https://medium.com/netflix-techblog/developer-experience-lessons-operating-a-serverless-like-platform-at-netflix-a8bbd5b899a0)
* [Evolving the Netflix Data Platform with Genie 3](https://medium.com/netflix-techblog/evolving-the-netflix-data-platform-with-genie-3-598021604dda)
* [Simone - A Distributed Simulation Service](https://medium.com/netflix-techblog/https-medium-com-netflix-techblog-simone-a-distributed-simulation-service-b2c85131ca1b)
* [Spinnaker Orchestration](https://medium.com/netflix-techblog/spinnaker-orchestration-19e7f7b88d33)
* [Global Continuous Delivery with Spinnaker](https://medium.com/netflix-techblog/global-continuous-delivery-with-spinnaker-2a6896c23ba7)
* [Automation as a Service — Introducing Scriptflask](https://medium.com/netflix-techblog/automation-as-a-service-introducing-scriptflask-17a8e4ad954b)
* [The Evolution of Container Usage at Netflix](https://medium.com/netflix-techblog/the-evolution-of-container-usage-at-netflix-3abfc096781b)
* [Netflix Security Monkey on Google Cloud Platform](https://medium.com/netflix-techblog/netflix-security-monkey-on-google-cloud-platform-gcp-f221604c0cc7)
* [Netflix Downloads on Android](https://medium.com/netflix-techblog/netflix-downloads-on-android-d79db40f1732)
* [Introducing HubCommander](https://medium.com/netflix-techblog/introducing-hubcommander-1774d8f08fc6)
* [Netflix Conductor: A microservices orchestrator](https://medium.com/netflix-techblog/netflix-conductor-a-microservices-orchestrator-2e8d4771bf40)
* [Distributed delay queues based on Dynomite](https://medium.com/netflix-techblog/distributed-delay-queues-based-on-dynomite-6b31eca37fbc)
* [Zuul 2 : The Netflix Journey to Asynchronous, Non-Blocking Systems](https://medium.com/netflix-techblog/zuul-2-the-netflix-journey-to-asynchronous-non-blocking-systems-45947377fb5c)
* [Engineering Trade-Offs and The Netflix API Re-Architecture](https://medium.com/netflix-techblog/engineering-trade-offs-and-the-netflix-api-re-architecture-64f122b277dd)
* [Netflix and Fill](https://medium.com/netflix-techblog/netflix-and-fill-c43a32b490c0)
* [Automated testing on devices](https://medium.com/netflix-techblog/automated-testing-on-devices-fc5a39f47e24)
* [Protecting Netflix Viewing Privacy at Scale](https://medium.com/netflix-techblog/protecting-netflix-viewing-privacy-at-scale-39c675d88f45)
* [Introducing Winston — Event driven Diagnostic and Remediation Platform](https://medium.com/netflix-techblog/introducing-winston-event-driven-diagnostic-and-remediation-platform-46ce39aa81cc)
* [Introducing Atlas: Netflix’s Primary Telemetry Platform](https://medium.com/netflix-techblog/introducing-atlas-netflixs-primary-telemetry-platform-bd31f4d8ed9a)
* [Chelsea: Encoding in the Fast Lane](https://medium.com/netflix-techblog/chelsea-encoding-in-the-fast-lane-5c0e7064053a)
* [Meson: Workflow Orchestration for Netflix Recommendations](https://medium.com/netflix-techblog/meson-workflow-orchestration-for-netflix-recommendations-fc932625c1d9)
* [Global Cloud — Active-Active and Beyond](https://medium.com/netflix-techblog/global-cloud-active-active-and-beyond-a0fdfa2c3a45)
* [How We Build Code at Netflix](https://medium.com/netflix-techblog/how-we-build-code-at-netflix-c5d9bd727f15)
* [Evolution of the Netflix Data Pipeline](https://medium.com/netflix-techblog/evolution-of-the-netflix-data-pipeline-da246ca36905)
* [High Quality Video Encoding at Scale](https://medium.com/netflix-techblog/high-quality-video-encoding-at-scale-d159db052746)
* [From Chaos to Control ](https://medium.com/netflix-techblog/from-chaos-to-control-testing-the-resiliency-of-netflixs-content-discovery-platform-ce5566aef0a4)
* [Making Netflix.com Faster](https://medium.com/netflix-techblog/making-netflix-com-faster-f95d15f2e972)
* [Netflix’s Viewing Data](https://medium.com/netflix-techblog/netflixs-viewing-data-how-we-know-where-you-are-in-house-of-cards-608dd61077da)
* [Introducing Dynomite — Making Non-Distributed Databases, Distributed](https://medium.com/netflix-techblog/introducing-dynomite-making-non-distributed-databases-distributed-c7bce3d89404)
* [Introducing Raigad — An Elasticsearch Sidecar](https://medium.com/netflix-techblog/introducing-raigad-an-elasticsearch-sidecar-350c7e01339f)
* [A 360 Degree View Of The Entire Netflix Stack](http://highscalability.com/blog/2015/11/9/a-360-degree-view-of-the-entire-netflix-stack.html)
* [How Netflix works: the (hugely simplified) complex stuff that happens every time you hit Play
](https://medium.com/refraction-tech-everything/how-netflix-works-the-hugely-simplified-complex-stuff-that-happens-every-time-you-hit-play-3a40c9be254b)
* [Adopting Microservices at Netflix: Lessons for Architectural Design](https://www.nginx.com/blog/microservices-at-netflix-architectural-best-practices/)
