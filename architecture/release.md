---
title: Release
permalink: /architecture/release.html
---

# Release

## Context

Without delivering code to production environment, code is just a piece of text bytes on the disk. Unlike client-side application distribution, server-side application release requires a lot of cares and attentions.

The article is about every aspects of the release should notice.

## Overview

A software release is the sum of all steps to deliver software to the production, where the software is serving for customers. Release can have several meanings in different scopes. In particular, we discuss the release of the server side software, which has gone through a continuous integration step.

## Solutions

### SSH

[redditblog.com](https://redditblog.com/2017/06/02/the-evolution-of-code-deploys-at-reddit/)

In the fist three years, the engineers at Reddit connected to hosts via SSH and run bash commands. Below is the code in essence (heavily distilled, not real code):

```
# build the static files and put them on the static server
`make -C /home/reddit/reddit static`
`rsync /home/reddit/reddit/static public:/var/www/`

# iterate through the app servers and update their copy
# of the code, restarting once done.
foreach $h (@hostlist) {
    `git push $h:/home/reddit/reddit master`
    `ssh $h make -C /home/reddit/reddit`
    `ssh $h /bin/restart-reddit.sh`
}
```

It's comprised of two steps:

* Build static files and push to a server.
* SSH to hosts, update the code, build the code, and restart.
* The release went through server hosts one by one, which is a form of canary deploy.

Such release paradigm is always recommended if you have a very small amount of servers and 
It's dirty but it works in a simplest way.

### Capistrano

### Configuration Tools

Ansible, Chef.

Terraform.

### Kubernetes

## Patterns

### Immutable Release v/s Mutable Release

### Pull-based v/s Push-based

push: ssh
pull: agent+http

### Sudo v/s Non-Sudo

SSH: sudo
Switch to app user.
In container: run as non-sudo.

### Multiple Stages v/s Blue Green

dev
testing
staging
canary
production

blue + green.

### Rollout v/s Rollover

kubernetes

### Backward Compatible v/s Backward Incompatible

* Application code change.
* Database Schema Migration

### Fail Fast & Rollback

stop at the node when error occurs.
requires human intervention.

* Insufficient system resource.
* Network error
  * SSH connection error in push-based.
  * HTTP error in pull-based.
* Application start timeout.
* Application misconfiguration.

Quickly rollback when outage occurs or error rates up.
re-do the release.

### Resource Provisioning

raw machine: system dependencies.
container environment: container runtime setup.
cloud computation: create cloud resources.

### Parallel Execution

### Node Roles

### Containerize Applications

### Remote Cache

Improve performance with remote cache.

### Deploy Hooks

function hook.
* before task
* after task

bash hook.
* git hook. // heroku

http hook.
* send rfc/slack messages.

## Scale

## Release Note

Release note is a record of document to help understanding what is changed in a designated release. Team members can refer to the document at any time to identify the release time and the release changes.

It could contain below changes.

* Versions. It could be the version of the software, or the version of the build.
* The target audiences. Most of the time, they're project managers, QA testers, engineers, and stakeholders.
* The ticket (or task) references. Since the release note should not be too long, it's wise to place a link reference to the ticket, for example, "Enqueuezero 2019-02 updated. https://jira.example.com/browse/DEV-2019".
* The work has done. The type of the work could be bug fixes, new features, refactors, security patches, functional changes, and etc.

## Conclusions

## References

* [What to expect when you re expecting a new code release](http://www.testingjournals.com/code-release-document/)
