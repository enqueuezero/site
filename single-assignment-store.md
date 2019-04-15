---
title: Single-Assignment Store
---

## Introduction

Single-Assignment Store is a set of variables that are initially unbound and that can be bound to ONE AND ONLY ONE value in their lifetime. In book "[Concepts, Techniques, and Models of Computer Programming](https://www.goodreads.com/book/show/772585.Concepts_Techniques_and_Models_of_Computer_Programming)", it's the fundamental element in the declarative model. We call it `store` in the rest of the article. Below thoughts are about implementing single-assignment store that introduced in the book chapter 2.

## Data Structures

To implement such store, we first need to design basic data structure of variables. Then, we need to create container data structures. Next, we need to implement unification and entailment. Once all of these are implemented, we'll get a working single-assignment store. Garbage collection is an optional add-on. We'll use [https://github.com/orangeduck/tgc](https://github.com/orangeduck/tgc) for memory management.

### Store Node

A `store_node_t` is a two-elements struct. The first element indicates its type. The second element is a pointer to its real value. Such struct represents a variable in a single-assignment store, or as known as dataflow variable or declarative variable.

    typedef enum {
      UNBOUND_TYPE,
      // ... (other types)
    } store_node_type_t;
    
    typedef void* store_node_value_t; 
    
    typedef struct store_node_t {
      store_node_type_t type;
      store_node_value_t value;
    } store_node_t;

### Unbound Store Node

Once initialized with `type=UNBOUND_TYPE` by `malloc` , it can be bound to any other types.  Once bound to one of the other types, it cannot bound to other types; otherwise, an error occurs. The given two rules satisfy an important property of the store: once bound, a declarative variable stays bound throughout the computation and is indistinguishable from its value.

Assume we have a type `store_error_t` for capturing errors, and function `store_bind_intval` for binding integer values. Below examples shows the first `store_bind_intval` call sets node type to INT_TYPE and node value to 1, while the second `store_bind_intval` call does nothing except setting an error.

    store_node_t* node = (store_not_t)*malloc(sizeof(store_not_t))
    node->type = UNBOUND_TYPE;
    node->value = NULL;
    
    store_error_t error = STORE_NO_ERROR;
    
    store_bind_intval(node, 1, &error);
    printf("%ld\n", (long)(node->value)); // should print 1.
    
    store_bind_intval(node, 2, &error);
    printf("%ld %ld\n", error, (long)(node->value)); // should still print 1.

To sum up, in out implementation, an unbound store node has below information in the `store_node_t` struct:

- Its type is `UNBOUND_TYPE`.
- Its value is `NULL`.

### Int Store Node

Without the integer type, we are unable to perform basic calculations (or at least, very hard). We can extend `store_node_type_t` by adding one more type: `INT_TYPE`.

    typedef enum {
      UNBOUND_TYPE,
      INT_TYPE, /* This is the new type we just added. */
      // ... (other types)
    } store_node_type_t;

One more thing, we need `store_error_t` to indicate an error occurring on binding. It can also be an enum.

    typedef enum {
      STORE_NO_ERROR,
      STORE_ALREADY_BOUND_ERROR,
    } store_error_t;

Binding a integer can be quite simple - change the type to `INT_TYPE` and modify the value. We could have allocated a new memory and set the `value` to the pointer of the new address. However, it's insufficient; the value field can fit in a long value. This also means we added an upper bound to the maximum value we can have; it's 2^32 on a 32bit machine and 2^64 one a 64bit machine.

### Str Store Node

Similarly, to support str store node, we add a new type `STR_TYPE` .

    typedef enum {
      UNBOUND_TYPE,
      INT_TYPE,
      STR_TYPE, /* This is the new type we just added. */
      // ... (other types)
    } store_node_type_t;

Then, since it's impossible to store a string on a `store_node_value_t` field, we need to allocate a string somewhere else and store the pointer to the string to `store_node_value_t`. Below is an example implementation using [https://github.com/antirez/sds](https://github.com/antirez/sds).

    store_node_t* node = (store_node_t)*malloc(sizeof(store_node_t));
    sds s = sdsnew("hello world")
    node->type = STR_TYPE;
    node->value = s[-1];
    
    unsigned char sds_header = node->value;
    sds p = node->value[1];
    printf("size=%ld, str=%s\n", sdslen(p), p);

By introducing the pointer into store_node_t, we need to somehow automatically do garbage collection.

Such design leaves us a problem; what if two store nodes point to two string but with same value? 

### Tuple Store Node

Tuple is a container store node that has a fixed number of pointers to other store nodes. Similar to str store node, we add a new type `TUPLE_TYPE` , allocate a tuple struct, and point value to the tuple.

    typedef struct tuple_t {
      size_t size;
      store_node_t** elements;
    } tuple_t;
    
    typedef enum {
      UNBOUND_TYPE,
      INT_TYPE,
      STR_TYPE,
      TUPLE_TYPE, /* This is the new type we just added. */
      // ... (other types)
    } store_node_type_t;
    
    printf(">>> let T = tuple(I S)\n");
    store_node_error_t merr_tuple_word = WORD_NO_ERROR;
    store_node_t* tuple_node = new_store_node(UNBOUND_WORD, NULL);
    store_node_t* tuple_elements[] = { int_word, str_node };
    set_store_node_tupleval(
        tuple_node,
        2,
        tuple_elements,
        &merr_tuple_word
    );

It's getting more and more complicated, but so far, the strategy is just the same as the implementation of str store node.

### List Store Node

Based on the tuple store node, we can turn it into various types, such as list! A list can be a linked-list tuple, the element of which has two sub-element: car and cdr, and such element is so called cons. [https://www.math.utah.edu/docs/info/emacs-lisp-intro_8.html](https://www.math.utah.edu/docs/info/emacs-lisp-intro_8.html)

We don't need to implement anything yet since the underlying data structure of list store node is the same as tuple store node.

    store_node_t* node = (store_node_t)*malloc(sizeof(store_node_t));
    node->type = TUPLE_TYPE,
    size_t size = 2;
    node->value = (void*)malloc(sizeof(tuple_t)+sizeof(store_node_t)*size);
    tuple_t* tuple = (tuple_t*)node->value;
    tuple->size = size;
    // the first tuple element becomes car, or head.
    tuple->nodes[0]->type = INT_TYPE;
    tuple->nodes[0]->value = 0;
    // the second tuple element becomes cdr, or tail.
    tuple->nodes[1]->type = TUPLE_TYPE;
    // ...

### Partial Store Node

Inside the tuple store node, it's possible that one of the tuple element is still an unbound store node, meaning the tuple element has UNBOUND_TYPE as its type. It's completely legitimate in our case. In declarative model, this tuple is so called partial variable. The afterward code will use `=` operator unifying two variables, making all partial variables inside a tuple being bound to a deterministic type. For example, `X = (1 2); Y = (1 Z); X = Y` makes Z=2 and Y=(1 2).

Still though, there is nothing we need to implement so far as partial store node is just a vanilla tuple store node with some unbound store node elements.

Considering two variables point to each other: `X = (Y); Y = (Z)` , the unification `X = Y` makes the variable y and z to be the same, yet they're still partial values. Previously, we define `node->value = NULL` when `node->type == UNBOUND_TYPE` . But we need to add some adjustments to this behavior. It's clear that when the type is unbound, it makes sense to point the value to something so that we can tell the identity of the value. Such thing is called an equivalence set in declarative model. To implement it, we need a new data structure `store_equivalence_set_t`, which can be a linked-list.

    typedef struct store_equivalence_node_t {
        store_node_t* node;
        struct store_equivalence_node_t* prev;
        struct store_equivalence_node_t* next;
    } store_equivalence_node_t;

The pointers between multiple store nodes in the equivalence set has below shape ( `X = Y = Z`).

Each store node's type is still UNBOUND_TYPE, but the value will point to a same ES (equivalence set) linked list. Each ES node point to a store node. When any one of store node is bound to a value, then we can find out all the other store nodes and bind them to the same value.

## Unification and Entailment

As shown in above example, `X = Y` is called unification. It's also an important operation in logical programming.

The goal of unification, as stated in Partial Store Node section, is to set types and values for unbound store node. A special case is, an error will occur when two variables are not match, for example, `X = (1, 2); Y = (1, Z, 3); X = Y` is wrong.

The rule of unification is simple: if either store_node is unbound, we unify them. If both store nodes are unbound, we create an equivalence set for them.

    void
    store_bind(store_node_t* left, store_node_t* right, store_node_error_t* error) {
        if (left->type == UNBOUND_WORD && right->type == UNBOUND_WORD) {
            store_bind_equivalence_set_nodes(left, right, error);
        } else if (left->type == UNBOUND_WORD && right->type != UNBOUND_WORD) {
            store_unify_unbound_node(left, right);
        } else if (left->type != UNBOUND_WORD && right->type == UNBOUND_WORD) {
            store_unify_unbound_node(right, left);
        } else if (left->type != UNBOUND_WORD && right->type != UNBOUND_WORD) {
            *error = WORD_CONFLICT_ERROR;
        }
    }

Creating equivalence set is by iterating through the double linked-list.

    void
    store_bind_equivalence_set_nodes(store_node_t* left,
            store_node_t* right,
            store_node_error_t* error) {
    
        store_equivalence_node_t* resn = (store_equivalence_node_t*) right->value;
        store_equivalence_node_t* resn_leftmost = resn;
        while(resn_leftmost->prev != NULL) {
            resn_leftmost = resn_leftmost->prev;
        }
    
        store_equivalence_node_t* lesn = (store_equivalence_node_t*) left->value;
        store_equivalence_node_t* lesn_rightmost = lesn;
        while(resn_leftmost->next != NULL) {
            resn_leftmost = resn_leftmost->next;
        }
    
        resn_leftmost->prev = lesn_rightmost;
        lesn_rightmost->next = resn_leftmost;
    }

Unifying values in the equivalence set is by pointing node values to the determined node.

    void
    store_unify_unbound_node(store_node_t* unbound, store_node_t* bound) {
        store_equivalence_node_t* es = (store_equivalence_node_t*) unbound->value;
        es = es->prev;
        while (es != NULL) {
            es->node->type = bound->type;
            es->node->value = bound->value;
            es = es->prev;
        }
    
        es = (store_equivalence_node_t*) unbound->value;
        while (es != NULL) {
            es->node->type = bound->type;
            es->node->value = bound->value;
            es = es->next;
        }
    }

Note that we didn't free the nodes explicitly, as we'll introduce garbage collection later.

### Bind operation

`store_bind(ES, v)` binds all variables in the equivalence set ES to the number or record v. For example, the operation `store_bind({v1, v2}, node)` adds two variables `v1` and `v2` to an equivalence set (create an ES if not exists).

`store_merge(ES1, ES2)` merge ES2 into ES1. It points the nodes' values to the head of ES1, and makes each newly added element pointing back to nodes.

Below is an example translation of declarative code to C code.

    printf(">>> declare X Z\n");
    store_node_error_t bind_err = WORD_NO_ERROR;
    store_node_t* x_node = new_store_node(UNBOUND_WORD, NULL);
    store_node_t* z_node = new_store_node(UNBOUND_WORD, NULL);
    
    printf(">>> X = Z\n");
    store_bind(x_node, z_node, &bind_err);
    
    printf(">>> X = S\n");
    store_bind(str_node, x_node, &bind_err);
    
    printf(">>> echo(tuple(X Z))\n");
    printf("{\"%s\", \"%s\"}\n", get_store_node_strval(x_node, &merr_str_node), get_store_node_strval(z_node, &merr_str_node));

## Store Memory Management

The implementation of store needs to clean "garbage" values periodically, otherwise, the increasing memory would crash the process.

We can use a gc library for memory management. Below is an demo implementation of gc using `tgc`. By replacing all malloc to `gc_malloc` calls, we can  benefit from an auto-free style garbage collection. It uses the simplest mark and sweep algorithm. Though it's not the fastest, it works.

    #include "tgc.h"
    
    static tgc_t gc;
    void gc_start(void* stk) { tgc_start(&gc, stk); }
    void gc_run() { tgc_run(&gc); }
    void gc_stop() { tgc_stop(&gc); }
    void* gc_alloc(size_t size) { return tgc_alloc(&gc, size); }
    void* gc_realloc(void* ptr, size_t size) { return tgc_realloc(&gc, ptr, size); }
    void gc_free(void* ptr) { tgc_free(&gc, ptr); }

When there is no pointer pointing to a `store_node_t` , it'll be swept by gc library and hence the memory won't go up forever.

By the way, the reason I set str store node value pointer to -1 of sds address is due to the nature of tgc. Sds returns us the pointer of const char *, which is the string part, it leaves the header of the string unpointed by any pointer. From tgc perspective, the entire sds is not pointed by any pointer, so it will be marked as garbage and sweep later. By setting value to -1, we set the pointer to the real head of sds string, so that the string will be retained until the store node is garbage collected.

    sds
    new_strval(const char* value) {
        void* s = (void*)sdsnew(value);
        return s-1;
    }
    
    void
    set_store_node_strval(store_node_t* node, const char* value, store_node_error_t* error) {
        if (node->type != UNBOUND_WORD) {
            *error = WORD_CONFLICT_ERROR; return;
        }
    
        node->type = STR_WORD;
        node->value = new_strval(value);
    }
    
    sds
    get_store_node_strval(store_node_t* word, store_node_error_t* error) {
        if (word->type != STR_WORD) {
            *error = WORD_TYPE_ERROR; return NULL;
        }
    
        return (sds)(word->value+1);
    }

## Network Transmition

When transmit a store node over network, how to build node on another host or even another process on the same host? All pointers are different as nodes reside in a complete different address space! The solution can be sending serialized full copy of data! It’s impossible to copy a node to another host without some form of translation.

## Conclusion

Virtual machine approach is a supplement to kernel language approach when understanding the atomic data values. The single-assignment store is the fundamental concept in declarative model. By translating data types from kernel language to C language, we can gain a better understanding of them in memory and hence produce more efficient code.

The full source code is hosted on GitHub Gist: [https://gist.github.com/soasme/e9beeae434f5c691e4776765306f3d58](https://gist.github.com/soasme/e9beeae434f5c691e4776765306f3d58)

## References

[mozart/mozart2](https://github.com/mozart/mozart2/wiki/Manipulating-Nodes)

[4 Equality and the Equality Test Operator](https://mozart.github.io/mozart-v1/doc-1.4.0/tutorial/node4.html#label25)

[Single-Assignment Store](https://www.notion.so/57ccd84f6a6d4a4aa84e1c83fff9fbc4)

## Updates

- 2019-04-15: Published at [enqueuezero.com](https://enqueuezero.com/single-assignment-store.html).
