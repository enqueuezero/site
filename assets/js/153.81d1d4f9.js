(window.webpackJsonp=window.webpackJsonp||[]).push([[153],{538:function(e,t,a){"use strict";a.r(t);var r=a(54),s=Object(r.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"enqueuezero-techshack-2019-06"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#enqueuezero-techshack-2019-06"}},[e._v("#")]),e._v(" EnqueueZero Techshack 2019-06")]),e._v(" "),a("TechshackHeader"),e._v(" "),a("h2",{attrs:{id:"a-kubernetes-developer-workflow-for-macos"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#a-kubernetes-developer-workflow-for-macos"}},[e._v("#")]),e._v(" A Kubernetes Developer Workflow for MacOS")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://medium.com/@mo_keefe/a-kubernetes-development-workflow-for-macos-8c41669a4518",target:"_blank",rel:"noopener noreferrer"}},[e._v("medium.com"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("This article introduces a set of kube-extended tools for macOS users: kubectx, kubectl alias, krew, skaffold, dive, stern.")]),e._v(" "),a("h2",{attrs:{id:"what-you-need-to-know-gitops"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#what-you-need-to-know-gitops"}},[e._v("#")]),e._v(" WHAT YOU NEED TO KNOW - GitOps")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://www.weave.works/technologies/gitops/",target:"_blank",rel:"noopener noreferrer"}},[e._v("weave.works"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("GitOps is a way to do Continuous Delivery.  It works by using Git as a single source of truth for declarative infrastructure and applications.")]),e._v(" "),a("p",[e._v("Rules:")]),e._v(" "),a("ul",[a("li",[e._v("Everything that can be described must be stored in git.")]),e._v(" "),a("li",[e._v("Kubectl should not be used directly.")]),e._v(" "),a("li",[e._v("Use a Kubernetes controller that follows an operator pattern.")])]),e._v(" "),a("p",[e._v("Below is a typical GitOps flow.")]),e._v(" "),a("ul",[a("li",[e._v("A pull request for a new feature is pushed to GitHub for review.")]),e._v(" "),a("li",[e._v("The code is reviewed and approved by a colleague. After the code is revised, and re-approved it is merged to Git.")]),e._v(" "),a("li",[e._v("The Git merge triggers the CI and build pipeline, runs a series of tests and then eventually builds a new image and deposits to the new image to a registry.")]),e._v(" "),a("li",[e._v('"Deployment Automator"  watches the image registry, notices the image, pulls the new image from the registry and updates its YAML in the config repo.')]),e._v(" "),a("li",[e._v('"Deployment Synchronizer" (installed to the cluster), detects that the cluster is out of date. It pulls the changed manifests from the config repo and deploys the new feature to production.')])]),e._v(" "),a("h2",{attrs:{id:"introducing-aresdb-uber-s-gpu-powered-open-source-real-time-analytics-engine"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#introducing-aresdb-uber-s-gpu-powered-open-source-real-time-analytics-engine"}},[e._v("#")]),e._v(" Introducing AresDB: Uber’s GPU-Powered Open Source, Real-time Analytics Engine")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://eng.uber.com/aresdb/",target:"_blank",rel:"noopener noreferrer"}},[e._v("eng.uber.com"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("AresDB is an open source, real-time analytics engine that leverages an unconventional power source, graphics processing units (GPUs), to enable our analytics to grow at scale. The article describes the design of AresDB.")]),e._v(" "),a("p",[e._v("At a high level, AresDB stores most of its data in host memory (RAM that is connected to CPUs), handling data ingestion using CPUs and data recovery via disks. At query time, AresDB transfers data from host memory to GPU memory for parallel processing on GPU.")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://eng.uber.com/wp-content/uploads/2019/01/image20-1068x605.png",alt:"aresdb architecture"}})]),e._v(" "),a("p",[e._v("AresDB’s architecture supports the following features:")]),e._v(" "),a("ul",[a("li",[e._v("Column-based storage with compression")]),e._v(" "),a("li",[e._v("Real-time upsert with primary key deduplication")]),e._v(" "),a("li",[e._v("GPU powered query processing")])]),e._v(" "),a("h2",{attrs:{id:"from-activemq-to-amazon-mq-why-and-how-we-moved-to-aws-s-managed-solution"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#from-activemq-to-amazon-mq-why-and-how-we-moved-to-aws-s-managed-solution"}},[e._v("#")]),e._v(" From ActiveMQ To Amazon MQ : Why And How We Moved To AWS’s Managed Solution")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://medium.com/bench-engineering/from-activemq-to-amazon-mq-why-and-how-we-moved-to-awss-managed-solution-afeba3ea7e23",target:"_blank",rel:"noopener noreferrer"}},[e._v("medium.com"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("The article describes the solution migrating from self-hosted ActiveMQ to Amazon MQ.")]),e._v(" "),a("h2",{attrs:{id:"kubernetes-failure-stories"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#kubernetes-failure-stories"}},[e._v("#")]),e._v(" Kubernetes Failure Stories")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/hjacobs/kubernetes-failure-stories",target:"_blank",rel:"noopener noreferrer"}},[e._v("github.com"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("A compiled list of links to public failure stories related to Kubernetes. This compilation of failure stories should make it easier for people dealing with Kubernetes operations (SRE, Ops, platform/infrastructure teams) to learn from others and reduce the unknown unknowns of running Kubernetes in production.")]),e._v(" "),a("h2",{attrs:{id:"surviving-on-call-tips-from-a-hosted-graphite-sre"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#surviving-on-call-tips-from-a-hosted-graphite-sre"}},[e._v("#")]),e._v(" Surviving On-Call: Tips from a Hosted Graphite SRE")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://www.hostedgraphite.com/blog/surviving-on-call-tips-from-a-hosted-graphite-sre",target:"_blank",rel:"noopener noreferrer"}},[e._v("hostedgraphite.com"),a("OutboundLink")],1)]),e._v(" "),a("ul",[a("li",[e._v('Set up "Do Not Disturb". The only audible notifications you get are either from close family, phone alarms, Pagerduty notifications or emergency work calls.')]),e._v(" "),a("li",[e._v("Look after yourself while on-call. Grab a snap or have something to eat.")]),e._v(" "),a("li",[e._v("Have Phone / 4G connection, laptop, power bank, backpack prepared.")])]),e._v(" "),a("h2",{attrs:{id:"cnab-packagaging-for-applications-with-multiple-toolchains"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cnab-packagaging-for-applications-with-multiple-toolchains"}},[e._v("#")]),e._v(" CNAB: Packagaging for Applications with Multiple Toolchains")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://speakerdeck.com/garethr/cnab-packagaging-for-applications-with-multiple-toolchains",target:"_blank",rel:"noopener noreferrer"}},[e._v("speakerdeck.com"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("Large organizations have a diversity of toolchains, meaning lots more versions of lots more tools.\nCNAB allows for packaging the tools along with the app they manage.\nIt's not about to create yet another package standard; it's about compatibility between tools.\nCNAB provides compatibility between repositories and registries, makes it easier to integrate any package format.\nIt has below concepts: metadata (bundle.json), on-disk representation (fs layout), execution (oci runtime entrypoint with arguments), and distribution (oci image and distribution specifications).")]),e._v(" "),a("p",[e._v("Key takeaways:")]),e._v(" "),a("ul",[a("li",[e._v("CNAB is a specification. Think MSI or OSI rather than Helm charts.")]),e._v(" "),a("li",[e._v("Early days, but with lots of hacking potential.")])]),e._v(" "),a("h2",{attrs:{id:"distributing-with-distribution-upcoming-changes-to-helm-chart-repositories"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#distributing-with-distribution-upcoming-changes-to-helm-chart-repositories"}},[e._v("#")]),e._v(" Distributing with Distribution: Upcoming Changes to Helm Chart Repositories")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://blog.bacongobbler.com/post/2019-01-25-distributing-with-distribution/index.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("blog.bacongobbler.com"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("The article shows how to store Helm charts in Distribution (also known as Docker Registry v2). Simply put, a Chart Repository is a basic HTTP server that houses an index.yaml file and some packaged charts. Docker’s Distribution project is not just for container images, but for any form of content, including Helm charts.")]),e._v(" "),a("p",[a("code",[e._v("oras")]),e._v(" is an open source project developed during the Helm 3 discussions to push and pull any content from Distribution.")]),e._v(" "),a("p",[e._v("Usage:")]),e._v(" "),a("ol",[a("li",[e._v("Launch Registry locally.")])]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("$ docker run -dp "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("5000")]),e._v(":5000 --restart"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("always --name registry registry:2\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[e._v("Upload any file.")])]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("$ "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("echo")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"hello world!"')]),e._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" helloworld.txt\n$ oras push localhost:5000/helloworld:latest helloworld.txt:text/plain\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[e._v("Download any file.")])]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("$ oras pull localhost:5000/helloworld:latest -t text/plain\n")])])]),a("h2",{attrs:{id:"coroutines-in-c"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#coroutines-in-c"}},[e._v("#")]),e._v(" Coroutines in C")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://www.chiark.greenend.org.uk/~sgtatham/coroutines.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("www.chiark.greenend.org.uk"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("The article describes how coroutine works, from ground up. By introducing the coroutine, we keep the code almost the same, but change the execution flow completely. The basic idea is by using Duff's device.")]),e._v(" "),a("div",{staticClass:"language-c extra-class"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[a("span",{pre:!0,attrs:{class:"token macro property"}},[a("span",{pre:!0,attrs:{class:"token directive-hash"}},[e._v("#")]),a("span",{pre:!0,attrs:{class:"token directive keyword"}},[e._v("define")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token macro-name"}},[e._v("crBegin")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token expression"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("static")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("int")]),e._v(" state"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("switch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),e._v("state"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("case")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("0")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")])])]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token macro property"}},[a("span",{pre:!0,attrs:{class:"token directive-hash"}},[e._v("#")]),a("span",{pre:!0,attrs:{class:"token directive keyword"}},[e._v("define")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token macro-name function"}},[e._v("crReturn")]),a("span",{pre:!0,attrs:{class:"token expression"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),e._v("i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("x"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("do")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v(" state"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("return")]),e._v(" x"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("case")]),e._v(" i"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("while")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")])])]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token macro property"}},[a("span",{pre:!0,attrs:{class:"token directive-hash"}},[e._v("#")]),a("span",{pre:!0,attrs:{class:"token directive keyword"}},[e._v("define")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token macro-name"}},[e._v("crFinish")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token expression"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")])])]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("int")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("void")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("static")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("int")]),e._v(" i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n    crBegin"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("for")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),e._v("i "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v(" i "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("10")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v(" i"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("++")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("\n        "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("crReturn")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n    crFinish"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])])]),a("h2",{attrs:{id:"target-labels-are-for-life-not-just-for-christmas"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#target-labels-are-for-life-not-just-for-christmas"}},[e._v("#")]),e._v(" Target labels are for life, not just for Christmas")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://www.robustperception.io/target-labels-are-for-life-not-just-for-christmas/",target:"_blank",rel:"noopener noreferrer"}},[e._v("www.robustperception.io"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("How should you choose the labels to put on your Prometheus monitoring targets?")]),e._v(" "),a("ul",[a("li",[e._v("Target Labels Should be Constant.")]),e._v(" "),a("li",[e._v("Target Labels should be Minimal.")])]),e._v(" "),a("h2",{attrs:{id:"api-gateways-are-going-through-an-identity-crisis"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#api-gateways-are-going-through-an-identity-crisis"}},[e._v("#")]),e._v(" API Gateways Are Going Through an Identity Crisis")]),e._v(" "),a("p",[a("a",{attrs:{href:"http://blog.christianposta.com/microservices/api-gateways-are-going-through-an-identity-crisis/",target:"_blank",rel:"noopener noreferrer"}},[e._v("blog.christianposta.com"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("API is an explicitly and purposefully defined interface designed to be invoked over a network that enables software developers to get programmatic access to data and functionality within an organization in a controlled and comfortable way. The API-gateway pattern is about curating an API for more optimal usage by different classes of consumers.")]),e._v(" "),a("h2",{attrs:{id:"journey-to-event-driven-part-1-why-event-first-thinking-changes-everything"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#journey-to-event-driven-part-1-why-event-first-thinking-changes-everything"}},[e._v("#")]),e._v(" Journey to Event Driven – Part 1: Why Event-First Thinking Changes Everything")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://www.confluent.io/blog/journey-to-event-driven-part-1-why-event-first-thinking-changes-everything",target:"_blank",rel:"noopener noreferrer"}},[e._v("www.confluent.io"),a("OutboundLink")],1)]),e._v(" "),a("ul",[a("li",[e._v("Why do events matters? There has been a revolution; organizations must become real time; to become real time, they must become event driven. The value of events is that a sequence of related events represent behavior.")]),e._v(" "),a("li",[e._v("Two patterns:\n"),a("ul",[a("li",[e._v("Event-first patterns, sending out FACTS.")]),e._v(" "),a("li",[e._v("Event-command patterns, sending out COMMANDS.")])])]),e._v(" "),a("li",[e._v("The cost of the event-first approach\n"),a("ul",[a("li",[e._v("Need to support traceability, failure paths, scaling and explanation about why things have gone wrong.")])])]),e._v(" "),a("li",[e._v("Benefits of the event-first approach\n"),a("ul",[a("li",[e._v("Decoupling")]),e._v(" "),a("li",[e._v("Encapsulation")]),e._v(" "),a("li",[e._v("Inverted knowledge")]),e._v(" "),a("li",[e._v("Evolutionary change")]),e._v(" "),a("li",[e._v("Event sourcing")])])])]),e._v(" "),a("h2",{attrs:{id:"overload-control-for-scaling-wechat-microservices"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#overload-control-for-scaling-wechat-microservices"}},[e._v("#")]),e._v(" Overload control for scaling WeChat microservices")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://blog.acolyer.org/2018/11/16/overload-control-for-scaling-wechat-microservices/",target:"_blank",rel:"noopener noreferrer"}},[e._v("blog.acolyer.org"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("The paper describes the design of the battle hardened overload control system DAGOR that has been in production at WeChat for five years.")]),e._v(" "),a("p",[e._v("Challenges:")]),e._v(" "),a("ul",[a("li",[e._v("The backend has over 3k services, including instant messaging, social networking, mobile payment, and third-party authorization.")]),e._v(" "),a("li",[e._v("The platform sees between 10"),a("sup",[e._v("10")]),e._v(" to 10"),a("sup",[e._v("11")]),e._v(" external requests per day, fanning more services requests such that the WeChat backend as a whole needs to handle hundreds of millions of requests per second.")]),e._v(" "),a("li",[e._v("The microservices system runs over 20k machines, and the number is increasing.")]),e._v(" "),a("li",[e._v("There are a thousand system changes per day on average.")]),e._v(" "),a("li",[e._v("At certain times of year (e.g. around the Chinese Lunar New Year) peak workload can rise up to 10x the daily average.")])]),e._v(" "),a("p",[e._v("Architecture - 3-tier services:")]),e._v(" "),a("ul",[a("li",[e._v("Entry leap services: front-end services receiving external requests")]),e._v(" "),a("li",[e._v("Shared leap services: middle-tier orchestration services")]),e._v(" "),a("li",[e._v("Basic services: services that don’t fan out to any other services, and thus act as sinks for requests")])]),e._v(" "),a("p",[a("img",{attrs:{src:"https://adriancolyer.files.wordpress.com/2018/11/dagor-fig-1.jpeg",alt:"3-tier services"}})]),e._v(" "),a("p",[e._v("WeChat’s overload control system is called DAGOR. It aims to provide overload control to all services and thus is designed to be service agnostic.")]),e._v(" "),a("ul",[a("li",[e._v("For overload detection, DAGOR uses the average waiting time of requests in the pending queue (i.e., queuing time).")]),e._v(" "),a("li",[e._v("Once overload is detected, a curated feature priority table is used for dropping some requests. It adds a second layer of admission control based on user-id. Considering a total number of 128 levels, when overload control is set to business priority level n, all requests from levels n+1 will be dropped.")])]),e._v(" "),a("p",[a("img",{attrs:{src:"https://adriancolyer.files.wordpress.com/2018/11/dagor-fig-4.jpeg",alt:"drop requests"}})]),e._v(" "),a("p",[e._v("Lesson Learned:")]),e._v(" "),a("ul",[a("li",[e._v("Overload control in a large-scale microservice architecture must be decentralized and autonomous in each service")]),e._v(" "),a("li",[e._v("Overload control should take into account a variety of feedback mechanisms (e.g. DAGOR’s collaborative admission control) rather than relying solely on open-loop heuristics.")]),e._v(" "),a("li",[e._v("Overload control design should be informed by profiling the processing behaviour of your actual workloads.")])]),e._v(" "),a("h2",{attrs:{id:"stranglerapplication"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#stranglerapplication"}},[e._v("#")]),e._v(" StranglerApplication")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://www.martinfowler.com/bliki/StranglerApplication.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("martinfowler.com"),a("OutboundLink")],1)]),e._v(" "),a("p",[a("img",{attrs:{src:"https://www.martinfowler.com/bliki/images/stranglerApplication/11090068.jpg",alt:"stranger"}})]),e._v(" "),a("p",[e._v("^ Over many years the huge strangler vines seed in the upper branches of a host tree, grow into fantastic and beautiful shapes, meanwhile strangling and killing the host.")]),e._v(" "),a("p",[e._v("The metaphor is, instead of making a new system that replace the existing one, an alternative route is to gradually create a new system around the edges of the old, letting it grow slowly over several years until the old system is strangled.")]),e._v(" "),a("p",[e._v("The fundamental strategy is EventInterception, which can be used to gradually move functionality to the strangler and to enable AssetCapture.")]),e._v(" "),a("p",[e._v("There's another important idea here - when designing a new application you should design it in such a way as to make it easier for it to be strangled in the future.")]),e._v(" "),a("h2",{attrs:{id:"git-history"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-history"}},[e._v("#")]),e._v(" Git History")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://githistory.xyz/",target:"_blank",rel:"noopener noreferrer"}},[e._v("githistory.xyz"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("Quickly browse the history of any GitHub file:")]),e._v(" "),a("ol",[a("li",[e._v("Replace github.com with github.githistory.xyz in any file url")]),e._v(" "),a("li",[e._v("There's no step two")])]),e._v(" "),a("p",[a("img",{attrs:{src:"https://githistory.xyz/static/media/demo.165514d4.gif",alt:"githistory.xyz"}})]),e._v(" "),a("h2",{attrs:{id:"dotfile-madness"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#dotfile-madness"}},[e._v("#")]),e._v(" Dotfile madness")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://0x46.net/thoughts/2019/02/01/dotfile-madness/",target:"_blank",rel:"noopener noreferrer"}},[e._v("0x46.net"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v('"My own home directory contains 25 ordinary files and 144 hidden files." This particular problem has been noticed and solved a long time ago with the creation of '),a("a",{attrs:{href:"https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("XDG Base Directory Specification"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("p",[e._v("Using the standard is very simple. Read the relevant environment variable and use the default paths defined by the standard if it is missing. You should then append a program-specific directory name to it and create the entire directory tree to store your data.")])],1)}),[],!1,null,null,null);t.default=s.exports}}]);