---
title: Metrics
---

In this chapter we'll take a look at the concept of metrics. We'll cover below topics: what are metrics, why is it important for cloud native application, how do you collect metrics, and how do you analyze the collected metrics. At the end, we'll introduce some solutions for metric tools and platforms.

## What are Metrics?

Metrics are measures of quantitative assessment commonly used in many fields. Generally, metrics are time series data so that we can track the availability and performance of the Cloud Native Application over time. It's very essential for a microservices-based architecture since a metrics-centered approach provides full observability into each microservice.

### Time series

A metric consists of a series of time-indexed numeric values and is grouped by name and tags. Each data point in the series has below information.

* Metric name. It indicates what the metric is measuring for.
* Metric tags, or metric labels. They're key-value pairs. Metric name together with metric tags make a metric unique.
* Timestamp. It's a UNIX epoch timestamp and indicates when the data point is collected.
* Metric value. It's a numeric value and indicates a specific measurable thing. For example, `0.03` can be the average load of a linux system, `42` can be the milliseconds of an HTTP request response time.

All the data points, often called as samples, in the time series have the same metric name, metric tags, and type of values. A time series database is dedicated to store all data points in the time series.

### Sample Frequency

The metrics require a monitoring tool to regularly sample from the application. Some are collected once a few seconds; the others might be collected once a few minutes. The sample frequency determines the amount of data points. A frequent collected time series has high resolution but creates a heavy burden on the application. It's a trade-off to set a proper interval for collecting metrics.

In short, metrics help you understand how your applications and system services are performing.

## Collect Metrics

Assume you have installed helm as described in previous chapter.

## References

Google Cloud, Metrics, Time Series, and Resources, <https://cloud.google.com/monitoring/api/v3/metrics>

My Philosophy on Alerting, <https://docs.google.com/document/d/199PqyG3UsyXlwieHaqbGiWVa8eMWi8zzAn0YfcApr8Q/edit>

Prometheus, Data Model, <https://prometheus.io/docs/concepts/data_model/>

Understanding Metrics and Time Series, <http://opentsdb.net/docs/build/html/user_guide/query/timeseries.html>
