---
title: Container
permalink: /container.html
category: Computer Science
date: 2018-07-24
---

# Container

Many people have heard of the container for a while or even use it every day. However, a question like "what is container" or "how container works" might still rise.

In this post, we will deep dive into the container.

## Context

Before container era, we usually use visualization technology to limit and control system resources for the applications. However, it creates too much overhead on the physical machine. And thus, container as a lightweight solution emerged.

## Overview

### What is a container?

A container is a set of processes just like other processes you launched from the shell, except that it's being isolated in its [namespace](https://man7.org/linux/man-pages/man7/namespaces.7.html), [cgroups](https://man7.org/linux/man-pages/man7/cgroups.7.html), and [union filesystem](https://en.wikipedia.org/wiki/UnionFS). It has everything it needs in its isolation: code, runtime, system tools, system libraries, settings and so on.

Docker is the dominant container option. However, there're various competitors such as CoreOS rkt, Ubuntu LXD. People standardize the container into the [OCI specs](https://www.opencontainers.org/) and love to have various implementations.

### Who needs a container?

Almost everyone.

### Why need a container?

* Container isolates physical resources such as CPU, memory, disk I/O and network from other containers.
* Container isolates OS kernel resources such process id, mount points, user and group IDs from other containers.
* Containers eliminates differences between development and staging environments and help reduce conflicts between teams running different software on the same infrastructure.

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

## Inside the container

The way we start running a container can be explained in below bash code.

```bash
# Prepare a hash. We need it to identify our container.
$ uuid="ps_$(shuf -i 42002-42254 -n 1)"

# Prepare a root dir for all the containers.
$ btrfs_path='/var/bocker' && cgroups='cpu,cpuacct,memory';

# Prepare root filesystem based on the given `$image`.
$ btrfs subvolume snapshot "$btrfs_path/$image" "$btrfs_path/$uuid" > /dev/null

# Create a cgroup
$ cgcreate -g "$cgroups:/$uuid"

# Control cgroup resource
$ cgset -r cpu.shares=512 "$uuid"
$ cgset -r memory.limit_in_bytes=512000000 "$uuid"

# Execute a given `$cmd` in the cgroup.
# We need to create a unique namespace for the command (unshare).
# We also need to change the root directory (chroot).
# We also need to mount the runtime (/proc).
# Logging is a bonus (tee).
$ cgexec -g "$cgroups:$uuid" \
                ip netns exec netns_"$uuid" \
                unshare -fmuip --mount-proc \
                chroot "$btrfs_path/$uuid" \
                /bin/sh -c "/bin/mount -t proc proc /proc && $cmd" \
                2>&1 | tee "$btrfs_path/$uuid/$uuid.log"
```

You don't necessarily need to remember all the commands above, since it's pointless if you aren't a container engine developer.

The container engine such as runC, rkt, lxc provides you a beautifully designed CLI that abstracts above process for you.

