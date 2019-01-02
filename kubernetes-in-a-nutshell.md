---
title: Kubernetes In a Nutshell
published: true
description: Kubernetes is a complicated system that has dozens of concepts. This article provides a set of concepts acting as a quick reference.
tags: enqueuezero, kubernetes
---

# Kubernetes In a Nutshell

**Kubernetes** is a system for running and coordinating containerized applications.

These applications are deployed across a cluster of machines.

As a Kubernetes user, you define how the application should run.

You also define how the application should interact with other applications or the outside world.

---

Kubernetes brings together machine servers into a cluster using a shared network.

**Master** server(s) controls the entire cluster.

**Nodes** are the other servers in the cluster.

---

As a Kubernetes user, you might most want to ask Kubernetes to **run a container** via HTTP APIs or CLI.

In other words, you set a desired state to the **Master** server.

The **Master** server compares the desired state to the current state in the cluster and decides which node to run.

**Node** servers receive instructions from the **Master** server and then starts a container in the runtime.

---

Kubernetes runs applications and services in **container runtime** on every node.

Each node installs with a **container runtime**, such as `docker`, `rkt`.

The **container runtime** is responsible for starting and managing containers.

The **container** provides an isolated environment for running the application.

---

Except the container runtime, the **Node** server runs **kubelet** and **kube-proxy**.

**Kubelet** communicates to the **master** to receive desired states.

**Kubelet** controls the **container runtime** to launch or destroy containers to match the desired states.

**Kube-proxy** forwards requests to the containers, either in localhost or other hosts.

As a Kubernetes user, you don't necessarily need to know the existence of **kubelet** and **kube-proxy**.

---

A **Pod** is one or more containers in a group that should always run on the same **node**.

All containers in a **pod** are launched and destroyed together, or share a life cycle.

All containers in a **pod** share their environments, volumes, and IP space.

Usually, there is one main container and some optional **sidecar containers** in a **pod**.

As a Kubernetes user, you can show all pods in the cluster by typing `kubectl get pods`.

---

A **ReplicaSet** is one or more pod replicas that are running at any given time.

The **replica** number in the **ReplicaSet** defines how many identical pods should be scheduled in the cluster.

If the **replica** number changes, the controller will start or destroy containers to match the desired number.

If a **pod** or underlying **node** dies, the controller will start a new **pod** in the cluster.

---

A **Deployment** is a desired state for **ReplicaSets**.

The **deployment controller** creates new replicasets for the rolling updates and then replaces the current replicaset.

---

For database applications, we cannot directly kill pods in random order.

Instead, we often kill all slaves and let the master die at last.

To support the ordering and uniqueness of Pods, Kubernetes offers **StatefulSet**.

It creates a set of pods in the name like `db-0`, `db-1`, `db-2`, etc.

It provides guarantees about the ordering and uniqueness of these Pods.

---

For applications like logging agents, we want to deploy them per host.

To support such feature, Kubernetes offers **DaemonSet**.

It ensures that all (or some) Nodes run a copy of a Pod.

As nodes are added to the cluster, Pods are added to them.

As nodes are removed from the cluster, those Pods are garbage collected.

Deleting a DaemonSet will clean up the Pods it created.

---

Some Kubernetes objects are owners of other objects.

For example, a ReplicaSet is the owner of a set of Pods.

When the owner is deleted, the owned objects are garbage collected as well.

---

In case you have one-off jobs, Kubernetes offers **Jobs**.

A **job** creates one or more pods and ensures that a specified number of them successfully terminate.

When a specified number of successful completion is reached, the job itself is complete.

Deleting a Job will clean up the pods it created.

---

What if one pod wants to communicate to other pods? Kubernetes offers **Services**.

A **Service** is a component that acts as a basic internal load balancer for pods.

The **Service** exposes a group of pods as a single entity. When one pod communicates to a service, the service proxies the request to one of the backend pods.

---

A **Service** has a DNS A record.

For example, **Service** "foo" in namespace "default" has such domain: "foo.default.svc.cluster.local".

A **Pod** has a DNS A record as well.

For example, **Pod** with IP `10.81.1.101` in the namespace "default" has such domain: "10-81-1-101.default.pod.cluster.local".

---

What if one service wants to expose itself to the external world? Kubernetes offers **Ingress**.

**Ingress** exposes HTTP and HTTPS routes from outside the cluster to services within the cluster.

**Ingress controller** starts **Ingress** software, such as Nginx, F5, HAProxy, etc.

---

If the container dies or the node crashes, all files in the containers are gone.

To keep the data, Kubernetes provides **Volumes** for persisting on-disk files.

A **Volume** is just a directory, possibly with some data in it, which is accessible to the Containers in a Pod.

When the container gets restarted, the **volume** is re-mounted into the container, and thus all data are recovered.

---

A **PersistentVolume** is a piece of storage in the cluster that has been pre-provisioned.

The **PersistentVolume** is a resource in the cluster just like a node is a cluster resource.

Often **PersistentVolume** uses cloud storage system like AWS EBS, Azure  Disk, GCE PD, etc.

The **PersistentVolume** makes the volume out of Pod life-cycle.

---

A **PersistentVolumeClaim** is a request for **PersistentVolume**.

Once a pod is done with a **PersistentVolume**, the claim policy determines if the existing volume should be kept or removed.

---

Kubernetes is a complicated system that has dozens of concepts.

The official document provides a complete guide to the concepts. <https://kubernetes.io/docs/concepts/>

Other resources that kill less your brain cells.

[![Kubernetes Gets a Children’s Book](/static/images/kubernetes-in-a-nutshell-illustrated-guide-illustration-12.png)](https://thenewstack.io/kubernetes-gets-childrens-book/)
[Kubernetes Gets a Children's Book](https://thenewstack.io/kubernetes-gets-childrens-book/)

[![Smooth Sailing with K8S](/static/images/kubernetes-in-a-nutshell-smooth-sailing-with-k8s.png)](https://cloud.google.com/kubernetes-engine/kubernetes-comic/)
[Smooth Sailing with k8s](https://cloud.google.com/kubernetes-engine/kubernetes-comic/)

[![kubernetes api server as event queue](/static/images/readings-2018-51-k8s-api-server-queues.png)](https://www.mgasch.com/post/k8sevents/)
[Events, the DNA of Kubernetes](https://www.mgasch.com/post/k8sevents/)

<!--
Reddit: https://www.reddit.com/r/kubernetes/comments/abgzz5/kubernetes_in_a_nutshell/
Hacker News: https://news.ycombinator.com/item?id=18799572
Dev.to: https://dev.to/soasme/kubernetes-in-a-nutshell-3p95
-->
