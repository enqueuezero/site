(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{400:function(t,e,a){"use strict";a.r(e);var r=a(54),i=Object(r.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"binary-search-in-go"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#binary-search-in-go"}},[t._v("#")]),t._v(" Binary Search In Go")]),t._v(" "),a("h2",{attrs:{id:"overview"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[t._v("#")]),t._v(" Overview")]),t._v(" "),a("p",[t._v("Binary search is a search algorithm that finds the position of a target value with a sorted array.")]),t._v(" "),a("p",[t._v("This article explains how Binary Search is implemented in Go.")]),t._v(" "),a("h2",{attrs:{id:"why-use-binary-search"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#why-use-binary-search"}},[t._v("#")]),t._v(" Why Use Binary Search?")]),t._v(" "),a("p",[t._v("Because it's super fast. Given a million of elements in order, with binary search, the number of checks is usually around 20 (2^20=1,048,576).")]),t._v(" "),a("p",[t._v("More formally, in the worst case, binary search runs in O(log n) comparisons, where n is the number of elements in the array.")]),t._v(" "),a("h2",{attrs:{id:"the-function-signature"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#the-function-signature"}},[t._v("#")]),t._v(" The Function Signature")]),t._v(" "),a("p",[t._v("The inputs of the binary search algorithm are")]),t._v(" "),a("ol",[a("li",[t._v("A target")]),t._v(" "),a("li",[t._v("A sorted array")])]),t._v(" "),a("p",[t._v("The output of the binary search algorithm is")]),t._v(" "),a("ul",[a("li",[t._v("The location of the target. Typically, it's the index of the target in the array.")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("func Search(xs []int, x int)\n")])])]),a("p",[t._v("To make the binary search algorithm more generic, a lot of implementations modify the inputs of the binary search algorithm to")]),t._v(" "),a("ol",[a("li",[t._v("The number of the sorted array")]),t._v(" "),a("li",[t._v("A closure that determines if the ith element in the sorted array (the target) is in the range of [i, n).")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("func Search(n int, f func (int) bool)\n")])])]),a("p",[t._v("This change makes it possible to ignore which type of "),a("code",[t._v("xs")]),t._v(" it is. We choose the latter in this article.")]),t._v(" "),a("h2",{attrs:{id:"variables"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#variables"}},[t._v("#")]),t._v(" Variables")]),t._v(" "),a("p",[t._v("The binary search algorithms relies on two indices,")]),t._v(" "),a("ol",[a("li",[a("code",[t._v("i")]),t._v(", one for the low end,")]),t._v(" "),a("li",[a("code",[t._v("j")]),t._v(", the other for the high end.")])]),t._v(" "),a("p",[t._v("Initially, the two indices are")]),t._v(" "),a("ol",[a("li",[a("code",[t._v("i = 0")]),t._v(", indicating i is at the lowest position of the array.")]),t._v(" "),a("li",[a("code",[t._v("j = n")]),t._v(", indicating j is at the highest position of the array, considering there are n elements.")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("i, j := 0, n\n")])])]),a("p",[t._v("Gradually, we keep moving either i or j towards the middle until i > j.\nWhether moving")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("for i < j {\n    h := (i + j) / 2\n    if f(h) { j = h }\n    else { i = h + 1 }\n}\n")])])]),a("p",[t._v("Note that "),a("code",[t._v("i + j")]),t._v(" might overflow, it is usually applied with bit-shift.")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("for i < j {\n    h := int(uint(i+j) >> 1)\n    if f(h) { j = h }\n    else { i = h + 1 }\n}\n")])])]),a("h2",{attrs:{id:"all-in-one"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#all-in-one"}},[t._v("#")]),t._v(" All In One")]),t._v(" "),a("p",[t._v("Below is a snippet from the Go source code, [src/sort/search.go].")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("func Search(n int, f func(int) bool) int {\n\t// Define f(-1) == false and f(n) == true.\n\t// Invariant: f(i-1) == false, f(j) == true.\n\ti, j := 0, n\n\tfor i < j {\n\t\th := int(uint(i+j) >> 1) // avoid overflow when computing h\n\t\t// i ≤ h < j\n\t\tif !f(h) {\n\t\t\ti = h + 1 // preserves f(i-1) == false\n\t\t} else {\n\t\t\tj = h // preserves f(j) == true\n\t\t}\n\t}\n\t// i == j, f(i-1) == false, and f(j) (= f(i)) == true  =>  answer is i.\n\treturn i\n}\n")])])]),a("h2",{attrs:{id:"wait-i-want-xs-int-x-int-form"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#wait-i-want-xs-int-x-int-form"}},[t._v("#")]),t._v(" Wait, I Want "),a("code",[t._v("xs []int, x int")]),t._v(" Form")]),t._v(" "),a("p",[t._v("The above code can be easily converted to the first form of the function signature we mentioned earlier.")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("func SearchInts(xs []int, x int) int {\n\treturn Search(len(xs), func(i int) bool { return xs[i] >= x })\n}\n")])])]),a("h2",{attrs:{id:"what-if-the-target-is-absent"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#what-if-the-target-is-absent"}},[t._v("#")]),t._v(" What If The Target Is Absent?")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("if x > len(xs) && xs[i] != x {\n    // ...\n}\n")])])]),a("h2",{attrs:{id:"conclusion"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#conclusion"}},[t._v("#")]),t._v(" Conclusion")]),t._v(" "),a("p",[t._v("Binary search narrows down the range "),a("code",[t._v("[i, j)")]),t._v(" that might includes the target step by step.\nEach step halves the range. Having that in mind, binary search algorithm has no mystery.")]),t._v(" "),a("p",[t._v("Tip: I suspect 90% of the programmers can't implement it correctly for the first time, me included. Several years after graduated, I still couldn't do it right and had two errors. It's strongly recommended you implement the binary search algorithm from scratch without any hints.")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://asciinema.org/a/330850",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:"https://asciinema.org/a/330850.svg",alt:"asciicast"}}),a("OutboundLink")],1)])])}),[],!1,null,null,null);e.default=i.exports}}]);