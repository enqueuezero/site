(window.webpackJsonp=window.webpackJsonp||[]).push([[73],{462:function(e,t,s){"use strict";s.r(t);var i=s(54),n=Object(i.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"so-what-is-design"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#so-what-is-design"}},[e._v("#")]),e._v(" So, What is Design?")]),e._v(" "),s("p",[e._v("Every software looks different and have different shape. For example, we can manage HTTP connections by either Apache or Nginx; despite of the same functionality, both software have completely different interfaces, internal components, etc. The "),s("em",[e._v("software design")]),e._v(" is then used to capture such differences.")]),e._v(" "),s("p",[e._v("Software design is as a blueprint for the software, a specification of a software artifact. Each software design has a purpose - to solve one or more sets of problems. Software design outlines the fundamental structure of the software and illustrates the constraints and disciplines of creating such a structure.")]),e._v(" "),s("p",[e._v("The structure of the software is among the critical part of the software design. It consists of components and connectors between components. It's common the structure have different views, just as a 3d model can be projected to several 2d graphics in different directions.")]),e._v(" "),s("p",[e._v("Software design also includes some important architectural decisions. It consists of a set of decisions that explains why the software is as-is, what constraints restrict the software, what parts are hard to change, etc.")]),e._v(" "),s("p",[e._v("When design the software, we think from a higher level than code implementations, for example, what interfaces is the best for providing user friendly experience, how the components to be connected can make the system easy to understand, develop, maintain, deploy and use.")]),e._v(" "),s("hr"),e._v(" "),s("p",[s("strong",[e._v("Case Study: Redis.")]),e._v(" Redis is an in-memory, key-value database.  We can describe the design of Redis by listing components, connectors, and decisions one by one.")]),e._v(" "),s("ul",[s("li",[e._v("A software that uses Redis consists of two components: "),s("em",[e._v("Redis server")]),e._v(" and  "),s("em",[e._v("Redis client")]),e._v(" (List critical components). Redis clients get or set data. Redis server stores data in-memory by a single-threaded process. (Describe the purpose of the each component). In-between Redis client and Redis server, there is a "),s("em",[e._v("request-response")]),e._v(" connector (Describe the connector between components).")]),e._v(" "),s("li",[e._v("All data managed by Redis are in-memory, thus data will be lost when Redis process dies (Specify a decision and its consequence). To overcome it, Redis provides three persistances that dump data to disk: RDB, AOF, and SAVE command. RDB makes a full copy of all data via "),s("code",[e._v("fsync()")]),e._v(" periodically in another thread. AOF logs all the write commands received by the Redis server in an append-only fasion. You can also force Redis server taking RDB snapshot anytime by sending "),s("code",[e._v("SAVE")]),e._v(" command via the connector. (Specify another decision)")]),e._v(" "),s("li",[e._v("... (There are more decisions to list, for example, key eviction policies, Pub/Sub, Lua scripting, partitioning, transaction, etc)")]),e._v(" "),s("li",[e._v("Redis is maintained and developed by Salvatore Sanfilippo. But there are more people involved, providing ideas, testing, and bug reporting through code commiting, GitHub issue and mainling list discussions, etc. All these people is playing or played the role of software architect in making Redis. Redis is released under BSD license (Describe who makes the software).")])]),e._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),s("p",[e._v('Sometimes, people use the term "architecture" as the replacement of "design". They don\'t have much difference.')])])])}),[],!1,null,null,null);t.default=n.exports}}]);