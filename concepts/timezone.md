---
title: Timezone
permalink: /concepts/timezone.html
category: Programming
date: 2018-08-24
---

# Timezone

[[toc]]

## Context

As the earth is a sphere, different places in the world will have different clocks. Human invented timezone to split the globe into 24 areas by regions. The UTC or Coordinated Universal Time is the primary time standard by which the world regulates clocks and time.

Programmers need to be aware of the timezone and what it means to the time they handle. In this case, the timezone libraries can help to ease the problem.

## Overview

## Solutions

### The System Timezone

The program needs to run in an OS, and thus system admin needs to set system timezone first. Almost every OS, such as Windows, macOS, Linux, Android, has an option to set the timezone.

Especially in POSIX, you can use command `tzselect` to set the timezone and use environment variable `$TZ` to get timezone. The `$TZ` value is something like `America/New_York`, or `Pacific/Honolulu`. In the GNU C Library, the default time zone is like the specification `TZ=:/etc/localtime` (or `TZ=:/usr/local/etc/localtime`, depending on how the GNU C Library was configured.

Check the manual of [TZ-Variable](https://www.gnu.org/software/libc/manual/html_node/TZ-Variable.html).

### Programming Language Libraries

Language libraries provide similar interfaces to convert time from local time to UTC or other local times in other regions.

The time objects can be categorized into timezone-aware and timezone-non-aware objects. A timezone-non-aware time object is usually referred to as local time in the programming context. Some might refer to UTC, while some might refer to local time.

Popular timezone libraries are listed below:

* [Moment.js timezone](https://momentjs.com/timezone/docs/)
* [python-dateutil tz](https://dateutil.readthedocs.io/en/stable/tz.html)

They have similar API form:

```python
tzaware_time = tz(time, IANA_KEY)
utc_time = to_utc(tzaware_time)
```

## Patterns

### IANA

[IANA TZ database](https://www.iana.org/time-zones) contains code and data that represent the history of local time for many representative locations around the globe. It is updated periodically. 

We need this database because the timezone is not a fixed data. Governments or local policymakers might change the timezone for a region for some reason. For example, the Samoa government changed the timezone from UTC-11 to UTC+13 (daylight saving time from UTC-10 to UTC+14) since 29 Dec 2011.

You can find a list of timezones in a POSIX-like system like below:

```bash
$ ls /usr/share/zoneinfo
+VERSION    CET         Eire        GMT0        Japan       Navajo      Turkey      posixrules
Africa      CST6CDT     Etc         Greenwich   Kwajalein   PRC         UCT         zone.tab
America     Canada      Europe      HST         Libya       PST8PDT     US
Antarctica  Chile       Factory     Hongkong    MET         Pacific     UTC
Arctic      Cuba        GB          Iceland     MST         Poland      Universal
Asia        EET         GB-Eire     Indian      MST7MDT     Portugal    W-SU
Atlantic    EST         GMT         Iran        Mexico      ROC         WET
Australia   EST5EDT     GMT+0       Israel      NZ          ROK         Zulu
Brazil      Egypt       GMT-0       Jamaica     NZ-CHAT     Singapore   iso3166.tab
```

Usually, you can get a TZ object by giving an IANA TZ database key. For example, in Python-dateutil, you can get TZ by `gettz`.

```python
>>> gettz('Pacific/Kiritimati')
tzfile('/usr/share/zoneinfo/Pacific/Kiritimati')

>>> datetime.now(tzutc())
datetime.datetime(2018, 8, 18, 11, 18, 43, 293800, tzinfo=tzutc())
```

### Timedelta

Under the hood, the timezone calculation is merely to add or minus a few hours to the given time based on the timezone setting.

For example, for TZ "Asia/Shanghai" you can get a UTC time first, and then apply it to the local TZ for local time:

```python
>>> datetime.utcnow() + timedelta(hours=8)
```

### Daylight Saving Time

DST or daylight saving time, sometimes also referred to as summer time in some countries, is a practice of advancing clocks during summer months, so that evening daylight lasts longer. It also means this practice makes timezone a little bit complicated. 

You can't merely apply time to `+timedelta(hours=12)` for Pacific/Auckland timezone. In summer time, you have to apply time to `+timedelta(hours=13)`. 

Fortunately, the programming language tz libraries would generally handle that for you. All the thing you need to do is to get a timezone by IANA key instead of adding timedelta by yourself.

### TZ time format

When people format datetime with timezone into string, ISO8601 might be a good solution. For example, the given time might be in below format:

* `"2008-09-15T15:53:00+05:00"`
* `"2008-09-15T15:53:00+0500"`
* `"2008-09-15T15:53:00+05"`
* `"2008-09-15T10:53:00Z"`

The `Z` here means UTC.

### Unix Timestamp

When converting in between timezone and datetime, you need to be aware of the relationship between each other. For example, in Python, you can convert a timestamp into utc time tuple or local time tuple.

```python
import time

# timestamp to time tuple in UTC
timestamp = 1226527167.595983
utc_time_tuple = time.gmtime(timestamp)
print repr(utc_time_tuple)

# timestamp to time tuple in local time
timestamp = 1226527167.595983
local_time_tuple = time.localtime(timestamp)
print repr(local_time_tuple)
```

Check [Python datetime / time conversions](https://www.saltycrane.com/blog/2008/11/python-datetime-time-conversions/)

## Conclusion

Someone believes the time is the essence of the programming, and in this way it is. 

When handling the time, don't forget to check the system settings. In programming, choosing a good library can save you time.

It's a good practice to store time in UTC as timezone into the database all the time. You might want to convert them into timezone-aware objects only when you need to handle user requests or display them.
