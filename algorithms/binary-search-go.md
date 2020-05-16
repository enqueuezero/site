---
title: Binary Search
permalink: /algorithms/binary-search-go.html
---

# Binary Search In Golang

## Overview

Binary search is a search algorithm that finds the position of a target value with a sorted array.

This article explains how Binary Search is implemented in Go.

## Why Use Binary Search?

Because it's super fast. Given a million of elements in order, with binary search, the number of checks is usually around 20 (2^20=1,048,576).

More formally, in the worst case, binary search runs in O(log n) comparisons, where n is the number of elements in the array.

## The Function Signature

The inputs of the binary search algorithm are

1. A target
2. A sorted array

The output of the binary search algorithm is

* The location of the target. Typically, it's the index of the target in the array.

```
func Search(xs []int, x int)
```

To make the binary search algorithm more generic, a lot of implementations modify the inputs of the binary search algorithm to

1. The number of the sorted array
2. A closure that determines if the ith element in the sorted array (the target) is in the range of [i, n).

```
func Search(n int, f func (int) bool)
```

This change make it possible to ignore which type of `xs` it is. We choose the latter in this article.

## Variables

The binary search algorithms relies on two indices,

1. `i`, one for the low end,
2. `j`, the other for the high end.

Initially, the two indices are

1. `i = 0`, indicating i is at the lowest position of the array.
2. `j = n`, indicating j is at the highest position of the array, considering there are n elements.

```
i, j := 0, n
```

Gradually, we keep moving either i or j towards the middle until i > j.
Whether moving

```
for i < j {
    h := (i + j) / 2
    if f(h) { j = h }
    else { i = h + 1 }
}
```

Note that `i + j` might overflow, it is usually applied with bit-shift.

```
for i < j {
    h := int(uint(i+j) >> 1)
    if f(h) { j = h }
    else { i = h + 1 }
}
```

## All In One

Below is a snippet from the Go source code, [src/sort/search.go].

```
func Search(n int, f func(int) bool) int {
	// Define f(-1) == false and f(n) == true.
	// Invariant: f(i-1) == false, f(j) == true.
	i, j := 0, n
	for i < j {
		h := int(uint(i+j) >> 1) // avoid overflow when computing h
		// i ≤ h < j
		if !f(h) {
			i = h + 1 // preserves f(i-1) == false
		} else {
			j = h // preserves f(j) == true
		}
	}
	// i == j, f(i-1) == false, and f(j) (= f(i)) == true  =>  answer is i.
	return i
}
```

## Wait, I Want `xs []int, x int` Form

The above code can be easily converted to the first form of the function signature we mentioned earlier.

```
func SearchInts(xs []int, x int) int {
	return Search(len(xs), func(i int) bool { return xs[i] >= x })
}
```

## What If The Target Is Absent?

```
if x > len(xs) && xs[i] != x {
    // ...
}
```

## Conclusion

Binary search narrows down the range [i, j) that might includes the target step by step.
Each step halves the range. Having that in mind, binary search algorithm has no mystery.
