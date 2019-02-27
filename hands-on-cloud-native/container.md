---
title: Play around with Containers | Hands-On Cloud Native Application
---

# Play around with Containers

## What is Container?

### Container Introduction

A container is a set of processes just like other processes you launched from the shell, except that it's being isolated in its namespace, cgroups, and union filesystem. It has everything it needs in its isolation: code, runtime, system tools, system libraries, settings and so on. It is a standard unit of software that packages up code and all its dependencies so the application runs quickly and reliably from one computing environment to another. 

### A Little Bit Background, Visualization

Before container era, we usually use visualization technology to limit and control system resources for the applications. However, it creates too much overhead on the physical machine. And thus, container as a lightweight solution emerged.

### Container v/s Visualization

Containers and virtual machines have similar resource isolation and allocation benefits, but function differently because containers virtualize the operating system instead of hardware. Containers are more portable and efficient.

## Why use Container?

### Physical Resources Isolation

Container isolates physical resources such as CPU, memory, disk I/O and network from other containers.

### Kernel Resources Isolation

Container isolates OS kernel resources such process id, mount points, user and group IDs from other containers.

### Eliminate the Difference between Environments

Containers eliminates differences between development and staging environments and help reduce conflicts between teams running different software on the same infrastructure.

## Essential Knowledge

### Host Machine

### CGroups

Cgroups is a Kernel feature that organizes processes into hierarchical groups to limit and monitor their system usage such as CPU, memory, disk, network and so on.

### Unshare

Unshare is a utility running program with some namespaces unshared from a parent. We create a new PID namespace below.

### Namespace

Namespace enables us having the same name for some global system resources. For example, A PID namespace empowers the process inside the namespace running with 1 as PID, which at the same time, init is running with 1 as PID in the regular namespace.

### UnionFS

Union File System or UnionFS variants such as AUFS, btrfs, vfs, and devicemapper are the file system that used by most container engines. It allows files and directories of separate file systems overlaid one by one, forming a final single coherent file system.

### OCI

The Open Container Initiative or OCI develops specifications for standards on Operating System process and application containers. It defines two specs: the Runtime Specification and the Image Specification.

### Image

The image is a binary packaged with files and organized by layers. The container is a runtime instance of the image. You can have various containers for one image. The image v/s container is pretty much like the program v/s process.

### Volume

## Containerize the Front-End Application

### Run Busybox Container

The command `docker container run` runs a container with a image called called `busybox` and runs `top` command in the container. The `-t` flag allocates a pseudo-TTY and the `-i` flag keeps the shell interactively. The `--rm` flag makes sure the container will be deleted after it's disposed.

```bash
$ docker run --rm -i -t busybox top
Mem: 1647528K used, 399220K free, 864K shrd, 34672K buff, 1286272K cached
CPU:  0.0% usr  5.2% sys  0.0% nic 92.1% idle  2.6% io  0.0% irq  0.0% sirq
Load average: 0.63 0.17 0.06 2/459 6
  PID  PPID USER     STAT   VSZ %VSZ CPU %CPU COMMAND
    1     0 root     R     1252  0.0   1  0.0 top
```

### Inspect Container

List all available containers, which includes the container we just created.

```bash
$ docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
f4b12842544a        busybox             "top"               8 seconds ago       Up 7 seconds                            jolly_torvalds
```

Attach into the container with an `sh` command.

```bash
~ % docker exec -it jolly_torvalds sh
/ #
```

The `top` command shows another process gets created.

```
Mem: 1650400K used, 396348K free, 872K shrd, 34948K buff, 1286788K cached
CPU:  0.0% usr  0.1% sys  0.0% nic 99.7% idle  0.0% io  0.0% irq  0.0% sirq
Load average: 0.02 0.08 0.05 2/454 22
  PID  PPID USER     STAT   VSZ %VSZ CPU %CPU COMMAND
   15     0 root     S     1256  0.0   0  0.0 sh
    1     0 root     R     1252  0.0   3  0.0 top
```

### Dockerfile

```
FROM node:11.8.0 as build-stage

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN ls . && npm run build

FROM nginx:1.15.8

COPY --from=build-stage /app/build /usr/share/nginx/html
```

### Build Our First Image

```bash
$ docker build -f src/frontend/Dockerfile -t delicioushref-frontend:latest src/frontend
```

### Run Front-End Container

```bash
$ docker run --rm -p 8000:80 delicioushref-frontend:latest
```

### Clean Up


### Push Image to DockerHub Registry

```bash
$ docker push
```

## References