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

Let's analyze this brute-force algorithm. The time complexity is O(n<sup>2</sup>) and the space complexity is O(1). Below is a short proof that it's a correct algorithm.

* The function returns `[i, j]`, such that any i and j should satisfies `nums[i] + nums[j] == target`.
    * The variable `i` is from `range(len(nums))`, so it's under the condition of `0 <= i < len(nums)`.
    * The variable `j` is from `range(i+1, len(nums))`, so it's under the condition of `i < j < len(nums)`.
* The `raise Exception` statement aborts the process and hence any other solution will not be considered.

Since the time complexity is not good at all, we now seek if it can be improved.

---

By moving `nums[j]` to the right side, we get:

```
nums[i] = target - nums[j]
```

Then, by applying `f` to the both side, we get:

```
f(nums[i]) = f(target - nums[j])
```

Here every value of x should have corresponding value y, such that `f(x) = y`.

---

Let's just pick `dict.get`, the getter function of the Python's standard data structure, and let `dict.get(nums[i]) = i`.

So far, we have a transformation of above formal description of the problem.

```
Given dict D, array nums,

* any j: D.get(nums[j]) = j, 0 <= j < lens(nums).
* exist i: D.get(target - nums[j]) = i, iff target - nums[j] in D.
```

We can produce below code. Note that the first highlighted code satisfies `exist i` condition, and the second highlighted code satisfies `any j` condition.

<<< @/algorithms/two-sum-2.py{4,5,6,7,9}

By analyzing this piece of code, the time complexity is O(n) and the space complexity is O(n). Therefore it's a better solution than our brute-force solution.

## Lesson Learned

Reducing variables in the problem is the key to a simpler solution.
