---
title: The Data Structure of NumPy Arrays
permalink: /projects/numpy/data.html
---

## The Data Structure Of NumPy Arrays

A NumPy array is comprised of a data buffer and some metadata. It's unlike a Python list, but more like a C-style array.

The data buffer, as you might guess, is just a contiguous block of memory having fixed number of data items. All the data items are of the same type. The metadata describes how to interpret the data buffer, such as the size of bytes and the dtype for each data item, the number of dimensions, the size of each dimension, the distance between data items for each dimension (a.k.a, stride), the byte order, etc.

As described in the below diagram, a NumPy array object contains a `buf` and some metadata, the former of which is a pointer to the actual data buffer, a contiguous block of memory.

![NumPy Aray Basic](/static/images/NumPy-Array-Basic.svg)

Such a decision improves the performance. It allows sharing the same data buffer, yet derives a different array by presenting a new view with different metadata (e.g., strides, byte order, shape, etc). This technique is called "views". We can have different views of a same data buffer, each of which becomes a new array object. Creating such an object is faster than a full copy. Many operations in NumPy, such as slicing, transposing, are merely manipulating shapes and strides; the data buffer remains intact.
