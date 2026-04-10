import { AlgorithmStep } from '../types';

export function linearSearchSteps(arr: number[], target: number): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  let comparisons = 0;

  steps.push({
    array: [...arr],
    highlights: [],
    message: `Starting Linear Search for target: ${target}`,
    comparisons,
    swaps: 0,
    codeLine: 0,
  });

  for (let i = 0; i < arr.length; i++) {
    comparisons++;
    steps.push({
      array: [...arr],
      highlights: [i],
      message: `Checking index ${i}: arr[${i}]=${arr[i]}`,
      comparisons,
      swaps: 0,
      codeLine: 2,
    });

    if (arr[i] === target) {
      steps.push({
        array: [...arr],
        highlights: [i],
        message: `Found ${target} at index ${i}! ✅`,
        comparisons,
        swaps: 0,
        found: i,
        codeLine: 3,
      });
      return steps;
    }
  }

  steps.push({
    array: [...arr],
    highlights: [],
    message: `Target ${target} not found ❌`,
    comparisons,
    swaps: 0,
    codeLine: 7,
  });

  return steps;
}
