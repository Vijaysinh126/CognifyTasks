import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AlgorithmName, AlgorithmStep, LeaderboardEntry, UserProgress } from './types';

interface AlgorithmState {
  currentAlgorithm: AlgorithmName | null;
  steps: AlgorithmStep[];
  currentStep: number;
  isPlaying: boolean;
  speed: number;
  customArray: number[];
  target: number;
  setAlgorithm: (name: AlgorithmName) => void;
  setSteps: (steps: AlgorithmStep[]) => void;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setSpeed: (speed: number) => void;
  setCustomArray: (arr: number[]) => void;
  setTarget: (target: number) => void;
  reset: () => void;
}

interface AppState extends AlgorithmState {
  leaderboard: LeaderboardEntry[];
  userProgress: UserProgress;
  addLeaderboardEntry: (entry: LeaderboardEntry) => void;
  updateProgress: (algorithm: AlgorithmName, score: number) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      currentAlgorithm: null,
      steps: [],
      currentStep: 0,
      isPlaying: false,
      speed: 500,
      customArray: [64, 34, 25, 12, 22, 11, 90],
      target: 25,
      leaderboard: [],
      userProgress: {
        completedAlgorithms: [],
        scores: {},
        totalSessions: 0,
      },
      setAlgorithm: (name) => set({ currentAlgorithm: name }),
      setSteps: (steps) => set({ steps, currentStep: 0 }),
      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, state.steps.length - 1),
        })),
      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 0),
        })),
      setStep: (step) => set({ currentStep: step }),
      setIsPlaying: (playing) => set({ isPlaying: playing }),
      setSpeed: (speed) => set({ speed }),
      setCustomArray: (arr) => set({ customArray: arr }),
      setTarget: (target) => set({ target }),
      reset: () => set({ currentStep: 0, isPlaying: false }),
      addLeaderboardEntry: (entry) =>
        set((state) => ({
          leaderboard: [...state.leaderboard, entry].sort((a, b) => b.score - a.score).slice(0, 50),
        })),
      updateProgress: (algorithm, score) =>
        set((state) => ({
          userProgress: {
            completedAlgorithms: state.userProgress.completedAlgorithms.includes(algorithm)
              ? state.userProgress.completedAlgorithms
              : [...state.userProgress.completedAlgorithms, algorithm],
            scores: { ...state.userProgress.scores, [algorithm]: Math.max(state.userProgress.scores[algorithm] || 0, score) },
            totalSessions: state.userProgress.totalSessions + 1,
          },
        })),
    }),
    { name: 'dsa-storyboard-storage' }
  )
);
