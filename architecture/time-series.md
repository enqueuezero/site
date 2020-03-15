---
title: Time Series
---

# Time Series

## Context

A system is meant to run continuously and thus creates flowing data over time. In term of metrics, the system reports discrete data points each moment. It's a challenge to structure, store, and analyze these data points.

## Overview

A time series is a series of data points indexed (or listed or graphed) in time order.
Each data point is often a numeric value.
Each time series consists of a name plus optional tags.

For example, A Linux system expose its load data by reading from `/proc/loadavg`. Then we could have such a metric that has `proc.loadavg.1m` as metric name, `host=web-1.svc.prod.example.com` as tag, `0.03` as data point value. The time series is a sequence of floating value like `0.03` that reflects system load over time.

## Solutions

### Prometheus

Prometheus is a time series database and fundamentally stores all data as time series: streams of timestamped values belonging to the same metric and the same set of labeled dimensions.

Every time series is uniquely identified by its metric name and a set of key-value pairs, also known as labels. The metric name specifies the general feature of a system that is measured.

Samples form the actual time series data.Each sample consists of a timestamp and a float value.

Below is how a typical prometheus metric looks like:

```
response_time{method="GET", domain="enqueuezero.com", path="/"} 0.021
```

It's a sample of a time series data with `response_time` as metric name, `method="GET", domain="enqueuezero.com", path="/"` as labels, `0.021` as sample value. Notably, Prometheus uses current UNIX timestamp as sample's timestamp.

### Graphite

Graphite is a monitoring tool  Time series plays a critical role in the system design.

* **Carbon**: a high-performance service that listens for time-series data.
* **Whisper**: a simple database library for storing time-series data.
* **graphite-web**: Graphite's user interface & API for rendering graphs and dashboards.

In particular, the form of time series data in Graphite  There is no labels in Graphite comparing to Prometheus, making metric names being the only way to store both concepts `metric name` and `labels` in Prometheus. It has below form:

```
response_time.enqueuezero_com.GET.index 0.21
```

### InfluxDB

InfluxDB is yet another time series database. It has a unique kind of database indexing file format called time series index (TSI) that stores time series data efficiently, which we'll explain later.

InfluxDB time series data consists of below fields: `measurement`, `fields`, `tags`, `time`.

* The measurement acts as a container for tags, fields, and the time column, and the measurement name is the description of the data that are stored in the associated fields.
* Tags are key-value pairs. Together with measurement, they make a metric unique. From this point of view, measurement and tags are equivalent to Prometheus metric name and labels.
* Fields are key-value pairs. InfluxDB support ingest multiple fields into a sample.
* Time stores timestamps, and the timestamp shows the date and time, in RFC3339 UTC, associated with particular data.

It has below form in line protocol:

```
access,method="GET",domain="enqueuezero.com",path="/" response_time=0.21
```

It also support represent and interact data in JSON format:

```
{
    "measurement": "access",
    "tags": {
        "method": "GET",
        "domain": "enqueuezero.com",
        "path": "/"
    },
    "fields": {
        "response_time": 0.21
    }
}
```

### Wavefront

Wavefront is a monitoring analytics platform. One of its fundamental concept is also time series. In particular, it has below data format syntax:

```
<metricName> <metricValue> [<timestamp>] source=<source> [pointTags]
```

* metricName is the name of the metric. It organize metrics in a meaningful hierarchy by separating levels by `.`. For example, `system.cpu0.loadavg.1m`.
* metricValue is the value of the metric. It can be double-precision floating point number or a long integer.
* timestamp reflects the epoch seconds of the metric.
* source indicates where the data is from. It can be the name of an application, host, container, instance or any other unique sources.
* pointTags are key-value pairs.

Below example shows how it looks like:

```
access.response_time 0.21 15029382000 source=web-1.svc.local method="GET" domain="enqueuezero.com" path="/"
```

### OpenTSDB

OpenTSDB is yet another time series database. A typical time series data point that send to OpenTSDB is like below.

```
put access.response_time 15029382000 0.21 host=web-1.svc.local method=GET domain=enqueuezero.com path=index
```

## Patterns

### Data Storing

It's a challenge on storing time series data. Below is a list of notable things.

* Deduplicate. A sample data may be sent multiple times. How to store exact the same data when a client sends time series several times?
* Few deletions. Delete operation is a rare occurrence. When people delete time series, it's often not just to delete a few sample to but purge data among a large time of periods.
* Updates happens. A sample data may be sent multiple times with different fields or values. How to overwrite these data?
* Time affiliated. Each sample associates with a timestamp and is ingested in time ascending order.

### Data Types

Almost every time series database can support numeric numbers. A few of them can support boolean, string, etc.

The timestamp is usually a long integer with second-precision, millisecond-precision, or even nanosecond-precision.

As for the metric types, below are the most common seen types.

* A **counter** is a cumulative metric that represents a single monotonically increasing counter whose value can only increase or be reset to zero on restart.
* A **gauge** is a metric that represents a single numerical value that can arbitrarily go up and down.
* A **histogram** is a bucketed metric that counts values in a configurable bucket.

### Data Analytics

The analytics based on time series data is about to dig out the trend or patterns revealed from the changes of values.
Common analytic method is through statistical analysis, for example, percentage, percentile, etc.
Another approach is by using machine learning and deep learning.
Statistical analysis is the first choice. Even by using machine learning or deep learning, it's also recommended to combine with statistical analysis.

#### Filters

When querying time sereis data, it's always good to filter data so that only a limit set of data points are returned.
This could protect the time series database query engine.

One effective approach is to align data points. Instead of write all data points, we can align data points to buckets in configured time windows.
For example, we collect five data points but only save the average of the five data points into database.

Another approach is to downsample data points when querying. We can take a sample of data points every a few minutes.
For example, we save five data points over five minutes but only fetch one data point over five minutes.

## References

* [Wikipedia](https://en.wikipedia.org/wiki/Time_series)
* [Prometheus Data Model](https://prometheus.io/docs/concepts/data_model/)
* [Graphite](https://graphiteapp.org/)
* [InfluxDB key concepts](https://docs.influxdata.com/influxdb/v1.7/concepts/key_concepts/)
* [Wavefront Data Format](https://docs.wavefront.com/wavefront_data_format.html)
