(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{410:function(e,s,t){"use strict";t.r(s);var n=t(54),a=Object(n.a)({},(function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"container-and-clone"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#container-and-clone"}},[e._v("#")]),e._v(" Container and Clone")]),e._v(" "),t("h2",{attrs:{id:"clone-a-process"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#clone-a-process"}},[e._v("#")]),e._v(" Clone a Process")]),e._v(" "),t("p",[e._v("The system call "),t("code",[e._v("clone()")]),e._v(" create a new process.")]),e._v(" "),t("p",[e._v("Let's see the function signature of "),t("code",[e._v("clone()")]),e._v(":")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("int clone(int (*fn)(void *), void *stack, int flags, void *arg, ...);\n")])])]),t("p",[e._v("The child process runs whatever "),t("code",[e._v("fn")]),e._v(" defines. When "),t("code",[e._v("fn")]),e._v(" finishes, the child process exits. In the context of a container runtime, "),t("code",[e._v("fn")]),e._v(" does a lot of isolate the process from those on the host. It's appropriate to say this system call is the starting of the life cycle of the first process in the container.")]),e._v(" "),t("p",[e._v("The "),t("code",[e._v("fn")]),e._v(" argument is the entry point for the child process.")]),e._v(" "),t("p",[e._v("The "),t("code",[e._v("stack")]),e._v(" argument specifies the location of the stack used by the child process.")]),e._v(" "),t("p",[e._v("The "),t("code",[e._v("flags")]),e._v(" argument is a bit mask.")]),e._v(" "),t("h2",{attrs:{id:"clone-v-s-fork"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#clone-v-s-fork"}},[e._v("#")]),e._v(" Clone v/s Fork")]),e._v(" "),t("p",[e._v("The system call "),t("code",[e._v("clone()")]),e._v(" is similar to "),t("code",[e._v("fork()")]),e._v(", but provides more precise control for creating the execution environment between the calling process and the child process.")]),e._v(" "),t("p",[e._v("The system call "),t("code",[e._v("fork()")]),e._v(" returns twice; when the child process is forked, both parent process and child process continue running the rest of code.")]),e._v(" "),t("p",[e._v("Example of "),t("code",[e._v("fork()")]),e._v(":")]),e._v(" "),t("div",{staticClass:"language-python extra-class"},[t("pre",{pre:!0,attrs:{class:"language-python"}},[t("code",[e._v("pid "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" fork"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("if")]),e._v(" pid "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("==")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[e._v("0")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("pass")]),e._v("     "),t("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# parent does something.")]),e._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("else")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("pass")]),e._v("     "),t("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# entry point of the child process")]),e._v("\n")])])]),t("p",[e._v("Unlike "),t("code",[e._v("fork()")]),e._v(", "),t("code",[e._v("clone()")]),e._v(" uses "),t("code",[e._v("fn")]),e._v(" as the entry point. When "),t("code",[e._v("fn")]),e._v(" returns, the child process is terminated.")]),e._v(" "),t("p",[e._v("Example of "),t("code",[e._v("clone()")]),e._v(":")]),e._v(" "),t("div",{staticClass:"language-python extra-class"},[t("pre",{pre:!0,attrs:{class:"language-python"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("def")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[e._v("child_fn")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("pass")]),e._v("        "),t("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# entry point of the child process")]),e._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("return")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[e._v("0")]),e._v("\n\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("assert")]),e._v(" clone"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),e._v("child_fn"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[e._v("1024")]),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("*")]),t("span",{pre:!0,attrs:{class:"token number"}},[e._v("1024")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[e._v("0")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("!=")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("-")]),t("span",{pre:!0,attrs:{class:"token number"}},[e._v("1")]),e._v("\n")])])])])}),[],!1,null,null,null);s.default=a.exports}}]);