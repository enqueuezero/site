(window.webpackJsonp=window.webpackJsonp||[]).push([[92],{478:function(e,a,t){"use strict";t.r(a);var r=t(54),s=Object(r.a)({},(function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"heat-maps"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#heat-maps"}},[e._v("#")]),e._v(" Heat Maps")]),e._v(" "),t("p"),t("div",{staticClass:"table-of-contents"},[t("ul",[t("li",[t("a",{attrs:{href:"#overview"}},[e._v("Overview")])]),t("li",[t("a",{attrs:{href:"#uses"}},[e._v("Uses")])]),t("li",[t("a",{attrs:{href:"#solutions"}},[e._v("Solutions")]),t("ul",[t("li",[t("a",{attrs:{href:"#grafana-heatmap-panel"}},[e._v("Grafana Heatmap Panel")])]),t("li",[t("a",{attrs:{href:"#dtrace-ftrace-ebpf"}},[e._v("DTrace/ftrace/eBPF")])])])]),t("li",[t("a",{attrs:{href:"#patterns"}},[e._v("Patterns")]),t("ul",[t("li",[t("a",{attrs:{href:"#three-dimensional-data"}},[e._v("Three-Dimensional Data")])]),t("li",[t("a",{attrs:{href:"#color-intensity"}},[e._v("Color Intensity")])]),t("li",[t("a",{attrs:{href:"#latency-heat-maps"}},[e._v("Latency Heat Maps")])])])]),t("li",[t("a",{attrs:{href:"#conclusions"}},[e._v("Conclusions")])]),t("li",[t("a",{attrs:{href:"#references"}},[e._v("References")])])])]),t("p"),e._v(" "),t("h2",{attrs:{id:"overview"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[e._v("#")]),e._v(" Overview")]),e._v(" "),t("p",[e._v("Heat maps are used in 3D matrix visualization. It represents matrix data as color blocks\nin the table. The typical use of the heat maps is by using x and y-axis for two dimensions\nand color intensity for the third. The x and y-axis are often latency, offset, utilization,\nand the third is often time.")]),e._v(" "),t("p",[t("img",{attrs:{src:"/static/images/heatmap-gf-panel.jpg",alt:"heatmap panel"}})]),e._v(" "),t("p",[e._v("It reveals system behavior: finding distribution models,\nbottlenecks, outliers, hot spots, etc.")]),e._v(" "),t("p",[t("img",{attrs:{src:"https://upload.wikimedia.org/wikipedia/commons/4/4d/MH370_location_probability_heat_map_per_DST_Group_analysis.jpg",alt:"heatmap mh370"}})]),e._v(" "),t("span",{staticStyle:{"font-size":"0.5rem",color:"grey"}},[e._v("\nMH370 location probability heat map per DST Group analysis\n")]),e._v(" "),t("h2",{attrs:{id:"uses"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#uses"}},[e._v("#")]),e._v(" Uses")]),e._v(" "),t("ul",[t("li",[e._v("Heatmap is one of the fundamental data visualization forms for web analysis,\nclick behavior analysis, etc.")]),e._v(" "),t("li",[e._v("Heatmap is used in the performance analysis in the operating system or low-level\nsoftware.")]),e._v(" "),t("li",[e._v("Heatmap is often as one of the built-in chart types in the monitoring system, for\nexample, "),t("a",{attrs:{href:"http://docs.grafana.org/features/panels/heatmap/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Grafana Heatmap Panel"),t("OutboundLink")],1),e._v(".")])]),e._v(" "),t("h2",{attrs:{id:"solutions"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#solutions"}},[e._v("#")]),e._v(" Solutions")]),e._v(" "),t("h3",{attrs:{id:"grafana-heatmap-panel"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#grafana-heatmap-panel"}},[e._v("#")]),e._v(" Grafana Heatmap Panel")]),e._v(" "),t("p",[e._v("The Heatmap panel allows you to view histograms over time.")]),e._v(" "),t("h3",{attrs:{id:"dtrace-ftrace-ebpf"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#dtrace-ftrace-ebpf"}},[e._v("#")]),e._v(" DTrace/ftrace/eBPF")]),e._v(" "),t("p",[t("a",{attrs:{href:"https://github.com/brendangregg/HeatMap",target:"_blank",rel:"noopener noreferrer"}},[e._v("brendangregg/HeatMap"),t("OutboundLink")],1),e._v(" can convert\nthe sample data collected by performance tracing tools like DTrace, ftrace, eBPG into a SVG file.")]),e._v(" "),t("h2",{attrs:{id:"patterns"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#patterns"}},[e._v("#")]),e._v(" Patterns")]),e._v(" "),t("h3",{attrs:{id:"three-dimensional-data"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#three-dimensional-data"}},[e._v("#")]),e._v(" Three-Dimensional Data")]),e._v(" "),t("p",[e._v("In the bar chart, you show a two-dimensional data in x-series and y-series.\nFor example, below chart shows the frequency of letters in English words.")]),e._v(" "),t("p",[t("img",{attrs:{src:"/static/images/heatmap-barchart.png",alt:"bar chart"}})]),e._v(" "),t("p",[e._v("Heat maps can show three-dimensional data. You can think of the heat map as a\nseries of bar charts compacting in one table over time.")]),e._v(" "),t("p",[t("img",{attrs:{src:"http://docs.grafana.org/img/docs/v43/heatmap_histogram_over_time.png",alt:""}})]),e._v(" "),t("h3",{attrs:{id:"color-intensity"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#color-intensity"}},[e._v("#")]),e._v(" Color Intensity")]),e._v(" "),t("p",[e._v("The color intensity signifies the value of the data.")]),e._v(" "),t("p",[e._v("Some heat maps use the darkness of the color intensity. The lighter the color\nis, the smaller the value is. The darker the color is, the larger the value is.")]),e._v(" "),t("p",[e._v("Some heat maps use the warmness of the color intensity. The closer the color\nto blue, the smaller the value is. The closer the color to red, the larger the value is.")]),e._v(" "),t("h3",{attrs:{id:"latency-heat-maps"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#latency-heat-maps"}},[e._v("#")]),e._v(" Latency Heat Maps")]),e._v(" "),t("p",[e._v("Perf engineers collect the disk I/O latency every second. It's helpful for analyzing when rendering the latency data as heat maps.")]),e._v(" "),t("p",[t("img",{attrs:{src:"/static/images/heatmap-disk-io-latency.png",alt:"disk I/O latency"}})]),e._v(" "),t("p",[e._v("However, sampling performance data on OS can be expensive! In term of the data collecting\nfor the heat maps, it's always good to reduce time interval and choose proper bucket.")]),e._v(" "),t("p",[e._v("In general, the latency heat map has below three dimensions:")]),e._v(" "),t("ul",[t("li",[e._v("x-axis: time.")]),e._v(" "),t("li",[e._v("y-axis: disk I/O latency.")]),e._v(" "),t("li",[e._v("color intensity: the frequency of disk I/O.")])]),e._v(" "),t("h2",{attrs:{id:"conclusions"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#conclusions"}},[e._v("#")]),e._v(" Conclusions")]),e._v(" "),t("p",[e._v("Heat Map is a powerful tool for visualizing three-dimensional data. When performing\nanalysis on latency, offset, utilization over time, don't forget Heat Maps!")]),e._v(" "),t("h2",{attrs:{id:"references"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#references"}},[e._v("#")]),e._v(" References")]),e._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://en.wikipedia.org/wiki/Heat_map",target:"_blank",rel:"noopener noreferrer"}},[e._v("Wikipedia: Heat Map"),t("OutboundLink")],1)]),e._v(" "),t("li",[t("a",{attrs:{href:"http://www.brendangregg.com/HeatMaps/latency.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("Latency Heat Maps"),t("OutboundLink")],1)])])])}),[],!1,null,null,null);a.default=s.exports}}]);