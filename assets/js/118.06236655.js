(window.webpackJsonp=window.webpackJsonp||[]).push([[118],{504:function(t,a,s){"use strict";s.r(a);var e=s(54),n=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"autojump"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#autojump"}},[t._v("#")]),t._v(" autojump")]),t._v(" "),s("h2",{attrs:{id:"overview"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[t._v("#")]),t._v(" Overview")]),t._v(" "),s("p",[t._v("Autojump is a faster way to navigate your filesystem. It extends the idea of "),s("code",[t._v("cd")]),t._v(" command but enables you to jump to any directory from anywhere.")]),t._v(" "),s("h2",{attrs:{id:"basic-usage"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#basic-usage"}},[t._v("#")]),t._v(" Basic Usage")]),t._v(" "),s("p",[t._v('Jump To A Directory That Contains "foo". For example: '),s("code",[t._v("j foo")]),t._v(".")]),t._v(" "),s("p",[t._v("Jump To A Child Directory (sub-directory of the current directory). For example, "),s("code",[t._v("j bar")]),t._v(".")]),t._v(" "),s("p",[t._v("Open a file explorer window instead of jumping to the directory. For example, "),s("code",[t._v("jo music")]),t._v(".")]),t._v(" "),s("p",[t._v("Jump to A Directory using multiple arguments. For example, "),s("code",[t._v("j gh ez")]),t._v(" jumps to "),s("code",[t._v("/Users/soasme/github/enqueuezero")]),t._v(", while "),s("code",[t._v("j n ez")]),t._v(" jumps to "),s("code",[t._v("/Users/soasme/notes/enqueuezero")]),t._v(".")]),t._v(" "),s("h2",{attrs:{id:"installation"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#installation"}},[t._v("#")]),t._v(" Installation")]),t._v(" "),s("p",[t._v("It's very easy to install autojump depending on your platform.")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("# Debian, Ubuntu\n$ apt-get install autojump\n\n# CentOS, RedHat, Fedora\n$ yum install autojump\n\n# macOS\n$ brew install autojump\n")])])]),s("h2",{attrs:{id:"read-the-source-code"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#read-the-source-code"}},[t._v("#")]),t._v(" Read the source code")]),t._v(" "),s("p",[t._v("The entry point of the app is a shell script that executes a Python script, "),s("a",{attrs:{href:"https://github.com/wting/autojump/blob/master/bin/autojump",target:"_blank",rel:"noopener noreferrer"}},[t._v("autojump"),s("OutboundLink")],1),t._v(" and then "),s("code",[t._v("cd")]),t._v(" to the printed path.")]),t._v(" "),s("p",[t._v("Autojump is as a mixed shell and Python app without library dependencies, instead of a standard Python module. As a result, all utility modules are in an absolute-importing style.")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" os"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" sys "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# and other libraries from Python standard libraries.")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" autojump_argparse "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" autojump_data "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" autojump_match "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" autojump_utils "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\n")])])]),s("p",[t._v("The main function reads from arguments parsing from the command-line. Below is a simplified Python code of how autojump works.")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("parse_arguments")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    parser "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" ArgumentParser"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    parser"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("add_argument"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'directory'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" nargs"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'*'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" default"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("help")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'directory to jump to'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# ...")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" parser"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("parse_args"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("main")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("args"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    haystack "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" load"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("config"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    needles "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" args"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("directory\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("find_matches"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("needles"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" haystack"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" __name__ "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'__main__'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    sys"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exit"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("main"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("parse_arguments"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("The matching algorithms are implemented in "),s("a",{attrs:{href:"https://github.com/wting/autojump/blob/master/bin/autojump_match.py",target:"_blank",rel:"noopener noreferrer"}},[t._v("autojump_match.py"),s("OutboundLink")],1),t._v(" module. All matching functions accept parameters "),s("code",[t._v("needles")]),t._v(" and "),s("code",[t._v("haystack")]),t._v(", former of which is the keyword to match and latter of which includes the weighted paths to be matched. For example, Below variables show how the fuzzy searching generates the result for needles in the haystack.")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("needles = ['foo', 'bar']\nhaystack = [\n    (path='/foo/bar/baz', weight=11),\n    (path='/foo/baz/moo', weight=10),\n    (path='/moo/foo/baz', weight=10),\n    (path='/foo/baz', weight=10),\n    (path='/foo/bar', weight=10),\n]\nresult = [\n    (path='/foo/bar/baz', weight=11),\n    (path='/moo/foo/baz', weight=10),\n    (path='/foo/baz', weight=10),\n    (path='/foo/bar', weight=10),\n]\n")])])]),s("h2",{attrs:{id:"conclusions"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#conclusions"}},[t._v("#")]),t._v(" Conclusions")]),t._v(" "),s("p",[t._v("The autojump is a useful utility for switching directory faster. It's based on a traditional finding-needles-in-haystack problem but is far beyond that, which makes it a gorgeous software.")])])}),[],!1,null,null,null);a.default=n.exports}}]);