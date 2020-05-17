---
title: Hashing APScheduler Jobs
permalink: /projects/apscheduler/hashing.html
---

# Hashing APScheduler Jobs

APScheduler is designed to run all jobs on one single machine. It becomes a problem if it overwhelms the host machine. In such a scenario, we will need to distribute APScheduler jobs to different machines. Our goal is to load a portion of jobs on a single machine, and eventually load all of the jobs on all machines. Therefore, we need to know which jobs are going to be loaded on what machine. In this article, we'll introduce a technique by hashing jobs to a cluster of machines.

Say, we want to distribute 100 jobs on 4 machines. And, we specify 4 slots, each of which hosts about 25 jobs.

Here, we choose to pass in the configuration via environment variables. You may set it with your own configurations.

* For machine 1, `export APSCHEDULER_ASSIGNED_SLOTS=0; export APSCHEDULER_TOTAL_SLOTS=4;`.
* For machine 2, `export APSCHEDULER_ASSIGNED_SLOTS=1; export APSCHEDULER_TOTAL_SLOTS=4;`.
* For machine 3, `export APSCHEDULER_ASSIGNED_SLOTS=2; export APSCHEDULER_TOTAL_SLOTS=4;`.
* For machine 4, `export APSCHEDULER_ASSIGNED_SLOTS=3; export APSCHEDULER_TOTAL_SLOTS=4;`.

To achieve our goal,  `scheduler.add_job()` is only called when the slot is assigned to the current host machine.

```python
import os

scheduler = BackgroundScheduler()

jobs = [...] # define all of your jobs here

# How many slots are assigned to the current machine.
assigned_slots = [int(s) for s in os.environ["APSCHEDULER_ASSIGNED_SLOTS"].split(",")]

# How many slots in total.
total_slots = int(os.environ[APSCHEDULER_TOTAL_SLOTS])

# Only load jobs whose slots are assigned 
for job in jobs:
    if (hash(job["id"]) % total_slots) in assigned_slots:
        scheduler.add_job(**job)
```

As long as the versions of Python on all machines are the same, `hash(job["id"]) % total_slots` will derive to a same slot. It guarantees all machines have a consensus of whether a job belongs to a particular slot.

To get a more evenly distributed load, the `APSCHEDULER_ASSIGNED_SLOTS` can be a list of numbers. Say, we set `APSCHEDULER_TOTAL_SLOTS=16`, and

* For machine 1, `export APSCHEDULER_ASSIGNED_SLOTS=0,1,2,3`
* For machine 2, `export APSCHEDULER_ASSIGNED_SLOTS=4,5,6,7`
* For machine 3, `export APSCHEDULER_ASSIGNED_SLOTS=8,9,10,11`
* For machine 4, `export APSCHEDULER_ASSIGNED_SLOTS=12,13,14,15`

