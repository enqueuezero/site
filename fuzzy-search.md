---
title: Fuzzy Search
category: Programming
---

# Fuzzy Search

[[toc]]

## Overview

A fuzzy search is a process that locate or filter items by given an approximate
similar query string. It's done by means of approximate string matching algorithms,
which returns a list of items based on the distance, or likelihood between items
and the query string.

## Solutions

### ctrlp.vim

[ctrlpvim/ctrlp.vim](https://github.com/ctrlpvim/ctrlp.vim) is a vim plugin that
supports full path fuzzy finding.

By typing `ctrl+p` in normal mode you can fuzzy find files by your inputs. For example,
typing `mo` would possibly match below files:

* **mo**dified.txt
* colors/**mo**lokai.vim
* docs/easy**mo**tion.txt

Such plugin help finding certain files faster.

### fzf

[junegunn/fzf](https://github.com/junegunn/fzf) is a general-purpose command-line
fuzzy finder. It can fuzzily process any list like files, command history, etc.

Such utility help typing commands faster.

## Patterns

### Approximate String Matching

### Bitap

### API

## Conclusions

Fuzzy search can be applied whenever there is search box. Under the hood, the fuzzy
search requires approximate string matching. Among all algorithms, Bitap algorithm
is perhaps the best known one for approximate string matching.  However, it doesn't
fit the case in which the searching data set is huge, since it requires a full scanning.

Installing fuzzy search plugin or utilities save a few seconds every time and thus several
hours and days in your work and life.

## References

* [Fuzzy Search](https://whatis.techtarget.com/definition/fuzzy-search)
* [Approximate string matching](https://en.wikipedia.org/wiki/Approximate_string_matching)
* [Bitap Algorithm](https://en.wikipedia.org/wiki/Bitap_algorithm)
