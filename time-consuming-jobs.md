---
title: Time-consuming Jobs
permalink: /time-consuming-jobs.html
category: Architecture
tags: job
date: 2018-06-07
---

# Time-consuming Jobs

[[toc]]

## Context

A reactive system needs to respond quickly, maybe in less than 500 ms or 1 second.

However, it's inevitable that some jobs need to run for long, maybe even in a few hours.

It's impossible to achieve both goals without changing the execution model, to keep the system responsive all the time and to complete the time-consuming jobs.

## Solutions

There are at least three solutions: slicing jobs, pre-executing jobs, post-executing jobs.

### Slicing Jobs

Slice the job into chunks of small work.

For example, deleting all user comments might take a while, but the client can keep calling `get_user_comments` and `delete_user_comment` until no more comments. Each one of the jobs should now be responsive.

* Advantages
    * No need to modify anything on the backend.
* Disadvantages
    * Limited use case. For example, we can't slice a transaction.
    * Client side needs to split the tasks and aggregate results.
    * Increase system load.

### Pre-executing Jobs

Execute jobs ahead of when it needs and store job results in the database first.

For example, a ticket-selling website, instead of requesting tickets from the upstream supplier every time, might want to obtain some movie tickets before selling. The actual selling ticket is merely to associate user id to the ticket.

* Advantages
    * Little modification on the backend. It could be a script running every hour.
* Disadvantages
    * Limited use case.
    * Inefficient. It requires extra storage cost and some task results maybe over-generated.

### Post-executing Jobs

Respond job reference immediately and run the job in the background. When necessary, inquiry the job status and result by job reference, or more proactively, send job result back to the requester.

For example, after user registering an account, the system kicks off a confirmation email job and display "Please wait for a few minutes and check your confirmation email" on the page. The user can check their email inbox later.

Check [Job Queue](/job-queue.html) for more information.

* Advantages
    * General solution
    * Fits almost all cases.
    * Good frameworks support.
* Disadvantages
    * Asynchronous model is complicated.
    * Introduce more monitoring and operation work.

## Conclusion

Choose Post-executing Jobs strategy if possible. Check [Job Queue](/job-queue.html)
