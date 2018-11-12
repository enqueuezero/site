---
title: Heat Map
category: programming
---

# Heat Maps

[[toc]]

## Overview

Heat maps are used in 3D matrix visualization. It represents matrix data as color blocks
in the table. The typical use of the heat maps is by using x and y-axis for two dimensions
and color intensity for the third. The x and y-axis are often latency, offset, utilization,
and the third is often time.

![heatmap panel](/static/images/heatmap-gf-panel.jpg)

It reveals system behavior: finding distribution models,
bottlenecks, outliers, hot spots, etc.

![heatmap mh370](https://upload.wikimedia.org/wikipedia/commons/4/4d/MH370_location_probability_heat_map_per_DST_Group_analysis.jpg)

<span style="font-size: 0.5rem; color: grey;">
MH370 location probability heat map per DST Group analysis
</span>

## Uses

* Heatmap is one of the fundamental data visualization forms for web analysis,
  click behavior analysis, etc.
* Heatmap is used in the performance analysis in the operating system or low-level
  software.
* Heatmap is often as one of the built-in chart types in the monitoring system, for
  example, [Grafana Heatmap Panel].

[Grafana Heatmap Panel]: http://docs.grafana.org/features/panels/heatmap/

## Solutions

### Grafana Heatmap Panel

The Heatmap panel allows you to view histograms over time. 

### DTrace/ftrace/eBPF

[brendangregg/HeatMap](https://github.com/brendangregg/HeatMap) can convert
the sample data collected by performance tracing tools like DTrace, ftrace, eBPG into a SVG file.

## Patterns

### Three-Dimensional Data

In the bar chart, you show a two-dimensional data in x-series and y-series.
For example, below chart shows the frequency of letters in English words.

![bar chart](/static/images/heatmap-barchart.png)

Heat maps can show three-dimensional data. You can think of the heat map as a
series of bar charts compacting in one table over time.

![](http://docs.grafana.org/img/docs/v43/heatmap_histogram_over_time.png)

### Color Intensity

The color intensity signifies the value of the data.

Some heat maps use the darkness of the color intensity. The lighter the color
is, the smaller the value is. The darker the color is, the larger the value is.

Some heat maps use the warmness of the color intensity. The closer the color
to blue, the smaller the value is. The closer the color to red, the larger the value is. 

### Latency Heat Maps

Perf engineers collect the disk I/O latency every second. It's helpful for analyzing when rendering the latency data as heat maps.

![disk I/O latency](/static/images/heatmap-disk-io-latency.png)

However, sampling performance data on OS can be expensive! In term of the data collecting
for the heat maps, it's always good to reduce time interval and choose proper bucket.

In general, the latency heat map has below three dimensions:

* x-axis: time.
* y-axis: disk I/O latency.
* color intensity: the frequency of disk I/O.

## Conclusions

Heat Maps is a powerful tool for visualizing three-dimensional data. When performing
analysis on latency, offset, utilization over time, don't forget Heat Maps!

## References

* [Wikipedia: Heat Map](https://en.wikipedia.org/wiki/Heat_map)
* [Latency Heat Maps](http://www.brendangregg.com/HeatMaps/latency.html)