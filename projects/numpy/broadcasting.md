---
title: Broadcasting In NumPy
permalink: /projects/numpy/broadcasting.html
---

# Broadcasting In NumPy

In NumPy, there is a need to operate arithmetic operation on two arrays having different dimensions. In the following example, x has shape (2,2,2), while 1 is just a scalar value. Thanks to the broadcasting, it still works.

```python
>>> x = np.zeros((2,2,2))
>>> x + 1
array([[[1., 1.],
        [1., 1.]],

       [[1., 1.],
        [1., 1.]]])
```

Generally speaking, broadcasting is a handy shortcut to treat a scalar value as a 1D array. In the above example, it acts like doing `x + np.array([1,1])`.

The great benefit is to get rid of needless copies; NumPy simply loops the scalar value onto the other array, which is efficient most of the times.

When applying to higher dimensions, starting from the trailing dimension, if either one of the dimensions has only one element, NumPy seems stretching it to n elements like the other array has (It doesn't really happen). For example,

``` python
x.shape:      2  | >>> x = np.array([1, 2])
y.shape:  3 x 1  | >>> y = np.array([[3], [4], [5]])
       expand ^
z.shape:  3 x 2  | >>> z = x + y
                 | >>> z
                   array([[4, 5],
                          [5, 6],
                          [6, 7]])
```

When broadcasting on array x and y, NumPy fails if the two shapes are incompatible.
The dimensions of x and y may not be the same, but starting from the trailing element, each dimension should have either same number or elements or only 1 element.

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

a:      (2, 3, 1)
b:            (4)
result: (2, 3, 4)

a:         (3, 1, 1)
b:      (2, 3, 4, 5)
result: (2, 3, 4, 5)

a:      (2, 3, 4)
b:      (2, 5, 1) # 5 and 2 mismatches.
result: ValueError: operands could not be broadcast together
```

In summary,

* The arithmetic of two NumPy arrays is allowed to operate on different dimensions when certain conditions is met.
* Broadcasting treats the scalar value as if it were a 1D array.
* Broadcasting fails if the dimensions are incompatible.
