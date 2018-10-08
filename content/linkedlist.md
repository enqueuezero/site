---
title: Linked Lists
date: 2018-10-04
category: Algorithm
tags: algorithm
status: Draft
---

Note: I don't think I can write this post better than the textbook.

## Overview

A linked list is a linear data structure where each element is a separate object.

```python
linked_list = Node()
linked_list.next = Node(0)
linked_list.next.next = Node(1)
linked_list.next.next.next = Node(2)
...
```

Each element (Node) contains value and a reference to the next node.

```python
class Node:

    def __init__(self, val=None, next=None):
        self.val = val
        self.next = next
```

The last node has null as the reference. 

```python
>>> print(linked_list.next.next.next.next)
None
```

The linked list is a special case of Tree data structure with only one child node for each node.

## Comparisons

* Advantages
    * Easy to extend the size.
* Disadvantages
    * No direct way of accessing an element, meaning you have to iterate from the head node every time for searching.
    * Slow insertion and deletion at certain place.
    * Use more memory than arrays for storing pointers.

## Use

Some might say Linked Lists puzzles are for undergraduates. I would say this is so wrong that if you dive into Linux kernel source code, you will find linked list everywhere.

## Algorithms

### Dummy Head Node

You might notice we didn't specify the value of the head node in the first snippet of the post.
It's intended for making the rest of algorithms simpler. Such technique, that is to deliberately specify no value for head node, is called dummy head node.

The benefit is that you can always get value by `node.val` and reference by `node.next`. For example, In a linked list with no element, you will need extra check for the corner case.

```python
def insert(node, value):
    if node is None:
        return Node(value)
    else:
        new = Node(value)
        new.next = node
        return new
```

With a dummy head node, the linked list will never be a `None` so you can use `node.next` safely.

```python
def insert(node, value):
    new = Node(value)
    new.next = node
    return new
```

Below code uses dummy head node by default.

### Iterate (Recursively)

Recursively iterate through the linked list makes the code simple and elegant. The caveat is that the programming language is better to provide [tail call](https://en.wikipedia.org/wiki/Tail_call) when you're handling long linked lists.

```python
def iterate(head, f):
    if head is None:
        return
    f(head.value)
    iterate(head.next, f)

>>> iterate(head, print)
0
1
2
```

### Iterate (While-Loop)

While-loop is a straightforward by using `while` statement. The `current` pointer will be replaced to the next node until there is no next node.

```
def iterate(head, f):
    current = head.next
    while current is not None:
        f(current.value)
        current = current.next
```

### Insert

TODO

### Delete

### Search

## Variants

### Doubly Linked Lists

### Circular Linked Lists

### Skip Lists

## Puzzles

### ???

## Conclusions

