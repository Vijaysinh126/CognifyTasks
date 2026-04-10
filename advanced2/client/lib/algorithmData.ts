import { AlgorithmInfo } from './types';

export const algorithmsData: Record<string, AlgorithmInfo> = {
  'binary-search': {
    name: 'Binary Search',
    slug: 'binary-search',
    description: 'Binary Search is a divide-and-conquer algorithm that finds a target value within a sorted array by repeatedly halving the search interval.',
    timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity: 'O(1)',
    category: 'Search',
    difficulty: 'Easy',
    whyNotUse: [
      'Array must be sorted — fails on unsorted data',
      'Random access required — does not work on linked lists',
      'Overhead not worth it for small arrays',
    ],
    edgeCases: [
      'Empty array → returns -1',
      'Duplicates → may return any occurrence',
      'Unsorted array → incorrect results (auto-sorts in this visualization)',
      'Single element → 1 comparison',
    ],
    codeJS: `function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1; // not found
}`,
    codePython: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
  },
  'linear-search': {
    name: 'Linear Search',
    slug: 'linear-search',
    description: 'Linear Search sequentially checks each element of the list until a match is found or the list ends.',
    timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    category: 'Search',
    difficulty: 'Easy',
    whyNotUse: [
      'Very slow for large arrays — O(n) worst case',
      'Use Binary Search if array is sorted',
      'Inefficient for repeated searches',
    ],
    edgeCases: [
      'Empty array → returns -1 immediately',
      'Duplicates → returns first occurrence',
      'Target at end → maximum comparisons',
      'Single element → 1 comparison',
    ],
    codeJS: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1; // not found
}`,
    codePython: `def linear_search(arr, target):
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1`,
  },
  'merge-sort': {
    name: 'Merge Sort',
    slug: 'merge-sort',
    description: 'Merge Sort is a stable, divide-and-conquer sorting algorithm that splits the array in half, recursively sorts each half, and merges them.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(n)',
    category: 'Sort',
    difficulty: 'Medium',
    whyNotUse: [
      'O(n) extra space — bad for memory-constrained environments',
      'Slower than Quick Sort in practice for small arrays',
      'Not in-place sorting',
    ],
    edgeCases: [
      'Empty array → returns empty',
      'Single element → already sorted',
      'Already sorted → still O(n log n)',
      'All duplicates → handles correctly',
    ],
    codeJS: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return [...result, ...left.slice(i), ...right.slice(j)];
}`,
    codePython: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    return result + left[i:] + right[j:]`,
  },
  'quick-sort': {
    name: 'Quick Sort',
    slug: 'quick-sort',
    description: 'Quick Sort is an efficient divide-and-conquer sorting algorithm that selects a pivot, partitions the array around it, and recursively sorts the partitions.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
    spaceComplexity: 'O(log n)',
    category: 'Sort',
    difficulty: 'Hard',
    whyNotUse: [
      'Worst case O(n²) with bad pivot selection',
      'Not stable — relative order of equal elements not preserved',
      'Recursive — risk of stack overflow for large arrays',
    ],
    edgeCases: [
      'Already sorted → worst case O(n²) with last-element pivot',
      'All duplicates → degrades with naive partition',
      'Single element → base case, no work needed',
      'Empty array → returns immediately',
    ],
    codeJS: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i+1], arr[high]] = [arr[high], arr[i+1]];
  return i + 1;
}`,
    codePython: `def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i+1], arr[high] = arr[high], arr[i+1]
    return i + 1`,
  },
};

export const algorithmsList = Object.values(algorithmsData);
