(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{435:function(e,t,a){"use strict";a.r(t);var s=a(54),r=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"release"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#release"}},[e._v("#")]),e._v(" Release")]),e._v(" "),a("h2",{attrs:{id:"context"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#context"}},[e._v("#")]),e._v(" Context")]),e._v(" "),a("p",[e._v("Without delivering code to production environment, code is just a piece of text bytes on the disk. Unlike client-side application distribution, server-side application release requires a lot of cares and attentions.")]),e._v(" "),a("p",[e._v("The article is about every aspects of the release should notice.")]),e._v(" "),a("h2",{attrs:{id:"overview"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[e._v("#")]),e._v(" Overview")]),e._v(" "),a("p",[e._v("A software release is the sum of all steps to deliver software to the production, where the software is serving for customers. Release can have several meanings in different scopes. In particular, we discuss the release of the server side software, which has gone through a continuous integration step.")]),e._v(" "),a("h2",{attrs:{id:"solutions"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#solutions"}},[e._v("#")]),e._v(" Solutions")]),e._v(" "),a("h3",{attrs:{id:"ssh"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ssh"}},[e._v("#")]),e._v(" SSH")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://redditblog.com/2017/06/02/the-evolution-of-code-deploys-at-reddit/",target:"_blank",rel:"noopener noreferrer"}},[e._v("redditblog.com"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("In the fist three years, the engineers at Reddit connected to hosts via SSH and run bash commands. Below is the code in essence (heavily distilled, not real code):")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("# build the static files and put them on the static server\n`make -C /home/reddit/reddit static`\n`rsync /home/reddit/reddit/static public:/var/www/`\n\n# iterate through the app servers and update their copy\n# of the code, restarting once done.\nforeach $h (@hostlist) {\n    `git push $h:/home/reddit/reddit master`\n    `ssh $h make -C /home/reddit/reddit`\n    `ssh $h /bin/restart-reddit.sh`\n}\n")])])]),a("p",[e._v("It's comprised of two steps:")]),e._v(" "),a("ul",[a("li",[e._v("Build static files and push to a server.")]),e._v(" "),a("li",[e._v("SSH to hosts, update the code, build the code, and restart.")]),e._v(" "),a("li",[e._v("The release went through server hosts one by one, which is a form of canary deploy.")])]),e._v(" "),a("p",[e._v("Such release paradigm is always recommended if you have a very small amount of servers and\nIt's dirty but it works in a simplest way.")]),e._v(" "),a("h3",{attrs:{id:"capistrano"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#capistrano"}},[e._v("#")]),e._v(" Capistrano")]),e._v(" "),a("h3",{attrs:{id:"configuration-tools"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#configuration-tools"}},[e._v("#")]),e._v(" Configuration Tools")]),e._v(" "),a("p",[e._v("Ansible, Chef.")]),e._v(" "),a("p",[e._v("Terraform.")]),e._v(" "),a("h3",{attrs:{id:"kubernetes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#kubernetes"}},[e._v("#")]),e._v(" Kubernetes")]),e._v(" "),a("h2",{attrs:{id:"patterns"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#patterns"}},[e._v("#")]),e._v(" Patterns")]),e._v(" "),a("h3",{attrs:{id:"immutable-release-v-s-mutable-release"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#immutable-release-v-s-mutable-release"}},[e._v("#")]),e._v(" Immutable Release v/s Mutable Release")]),e._v(" "),a("h3",{attrs:{id:"pull-based-v-s-push-based"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#pull-based-v-s-push-based"}},[e._v("#")]),e._v(" Pull-based v/s Push-based")]),e._v(" "),a("p",[e._v("push: ssh\npull: agent+http")]),e._v(" "),a("h3",{attrs:{id:"sudo-v-s-non-sudo"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#sudo-v-s-non-sudo"}},[e._v("#")]),e._v(" Sudo v/s Non-Sudo")]),e._v(" "),a("p",[e._v("SSH: sudo\nSwitch to app user.\nIn container: run as non-sudo.")]),e._v(" "),a("h3",{attrs:{id:"multiple-stages-v-s-blue-green"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#multiple-stages-v-s-blue-green"}},[e._v("#")]),e._v(" Multiple Stages v/s Blue Green")]),e._v(" "),a("p",[e._v("dev\ntesting\nstaging\ncanary\nproduction")]),e._v(" "),a("p",[e._v("blue + green.")]),e._v(" "),a("h3",{attrs:{id:"rollout-v-s-rollover"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rollout-v-s-rollover"}},[e._v("#")]),e._v(" Rollout v/s Rollover")]),e._v(" "),a("p",[e._v("kubernetes")]),e._v(" "),a("h3",{attrs:{id:"backward-compatible-v-s-backward-incompatible"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#backward-compatible-v-s-backward-incompatible"}},[e._v("#")]),e._v(" Backward Compatible v/s Backward Incompatible")]),e._v(" "),a("ul",[a("li",[e._v("Application code change.")]),e._v(" "),a("li",[e._v("Database Schema Migration")])]),e._v(" "),a("h3",{attrs:{id:"fail-fast-rollback"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#fail-fast-rollback"}},[e._v("#")]),e._v(" Fail Fast & Rollback")]),e._v(" "),a("p",[e._v("stop at the node when error occurs.\nrequires human intervention.")]),e._v(" "),a("ul",[a("li",[e._v("Insufficient system resource.")]),e._v(" "),a("li",[e._v("Network error\n"),a("ul",[a("li",[e._v("SSH connection error in push-based.")]),e._v(" "),a("li",[e._v("HTTP error in pull-based.")])])]),e._v(" "),a("li",[e._v("Application start timeout.")]),e._v(" "),a("li",[e._v("Application misconfiguration.")])]),e._v(" "),a("p",[e._v("Quickly rollback when outage occurs or error rates up.\nre-do the release.")]),e._v(" "),a("h3",{attrs:{id:"resource-provisioning"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#resource-provisioning"}},[e._v("#")]),e._v(" Resource Provisioning")]),e._v(" "),a("p",[e._v("raw machine: system dependencies.\ncontainer environment: container runtime setup.\ncloud computation: create cloud resources.")]),e._v(" "),a("h3",{attrs:{id:"parallel-execution"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#parallel-execution"}},[e._v("#")]),e._v(" Parallel Execution")]),e._v(" "),a("h3",{attrs:{id:"node-roles"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#node-roles"}},[e._v("#")]),e._v(" Node Roles")]),e._v(" "),a("h3",{attrs:{id:"containerize-applications"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#containerize-applications"}},[e._v("#")]),e._v(" Containerize Applications")]),e._v(" "),a("h3",{attrs:{id:"remote-cache"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#remote-cache"}},[e._v("#")]),e._v(" Remote Cache")]),e._v(" "),a("p",[e._v("Improve performance with remote cache.")]),e._v(" "),a("h3",{attrs:{id:"deploy-hooks"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#deploy-hooks"}},[e._v("#")]),e._v(" Deploy Hooks")]),e._v(" "),a("p",[e._v("function hook.")]),e._v(" "),a("ul",[a("li",[e._v("before task")]),e._v(" "),a("li",[e._v("after task")])]),e._v(" "),a("p",[e._v("bash hook.")]),e._v(" "),a("ul",[a("li",[e._v("git hook. // heroku")])]),e._v(" "),a("p",[e._v("http hook.")]),e._v(" "),a("ul",[a("li",[e._v("send rfc/slack messages.")])]),e._v(" "),a("h2",{attrs:{id:"scale"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#scale"}},[e._v("#")]),e._v(" Scale")]),e._v(" "),a("h2",{attrs:{id:"release-note"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#release-note"}},[e._v("#")]),e._v(" Release Note")]),e._v(" "),a("p",[e._v("Release note is a record of document to help understanding what is changed in a designated release. Team members can refer to the document at any time to identify the release time and the release changes.")]),e._v(" "),a("p",[e._v("It could contain below changes.")]),e._v(" "),a("ul",[a("li",[e._v("Versions. It could be the version of the software, or the version of the build.")]),e._v(" "),a("li",[e._v("The target audiences. Most of the time, they're project managers, QA testers, engineers, and stakeholders.")]),e._v(" "),a("li",[e._v('The ticket (or task) references. Since the release note should not be too long, it\'s wise to place a link reference to the ticket, for example, "Enqueuezero 2019-02 updated. https://jira.example.com/browse/DEV-2019".')]),e._v(" "),a("li",[e._v("The work has done. The type of the work could be bug fixes, new features, refactors, security patches, functional changes, and etc.")])]),e._v(" "),a("h2",{attrs:{id:"conclusions"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#conclusions"}},[e._v("#")]),e._v(" Conclusions")]),e._v(" "),a("h2",{attrs:{id:"references"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#references"}},[e._v("#")]),e._v(" References")]),e._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://www.testingjournals.com/code-release-document/",target:"_blank",rel:"noopener noreferrer"}},[e._v("What to expect when you re expecting a new code release"),a("OutboundLink")],1)])])])}),[],!1,null,null,null);t.default=r.exports}}]);