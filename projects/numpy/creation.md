---
title: The Creation of NumPy Arrays
permalink: /projects/numpy/creation.html
prev: /projects/numpy/
---

# The Creation of NumPy Arrays

There are three ways for creating NumPy arrays.

1. Convert from a Python object, such as lists, tuples.
2. Derive from mathematics, such as arange, ones, zeros, random.
3. Read from a data source, such as disk, raw bytes.

A Python array-like structure can be converted into a NumPy array using `array` function.

```python
>>> np.array([0,1,2,3])
array([0,1,2,3])
```

`zeros` creates an array filled with 0 values.

```python
>>> np.zeros((2, 3))
array([[ 0., 0., 0.], [ 0., 0., 0.]])
```

`ones` creates an array filled with 1 values.

```python
>>> np.ones((2, 3))
array([[ 1., 1., 1.], [ 1., 1., 1.]])
```

`arange` creates an array with incrementing values. Steps and the type of elements are configurable.

```python
>>> np.arange(10)
array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
>>> np.arange(0, 1, 0.1)
```

There are plenty of these functions in NumPy so we won’t list them all here.

In the real world, you might end up with using the third option, reading from a data source. 

For example, assume there is a NumPy data file, `load` creates a NumPy array from the file from the disk.

```python
>>> np.save('/tmp/data', np.ones((2,3)))
>>> np.load('/tmp/data.npy')
array([[ 1., 1., 1.], [ 1., 1., 1.]])
```

The function `save` can be replaced by `save` to compressed data better, while `load` is still the same.

```python
>>> np.savez('/tmp/data', np.ones((2,3)))
>>> np.load('/tmp/data.npz')
array([[ 1., 1., 1.], [ 1., 1., 1.]])
```
