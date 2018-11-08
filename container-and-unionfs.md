---
title: Container and UnionFS
permalink: /container-and-unionfs.html
category: Programming
tags: container, unionfs
date: 2018-07-27
---

# Container and UnionFS

Union File System or UnionFS variants such as AUFS, btrfs, vfs, and devicemapper are the file system that used by most container engines.  It allows files and directories of separate file systems overlaid one by one, forming a final single coherent file system.

A typical pattern is that we define the required files in a `Dockerfile`. Each line of code below would eventually be a layer in UnionFS.

![Container and UnionFS](/static/images/container-and-unionfs.png)

With union mount, the directories in the file system from the underlying layer are getting merged with those from the upper layer file systems. Files with the same name in the underlying layers would be masked. However, the program running inside the container doesn't care which layer the files and directories comes from but instead a coherent file system.

```
layer 1: /bin/sh, /bin/cp, /bin/cd
layer 2: /bin/cd
layer 3: /bin/zsh

result: /bin/sh, /bin/cp, /bin/cd (from layer 2), /bin/zsh
```

The benefit of using layered file system is that multiple images can share the same layer and thus it reduces the size of disk needed. 

Note that when a container is created, a writable layer is also created on top of the image layers.

![RW Layers](/static/images/container-unionfs-rw-layers.png)
