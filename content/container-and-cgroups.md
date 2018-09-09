---
title: Container and Cgroups
date: 2018-07-28
category: Computer Science
tags: container, cgroups, docker
---

Cgroups is a Kernel feature that organizes processes into hierarchical groups to limit and monitor their system usage such as CPU, memory, disk, network and so on.

The Linux kernel provides a pseudo-filesystem named cgroupfs as the interface. A cgroup is a set of processes which has settings in cgroupfs. With the settings in cgroupsfs, we can do things below:

* Limit the amount of CPU time.
* Enable or disable Out of Memory killer.
* You name it. :)

Below is the simplified code from [bocker](https://github.com/p8952/bocker/blob/master/bocker). It demonstrates that limiting the system resource usage of a container can be achieved by creating a cgroup and executing a command in a cgroup.

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

The container engine such as runC, rkt, lxc provides you a beautifully designed CLI that abstracts above process for you. If you like watching Youtube video, [Liz Rice](https://www.youtube.com/watch?v=8fi7uSYlOdc) just implemented the container from scratch in 40 minutes.

Check the manpage of [cgroups.7](http://man7.org/linux/man-pages/man7/cgroups.7.html) for the overview and [Introduction to Control Groups](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/resource_management_guide/ch01) for the usage.
