---
title: The Shape of NumPy Arrays
permalink: /projects/numpy/shape.html
---

# The Shape of NumPy Arrays

A shape is a tuple of integer numbers, each of which is the number of elements in each dimension. 

The data buffer is always 1 dimensional, considering it's a plain C-style array. Numpy provides a view on top of the data buffer, to see it as a multi-dimensional object.

* For 1D array, the shape tuple has only 1 value: `(i, )`. Number i happens to be the array index.
* For 2D array, the shape tuple has only 2 value: `(i, j, )`. Number i is the row number, and number j is the column number.
* For 3D array, the shape tuple has only 3 value: `(i, j, k, )`.
* And so on.

To get the shape of a NumPy array, we use the property of `.shape`.

```python
>>> x = np.array([1,2,3,4,5,6,7,8,9])
>>> x.shape # One dimensional array, having 9 elements.
(9,)
```

Reshaping the array is through the `.reshape()` method. It creates a new array with a changed shape, but shares the underlying data buffer with the original array.

```python
>>> y = x.reshape((3,3))
>>> y.shape
(3,3)
```

![](/static/images/NumPy-Strides.svg)

When reshaping, one and exact one of the number in the shape tuple can be -1. NumPy can infer the unspecified value -1. So, if you see the code of `.reshape((..., -1, ...))`, don't be fooled; it actually asks NumPy to calculate the unknown shape value.

```python
>>> z = x.reshape((3,-1))
>>> z.shape
(3,3)

>>> x.reshape((-1,-1)) # Duhhh, it won't work!
ValueError: can only specify one unknown dimension
```

Method `.reshape()` can also be used to flatten the array to 1D array.

```python
>>> z.reshape(-1)
array([1, 2, 3, 4, 5, 6, 7, 8, 9])
```
