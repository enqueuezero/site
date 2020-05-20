---
title: The Broadcasting In NumPy
permalink: /projects/numpy/broadcasting.html
---

# The Broadcasting In NumPy

In Numpy, when doing arithmetic operations onto two arrays of the same shape, it's perfectly performed. But what if the shape is different? Say, an array of shape (2,2,2) meets a number,

```python
>>> np.zeros((2,2,2)) + 1 # = ?
```

Usually, if the dimensions of two arrays mismatches, there is no way performing element-wise operations. NumPy provides broadcasting to make it as if the two arrays are matching.

```python
>>> np.zeros((2,2,2)) + 1
array([[[1., 1.],
        [1., 1.]],

       [[1., 1.],
        [1., 1.]]])
```

When broadcasting on array a and b, NumPy fails if the two shapes are incompatible.
Two shapes are compatible when they're equal or one of them is 1.
NumPy expands the only one element in each dimension to n elements in the corresponding dimension of the other array.

For example,

```
a:      (2, 3, 4)
b:      (2, 3, 1)
result: (2, 3, 4)

a:      (2, 3, 4)
b:      (2, 1, 1)
result: (2, 3, 4)

a:      (2, 1, 4)
b:      (1, 3, 1)
result: (2, 3, 4)

a:      (2, 3, 4)
b:         (3, 1)
result: (2, 3, 4)

a:      (3, 3, 3)
b:      (3, 2, 1)
result: ValueError: operands could not be broadcast together
```

The rule of broadcasting is quite simple: if one of the dimensions in one array has 1 element, expand it to n elements, n being the number of elements in the other array.
