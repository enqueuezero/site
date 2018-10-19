---
title: Markdown Parser
summary: How to implement a Markdown Parser from scratch?
category: Programming
tags: markdown, HTML, parser
date: 2018-10-17
status: Draft
---

Many people, when confronted writing HTML document, think "Well, HTML is tedious, I'll go with Markdown." Then they'll face two problems. For programming zealots, they certainly will introduce a third problem: why not write a Markdown parser?

In practice, most Markdown parser programs use regular expression or regex for parsing. There are some more options like [PEG](https://github.com/jgm/peg-markdown), etc. In this post, we'll write a simple but extensive markdown parser in nim-lang that can perform basic parsing. Beyond that, we'll also discuss how to improve the code to support more Markdown notations and dialects.

## Implementation

### Tokenize

It's clear that our goal is to convert a markdown document into an HTML document.

By introducing a tokenizing step as shown in below flow,
we can make separate of concerns: parsing and rendering.

```
+-------------------+    +--------+    +---------------+
| Markdown Document +--> | Tokens +--> | HTML Document |
+-------------------+    +--------+    +---------------+
```

The source code below is self-explanatory.

```nim
proc markdown*(doc: string): string =
  for token in parseTokens(doc):
      result &= renderToken(token)
```

### Parse

When programming from scratch, it's wise to start from small. So let's pick up
the very feature only - converting `# Header` into `<h1>Header</h1>`. We start from
defining a token type and a token value, as you might also do by yourself in any
programming language.

Below are some essential definitions for the code we'll write to work.

* We define a `Header` container object for storing header level and its content.
* We define an enum `MarkdownTokenType` which has only one choice - `Header`.
* We also define a reference `MarkdownTokenRef` as a wrapper for the token.

```nim
type
  Header* = object
    doc: string
    level: int

  MarkdownTokenType* {.pure.} = enum
    Header

  MarkdownTokenRef* = ref object
    case type*: MarkdownTokenType
    of MarkdownTokenType.Header: headerVal*: Header

  MarkdownError* = object of Exception
```

The token parsing is a complete iteration through the Markdown string `doc`.
We find token from the first character of the `doc` and then move to
the nth character, and on and on until the end. We'll cover the implementation
of `findToken` later.

```nim
iterator parseTokens(doc: string): MarkdownTokenRef =
  var n = 0
  while n < len(doc):
    var token: MarkdownTokenRef = nil
    for type in [
        MarkdownTokenType.Header,
        ]:
      token = findToken(doc, n, type)
      if token != nil:
        yield token
        break
    if token == nil:
      raise newException(MarkdownError, fmt"unknown block rule at position {n}.")
```

### Render

It's getting easier to generate HTML documents by constructing strings given a token data structure.

```nim
proc renderToken(token: MarkdownTokenRef): string =
  case token.type
  of MarkdownTokenType.Header:
    let header = token.headerVal
    result = fmt"<h{header.level}>{header.doc}</h{header.level}>"
```

### Find Token

Embed in the heart zone of `parseTokens`, the function `findToken` is in the center
of the Markdown parser program.

* We define a table of token regex rules.
* We check if the given `doc` from a specific position `start` matches the given rule.
* If so, we construct a container object as the token, otherwise, ignore the check.

```nim
let blockRules = {
  MarkdownTokenType.Header: re"^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)",
}.toTable

proc findToken(doc: string, start: var int, ruleType: MarkdownTokenType): MarkdownTokenRef =
  let regex = blockRules[ruleType]
  var matches: array[5, string]

  let size = doc[start .. doc.len - 1].matchLen(regex, matches=matches)
  if size == -1:
    return nil

  case ruleType
  of MarkdownTokenType.Header:
    val.level = matches[0].len
    val.doc = matches[1]
    result = MarkdownTokenRef(type: MarkdownTokenType.Header, headerVal: val) 

  start += size
```

### Get it to work

Combine all the above code together, we will get a function that can parse `# h1` to `<h1>h1</h1>` and `## h2` to `<h2>h2</h2>`. The code is saved as a gist here: <https://gist.github.com/soasme/1a5271090250baed7936b5ac451e50c2>.

## Discussion

The function `markdown(doc)` converts the markdown document to HTML document. It could lead to a `MarkdownError` exception when sending non-header markdown document into above least implemented code.  If the `markdown()` function is given the parameter as `# h1\n## h2`, then something interesting will happen.

The regex `re"^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)"` is in charge of matching header texts.

![Header Regex Rule](/static/images/markdown-parser-header-regex.svg)

The function `findToken` has below internal process.

* Match `# h1\n` first,
* Extract `#` as group 1,
* Extract `h1` as group 2,
* Create a token: `MarkdownToken<type: Header, headerVal: Header(level: 1, doc: "h1")>`.

Since we paused at the end of `# h1\n`, the function `parseTokens` will start from `## h2` after handling `# h1\n`. Similarly, the above function generate a token wrapping `Header(level: 2, doc: "h2")`.

Here we reach the end of the `doc`, so `parseTokens` decides to stop and hand over the job to `renderToken`.

* The function `renderToken` converts `Header(level: 1, doc: "h1")` to `<h1>h1</h1>`.
* It also converts `Header(level: 2, doc: "h2")` to `<h2>h2</h2>`.

The above code is very rudimentary as a markdown parser, yet it provides us with an extensive framework.

## Building on It

By building small features one by one the program becomes more feature completeness. Below will discuss how to adapt new features in above code 

1. Hrule can convert `---` to `<hr>`. The implementation can follow a similar pattern as `Header`. The trick of regex is that we need to match quite a lot patterns like `---`, `****`, `____`, and so on. It wouldn't be difficult if we append `[-*_]{2,}` right after `[-*_]`.
* IndentedBlockCode allows a block of code with 4 spaces as indent. The regex is amazingly short: `( {4}[^\n]+\n*)+`. The rendering code puts the code content into `<pre><code>{code}</code></pre>`.
* Fences allows codes wrapped into a sequence of \`\`\` characters. In addition, the name of the programming language can be appended. We can add a new rule just like IndentedBlockCode, but change ` {4}` to <code>`{3}</code>.
* Paragraph is the most often seen block that ends with two or more newlines. Well, technically, if the last paragraph in the document don't need to have two or more newlines. The regex is a little bit getting tricky. We need to parse paragraph after checking the other rules, which requires us defining a `parsingOrder` to explicitly help `findToken` decide the order.

## Conclusion

I've published the completed code as nim package [soasme/nim-markdown]. The initial implementation of markdown parser is short but bring us insight of future implementations.

## Credit

I don't want to steal the thunder - the original idea of the code was from [lepture/mistune], one of my favorite markdown parser implementations. :)

[lepture/mistune]: https://github.com/lepture/mistune
[soasme/nim-markdown]: https://github.com/soasme/nim-markdown
