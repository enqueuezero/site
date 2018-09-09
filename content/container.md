---
title: Container
category: Computer Science
tags: container
date: 2018-09-09
---

Many people have heard of the container for a while or even use it every day. However, a question like "what is container" or "how container works" might still rise.

In this post, we will deep dive into the container.

## Context

Before container era, we usually use visualization technology to limit and control system resources for the applications. However, it creates too much overhead on the physical machine. And thus, container as a lightweight solution emerged.

## Solutions

### Docker

Docker is the dominant container technology in the industry. Check [Docker Overview](https://docs.docker.com/engine/docker-overview/) for more information.

### CoreOS rkt

CoreOS rkt is yet another application container engine. The advantage of rkt is its cloud-native nature. Check [A security-minded, standards-based container engine: rkt](https://coreos.com/rkt/).

### LXC, LXD

LXC and LXD is system container engine.  It offers an environment as close as possible as the one you'd get from a VM but without the overhead that comes with running a separate kernel and simulating all the hardware. Check [linuxcontainer.org](https://linuxcontainers.org/).

### OCI

The Open Container Initiative or OCI develops specifications for standards on Operating System process and application containers. It defines two specs: the [Runtime Specification](https://github.com/opencontainers/runtime-spec) and the [Image Specification](https://github.com/opencontainers/image-spec).

### Bocker

Bocker is a container engine implemented in 100 lines of Bash code. It's mainly for education. Check [p8952/bocker](https://github.com/p8952/bocker).

## Patterns

We will demonstrate that container technology is not shiny new thing. It provides so much values by simply combining several old technologies: namespace, cgroups, and union filesystem.

* [Container and cgroups](container-and-cgroups.html)
* [Container and unshare](container-and-unshare.html)
* [Container and nsenter](container-and-nsenter.html)
* [Container and Namespace](container-and-namespace.html)
* [Container and UnionFS](container-and-unionfs.html)

## Conclusions

A container is merely an OS process, except that it's being isolated, secured, and limited. All values added to the process make the container the dominant technology in the cloud era.

## References

* [What even is container](https://jvns.ca/blog/2016/10/10/what-even-is-a-container/)
* [Manpage: unshare](http://man7.org/linux/man-pages/man1/unshare.1.html)
* [Manpage: nsenter](http://man7.org/linux/man-pages/man1/nsenter.1.html)
* [Manpage: namespaces](http://man7.org/linux/man-pages/man7/namespaces.7.html)
* [Manpage: cgroups](http://man7.org/linux/man-pages/man7/cgroups.7.html)
* [Why do you need to run sshd in container](https://blog.docker.com/2014/06/why-you-dont-need-to-run-sshd-in-docker/)
* [Linux namespaces](https://medium.com/@teddyking/linux-namespaces-850489d3ccf)
* [Wikipedia: UnionFS](https://en.wikipedia.org/wiki/UnionFS)
* [Docker: about storage driver](https://docs.docker.com/storage/storagedriver/)
* [Docker Containers vs System Processes](https://kjanshair.github.io/2017/07/04/Docker-Containers-vs-System-Processes/)
* [How docker images work union file systems for dummies](https://terriblecode.com/blog/how-docker-images-work-union-file-systems-for-dummies/)
