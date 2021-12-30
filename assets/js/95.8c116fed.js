(window.webpackJsonp=window.webpackJsonp||[]).push([[95],{483:function(t,s,a){"use strict";a.r(s);var e=a(54),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"linked-list"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#linked-list"}},[t._v("#")]),t._v(" Linked List")]),t._v(" "),a("p",[t._v("In Computer Science, the linked list is a data structure of data elements connecting in linear order, which doesn't necessarily match the given logical order. "),a("a",{attrs:{href:"https://en.wikipedia.org/wiki/Linked_list",target:"_blank",rel:"noopener noreferrer"}},[t._v("1"),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("Below is an example linked list representing in textual format.")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("<LinkedListNode value=0 next=<LinkedListNode value=1 next=<LinkedListNode value=2 next=NULL>>>\n")])])]),a("p",[t._v("In this post, we explore the use of the linked list in the real world.")]),t._v(" "),a("h2",{attrs:{id:"picol"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#picol"}},[t._v("#")]),t._v(" Picol")]),t._v(" "),a("p",[a("a",{attrs:{href:"http://oldblog.antirez.com/post/picol.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Picol"),a("OutboundLink")],1),t._v(" is a Tcl interpreter in 500 lines of C code. You can read through all of its "),a("a",{attrs:{href:"http://antirez.com/picol/picol.c.txt",target:"_blank",rel:"noopener noreferrer"}},[t._v("source code"),a("OutboundLink")],1),t._v(" in a few minutes. Linked list plays a vital role in the interpreter implementation. Every runtime variable or proc is a linked list node struct "),a("code",[t._v("picolVar")]),t._v(" with a name, a value, and a pointer to the next node.")]),t._v(" "),a("div",{staticClass:"language-c extra-class"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("picolVar")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("char")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("val"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("picolVar")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("next"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("When getting variable value, the interpreter scans the linked list until the name of the node matching. Otherwise, NULL is returned.")]),t._v(" "),a("div",{staticClass:"language-c extra-class"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("picolVar")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("picolGetVar")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("picolInterp")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("char")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("picolVar")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("v "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" i"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("callframe"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("vars"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// (a)")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("v"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// (b)")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("strcmp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("v"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" v"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("c"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        v "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" v"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("next"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("NULL")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("ul",[a("li",[t._v("(a): The linked list is registered in a call frame of the interpreter.")]),t._v(" "),a("li",[t._v("(b): "),a("code",[t._v("while(v) { // ...; v = v.next}")]),t._v(" is a common way to scan the linked list.")]),t._v(" "),a("li",[t._v("(c): "),a("code",[t._v("strcmp")]),t._v(" compares the given name and node's name.")])]),t._v(" "),a("p",[t._v("Similarly, setting variable value is comprised of 2 steps:")]),t._v(" "),a("ol",[a("li",[t._v("Find the linked list node,")]),t._v(" "),a("li",[t._v("Update node value if exists, otherwise create a new node.")])]),t._v(" "),a("div",{staticClass:"language-c extra-class"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("picolSetVar")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("picolInterp")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("char")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("char")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("val"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("picolVar")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("v "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("picolGetVar")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("v"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("free")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("v"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("val"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        v"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("val "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("strdup")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("val"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// (a)")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        v "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("malloc")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("sizeof")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("v"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// (b)")]),t._v("\n        v"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("name "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("strdup")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        v"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("val "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("strdup")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("val"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        v"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("next "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" i"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("callframe"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("vars"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        i"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("callframe"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("vars "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" v"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" PICOL_OK"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("ul",[a("li",[t._v("(a): Update the value of the existing linked list node.")]),t._v(" "),a("li",[t._v("(b): Create a new node by "),a("code",[t._v("malloc")]),t._v(" function.")])]),t._v(" "),a("p",[t._v("You can find another linked list in the "),a("a",{attrs:{href:"http://oldblog.antirez.com/post/picol.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Picol"),a("OutboundLink")],1),t._v(" implementation - "),a("code",[t._v("struct picolCmd")]),t._v(", which is used for storing proc, kind of like functions in other programming languages.")]),t._v(" "),a("h2",{attrs:{id:"github-flavored-markdown"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#github-flavored-markdown"}},[t._v("#")]),t._v(" GitHub Flavored Markdown")]),t._v(" "),a("p",[t._v("The specification of [GFM], or GitHub Flavored Markdown, ships an appendix of how to parse nested emphasis and links, which uses a doubly linked list. The goal is to parse "),a("code",[t._v("** some strong *text* **")]),t._v(" to "),a("code",[t._v("<strong>some strong <em>text</em></strong>")]),t._v(".")]),t._v(" "),a("p",[t._v("A parsing algorithm parses text "),a("code",[t._v("**some strong *text***")]),t._v(" to a sequence of text nodes first.")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('TextNode("**");\nTextNode("some strong ");\nTextNode("*");\nTextNode("text");\nTextNode("***");\n')])])]),a("p",[t._v("The doubly linked list for delimeter "),a("code",[t._v("*")]),t._v(" saves references to the first, third, and fifth text nodes.\nIt determines if the given delimiter runs can open or can close.\nWhen the given delimiter can close, then it will generate an Emphasis or Strong token.")]),t._v(" "),a("p",[t._v("It closes the emphasis mark first.")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('TextNode("**");\nTextNode("some strong ");\nEmphasisNode(\n    TextNode("text");\n)\nTextNode("**");\n')])])]),a("p",[t._v("And then it closes the strong mark the next.")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('StrongNode(\n    TextNode("some strong ");\n    EmphasisNode(\n        TextNode("text);\n    );\n);\n')])])]),a("p",[t._v("A full explanation of the algorithm is provided within "),a("a",{attrs:{href:"https://github.github.com/gfm/#phase-2-inline-structure",target:"_blank",rel:"noopener noreferrer"}},[t._v("the GFM specification appendix"),a("OutboundLink")],1),t._v(".\nYou can check how the linked list is used in any one of the "),a("a",{attrs:{href:"https://github.com/commonmark/CommonMark",target:"_blank",rel:"noopener noreferrer"}},[t._v("CommonMark"),a("OutboundLink")],1),t._v(" implementations.")]),t._v(" "),a("h2",{attrs:{id:"linux-kernel"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#linux-kernel"}},[t._v("#")]),t._v(" Linux Kernel")]),t._v(" "),a("p",[t._v("The Linux Kernel uses linked list a lot. Linked list macros and functions are defined in "),a("a",{attrs:{href:"https://github.com/torvalds/linux/blob/master/include/linux/list.h",target:"_blank",rel:"noopener noreferrer"}},[a("code",[t._v("include/Linux/list.h")]),a("OutboundLink")],1),t._v(".\nThis unified implementation avoids kernel developers from writing redundant codes. BTW,\nit's a doubly linked list implementation.")]),t._v(" "),a("p",[t._v("To start using it, you need to include "),a("code",[t._v("struct list_head")]),t._v(" in your struct. It's a little bit\nunlike those commonly linked list implementations that you've seen in textbooks, which guides\nyou add a "),a("code",[t._v("next")]),t._v(" pointer to the next linked list node.")]),t._v(" "),a("div",{staticClass:"language-c extra-class"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("my_data_structure")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" my_data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("list_head")]),t._v(" my_list"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("my_data_structure")]),t._v(" llist "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("data "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("my_list "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("LIST_HEAD_INIT")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("llist"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("my_list"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("After the initialization, you can manipulate the linked list via functions like "),a("code",[t._v("list_add")]),t._v(", "),a("code",[t._v("list_add_tail")]),t._v(", "),a("code",[t._v("list_del")]),t._v(", "),a("code",[t._v("list_entry")]),t._v(", etc.")]),t._v(" "),a("p",[t._v("If you're a Linux newbie, don't miss "),a("a",{attrs:{href:"https://kernelnewbies.org/FAQ/LinkedLists",target:"_blank",rel:"noopener noreferrer"}},[t._v("How does the kernel implement Linked Lists?"),a("OutboundLink")],1),t._v(".")]),t._v(" "),a("h2",{attrs:{id:"conclusions"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#conclusions"}},[t._v("#")]),t._v(" Conclusions")]),t._v(" "),a("p",[t._v("Though in modern programming languages the linked list is less attractive compared to the dynamic array, hash table, it's still heavily used. For example, if you're using Linux, then there are a large amount of data structured in the linked list in your memory.")])])}),[],!1,null,null,null);s.default=n.exports}}]);