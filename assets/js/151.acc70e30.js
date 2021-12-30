(window.webpackJsonp=window.webpackJsonp||[]).push([[151],{536:function(e,t,a){"use strict";a.r(t);var r=a(54),s=Object(r.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"enqueuezero-techshack-2019-05"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#enqueuezero-techshack-2019-05"}},[e._v("#")]),e._v(" EnqueueZero Techshack 2019-05")]),e._v(" "),a("TechshackHeader"),e._v(" "),a("h2",{attrs:{id:"our-software-dependency-problem"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#our-software-dependency-problem"}},[e._v("#")]),e._v(" Our Software Dependency Problem")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://research.swtch.com/deps",target:"_blank",rel:"noopener noreferrer"}},[e._v("swtch.com"),a("OutboundLink")],1)]),e._v(" "),a("ul",[a("li",[e._v("A dependency is additional code that you want to call from your program. Adding a dependency avoids repeating work already done: designing, writing, testing, debugging, and maintaining a specific unit of code.")]),e._v(" "),a("li",[e._v("A dependency manager (sometimes called a package manager) automates the downloading and installation of dependency packages.")]),e._v(" "),a("li",[e._v("When consuming software dependencies,\n"),a("ul",[a("li",[e._v("Recognize the problem.")]),e._v(" "),a("li",[e._v("Establish best practices for today.")]),e._v(" "),a("li",[e._v("Develop better dependency technology for tomorrow.")])])])]),e._v(" "),a("h2",{attrs:{id:"systemd-as-tragedy"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#systemd-as-tragedy"}},[e._v("#")]),e._v(" Systemd as tragedy")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://lwn.net/SubscriberLink/777595/a71362cc65b1c271/",target:"_blank",rel:"noopener noreferrer"}},[e._v("lwn.net"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("Historically, people had opinionated voices about systemd. Some said it's against UNIX philosophy of doing one thing do it right; some said it supports only Linux. The article discussed these from historical and functional views.")]),e._v(" "),a("h2",{attrs:{id:"finding-kafka-s-throughput-limit-in-dropbox-infrastructure"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#finding-kafka-s-throughput-limit-in-dropbox-infrastructure"}},[e._v("#")]),e._v(" Finding Kafka’s throughput limit in Dropbox infrastructure")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://blogs.dropbox.com/tech/2019/01/finding-kafkas-throughput-limit-in-dropbox-infrastructure/",target:"_blank",rel:"noopener noreferrer"}},[e._v("blogs.dropbox.com"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("This article presented a systematic approach to understanding Kafka’s limits.")]),e._v(" "),a("ol",[a("li",[e._v("Use spark to host Kafka clients, producing and consuming traffic on an arbitrary scale.")]),e._v(" "),a("li",[e._v("Set up three Kafka clusters of different sizes")]),e._v(" "),a("li",[e._v("Create a Kafka topic to generate the producing and consuming traffic for the test and spread the traffic evenly across brokers.")]),e._v(" "),a("li",[e._v("Create the testing topic with ten times as many partitions as the number of brokers. Each broker has a  leader for exactly ten partitions.")])]),e._v(" "),a("p",[e._v("There is a rich set of factors that can affect a Kafka cluster’s workload: number of producers, number of consumer groups, initial consumer offsets, message per second, size of each message, and the number of topics and partitions involved, to name a few. But the dominant factors to consider are the basic components of throughout: the number of messages per second (mps) produced and the byte size per message (bpm).")]),e._v(" "),a("h2",{attrs:{id:"highly-available-mysql-clusters-at-wepay"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#highly-available-mysql-clusters-at-wepay"}},[e._v("#")]),e._v(" Highly Available MySQL Clusters at WePay")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://wecode.wepay.com/posts/highly-available-mysql-clusters-at-wepay",target:"_blank",rel:"noopener noreferrer"}},[e._v("wecode.wepay.com"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("Core components are Orchestrator, Consul, HAProxy, and pt-heartbeat.")]),e._v(" "),a("ul",[a("li",[e._v("Orchestrator is for detecting failures and role transition.")]),e._v(" "),a("li",[e._v("There are two layers of HAProxy.\n"),a("ul",[a("li",[e._v("The first layer of HAProxy sits on the client machines and connects to the remote (second layer) of HAProxy.")]),e._v(" "),a("li",[e._v("The second layer of HAProxy is distributed across multiple Google zones that connect to the same set of MySQL servers")])])]),e._v(" "),a("li",[e._v("Consul is the KV store.")]),e._v(" "),a("li",[e._v("Heartbeat runs on every host.")])]),e._v(" "),a("h2",{attrs:{id:"cockroachdb-s-consistency-model"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cockroachdb-s-consistency-model"}},[e._v("#")]),e._v(" CockroachDB's Consistency Model")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://www.cockroachlabs.com/blog/consistency-model/",target:"_blank",rel:"noopener noreferrer"}},[e._v("cockroachlabs.com"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("CockroachDB’s consistency model is more than serializable, less than strict serializability. CockroachDB implements and only implements the serializable isolation level for transactions, as specified by the SQL standard. (Quote crdb authors, any lower level is just asking for pain.)")]),e._v(" "),a("p",[e._v("It’s probably easiest to qualify it by understanding the anomaly that it allows — “causal reverse” — and the limited set of circumstances under which it can occur. In the majority of cases where one might be wondering about the semantics of reads and writes in CRDB, the slogan “no stale reads” should settle most discussions.")]),e._v(" "),a("p",[e._v("Further reading: CockroachDB on RocksDB "),a("a",{attrs:{href:"https://www.cockroachlabs.com/blog/cockroachdb-on-rocksd/",target:"_blank",rel:"noopener noreferrer"}},[e._v("cockroachlabs.com"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("h2",{attrs:{id:"it-s-time-to-move-on-from-two-phase-commit"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#it-s-time-to-move-on-from-two-phase-commit"}},[e._v("#")]),e._v(" It’s Time to Move on from Two-Phase Commit")]),e._v(" "),a("p",[a("a",{attrs:{href:"http://dbmsmusings.blogspot.com/2019/01/its-time-to-move-on-from-two-phase.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("dbmsmusings.blogspot.com"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("However, in modern times, where many systems need to scale to multiple machines that can fail independently of each other, these assumptions require expensive coordination and commit protocols such as 2PC. The performance problems of 2PC have been a major force behind the rise of non-ACID compliant systems that give up important guarantees to achieve better scalability, availability, and performance. 2PC is just too slow --- it increases the latency of all transactions --- not only by the length of the protocol itself but also by preventing transactions that access the same set of data from running concurrently. 2PC also limits scalability (by reducing concurrency) and availability (the blocking problem we discussed above). The way forward is clear: we need to reconsider antiquated assumptions when designing our systems and say “good-bye” to two-phase commit!")]),e._v(" "),a("h2",{attrs:{id:"selecting-a-software-architecture"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#selecting-a-software-architecture"}},[e._v("#")]),e._v(" Selecting a Software Architecture")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://www.javacodegeeks.com/2019/01/selecting-software-architecture.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("www.javacodegeeks.com"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("The architecture defines the model of the software, how it will function and define the problems you might encounter when it comes to implementation, for major paradigms are layered architecture, microservices, SOA, event sourcing.")]),e._v(" "),a("h2",{attrs:{id:"a-lifetime-of-systems-thinking"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#a-lifetime-of-systems-thinking"}},[e._v("#")]),e._v(" A Lifetime of Systems Thinking")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://thesystemsthinker.com/a-lifetime-of-systems-thinking/",target:"_blank",rel:"noopener noreferrer"}},[e._v("thesystemsthinker.com"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("Here is a very small sample of the obvious things I have found to be wrong:")]),e._v(" "),a("ul",[a("li",[e._v("Improving the performance of the parts of a system taken separately will necessarily improve the performance of the whole.")]),e._v(" "),a("li",[e._v("Problems are disciplinary.")]),e._v(" "),a("li",[e._v("The best thing that can be done to a problem is to solve it.")])]),e._v(" "),a("h2",{attrs:{id:"lessons-learned-scaling-postgresql-database-to-1-2bn-records-month"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#lessons-learned-scaling-postgresql-database-to-1-2bn-records-month"}},[e._v("#")]),e._v(" Lessons learned scaling PostgreSQL database to 1.2bn records/month")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://medium.com/@gajus/lessons-learned-scaling-postgresql-database-to-1-2bn-records-month-edc5449b3067",target:"_blank",rel:"noopener noreferrer"}},[e._v("medium.com"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v('With so many options like Google Cloud SQL, Amazon RDS, Aiven.io, "All this time I was trying to avoid the unavoidable - managing the database ourselves. Now we are renting our hardware and maintain the database.".')]),e._v(" "),a("p",[e._v("Advantages:")]),e._v(" "),a("ul",[a("li",[e._v("Control the pg version.")]),e._v(" "),a("li",[e._v("Install any pg plugin.")]),e._v(" "),a("li",[e._v("A lot better hardware than any cloud providers could offer.")]),e._v(" "),a("li",[e._v("Cheaper enough to hire a freelance DBA to check in.")])]),e._v(" "),a("p",[e._v("The other PG takeaways:")]),e._v(" "),a("ul",[a("li",[e._v("PostgreSQL materialized views are a great feature for small datasets.")]),e._v(" "),a("li",[e._v("Plan by using a combination of granular materialized views and materialized table columns as the dataset grows.")])]),e._v(" "),a("p",[e._v("Conclusions:")]),e._v(" "),a("ul",[a("li",[e._v("For a simple database that will not grow into billions of records and does not require custom extensions, choose cloud service.")]),e._v(" "),a("li",[e._v("Plan for what features you will require in the future.")])]),e._v(" "),a("h2",{attrs:{id:"programming-paradigms-for-dummies-what-every-programmer-should-know"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#programming-paradigms-for-dummies-what-every-programmer-should-know"}},[e._v("#")]),e._v(" Programming paradigms for dummies: what every programmer should know")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://blog.acolyer.org/2019/01/25/programming-paradigms-for-dummies-what-every-programmer-should-know/",target:"_blank",rel:"noopener noreferrer"}},[e._v("blog.acolyer.org"),a("OutboundLink")],1),e._v(" | Concepts, Techniques, and Models of Computer Programming: "),a("a",{attrs:{href:"https://www.info.ucl.ac.be/~pvr/book.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("www.info.ucl.ac.be"),a("OutboundLink")],1)]),e._v(" "),a("ul",[a("li",[e._v("Programming paradigms are approaches based on a mathematical theory or a particular set of principles, each paradigm supporting a set of concepts.")])]),e._v(" "),a("p",[a("img",{attrs:{src:"https://adriancolyer.files.wordpress.com/2019/01/Programming-paradigms-Fig-2.png",alt:"paradigms"}})]),e._v(" "),a("ul",[a("li",[e._v("Solving a programming problem requires choosing the right concepts, and many problems require different sets of concepts for different parts. Moreover, many programs have to solve more than one problem! Missing a paradigm for the problem could let your program ugly.")])]),e._v(" "),a("p",[a("img",{attrs:{src:"https://adriancolyer.files.wordpress.com/2019/01/Programming-paradigms-Fig-3.jpeg",alt:"state"}}),e._v(" "),a("img",{attrs:{src:"https://adriancolyer.files.wordpress.com/2019/01/Programming-paradigms-Fig-14.jpeg",alt:"The four ways of organize a data abstraction"}})]),e._v(" "),a("ul",[a("li",[e._v("Each paradigm has its own “soul” that can only be understood by actually using the paradigm. We recommend that you explore the paradigms by actually programming in them.")])]),e._v(" "),a("h2",{attrs:{id:"high-performance-in-python-with-zero-copy-and-the-buffer-protocol"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#high-performance-in-python-with-zero-copy-and-the-buffer-protocol"}},[e._v("#")]),e._v(" High-Performance in Python with Zero-Copy and the Buffer Protocol")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://julien.danjou.info/high-performance-in-python-with-zero-copy-and-the-buffer-protocol/",target:"_blank",rel:"noopener noreferrer"}},[e._v("julien.danjou.info"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("The takeaway is by using function "),a("code",[e._v("memoryview(bytes)")]),e._v(" to avoid copying. The theory is a new memoryview object, by implementing the buffer protocol (PEP 3118), references the original object memory.")]),e._v(" "),a("p",[e._v("Basic usage is like below. The "),a("code",[e._v("slice")]),e._v(" variable holds a slice of original read data.")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("content = source.read(1024 * 10000)\nslice = memoryview(content)[1024:]\n")])])]),a("h2",{attrs:{id:"postgresql-on-kubernetes-the-right-way"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#postgresql-on-kubernetes-the-right-way"}},[e._v("#")]),e._v(" PostgreSQL on Kubernetes the Right Way")]),e._v(" "),a("p",[e._v("Part I: "),a("a",{attrs:{href:"https://medium.com/kokster/postgresql-on-kubernetes-the-right-way-part-one-d174ee8a56e3",target:"_blank",rel:"noopener noreferrer"}},[e._v("medium.com"),a("OutboundLink")],1),e._v(" | Part II: "),a("a",{attrs:{href:"https://medium.com/kokster/postgresql-on-kubernetes-the-right-way-part-two-1a981d5fb747",target:"_blank",rel:"noopener noreferrer"}},[e._v("medium.com"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("Challenges:")]),e._v(" "),a("ul",[a("li",[e._v("High Availability")]),e._v(" "),a("li",[e._v("Load Balancing")]),e._v(" "),a("li",[e._v("Synchronization Between Instances")]),e._v(" "),a("li",[e._v("Scaling Up and Down")]),e._v(" "),a("li",[e._v("Automated Backup, Recovery from Backup")]),e._v(" "),a("li",[e._v("Rolling Upgrades/Downgrades")]),e._v(" "),a("li",[e._v("Health Monitoring, Debugging")])]),e._v(" "),a("p",[e._v("PostgreSQL follows the master-slave pattern. There’s a single authoritative primary server (master) and some number of standby servers (slaves) that mirror the primary. This distributed architecture serves two purposes:")]),e._v(" "),a("ul",[a("li",[e._v("Failover — If the primary fails, a standby can take its place.")]),e._v(" "),a("li",[e._v("Load Balancing — Standbys can handle read-only requests, reducing the load on the primary.")])]),e._v(" "),a("p",[e._v("Additionally, the primary continuously archives its write-ahead log (WAL) and periodically creates backups of its entire state (called base backups).")]),e._v(" "),a("p",[e._v("In Kubernetes, there are Primary and Standby Pods")]),e._v(" "),a("ul",[a("li",[e._v("Primary — Typically only one instance, used for reads and writes.")]),e._v(" "),a("li",[e._v("Standby — Many of these, used for reads, can be promoted to primary")])]),e._v(" "),a("h2",{attrs:{id:"scaling-azure-functions-to-make-500-000-requests-to-weather-com-in-under-3-minutes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#scaling-azure-functions-to-make-500-000-requests-to-weather-com-in-under-3-minutes"}},[e._v("#")]),e._v(" Scaling Azure Functions to Make 500,000 Requests to Weather.com in Under 3 Minutes")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://madeofstrings.com/2019/01/09/scaling-azure-functions-to-make-500000-requests-to-weather-com-in-under-3-minutes/",target:"_blank",rel:"noopener noreferrer"}},[e._v("madeofstrings.com"),a("OutboundLink")],1)]),e._v(" "),a("ul",[a("li",[e._v("The challenges: pull 50k data and complete the process in 5 min; repeat every 15 min.")]),e._v(" "),a("li",[e._v("Overall Design:\n"),a("img",{attrs:{src:"https://madeofstrings.files.wordpress.com/2019/01/weather-highlevel-steps.png",alt:"overall design"}}),e._v(" "),a("ul",[a("li",[e._v("Coordinates are stored in Azure Table Storage. Records are immutable.")]),e._v(" "),a("li",[e._v("Durable Functions are used to populate a group of Storage Queues with the coordinates from the table. Each message represents a pending request to the weather service.")]),e._v(" "),a("li",[e._v("An Azure Function is invoked for each message in the queue.")]),e._v(" "),a("li",[e._v("Requests are made to the 3rd party service to get the forecast details.")]),e._v(" "),a("li",[e._v("The results of the forecast requests are published to Event Hubs for further processing.")])])]),e._v(" "),a("li",[e._v("To make the queue-triggered function run faster,  the loads (data fetching requests) are distributed to multiple queues.\n"),a("img",{attrs:{src:"https://madeofstrings.files.wordpress.com/2019/01/weather-load-balance.png",alt:"load balancing"}})]),e._v(" "),a("li",[e._v("Data partitioning: In short, every set of 1,000 records was given a unique partition key that had the following naming convention: {queue-number}-{partition-count}. So the first 1,000 records for queue #1 would have the partition key 1-0. The next 1,000 records would be assigned the key 1-1.")])]),e._v(" "),a("h2",{attrs:{id:"serverless-at-scale-serving-stackoverflow-like-traffic"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#serverless-at-scale-serving-stackoverflow-like-traffic"}},[e._v("#")]),e._v(" Serverless at Scale: Serving StackOverflow-like Traffic")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://blog.binaris.com/serverless-at-scale/",target:"_blank",rel:"noopener noreferrer"}},[e._v("blog.binaris.com"),a("OutboundLink")],1)]),e._v(" "),a("ul",[a("li",[e._v("Function-as-a-Service is a great model to build applications that can work for low-usage scenarios, high-load applications, and even spiky workloads.")]),e._v(" "),a("li",[e._v("Scalability limits do exist, so if you anticipate high growth in the application’s usage, run a simple load test to see how it behaves.")]),e._v(" "),a("li",[e._v("Always test in combination with your non-serverless dependencies. If you use a database or a third-party service, it’s quite likely they will hit the scalability limit much earlier than the serverless compute.")])]),e._v(" "),a("h2",{attrs:{id:"why-we-use-ruby-on-rails-to-build-gitlab"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#why-we-use-ruby-on-rails-to-build-gitlab"}},[e._v("#")]),e._v(" Why we use Ruby on Rails to build GitLab")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://about.gitlab.com/2018/10/29/why-we-use-rails-to-build-gitlab/",target:"_blank",rel:"noopener noreferrer"}},[e._v("about.gitlab.com"),a("OutboundLink")],1)]),e._v(" "),a("ul",[a("li",[e._v("The Ruby on Rails ecosystem allows you to shape a lot of functionality at a high quality.")]),e._v(" "),a("li",[e._v("There's a great ecosystem around it with gems that can make assumptions about how you're doing things.")]),e._v(" "),a("li",[e._v("Some critical backend components are written in Go, and some frontend components are written in Vue.")]),e._v(" "),a("li",[e._v("In every kitchen you enter, you never know where the knives and plates are located. But with Ruby on Rails, you enter the kitchen and it's always in the same place, and we want to stick to that. (My thought, same rule applies to Django, React, ...)")])]),e._v(" "),a("h2",{attrs:{id:"websocketd-turn-any-program-that-uses-stdin-stdout-into-a-websocket-server-like-inetd-but-for-websockets"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#websocketd-turn-any-program-that-uses-stdin-stdout-into-a-websocket-server-like-inetd-but-for-websockets"}},[e._v("#")]),e._v(" websocketd - Turn any program that uses STDIN/STDOUT into a WebSocket server. Like inetd, but for WebSockets.")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/joewalnes/websocketd",target:"_blank",rel:"noopener noreferrer"}},[e._v("github.com"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("Example script "),a("code",[e._v("count.sh")]),e._v(":")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token shebang important"}},[e._v("#!/bin/bash")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("for")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("((")]),e._v("COUNT "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v(" COUNT "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<=")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("10")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v(" COUNT"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("++")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("))")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("do")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("echo")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$COUNT")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sleep")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("1")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("done")]),e._v("\n")])])]),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("$ websocketd --port"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("8080")]),e._v(" ./count.sh\n")])])]),a("h2",{attrs:{id:"develop-new-features-v-s-maintain"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#develop-new-features-v-s-maintain"}},[e._v("#")]),e._v(" Develop New Features v/s Maintain")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://twitter.com/antirez/status/1088459749287493632",target:"_blank",rel:"noopener noreferrer"}},[e._v("twitter.com"),a("OutboundLink")],1)]),e._v(" "),a("blockquote",[a("p",[e._v("It's a few weeks that I code RESP3 and ACLs without caring much about the issues in the Redis repository. I'm doing my best with ACLs, I like the code and how the feature is exposed from an UX perspective. It's a joy to code, while dealing with issues / PRs is stressful. However there is no way out, from time to time one need to focus on the issues / PRs. I guess that I'm just a better coder than a better maintainer. I'll continue my context switch like in the past years, but for me to don't care about issues from time to time is "),a("em",[e._v("a key thing")]),e._v(". The odd thing is that a project becomes popular because you can write some code and design some things. And suddenly your job becomes checking other people's code and designs: the project ends being less and less about your work quality, unless you say no 99% of times")])])],1)}),[],!1,null,null,null);t.default=s.exports}}]);