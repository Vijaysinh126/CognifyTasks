import { AlgorithmStep } from '../types';

export function mergeSortSteps(arr: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const workArr = [...arr];
  let comparisons = 0;
  let swaps = 0;
  const sorted: number[] = [];

  steps.push({
    array: [...workArr],
    highlights: [],
    message: 'Starting Merge Sort',
    comparisons,
    swaps,
    sorted: [...sorted],
    codeLine: 0,
  });

  function merge(arr: number[], left: number, mid: number, right: number) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    steps.push({
      array: [...arr],
      highlights: [left, mid, right],
      message: `Merging [${left}..${mid}] and [${mid + 1}..${right}]`,
      comparisons,
      swaps,
      sorted: [...sorted],
      codeLine: 5,
    });

    while (i < leftArr.length && j < rightArr.length) {
      comparisons++;
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
        swaps++;
      }
      steps.push({
        array: [...arr],
        highlights: [k],
        message: `Placed ${arr[k]} at position ${k}`,
        comparisons,
        swaps,
        sorted: [...sorted],
        codeLine: 8,
      });
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      steps.push({
        array: [...arr],
        highlights: [k],
        message: `Copying remaining left: ${arr[k]}`,
        comparisons,
        swaps,
        sorted: [...sorted],
        codeLine: 10,
      });
      i++; k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      steps.push({
        array: [...arr],
        highlights: [k],
        message: `Copying remaining right: ${arr[k]}`,
        comparisons,
        swaps,
        sorted: [...sorted],
        codeLine: 11,
      });
      j++; k++;
    }

    for (let idx = left; idx <= right; idx++) {
      if (!sorted.includes(idx)) sorted.push(idx);
    }
  }

  function mergeSortHelper(arr: number[], left: number, right: number) {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    steps.push({
      array: [...arr],
      highlights: [left, right],
      message: `Dividing array from index ${left} to ${right}, mid=${mid}`,
      comparisons,
      swaps,
      sorted: [...sorted],
      codeLine: 2,
    });
    mergeSortHelper(arr, left, mid);
    mergeSortHelper(arr, mid + 1, right);
    merge(arr, left, mid, right);
  }

  mergeSortHelper(workArr, 0, workArr.length - 1);

  steps.push({
    array: [...workArr],
    highlights: workArr.map((_, i) => i),
    message: 'Merge Sort Complete! Array is sorted ✅',
    comparisons,
    swaps,
    sorted: workArr.map((_, i) => i),
    codeLine: 12,
  });

  return steps;
}
