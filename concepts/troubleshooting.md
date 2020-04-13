---
title: Troubleshooting
---

# Troubleshooting

## Context

A system might run as a complex graph structure. Any error or failure could happen to each node and edge in this graph, that is server host, services, process, networking, load balancer, proxy, and so on. We need a methodology that can find and address issues quickly so the system can recover to a healthy state.

## Overview

Troubleshooting is the process that converts a series of symptoms into a series of doable effective actions and eventually eliminates symptoms. The faster the troubleshooting process is, the less money you lose.

That brings us one question, how to find and fix the problem most effectively. The most intuitive way is to measure and observe the system and compare the behavior to a table of normal states. Though it’s essential to understand that the system is supposed to accomplish a business perspective, not you’ve measured. Sometimes, false positive information could lead you in the wrong direction.


## Step 1. Understand the System

Many people tend to dive into an issue without having a big picture in mind. To boost the troubleshooting process, you need to understand the system. It leads to a series to How-like questions: how does the system work? How do the internal components connecting and communicating?

It is common the system is comprised of many internal components. The system runs as a high-quality product through all parts running well and interacting as usual. As a result, we need to define the components first. Since the system can yield to different sets of components from multiple perspectives, we narrow it down to the below categories: equipment, runtime, service, networking.

We also need to define the connections between components, especially the direction of data flow. For example, below is the definition of a typical data-intensive application.

![data intensive application](/static/images/data-intensive-app.png)

## Step 2. Define the Normal State

Before troubleshooting, you also need to know the baseline of the system comparing to when the issue happens. The best way to get the normal state is to keep asking what-like questions: what is the normal path? What is the normal load? What is the normal configuration? What is the typical reaction to designated events? The output of the definition of the normal state can be a document called playbook. In playbook, you can find a list of actions to take when the system is in an abnormal state.

## Gray Failure

A gray failure is when the system falls into an abnormal state due to an unknown issue.  By taking actions in the playbook is not enough to mitigate the issue. Instead, we need to collect as much metrics as possible, analyze the symptom and compare with the normal states. Once the root cause is spotted, the playbook should also be updated.

## Fix

There are two kinds of fixes when troubleshooting, temporary fix and permanent fix.  A temporary fix is usually about to check in a configuration-level change or revert code changes, which takes very little time and is effective to mitigate or eliminate the issue while a permanent fix is to through design or structural replacement to prevent the problem from happening again in the future.

## Conclusions

Troubleshooting is an essential process when operating a system. By understanding the system and knowing the normal state of the system, we can troubleshoot it quickly. When something unexpected happens, it's better to update the document and procedure and perform a permanent fix so the issue won't happen again.
