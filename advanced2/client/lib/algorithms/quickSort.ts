import { AlgorithmStep } from '../types';

export function quickSortSteps(arr: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const workArr = [...arr];
  let comparisons = 0;
  let swaps = 0;
  const sorted: number[] = [];

  steps.push({
    array: [...workArr],
    highlights: [],
    message: 'Starting Quick Sort',
    comparisons,
    swaps,
    sorted: [],
    codeLine: 0,
  });

  function partition(arr: number[], low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;

    steps.push({
      array: [...arr],
      highlights: [high],
      message: `Pivot selected: ${pivot} at index ${high}`,
      comparisons,
      swaps,
      pivot: high,
      sorted: [...sorted],
      codeLine: 3,
    });

    for (let j = low; j < high; j++) {
      comparisons++;
      steps.push({
        array: [...arr],
        highlights: [j, high],
        message: `Comparing ${arr[j]} with pivot ${pivot}`,
        comparisons,
        swaps,
        pivot: high,
        sorted: [...sorted],
        codeLine: 5,
      });

      if (arr[j] <= pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        swaps++;
        steps.push({
          array: [...arr],
          highlights: [i, j],
          message: `Swapped ${arr[j]} and ${arr[i]}`,
          comparisons,
          swaps,
          pivot: high,
          sorted: [...sorted],
          codeLine: 7,
        });
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    swaps++;
    sorted.push(i + 1);
    steps.push({
      array: [...arr],
      highlights: [i + 1],
      message: `Placed pivot ${pivot} at its final position ${i + 1}`,
      comparisons,
      swaps,
      pivot: i + 1,
      sorted: [...sorted],
      codeLine: 9,
    });

    return i + 1;
  }

  function quickSortHelper(arr: number[], low: number, high: number) {
    if (low < high) {
      const pi = partition(arr, low, high);
      quickSortHelper(arr, low, pi - 1);
      quickSortHelper(arr, pi + 1, high);
    } else if (low === high) {
      sorted.push(low);
    }
  }

  quickSortHelper(workArr, 0, workArr.length - 1);

  steps.push({
    array: [...workArr],
    highlights: workArr.map((_, i) => i),
    message: 'Quick Sort Complete! Array is sorted ✅',
    comparisons,
    swaps,
    sorted: workArr.map((_, i) => i),
    codeLine: 12,
  });

  return steps;
}
