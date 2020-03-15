---
title: File Access Permission
permalink: /file-access-permission.html
---

# File Access Permission

[[toc]]

## Overview

This article describes File Access Permissions in UNIX. Here, file means regular file, directory file, block special file, character special file, FIFO, Socket, and Symbolic Link. As "Everything is a file" in UNIX, it's import to understand the File Access Permissions. Different from other articles, this one is going to explain the design of the File Access Permissions.

When we talk about File Access Permissions, people always think of the nine permission bits of each file - `rwxrwxrwx`. However, these permission bits are not the whole thing. The missing part are file IDs and process IDs. To complete the analysis of File Access Permissions,  we need both file and process. In the rest of this article, we describe file IDs, permission bits, and process IDs, and finally introduce a typical example.

## Meaning of IDs

In this article we will talk a lot about different IDs. Below lists all the ID abbreviations:

* `F_UID` is the user ID of file owner,
* `F_GID` is the group ID of file owner,
* `P_RUID` is the real user ID of process,
* `P_RGID` is the real group ID of process,
* `P_EUID` is the effective user ID of process,
* `P_EGID` is the effective group ID of process,
* `P_SUID` is the saved set-user-ID of process,
* `P_SGID` is the saved set-group-ID.

These four abbreviations combine IDs mentioned together:

* File IDs = `F_UID` or `F_GID`,
* Process Effective IDs = `P_EUID` or `P_EGID`,
* Process Real IDs = `P_RUID` or `P_RGID`,
* Process Saved IDs = `P_SUID` or `P_SGID`.

In addition,

* `U` stands for user,
* `G` stands for group,
* `R` stands for real,
* `E` stands for effective,
* `S` stands for saved.

## File IDs and Permission Bits

Each file has two owner IDs, `F_UID` and `F_GID`, which can be reached through field `st_uid` and field `st_gid` in structure `stat`.

Meanwhile, each file has nine permission bits divided into three categories based on file ownership:

* The owner permissions apply only to the owner of the file.
* The group permissions apply only to the group of the file.
* The others permissions apply all other users.

Based on access to a file, these nine permission bits divided into three categories: read, write and execute.

It should be emphasized that file permission types are just for file content, not for other file information such as file owner, file size, and file mode. Specially, for directories, file content means a table whose entry is map of filename and i-node number. For directories, execute permission means passing through it. For example, if you'd like to open file `/home/unix/foo.c`, you need execute permission in the directory `/`, `/home`, `/home/unix`.

Additionally, in field `st_mode ` there are two special flags called set-user-id bit and set-group-id bit that can change the effective user ID and the effective group ID of the process that is executing this file. These two flags will be explained later.

### IDs for New Files

When a file is created, file's `F_UID` is set to `P_EUID`, and `F_GID` is set to `P_EGID` or the group ID of the directory in which the file is being created, depending on different implementations.

### Permission Bits of New Files

Each process has its own file mode creation mask(umask), and is able to change it. When a file is created, the permission bits depends on it. Any bits that are on the file mode creation mask are turned off in the file's mode. For regular files, the base permissions are 666, and for directories they are 777. Most users of UNIX systems usually set their umask value once, on login, and never changed.


## Process IDs

Each process has at least six IDs associated with it, also divided into three categories:

* `P_RUID` and `P_RGID` identify who we really are.
* `P_EUID`, `P_EGID` and supplementary group IDs are used for file access permission checks.
* `P_SUID` and `P_SGID` are saved by exec functions.

### IDs for New Process

When a process is created, `P_RUID` and `P_RGID` are taken from the password file when we log in. Normally, these values don't change during a login session.

Normally, `P_EUID` equals `P_RUID`, and `P_EGID` equals `P_RGID`. However, when set-user-id bit set, `P_EUID` equals `F_UID`, and when set-group-id bit set, `P_EGID` equals `F_GID`. Obviously, set-user-id bit means set the effective user ID of the process to the file owner's user ID.

`P_SUID` and `P_SGID` contain copies of the `P_EUID` and `P_EGID`,

## File Access Test

Each time a process read, write, or execute file content, the kernel performs file access test. Test result depends on file IDs, file permission bits, and `P_EUID`.

* If `P_EUID` is 0, access is allowed.
* Else if `P_EUID` equals to `F_UID`, access is only allowed if the corresponding permission bit is set.
* Else if `P_EGID` or one of the supplementary group IDs of the process equals `F_GID`, access is only allowed if the corresponding permission bit is set.
* Else the corresponding other access permission bit is set, access is only allowed.

Obviously, there are two ways to change file access test's result, either by changing file attributes or by changing process attributes. For the file attributes, we can use `chown` to change `F_UID` and `F_GID`, or use `chmod` to change the file access permission bits. For the process attributes, we can use setuid/setgid and seteuid/setegid to change `P_EUID` and `P_EGID`.

What needs to be stressed is, an unprivileged user can only set its Process Effective IDs to either its Process Real IDs or its Process Saved IDs.


## A little doubt

As mentioned above, Process Real IDs and Process Saved IDs of the process are not involved in file access test. So what these four process IDs are used for?

To answer question, we need to talk about principle of least privilege(PoLP) first. According to PoLP, every process must be able to access only the information and resources that are necessary for its legitimate purpose.

```
Every program and every privileged user of the system should operate using the least amount of privilege necessary to complete the job.

    — Jerome Saltzer, Communications of the ACM
```

Normally, file owner has highest permissions, group members the second, and others the last. Based on this, when set-user-id or set-group-id flag is set, meaning Process Effective IDs equals to File IDs, the process is granted to extra privileges. However, if we retain the extra privileges, it may be not safe, which fails to align with PoLP.

The solution is: we set Process Effective IDs to File IDs first, Process Saved IDs save the copies. And then, we change Process Effective IDs to Process Real IDs to lower the privileges to do the lower-privilege work. When necessary, we restore Process Effective IDs to File IDs through Process Saved IDs.

The short answer is, with the limit that an unprivileged user can only set `P_EID` to Process Real IDs or Process Saved IDs, we use Process Saved IDs to get extra privileges and use Process Saved IDs to reduce the privileges to follow PoLP. That's the reason why we need three categories of process IDs.


## Example

Finally, we show a typical example in book APUE (Advanced Programming in the Unix Environment
). We'll look at the at(1) program, which used to queue, examine, or delete jobs for later execution.

By checking the output of `ls -l $(which at)`, we can see the program `at` is owned by root, and has its set-user-ID bit set. When we run it, we have:

* `P_RUID` = $(whoami), e.g, Bob
* `P_EUID` = `F_UID` = root
* `P_SUID` = `P_EUID` = `F_UID` = root

1. The process calls seteuid to set `P_EUID` to `P_RUID`, then we have:

* `P_RUID` = Bob
* `P_EUID` = Bob
* `P_SUID` = root

The process runs until it needs to access the configuration files that control which commands are to be run and the time at which they need to run. These configuration files are owned by the daemon, and the daemon's owner ID is root. To write configuration files, process needs root privilege.

2. The process calls seteuid to set `P_EUID` to `P_SUID`, then we have:

* `P_RUID` = Bob
* `P_EUID` = root
* `P_SUID` = root

With `P_EUID` equals root, writing to these configuration files are allowed. The daemon will run jobs later.

3. The process calls seteuid to set `P_EUID` to `P_RUID`, then we have:

* `P_RUID` = Bob
* `P_EUID` = Bob
* `P_SUID` = root

This prevents any accidental misuse of root privilege.

## A Question

Alice create a file named `foo` with umask `077`. In the same file system, can Bob read the content of `foo`? You tell me.
