(window.webpackJsonp=window.webpackJsonp||[]).push([[115],{500:function(e,r,n){"use strict";n.r(r);var o=n(54),t=Object(o.a)({},(function(){var e=this,r=e.$createElement,n=e._self._c||r;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"run-apscheduler-with-gunicorn"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#run-apscheduler-with-gunicorn"}},[e._v("#")]),e._v(" Run APScheduler With Gunicorn")]),e._v(" "),n("p",[e._v("APScheduler library presumes a threaded or async model, which doesn’t work well in the scenario of running with lots of web workers.\nIf APScheduler is to run together with web workers, there will be each APScheduler instance launched per web worker.")]),e._v(" "),n("p",[e._v("For example, Gunicorn is widely used a WSGI runner, which runs in pre-forked model.\nIt may start with 10 workers, and fork the WSGI app for 10 times per worker process.\nIt ends up with 10 APScheduler instances as well.")]),e._v(" "),n("p",[e._v("To handle this, it’s a common practice to separate APScheduler from the web workers.")]),e._v(" "),n("p",[e._v("The solution 1 is to run APScheduler in a dedicated process.\nYou may choose to start a process running only a single BlockingScheduler instance.")]),e._v(" "),n("p",[e._v("The solution 2 is to run APScheduler in the Gunicorn master process, rather than worker processes.\nThe Gunicorn hook function "),n("code",[e._v("on_starting()")]),e._v(" is called before the master process is initialized.\nWhatever called inside is not forked into worker process.\nYou may choose to start a BackgroundScheduler inside the "),n("code",[e._v("on_starting()")]),e._v(" hook function.")])])}),[],!1,null,null,null);r.default=t.exports}}]);