import { AlgorithmStep } from '../types';

export function binarySearchSteps(arr: number[], target: number): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const sorted = [...arr].sort((a, b) => a - b);
  let low = 0;
  let high = sorted.length - 1;
  let comparisons = 0;

  steps.push({
    array: [...sorted],
    highlights: [],
    message: `Starting Binary Search for target: ${target}`,
    comparisons,
    swaps: 0,
    low,
    high,
    codeLine: 0,
  });

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    comparisons++;

    steps.push({
      array: [...sorted],
      highlights: [low, mid, high],
      message: `Checking mid=${sorted[mid]} at index ${mid}. Low=${low}, High=${high}`,
      comparisons,
      swaps: 0,
      low,
      high,
      mid,
      codeLine: 3,
    });

    if (sorted[mid] === target) {
      steps.push({
        array: [...sorted],
        highlights: [mid],
        message: `Found ${target} at index ${mid}! ✅`,
        comparisons,
        swaps: 0,
        low,
        high,
        mid,
        found: mid,
        codeLine: 4,
      });
      return steps;
    } else if (sorted[mid] < target) {
      low = mid + 1;
      steps.push({
        array: [...sorted],
        highlights: [mid],
        message: `${sorted[mid]} < ${target}, searching right half. New low=${low}`,
        comparisons,
        swaps: 0,
        low,
        high,
        mid,
        codeLine: 6,
      });
    } else {
      high = mid - 1;
      steps.push({
        array: [...sorted],
        highlights: [mid],
        message: `${sorted[mid]} > ${target}, searching left half. New high=${high}`,
        comparisons,
        swaps: 0,
        low,
        high,
        mid,
        codeLine: 8,
      });
    }
  }

  steps.push({
    array: [...sorted],
    highlights: [],
    message: `Target ${target} not found in array ❌`,
    comparisons,
    swaps: 0,
    low,
    high,
    codeLine: 10,
  });

  return steps;
}
