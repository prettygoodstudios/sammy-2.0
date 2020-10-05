import random


def merge(arr):
	if len(arr) <= 1:
		return arr
	mid = int(len(arr)/2)
	left = merge(arr[0:mid])
	right = merge(arr[mid:len(arr)])
	merged = []
	while len(left) != 0 or len(right) != 0:
		if len(left) != 0 and len(right) != 0:
			if left[0] < right[0]:
				merged.append(left[0])
				left.remove(left[0])
			else:
				merged.append(right[0])
				right.remove(right[0])
		elif len(left) != 0:
			merged.append(left[0])
			left.remove(left[0])
		else:
			merged.append(right[0])
			right.remove(right[0])
	return merged

arr = [int(random.random()*100) for x in range(100)]

arr = merge(arr)
print(arr)
