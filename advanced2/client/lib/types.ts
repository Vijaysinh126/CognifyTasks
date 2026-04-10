export type AlgorithmName = 'binary-search' | 'linear-search' | 'merge-sort' | 'quick-sort';

export interface AlgorithmStep {
  array: number[];
  highlights: number[];
  message: string;
  comparisons: number;
  swaps: number;
  low?: number;
  high?: number;
  mid?: number;
  found?: number;
  pivot?: number;
  sorted?: number[];
  codeLine?: number;
}

export interface AlgorithmInfo {
  name: string;
  slug: AlgorithmName;
  description: string;
  timeComplexity: { best: string; average: string; worst: string };
  spaceComplexity: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  whyNotUse: string[];
  edgeCases: string[];
  codeJS: string;
  codePython: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  algorithm: string;
  score: number;
  time: number;
  steps: number;
  date: string;
}

export interface UserProgress {
  completedAlgorithms: AlgorithmName[];
  scores: Record<string, number>;
  totalSessions: number;
}
