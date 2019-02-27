---
title: Kubernetes
---

# Kubernetes

### Kubernetes API Style

Kubernetes API reflects a simple idea; it reconciles between the desired state of an extensible set of resources and the actual state.
It provides a RESTful API for resources but will wait for a scheduler to schedule the actual resources when the workload is ready.
The end-user of Kubernetes API does not necessary to know how the resources are allocated but simply to know the resources will be allocated eventually.
This creates a lot of values and changes the way people design the APIs.
Will the Kubernetes API itself can be used to support any other resources?
