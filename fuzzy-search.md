---
title: Fuzzy Search
category: Programming
tags: string, search
---

# Fuzzy Search

[[toc]]

## Overview

A fuzzy search is a process that locates or filter items by given an approximate
similar query string. It's done using approximate string matching algorithms.

## Solutions

### ctrlp.vim

[ctrlpvim/ctrlp.vim](https://github.com/ctrlpvim/ctrlp.vim) is a vim plugin that
supports full path fuzzy finding.

By typing `ctrl+p` in normal mode, you can fuzzy find files by your inputs. For example,
typing `mo` would possibly match below files:

* **mo**dified.txt
* colors/**mo**lokai.vim
* docs/easy**mo**tion.txt

Such a plugin helps finding specific files faster.

### fzf

[junegunn/fzf](https://github.com/junegunn/fzf) is a general-purpose command-line
Fuzzy finder. It can fuzzily process any list like files, command history, etc.

Such utility help typing commands faster.

### spellcheck

// Assume you know what it is.

## Patterns

### Approximate String Matching

The formal definition of approximate string matching can be as below:

> Find in the text or dictionary of size **n** all the words that match the given word
> (or start with the given word), taking into account **k** possible differences (errors).

The closeness of *approximate* is measured by the distance, the number of minimal
string operations necessary to convert a query to the string to match. For example,
the editors know that you have a *typa* and decide to pop up *typo* as a suggestion,
because *typa* has only one character to be substituted.

Some of the most well-known algorithms for the distance calculation includes:

* Hamming distance.
* Levenshtein distance, or edit distance.
* Damerau-Levenshtein distance.

Another approach is using [string similarity join algorithm](https://www.cse.unsw.edu.au/~weiw/project/tutorial-simjoin-SEBD08.pdf).

### Hamming Distance

Example code:

```python
def hamming_distance(s1, s2):
    """Return the Hamming distance between equal-length sequences"""
    if len(s1) != len(s2):
        raise ValueError("Undefined for sequences of unequal length")
    return sum(el1 != el2 for el1, el2 in zip(s1, s2))
```

* Pros
    * Easy to understand.
* Cons
    * Only for calculating a set of words of equal length.

In general, the hamming distance is impractical, but it's helpful to learn other distance algorithms.

### Levenshtein Distance

Levenshtein distance, also called edit distance, calculates the number of
operations including deletion, insertion, and substitution between the
given query and the given term.

For example, a minimal edit script that transforms `enqueuezero` to `enqueuezebra` is 2:

- Insert **b**: enqueueze**b**ro.
- Substitute **o** to **a**: enqueuezebr**a**.

### Damerau-Levenshtein distance

Damerau-Levenshtein distance is a variation of Levenshtein distance by adding
an extra rule - transposition of two adjacent letters also counts as one
of the operations, alongside with insertion, deletion, and substitution.

### difflib

Python function `difflib.get_close_matches` returns a list of the best "good enough" matches. It's the quickest scripting function ready to use.

```python
>>> from difflib import get_close_matches
>>> get_close_matches('appel', ['ape', 'apple', 'peach', 'puppy'])
['apple', 'ape']
```

### Bitap

The Bitap algorithm is an approximate string matching algorithm, which tells if
a given text contains a substring that approximately equal to a given pattern.
It's fast because it's based on bitwise operations. It's most often used in the fuzzy search. Unix utility `agrep` is atop bitap algorithm. The Bitap algorithm
can be based on both Hamming distance and Levenshtein distance.

An example implementation is here:
<https://gist.github.com/soasme/22c6f083bc971ff381724fd3308a4be2>

The disadvantage of Bitap is that it requires a fixed-length bit bucket for calculation.
The algorithm supports a large bit bucket, however, has poor performance when it's long.
Luckily, in most cases, the search term has only a few characters.

### Bigram Comparing

Bigram comparing works well on variable length strings.
The idea is to de-composite the string into a set of bigrams - words that are
written with two letters in an alphabetic writing system.

For example, `enqueuezero` can be transformed to `en`, `nq`, `qu`, `ue`, ..., `ro`.
We then calculate the number of same bigrams in both query and string to match.
Below is an example of Python implementation. [1]

```python
def get_bigrams(s):
    s = s.lower()
    return [s[i:i+2] for i in range(len(s))]

def get_similarity_score(query, match):
    query_bigrams = get_bigrams(query)
    match_bigrams = get_bigrams(match)
    hit = 0
    for x in query_bigrams:
        for y in match_bigrams:
            if x == y:
                hit += 1
                break
    return (hit * 2.0) / (len(query_bigrams) + len(match_bigrams))
```

[1]: https://stackoverflow.com/questions/653157/a-better-similarity-ranking-algorithm-for-variable-length-strings

## Conclusions

Fuzzy search can be applied whenever there is a search box. Under the hood, the fuzzy
search requires approximate string matching. Among all algorithms, the Bitap algorithm
is perhaps the best-known for approximate string matching.  However, it doesn't
fit the case in which the searching dataset is huge since it requires a full scanning.
Python function `get_close_matches` in standard lib `difflib` is the handiest tool
ready to use.

Installing fuzzy search plugin or utilities save a few seconds every time and thus several
hours and days in your work and life.

## References

* [Fuzzy Search](https://whatis.techtarget.com/definition/fuzzy-search)
* [Approximate string matching](https://en.wikipedia.org/wiki/Approximate_string_matching)
* [Bitap Algorithm](https://en.wikipedia.org/wiki/Bitap_algorithm)
* [difflib — Helpers for computing deltas](https://docs.python.org/3/library/difflib.html)
* [Fuzzy string search](http://ntz-develop.blogspot.com/2011/03/fuzzy-string-search.html)
