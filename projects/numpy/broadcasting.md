---
title: The Broadcasting In NumPy
permalink: /projects/numpy/broadcasting.html
---

# The Broadcasting In NumPy

In NumPy, below arithmetic operation on the two values mismatches. X has shape (2,2,2); 1 is just a scalar value. Thanks to the broadcasting, it still works.

```python
>>> x = np.zeros((2,2,2))
>>> x + 1
array([[[1., 1.],
        [1., 1.]],

       [[1., 1.],
        [1., 1.]]])
```

Generally speaking, broadcasting is an handy shortcut to map a scalar to a 1D array. In the above example, it allows to express a tedious `x + np.ones((2,2,2))` to a simple `1`.

When applying to higher dimensions, starting from the trailing shape element, if either one of the dimensions has only one value, NumPy expands it to n elements like the other array has. For example,

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

In this example, NumPy expands `y.shape` as if it's not (3,1) but `(3,2)`. As a result, the shape of x and y matches.

When broadcasting on array a and b, NumPy fails if the two shapes are incompatible.
Two shapes are compatible only when they're equal or one of them is 1.
The number of shape elements may not be the same, but the elements of the two shapes must either be equal or 1.

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

a:      (2, 3, 4)
b:      (2, 5, 1) # 5 and 2 mismatches.
result: ValueError: operands could not be broadcast together
```

In summary,

* The arithmetic of two NumPy arrays allows different shapes.
* Broadcasting treats the scalar value as if it were an 1D array.
* Broadcasting fails if the shape is incompatible.
