(window.webpackJsonp=window.webpackJsonp||[]).push([[84],{476:function(e,n,t){"use strict";t.r(n);var s=t(54),o=Object(s.a)({},(function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"asynchronous-and-synchronous"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#asynchronous-and-synchronous"}},[e._v("#")]),e._v(" Asynchronous and Synchronous")]),e._v(" "),t("p"),t("div",{staticClass:"table-of-contents"},[t("ul",[t("li",[t("a",{attrs:{href:"#context"}},[e._v("Context")])]),t("li",[t("a",{attrs:{href:"#introduction"}},[e._v("Introduction")]),t("ul",[t("li",[t("a",{attrs:{href:"#synchronous"}},[e._v("Synchronous")])]),t("li",[t("a",{attrs:{href:"#asynchronous"}},[e._v("Asynchronous")])])])]),t("li",[t("a",{attrs:{href:"#solutions"}},[e._v("Solutions")]),t("ul",[t("li",[t("a",{attrs:{href:"#synchronous"}},[e._v("Synchronous")])]),t("li",[t("a",{attrs:{href:"#asynchronous-callback"}},[e._v("Asynchronous - Callback")])]),t("li",[t("a",{attrs:{href:"#asynchronous-futures-and-promises"}},[e._v("Asynchronous - Futures and Promises")])]),t("li",[t("a",{attrs:{href:"#async-and-await"}},[e._v("Async and Await")])]),t("li",[t("a",{attrs:{href:"#performance"}},[e._v("Performance")])])])]),t("li",[t("a",{attrs:{href:"#conclusions"}},[e._v("Conclusions")])]),t("li",[t("a",{attrs:{href:"#references"}},[e._v("References")])])])]),t("p"),e._v(" "),t("h2",{attrs:{id:"context"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#context"}},[e._v("#")]),e._v(" Context")]),e._v(" "),t("p",[e._v("In computing, program doing input / output, or I/O, has five major ways:")]),e._v(" "),t("ul",[t("li",[e._v("Blocking I/O")]),e._v(" "),t("li",[e._v("Non-blocking I/O")]),e._v(" "),t("li",[e._v("I/O Multiplex")]),e._v(" "),t("li",[e._v("Signal-driven I/O")]),e._v(" "),t("li",[e._v("Asynchronous I/O")])]),e._v(" "),t("p",[e._v("In programming language, the last I/O - Asynchronous I/O and others derive two programming models: synchronous and asynchronous.")]),e._v(" "),t("ul",[t("li",[e._v("Synchronous execution.")]),e._v(" "),t("li",[e._v("Asynchronous execution.")])]),e._v(" "),t("h2",{attrs:{id:"introduction"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#introduction"}},[e._v("#")]),e._v(" Introduction")]),e._v(" "),t("p",[e._v("The major difference between synchronous and asynchronous is how they handle tasks.")]),e._v(" "),t("h3",{attrs:{id:"synchronous"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#synchronous"}},[e._v("#")]),e._v(" Synchronous")]),e._v(" "),t("p",[e._v("Executing synchronously describes the sequence of code execution in one-by-one order. The execution of code must wait until previous operation finish, and won't execute next operation until itself finish.")]),e._v(" "),t("h3",{attrs:{id:"asynchronous"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#asynchronous"}},[e._v("#")]),e._v(" Asynchronous")]),e._v(" "),t("p",[e._v("Executing asynchronously refers to as submitting a task to a runner, and then immediately running next task without knowing the result of previous task. The submitted task will be completed or aborted at a certain time later.")]),e._v(" "),t("h2",{attrs:{id:"solutions"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#solutions"}},[e._v("#")]),e._v(" Solutions")]),e._v(" "),t("p",[e._v("Below examples describe how to read the content of a file in synchronous and asynchronous API styles.")]),e._v(" "),t("h3",{attrs:{id:"synchronous-2"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#synchronous-2"}},[e._v("#")]),e._v(" Synchronous")]),e._v(" "),t("p",[e._v("Using synchronous API is the simplest solution. If you want to know the execution of code, just look through lines of code one by one.")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("import requests\nresponse = requests.get('https://enqueue.zero')\nprint(len(response.content.split()))\n")])])]),t("h3",{attrs:{id:"asynchronous-callback"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#asynchronous-callback"}},[e._v("#")]),e._v(" Asynchronous - Callback")]),e._v(" "),t("p",[e._v("Using callback as asynchronous is the easiest way to understand asynchronous. We can follow below rules to track the execution of code:")]),e._v(" "),t("ul",[t("li",[e._v("All asynchronous execution can only be scheduled when a event loop is running.")]),e._v(" "),t("li",[e._v("There is no asynchronous code execution when event loop stopped.")]),e._v(" "),t("li",[e._v("The start of the code happens on when we call it. Make sure the event loop is running.")]),e._v(" "),t("li",[e._v("When asynchronous code execution is finish, a callback function will be called.")]),e._v(" "),t("li",[e._v("There must be no blocking I/O code in either task or callback.")])]),e._v(" "),t("p",[e._v("Below code is using tornado.")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("import tornado.ioloop\nfrom tornado.httpclient import AsyncHTTPClient\n\ndef handle_response(response):\n    print(len(response.body.split()))\n\nhttp_client = AsyncHTTPClient()\nhttp_client.fetch('https://enqueue.zero', handle_response)\n\ntornado.ioloop.IOLoop.instance().start()\n")])])]),t("p",[e._v("Note that some languages have asynchronous in-built, such as node.js. Thus, you don't need to maintain event loop at all.")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("const https = require('https');\n\nhttps.get('https://enqueuezero.com', (res) = {\n    // handle response\n});\n")])])]),t("ul",[t("li",[e._v("Advantages\n"),t("ul",[t("li",[e._v("Easy to understand")])])]),e._v(" "),t("li",[e._v("Disadvantages\n"),t("ul",[t("li",[e._v("Callback everywhere leads to ugly code.")])])])]),e._v(" "),t("h3",{attrs:{id:"asynchronous-futures-and-promises"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#asynchronous-futures-and-promises"}},[e._v("#")]),e._v(" Asynchronous - Futures and Promises")]),e._v(" "),t("p",[e._v("Future, or promise, or deferred, refers to a data structure for managing asynchronous task state and result. The data structure is created when the asynchronous task is submitted to event loop. It maintains the running state of job. It stores the result if the job runs successfully, or error information if the job runs failure. A future can also be mixed with callback.")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("import tornado.ioloop\nfrom tornado.concurrent import Future\nfrom tornado.httpclient import AsyncHTTPClient\n\ndef async_fetch_future(url):\n    http_client = AsyncHTTPClient()\n    my_future = Future()\n    fetch_future = http_client.fetch(url)\n    fetch_future.add_done_callback(\n        lambda f: my_future.set_result(f.result()))\n    return my_future\n\ndef handle_response(response):\n    print(len(response.body.split()))\n\nfuture = async_fetch_future('https://enqueuezero.com')\nfuture.add_done_callback(lambda f: handle_response(f.result()))\n\ntornado.ioloop.IOLoop.instance().start()\n")])])]),t("p",[e._v("In some programming languages, the model could be named as "),t("code",[e._v("Promise()")]),e._v(", or "),t("code",[e._v("Deferred()")]),e._v(", but they're actually the same thing.")]),e._v(" "),t("ul",[t("li",[e._v("Advantages\n"),t("ul",[t("li",[e._v("Future can maintain errors as well.")]),e._v(" "),t("li",[e._v("Future can maintain execution status.")])])]),e._v(" "),t("li",[e._v("Disadvantages\n"),t("ul",[t("li",[e._v("Complex")])])])]),e._v(" "),t("h3",{attrs:{id:"async-and-await"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#async-and-await"}},[e._v("#")]),e._v(" Async and Await")]),e._v(" "),t("p",[e._v("Async and await are a pair of keywords that are introduced by many programming languages. It enables you to write asynchronous code just like writing synchronous code. Below is a demonstration.")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("import aiohttp\nimport asyncio\n\nasync def fetch():\n    async with aiohttp.ClientSession() as session:\n        async with sesion.get('https://enqueuezero.com') as response:\n            return len((await response.text()).split())\n\nasyncio.get_event_loop().run_until_complete(fetch)\n")])])]),t("p",[e._v("Be aware that the synchronous functions and asynchronous functions must be in two different worlds. Especially when handling I/O, they should never be mixed. For example, below synchronous call will block the event loop and hence hang all scheduled asynchronous.")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("async def fetch():\n    requests.get('https://enqueuezero.com')\n")])])]),t("ul",[t("li",[e._v("Advantages\n"),t("ul",[t("li",[e._v("Language built-in async support solution.")])])]),e._v(" "),t("li",[e._v("Disadvantages\n"),t("ul",[t("li",[e._v("Need to separate sync and async functions.")]),e._v(" "),t("li",[e._v("Need to write "),t("code",[e._v("async")]),e._v(" and "),t("code",[e._v("await")]),e._v(" everywhere. Missing any one could lead to disaster.")])])])]),e._v(" "),t("h3",{attrs:{id:"performance"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#performance"}},[e._v("#")]),e._v(" Performance")]),e._v(" "),t("p",[e._v("The implementation of asynchronous can be")]),e._v(" "),t("ul",[t("li",[e._v("multi-threading")]),e._v(" "),t("li",[e._v("single-threading + event loop.")])]),e._v(" "),t("p",[e._v("Non-blocking asynchronous operations takes far less time than blocking methods. Yet it still depends on the implementation of specific program.")]),e._v(" "),t("p",[e._v("Although we won't call synchronous functions in asynchronous functions, we can still wrap synchronous functions running in a thread to make it asynchronous. Introducing this technique usually will harm the performance, but it make the code more flexible.")]),e._v(" "),t("h2",{attrs:{id:"conclusions"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#conclusions"}},[e._v("#")]),e._v(" Conclusions")]),e._v(" "),t("p",[e._v("Synchronous code is simple to read but less performant. Asynchronous code is frustrating to read and write but has high performance. Today, many web servers choose to manage HTTP connections through asynchronous model. If you care performance very much and the bottleneck is at I/O, think about asynchronous; otherwise writing synchronous code can save you a lot of time.")]),e._v(" "),t("h2",{attrs:{id:"references"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#references"}},[e._v("#")]),e._v(" References")]),e._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://stackoverflow.com/questions/748175/asynchronous-vs-synchronous-execution-what-does-it-really-mean",target:"_blank",rel:"noopener noreferrer"}},[e._v("Asynchronous vs synchronous execution waht does it really mean"),t("OutboundLink")],1)]),e._v(" "),t("li",[t("a",{attrs:{href:"https://hackernoon.com/asynchronous-python-45df84b82434",target:"_blank",rel:"noopener noreferrer"}},[e._v("Asynchronous python"),t("OutboundLink")],1)]),e._v(" "),t("li",[t("a",{attrs:{href:"https://www.tornadoweb.org/en/stable/guide/async.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("Tornado async guide"),t("OutboundLink")],1)]),e._v(" "),t("li",[t("a",{attrs:{href:"https://aiohttp.readthedocs.io/en/stable/",target:"_blank",rel:"noopener noreferrer"}},[e._v("aiohttp"),t("OutboundLink")],1)]),e._v(" "),t("li",[t("a",{attrs:{href:"https://en.wikipedia.org/wiki/Futures_and_promises",target:"_blank",rel:"noopener noreferrer"}},[e._v("Futures and promises"),t("OutboundLink")],1)]),e._v(" "),t("li",[t("a",{attrs:{href:"https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Nodejs blocking vs nonblocking"),t("OutboundLink")],1)])])])}),[],!1,null,null,null);n.default=o.exports}}]);