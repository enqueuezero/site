(window.webpackJsonp=window.webpackJsonp||[]).push([[86],{474:function(e,t,a){"use strict";a.r(t);var r=a(54),n=Object(r.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"circuit-breaker"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#circuit-breaker"}},[e._v("#")]),e._v(" Circuit Breaker")]),e._v(" "),a("p"),a("div",{staticClass:"table-of-contents"},[a("ul",[a("li",[a("a",{attrs:{href:"#context"}},[e._v("Context")])]),a("li",[a("a",{attrs:{href:"#introduction"}},[e._v("Introduction")])]),a("li",[a("a",{attrs:{href:"#use"}},[e._v("Use")])]),a("li",[a("a",{attrs:{href:"#patterns"}},[e._v("Patterns")]),a("ul",[a("li",[a("a",{attrs:{href:"#state-machine"}},[e._v("State Machine")])]),a("li",[a("a",{attrs:{href:"#state-retention"}},[e._v("State Retention")])])])]),a("li",[a("a",{attrs:{href:"#apis"}},[e._v("APIs")]),a("ul",[a("li",[a("a",{attrs:{href:"#set-and-check"}},[e._v("Set and Check")])])])]),a("li",[a("a",{attrs:{href:"#decorator-pattern"}},[e._v("Decorator Pattern")])]),a("li",[a("a",{attrs:{href:"#future-pattern"}},[e._v("Future Pattern")])]),a("li",[a("a",{attrs:{href:"#solutions"}},[e._v("Solutions")])]),a("li",[a("a",{attrs:{href:"#conclusion"}},[e._v("Conclusion")])]),a("li",[a("a",{attrs:{href:"#references"}},[e._v("References")])])])]),a("p"),e._v(" "),a("h2",{attrs:{id:"context"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#context"}},[e._v("#")]),e._v(" Context")]),e._v(" "),a("p",[e._v("In a distributed system, an application often has at least one upstream system. When upstream is overloaded, or doomed to fail, the application is very likely to be bogged down as well. Such circumstance is called cascading failure.")]),e._v(" "),a("p",[e._v("As an example, we have an application requiring a remote service. Somehow, the remote service is experiencing performance issue and takes very long time to send response back to the application. Meanwhile, in the application side, it's holding all of the connections that get stuck.  Such behavior eventually causes the application overloaded and even the entire system down.")]),e._v(" "),a("p",[e._v("There are several techniques that can solve cascading failures. Circuit Breaker is among one of them.")]),e._v(" "),a("h2",{attrs:{id:"introduction"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#introduction"}},[e._v("#")]),e._v(" Introduction")]),e._v(" "),a("p",[e._v("Circuit Breaker solves the problem based on below assumptions:")]),e._v(" "),a("ul",[a("li",[e._v("Something is better than nothing.\n"),a("ul",[a("li",[e._v("Provide default fallback values.")]),e._v(" "),a("li",[e._v("Provide cached values.")])])]),e._v(" "),a("li",[e._v("Partially degraded is better than entirely crash.\n"),a("ul",[a("li",[e._v("Fail fast for the features that are using functionalities dependent on upstream.")]),e._v(" "),a("li",[e._v("Keep other features all available that are not using functionalities dependent on upstream.")])])])]),e._v(" "),a("h2",{attrs:{id:"use"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#use"}},[e._v("#")]),e._v(" Use")]),e._v(" "),a("ul",[a("li",[e._v("Protect upstream service")]),e._v(" "),a("li",[e._v("Prevent cascading failure")])]),e._v(" "),a("h2",{attrs:{id:"patterns"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#patterns"}},[e._v("#")]),e._v(" Patterns")]),e._v(" "),a("h3",{attrs:{id:"state-machine"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#state-machine"}},[e._v("#")]),e._v(" State Machine")]),e._v(" "),a("p",[e._v("A circuit breaker decorates and monitors a protected function call.  In general, a circuit breaker has a built-in state machine. It implements three types of state: OPEN, CLOSED, and HALF_OPEN.")]),e._v(" "),a("ul",[a("li",[e._v("Circuit breaker goes into OPEN state when upstream service is doomed to fail.")]),e._v(" "),a("li",[e._v("Circuit breaker goes into CLOSED state when upstream service is all good.")]),e._v(" "),a("li",[e._v("Circuit breaker goes into HALF_OPEN state when a timeout timer is expired after going into OPEN state. In such state, Circuit Breaker will try to test if upstream is all good. It switches back to CLOSED state if the answer is yes.")])]),e._v(" "),a("h3",{attrs:{id:"state-retention"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#state-retention"}},[e._v("#")]),e._v(" State Retention")]),e._v(" "),a("p",[e._v("Implementation of the Circuit Breaker needs to retain connection state from upstream. It counts bad state and disallow new requests to upstream when the number of bad state over the threshold.")]),e._v(" "),a("ul",[a("li",[e._v("In a single-node application, the state of the upstream can be retained in memory.")]),e._v(" "),a("li",[e._v("In a multi-node application, the state of upstream can be stored through a persistent storage layer, e.g. a network caching system such as Redis, or local cache such as filesystem.")])]),e._v(" "),a("h2",{attrs:{id:"apis"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#apis"}},[e._v("#")]),e._v(" APIs")]),e._v(" "),a("h3",{attrs:{id:"set-and-check"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#set-and-check"}},[e._v("#")]),e._v(" Set and Check")]),e._v(" "),a("p",[e._v("The following script could be run on a set interval through a daemon or crontab.")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("#!/usr/env/bin python\n\nimport pymysql\nfrom redis import Redis\n\nredis = Redis()\nconnection = None\n\ntry:\n    connection = pymysql.connect(host='localhost',\n                                 port=3306)\n    redis.set('circuit-breaker.mysql', 0)\nexcept pymysql.OperationalError:\n    redis.set('circuit-breaker.mysql', 1)\nfinally:\n    if connection:\n        connection.close()\n")])])]),a("p",[e._v("Usage in application is like below.")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("def get_database_record():\n    if redis.get('circuit-breaker.mysql'):\n        raise ServerInternalError\n    connection = pymysql.connect(host='localhost',\n                                 port=3306)\n    # ...\n")])])]),a("ul",[a("li",[e._v("Advantage:\n"),a("ul",[a("li",[e._v("Simplified application usage.")]),e._v(" "),a("li",[e._v("Minimum instrument on application.")])])]),e._v(" "),a("li",[e._v("Disadvantage:\n"),a("ul",[a("li",[e._v("The check is based on ping result, which is not that accurate.")])])])]),e._v(" "),a("h2",{attrs:{id:"decorator-pattern"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#decorator-pattern"}},[e._v("#")]),e._v(" Decorator Pattern")]),e._v(" "),a("p",[e._v("Circuit breaker can be implemented as a function decorator over the call function. For example, below code has very little semantic change on original code:")]),e._v(" "),a("p",[e._v("Original code:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("def get_database_record():\n    connection = pymysql.connect(host='localhost',\n                                 port=3306)\n    # ...\n\nrecord = get_database_record()\n")])])]),a("p",[e._v("Decorated code:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("@circuit_breaker(\n    failure_threshold_seconds=5,\n    success_threshold_seconds=5,\n    delay_seconds=60,\n    default_value=None,\n)\ndef get_database_record():\n    connection = pymysql.connect(host='localhost',\n                                 port=3306)\n    # ...\n\nrecord = get_database_record.failsafe()\n")])])]),a("p",[e._v("The decorator function "),a("code",[e._v("circuit_breaker")]),e._v(" analyzes the error rate of "),a("code",[e._v("get_database_record")]),e._v(". When it's over the threshold, it returns "),a("code",[e._v("default_value")]),e._v(" instead and prevent the function call from hanging.")]),e._v(" "),a("p",[e._v("Another approach of "),a("code",[e._v("default_value")]),e._v(" is to provide "),a("code",[e._v("fallback_function")]),e._v(" instead. When it's over the threshold, it calls "),a("code",[e._v("fallback_function")]),e._v(" and return the value of it.")]),e._v(" "),a("p",[e._v("Netflix "),a("code",[e._v("Hystrix")]),e._v(" belongs to such pattern.")]),e._v(" "),a("ul",[a("li",[e._v("Advantage\n"),a("ul",[a("li",[e._v("Keep an original function and fail-safety function both.")]),e._v(" "),a("li",[e._v("Accurate")]),e._v(" "),a("li",[e._v("Can auto heal")])])]),e._v(" "),a("li",[e._v("Disadvantage\n"),a("ul",[a("li",[e._v("Increase code complexity.")])])])]),e._v(" "),a("h2",{attrs:{id:"future-pattern"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#future-pattern"}},[e._v("#")]),e._v(" Future Pattern")]),e._v(" "),a("p",[e._v("In the case of asynchronous programming, Circuit Breaker can also be applied with Future style API. For example, vert.x provides below interface:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('CircuitBreaker breaker = CircuitBreaker.create("my-circuit-breaker", vertx,\n    new CircuitBreakerOptions()\n        .setMaxFailures(2.5)\n        .setTimeout(2000)\n        .setFallbackOnFailure(true)\n        .setResetTimeout(10000)\n);\n\nbreaker.execute(future -> {\n  vertx.createHttpClient().getNow(8080, "localhost", "/", response -> {\n    if (response.statusCode() != 200) {\n      future.fail(\'unexpected status code\');\n    } else {\n      response\n          .exceptionHandler(future::fail)\n          .bodyHandler(buffer -> {\n            future.complete(buffer.toString());\n          });\n    }\n  }\n})\n')])])]),a("ul",[a("li",[e._v("Advantage\n"),a("ul",[a("li",[e._v("Accurate")]),e._v(" "),a("li",[e._v("Can auto heal")])])]),e._v(" "),a("li",[e._v("Disadvantage\n"),a("ul",[a("li",[e._v("Increase code complexity.")]),e._v(" "),a("li",[e._v("Callback hell.")])])])]),e._v(" "),a("h2",{attrs:{id:"solutions"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#solutions"}},[e._v("#")]),e._v(" Solutions")]),e._v(" "),a("p",[e._v("Below are popular Circuit Breaker libraries.")]),e._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://github.com/jhalterman/failsafe/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Failsafe"),a("OutboundLink")],1)]),e._v(" "),a("li",[a("a",{attrs:{href:"https://github.com/Netflix/Hystrix/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Hystrix"),a("OutboundLink")],1)]),e._v(" "),a("li",[a("a",{attrs:{href:"https://akka.io/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Akka"),a("OutboundLink")],1)]),e._v(" "),a("li",[a("a",{attrs:{href:"https://vertx.io/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Vert.x"),a("OutboundLink")],1)])]),e._v(" "),a("h2",{attrs:{id:"conclusion"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#conclusion"}},[e._v("#")]),e._v(" Conclusion")]),e._v(" "),a("p",[e._v("Performance issue on upstream service often leads to downstream application crash. By applying with Circuit Breaker on downstream application side, we can prevent the entire system from cascading failure.  The state machine is in the core algorithm of Circuit Breaker. You can choose one of the listed library above and apply one of the listed API style above to improve your service.")]),e._v(" "),a("h2",{attrs:{id:"references"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#references"}},[e._v("#")]),e._v(" References")]),e._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://doc.akka.io/docs/akka/2.5/common/circuitbreaker.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("Akka common: Circuit Breaker"),a("OutboundLink")],1)]),e._v(" "),a("li",[a("a",{attrs:{href:"https://stackoverflow.com/questions/30285637/circuit-breaker-design-pattern-implementation",target:"_blank",rel:"noopener noreferrer"}},[e._v("Circuit breaker design pattern implementation"),a("OutboundLink")],1)]),e._v(" "),a("li",[a("a",{attrs:{href:"https://vertx.io/docs/vertx-circuit-breaker/java/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Vertx circuit breaker document"),a("OutboundLink")],1)])])])}),[],!1,null,null,null);t.default=n.exports}}]);