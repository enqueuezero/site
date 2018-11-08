---
title: VuePress
---

# VuePress

[VuePress](https://vuepress.vuejs.org) is a static site generator developed in [Vue.js](https://vuejs.org/).

[[toc]]

## Usage

```bash
$ mkdir project
$ cd project
$ yarn add vuepress

$ ./node_modules/.bin/vuepress dev

$ ./node_modules/.bin/vuepress build
```

## Config

```javascript
# .vuepress/config.json
module.exports = {
  title: 'Spark',
  description: 'Ju\'s Public Thoughts and Notes',
  base: "/spark/",
  plugins: ['@vuepress/last-updated']
}
```

## Routing

* `README.md` -> `/index.html`
* `file.md` -> `/file.html`
* `dir/README.md` -> `/dir/`
* `dir/file.md` -> `/dir/file.html`

## Markdown

Most of the Markdown syntax is fine. Below are some default extensions:

```markdown
---
title: Donate Enqueue Zero
meta:
 - url: https://www.patreon.com/enqueuezero
---

# H1

// Generate Table of Content
[[toc]]

## H2

// Link to a page
[Home](/)
[Home > Utilities](/#Utilities)

// Tip can be `tip`, `danger`, `warning`
::: tip
It's important to me that you like this project.
:::

// Highlight
``` js{1}
var i;
i = 1;
console.log(i);

// Import
<<< @/filepath
```

## Extend markdown

You can import a shiny gadget (vue component) into Markdown.

For example, You can insert below code into Markdown for Badges: <Badge text="beta" type="warn"/> <Badge text="0.10.1+"/>

```
<Badge text="beta" type="warn"/> <Badge text="0.10.1+"/>
```

Check [Using Vue in Markdown](https://vuepress.vuejs.org/guide/using-vue.html#script-style-hoisting)

## Deploy

GitHub Pages:

```
$ ./node_modules/.bin/vuepress build
$ cd .vuepress/dist
$ git init && git add . && git commit -m 'deploy' & git push -f origin master:gh-pages
$ cd -
```

## Conclusion

VuePress is a descent static site generator. What makes it super different is you can have Markdown, HTML, JavaScript Components in your content.

* [vuejs/vuepress](https://github.com/vuejs/vuepress)
