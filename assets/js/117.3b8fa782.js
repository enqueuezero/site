(window.webpackJsonp=window.webpackJsonp||[]).push([[117],{503:function(t,e,s){"use strict";s.r(e);var n=s(54),a=Object(n.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"an-introduction-to-apscheduler"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#an-introduction-to-apscheduler"}},[t._v("#")]),t._v(" An Introduction to APScheduler")]),t._v(" "),s("p",[t._v("APScheduler is a job scheduling library that schedules Python code to run either one-time or periodically. It's primarily used in websites, desktop applications, games, etc. It can be considered as a crontab in-process, except that it's not scheduling OS commands but Python functions. The key takeaway is APScheduler is a library, not a command-line tool, not a daemon, not a service. It merely provides some building blocks for you to schedule your Python code. It has to run within the process of your application.")]),t._v(" "),s("p",[t._v("A typical APScheduler instance houses tens of jobs, which execute regular Python functions. There is no limit on the numbers of jobs an APScheduler instance can schedule; it only depends on the actual load of the machine. By default, APScheduler stores all jobs in-memory. If you want your jobs survive from process restarts and keep triggerring from the last time there were triggered,  you can store these jobs in a database, such as any RDBMS, redis, MongoDB, etc.")]),t._v(" "),s("p",[t._v("You must install APScheduler into the environment of your application, either globally or using virtualenv.")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("$ python3 -mvenv venv\n$ "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("source")]),t._v(" venv/bin/activate\n$ pip "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" apscheduler\n")])])]),s("p",[t._v("Depending on how your applications runs, it can run as a thread, or an asyncio task, or else. When initialized, APScheduler doesn't do anything unless you add the Python functions as jobs. Once all the jobs are added, you need to \"start\" the scheduler. For a simple example of how to use APScheduler, here is a snippet of code that just works. Let's create a file "),s("code",[t._v("app.py")]),t._v(".")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" urllib"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("request "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" urlopen\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" apscheduler"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("schedulers"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("blocking "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" BlockingScheduler\n\nscheduler "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" BlockingScheduler"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token decorator annotation punctuation"}},[t._v("@scheduler"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("scheduled_job")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"interval"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" seconds"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("keep_warm")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    urlopen"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://enqueuezero.com"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" timeout"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    \nscheduler"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("start"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("This makes sure a url is requested every 10 seconds. The program runs as a blocking process. If you want to co-exist them with your application, you can consider using "),s("code",[t._v("BackgroundScheduler")]),t._v(", "),s("code",[t._v("AsyncIOScheduler")]),t._v(", etc.")])])}),[],!1,null,null,null);e.default=a.exports}}]);