def twoSum(nums, target):
    D = {}
    for j in range(len(nums)):
        if target - nums[j] in D:
            # i = D.get(nums[i]) = D.get(target - nums[j])
            i = D.get(target - nums[j])
            return [i, j]
        else:
            D[nums[j]] = j
    raise Exception("twoSum not found")
