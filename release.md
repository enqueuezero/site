---
title: Release
---

# Release

## Context

Without delivering code to production environment, code is just a piece of text bytes on the disk.

Unlike client-side application distribution, server-side application release requires a lot of cares.

## Overview

What is release?

## Solutions

### SSH

Example: Reddit

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

## Conclusions
