---
title: The Strides of NumPy Array
permalink: /projects/numpy/strides.html
---

# The Strides of NumPy Array

Strides is a tuple of integer numbers, each of which indicates the bytes for a particular dimension. NumPy uses *strides* to tell how many bytes to jump in the data buffer 

For example, we have a two-dimensional NumPy array.

```python
>>> import numpy as np
>>> array = np.arange(1,10).reshape(3,3)
>>> array
array([[1, 2, 3],
       [4, 5, 6],
       [7, 8, 9]])
```

All of the elements in the array are of integer type, which consumes 4 bytes in memory.

```python
>>> array.itemsize
4
```

Given the *shape* (3,3) and the *itemsize* (4), the strides is determined.

```
>>> array.strides
(12, 4)
```

* For strides[0], there are 3x4=12 bytes to jump over.
* For strides[1], each step to jump over is happen to be the size of the element, e.g. itemsize, 4.

![](/static/images/NumPy-Strides.svg)


Note that the last element in the strides is not necessary equal to the `itemsize`.
We might end up with an array reads data buffer in a column-major order.

For example, given a transposed array, it has the same value of `array` as above, however, both the data buffer and the strides are completely different.

```python
>>> array2 = np.array([[1, 4, 7],
                       [2, 5, 8],
                       [3, 6, 9]]).T
>>> array2
array([[1, 2, 3],
       [4, 5, 6],
       [7, 8, 9]])
```

![](/static/images/NumPy-Strides-Column-Major.svg)

* For strides[0], it only need to jump over 4 bytes from element `1` to element `4`.
* For strides[1], it needs to jump over 3x4=12 bytes from element `1` to element `2`.

```python
>>> array2.strides
(4, 12)
```
