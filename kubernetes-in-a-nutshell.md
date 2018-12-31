---
title: Kubernetes In a Nutshell
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

As a Kubernetes user, you might mostly want to ask Kubernetes to **run a container** via HTTP APIs or CLI.

In other words, you set a desire state to the **Master** server.

The **Master** server compares the desire state to the current state in the cluster and decides which node to run.

**Node** servers receives instructions from the **Master** server and then starts a container in the runtime.

---

Kubernetes runs applications and services in **container runtime** on every node.

Each node installs with a **container runtime**, such as `docker`, `rkt`.

The **container runtime** is responsible for starting and managing containers.

The **container** provides an isolated environment for running the application.

---

Except the container runtime, the **Node** server runs **kubelet** and **kube-proxy**.

**Kubelet** communicates to the **master** to receive desired states.

**Kubelet** controls the **container runtime** to launch or destroy containers to match the desired states.

**Kube-proxy** forwards requests to the containers, either in local host or other hosts.

---

**Pod** is one or more containers in a group that should always run on the same **node**.

