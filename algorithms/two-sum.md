---
title: Two Sum
---

# Two Sum

[leetcode.com](https://leetcode.com/problems/two-sum/)

## Question

Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:

```
Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
```

## Solutions

Based on the description, we can conclude a formal description of the question, which will be the cornerstone of our solution.

```
Given nums, exist i and j: nums[i] + nums[j] = target, 0 <= i < j < len(nums).
```

Let's start from a brute-force algorithm.

```python
def twoSum(nums, target):
    for i in range(len(nums)):
        for j in range(i+1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    raise Exception("twosum solution not found.")
```

Let's analyze this brute-force algorithm. The time complexity is O(n<sup>2</sup>) and the space complexity is O(1). It's a correct algorithm because each line of code satisfies our formal description of the question. Below is a short prove.

* The iteration of `i` is from `range(len(nums))`, so it satisfies `0 <= i < len(nums)`.
* The iteration of `j` is from `range(i+1, len(nums))`, which satisfies `i < j < len(nums)`.
* The comparison predicate `if nums[i] + nums[j] == target: return [i, j]` satisfies `nums[i] + nums[j] = target`.
* The `raise Exception` statement aborts the process and hence any other solution will not be considered.

Since the time complexity is not good at all, we now seek if it can be improved.

---

By moving `nums[j]` to the right side, the equation is still established.

```
nums[i] = target - nums[j]
```

Then, by applying `f` to the both side, the equation is still established.

```
f(nums[i]) = f(target - nums[j])
```

---

Since `f` can be any function, let's just pick `dict.get`, the getter function of the Python's standard data structure, and let `dict.get(nums[i]) = i`.

So far, we have another equation that satisfies the constraint of the problem:

```
Given dict D, array nums,

* exist j: D.get(target - nums[j]) = j, 0 <= j < lens(nums),
* any j: D.get(nums[j]) = j
```

To satisfy it, we can produce below code. Note that the first highlighted code satisfies `exist j` condition, and the second highlighted code satisfies `any j` condition.

<<< @/algorithms/two-sum-2.py{4,5,6,7,9}

By analyzing this piece of code, the time complexity is O(n) and the space complexity is O(n). Therefore it's a better solution than our brute-force solution.

## Lesson Learned

Reducing variables in the problem is the key to a simpler solution.
