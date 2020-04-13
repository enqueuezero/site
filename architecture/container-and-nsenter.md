---
title: Container and nsenter
permalink: /container-and-nsenter.html
category: Programming
date: 2018-07-26
---

# Container and nsenter

Nsenter is a utility enters the namespaces of one or more other processes and then executes the specified program. In other words, we jump to the inner side of the namespace.

Keep above unshare command running, and let's create a new session. This time, we run a program in the existing PID namespace created [before](container-and-unshare.html). It's worth noting that PID 4789 in the regular namespace is the same thing with PID 1 in the new namespace.

```bash
[user@julin1 ~]$ ps aux
... (truncate)
root      4789  0.0  0.0 115432  1560 pts/1    S+   19:11   0:00 sh

[user@julin1 ~]$ sudo nsenter --target 4789 --mount --uts --ipc --net --pid ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.0 115432  1848 pts/1    S+   19:22   0:00 sh
root         7  0.0  0.0 155324  1844 pts/2    R+   19:25   0:00 ps aux
```

The command `ps aux` runs inside the namespace!

We can also enter docker container space via nsenter! First, figure out PID by docker inspection. Second, enter this PID! It's just pretty much like docker exec.

```bash
[user@julin1 ~]$ sudo docker inspect --format {{.State.Pid}} bb7b84c1fb48
4855

[user@julin1 ~]$ sudo nsenter --target 4855 --mount --uts --ipc --net --pid ps aux
PID   USER     TIME  COMMAND
    1 root      0:00 sh
    5 root      0:00 ps aux

[user@julin1 ~]$ sudo docker exec -it 410db7a6c006 ps aux
PID   USER     TIME  COMMAND
    1 root      0:00 sh
    5 root      0:00 ps aux
```

Check manpage of [nsenter.1](https://man7.org/linux/man-pages/man1/nsenter.1.html).
