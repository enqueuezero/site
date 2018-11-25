---
title: Linked List
permalink: /linked-list.html
category: Programming
tags: data-structure
date: 2018-11-25
---

# Linked List

In Computer Science, the linked list is a data structure of data elements connecting in linear order, which doesn't necessarily match the given logical order. [1]

Below is an example linked list representing in textual format.

```
<LinkedListNode value=0 next=<LinkedListNode value=1 next=<LinkedListNode value=2 next=NULL>>>
```

[1]: https://en.wikipedia.org/wiki/Linked_list

In this post, we explore the use of the linked list in the real world.

## Picol

[Picol] is a Tcl interpreter in 500 lines of C code. You can read through all of its [source code](http://antirez.com/picol/picol.c.txt) in a few minutes. Linked list plays a vital role in the interpreter implementation. Every runtime variable or proc is a linked list node struct `picolVar` with a name, a value, and a pointer to the next node.

[Picol]: http://oldblog.antirez.com/post/picol.html

```c
struct picolVar {
    char *name, *val;
    struct picolVar *next;
};
```

When getting variable value, the interpreter scans the linked list until the name of the node matching. Otherwise, NULL is returned.

```c
struct picolVar *picolGetVar(struct picolInterp *i, char *name) {
    struct picolVar *v = i->callframe->vars; // (a)
    while(v) { // (b)
        if (strcmp(v->name,name) == 0) return v; (c)
        v = v->next; (b)
    }
    return NULL;
}
```

* (a): The linked list is registered in a call frame of the interpreter.
* (b): `while(v) { // ...; v = v.next}` is a common way to scan the linked list.
* (c): `strcmp` compares the given name and node's name.

Similarly, setting variable value is comprised of 2 steps: 

1) Find the linked list node,
2) Update node value if exists, otherwise create a new node.

```c
int picolSetVar(struct picolInterp *i, char *name, char *val) {
    struct picolVar *v = picolGetVar(i,name);
    if (v) {
        free(v->val);
        v->val = strdup(val); // (a)
    } else {
        v = malloc(sizeof(*v)); // (b)
        v->name = strdup(name);
        v->val = strdup(val);
        v->next = i->callframe->vars;
        i->callframe->vars = v;
    }
    return PICOL_OK;
}
```

* (a): Update the value of the existing linked list node.
* (b): Create a new node by `malloc` function.

You can find another linked list in the [Picol] implementation - `struct picolCmd`, which is used for storing proc, kind of like functions in other programming languages.

## GitHub Flavored Markdown

The specification of [GFM], or GitHub Flavored Markdown, ships an appendix of how to parse nested emphasis and links, which uses a doubly linked list. The goal is to parse `** some strong *text* **` to `<strong>some strong <em>text</em></strong>`.

A parsing algorithm parses text `**some strong *text***` to a sequence of text nodes first.

```
TextNode("**");
TextNode("some strong ");
TextNode("*");
TextNode("text");
TextNode("***");
```
The doubly linked list for delimeter `*` saves references to the first, third, and fifth text nodes.
It determines if the given delimiter runs can open or can close.
When the given delimiter can close, then it will generate an Emphasis or Strong token.

It closes the emphasis mark first.

```
TextNode("**");
TextNode("some strong ");
EmphasisNode(
    TextNode("text");
)
TextNode("**");
```

And then it closes the strong mark the next.

```
StrongNode(
    TextNode("some strong ");
    EmphasisNode(
        TextNode("text);
    );
);
```

A full explanation of the algorithm is provided within [the GFM specification appendix](https://github.github.com/gfm/#phase-2-inline-structure).
You can check how the linked list is used in any one of the [CommonMark](https://github.com/commonmark/CommonMark) implementations.

## Linux Kernel

The Linux Kernel uses linked list a lot. Linked list macros and functions are defined in [`include/Linux/list.h`](https://github.com/torvalds/linux/blob/master/include/linux/list.h).
This unified implementation avoids kernel developers from writing redundant codes. BTW,
it's a doubly linked list implementation.

To start using it, you need to include `struct list_head` in your struct. It's a little bit
unlike those commonly linked list implementations that you've seen in textbooks, which guides
you add a `next` pointer to the next linked list node.

```c
struct my_data_structure {
    int my_data;
    struct list_head my_list;
}

struct my_data_structure llist = { .data = 0, .my_list = LIST_HEAD_INIT(llist.my_list) };
```

After the initialization, you can manipulate the linked list via functions like `list_add`, `list_add_tail`, `list_del`, `list_entry`, etc.

If you're a Linux newbie, don't miss [How does the kernel implement Linked Lists?](https://kernelnewbies.org/FAQ/LinkedLists).

## Conclusions

Though in modern programming languages the linked list is less attractive compared to the dynamic array, hash table, it's still heavily used. For example, if you're using Linux, then there are a large amount of data structured in the linked list in your memory.