If you like reading Youtube video, Liz Rice just [implemented the container](https://www.youtube.com/watch?v=8fi7uSYlOdc) from scratch in 40 minutes.

Note: Above code is extracted from awesome <a href="https://github.com/p8952/bocker/blob/b6653f6/bocker#L61-L90">bocker</a>.

The container technology is not shiny new thing. It provides so much values by simply combining several old technologies: namespace, cgroups, and union filesystem.

* [Container and cgroups](container-and-cgroups.html)
* [Container and unshare](container-and-unshare.html)
* [Container and nsenter](container-and-nsenter.html)
* [Container and Namespace](container-and-namespace.html)
* [Container and UnionFS](container-and-unionfs.html)

## FAQ

### How is the container different from virtual machine?

A container is one or more non-trivial Linux processes running on top of the Kernel. We isolate them via cgroups and namespace.

Virtual Machine is a set of processes with dependencies running on top of a guest OS kernel. The guest OS is pre-allocated with a fixed amount of CPU, memory on top of the hypervisor and host OS kernel.

So, with the container, you get less isolation but much lightweight. With the VM, you get more isolation but much heavier. (It's pretty straightforward, right? we need to spend extra memory for guest OS in the VM. Besides programs in different VMs don't share things at all and hence load more things into RAM.)

Some would even mix using VM and container.

### I'm using Vagrant. Should I switch to the containers?

You shouldn't switch to the containers if you are managing virtual machines, as Vagrant is a virtual machine manager.

You should switch to the containers if you merely want to run applications.

For those OS that doesn't support the container, you might want to create a virtual machine via Vagrant first, and then run applications as containers in the virtual machine.

### How does the container communicate to the outside world?

You can use `docker cp foo.txt my container:/foo.txt` to send file `foo.txt` from the host into the container.

You can use `docker cp my container:/foo.txt foo.txt` to send file `foo.txt` from the container to the host. <span style="font-size: 0.5em">[Note 1]: This is supported in Docker 1.8.</span>

You can use `COPY ./foo.txt /app` to package file `foo.txt` into container image. However, this happens at the building stage.

You can attach a volume for the container when start running it, pretty much like `docker run -v $(pwd):/app mycontainer`. It allows file syncing via a shared directory.

You can expose a port for the container when start running it, pretty much like `docker run -p 8000:8000 mycontainer`. It allows other programs talking to `mycontainer` by simply establishing a TCP connection.

Some solutions below are not recommended due to making things complicated.

* Running `sshd` in the container.
* Running a static web server in the container.

If you're intended to communicate from one container to another container, then you need sort of container orchestration tools. Check [docker-compose](https://docs.docker.com/compose/) if your case is in development mode. Check [Kubernetes](https://kubernetes.io/) if your case is in production mode.

### Where does the base OS exist for the container defined in `Dockerfile`?

The short answer is there is no such actual OS running but we provide files for the base OS.

Each command in `Dockerfile` creates a new layer for the image. Each layer includes merely some static files.

The base OS defined in `Dockerfile` ends with the necessary files for the designated OS to be packaged into a layer.

In the runtime, your process thinks itself running on a designated OS, however, it's an illusion. Your container really runs as one or more processes with a set of files from the filesystem generated by UnionFS.

### What’s the difference between image and container?

The image is a binary packaged with files and organized by layers.

The container is a runtime instance of the image. You can have various containers for one image.

You can check image via `docker images`, and check containers via `docker ps`. The command `docker run` turns an image into a container.

The image v/s container is pretty much like the program v/s process.


### Does the container slow down the performance of my program?

Don't worry about that.

## Best Practices

### Keep the image small

Don’t start with a full OS as the base image if you don't need, instead, build the image from a small base OS such as alpine.

Declare unnecessary files in `.dockerignore`.

Use [multistage builds](https://docs.docker.com/develop/develop-images/multistage-build/).

```bash
# Start building from a base for building
FROM python:3.7 as base
ADD requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

# Then, we start from a new base.
FROM python:3.7-alpine

# Finally, we copy things from previous stage into new base.
COPY --from=base /usr/local /user/local

CMD /usr/local/bin/myapp
```

Use chaining commands to reduce image layers. And don't forget to do clean up works.

```bash
# Not recommend.
RUN apk add packageA
RUN apk add packageB
RUN make
RUN makeinstall

# Recommend
RUN apk add --no-cache packageA packageB \
    && make \
    && make install
```

Check this topic in the awesome [Container Best Practises](https://docs.projectatomic.io/container-best-practices/).

### Persist data via volumes

It’s okay to read & write files in the container for temporarily data processing. However, you should aware that any data in the container would be lost when it gets killed.

Attach volumes into the container whenever you want to persist data.

If the transaction is required, please, connect the container to a SQL database container. In this case, the SQL database container should attach volumes for persisting data and expose a port.

### Choose the trusted image as source

The safest bet is to use your homemade Docker images or by using verified images, whenever possible.

Otherwise, some malicious bots might hack into your container cluster. Check [such reports](https://www.bleepingcomputer.com/news/security/17-backdoored-docker-images-removed-from-docker-hub/).

## Fun Facts

* Linux Kernel knows nothing about the container currently. All it knows are cgroups, processes, namespaces and so on.
* Docker is not a shiny new technology. All the fundamental tools have been developed and improved for years. Docker implements a high-level API and calls the abstraction as the CONTAINER.
* Docker used LXC as container engine but shifted to containerd & runC & libcontainer later.
* Docker, Inc. had [a tough year](https://chrisshort.net/docker-inc-is-dead/) in 2017. Docker-swarm didn't win the battle of the best container orchestration tool. Plus, not everyone understood the rollout of Moby.
* With the wide adoption of the container, another battle for a better container orchestration tool was going on. It seems that Kubernetes has won the game. Will there be a better orchestration tool like `Nginx` over `Apache`?

## Conclusions

A container is merely an OS process, except that it's being isolated, secured, and limited. All values added to the process make the container the dominant technology in the cloud era.

## References

* [What even is container](https://jvns.ca/blog/2016/10/10/what-even-is-a-container/)
* [Manpage: unshare](https://man7.org/linux/man-pages/man1/unshare.1.html)
* [Manpage: nsenter](https://man7.org/linux/man-pages/man1/nsenter.1.html)
* [Manpage: namespaces](https://man7.org/linux/man-pages/man7/namespaces.7.html)
* [Manpage: cgroups](https://man7.org/linux/man-pages/man7/cgroups.7.html)
* [Why do you need to run sshd in container](https://blog.docker.com/2014/06/why-you-dont-need-to-run-sshd-in-docker/)
* [Linux namespaces](https://medium.com/@teddyking/linux-namespaces-850489d3ccf)
* [Wikipedia: UnionFS](https://en.wikipedia.org/wiki/UnionFS)
* [Docker: about storage driver](https://docs.docker.com/storage/storagedriver/)
* [Docker Containers vs System Processes](https://kjanshair.github.io/2017/07/04/Docker-Containers-vs-System-Processes/)
* [How docker images work union file systems for dummies](https://terriblecode.com/blog/how-docker-images-work-union-file-systems-for-dummies/)
