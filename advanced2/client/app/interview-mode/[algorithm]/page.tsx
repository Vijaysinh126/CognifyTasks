'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Star, CheckCircle, XCircle, Trophy, ArrowRight, RotateCcw } from 'lucide-react';
import { algorithmsData } from '@/lib/algorithmData';
import { binarySearchSteps } from '@/lib/algorithms/binarySearch';
import { linearSearchSteps } from '@/lib/algorithms/linearSearch';
import { mergeSortSteps } from '@/lib/algorithms/mergeSort';
import { quickSortSteps } from '@/lib/algorithms/quickSort';
import { AlgorithmStep } from '@/lib/types';
import ArrayVisualizer from '@/components/ArrayVisualizer';
import { useStore } from '@/lib/store';

const DEMO_ARRAY = [35, 14, 78, 22, 56, 9, 43];
const DEMO_TARGET = 22;
const TIME_LIMIT = 30;

function generateChoices(step: AlgorithmStep, allSteps: AlgorithmStep[], currentIdx: number): string[] {
  const correct = step.message;
  const others = allSteps
    .filter((_, i) => i !== currentIdx)
    .map((s) => s.message)
    .filter((m) => m !== correct)
    .slice(0, 3);

  const choices = [correct, ...others].sort(() => Math.random() - 0.5);
  return choices.slice(0, 4);
}

export default function InterviewModePage() {
  const params = useParams();
  const algoName = params.algorithm as string;
  const { addLeaderboardEntry, updateProgress } = useStore();

  const [steps, setSteps] = useState<AlgorithmStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [choices, setChoices] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const algo = algorithmsData[algoName];

  const initSteps = useCallback(() => {
    let s: AlgorithmStep[] = [];
    if (algoName === 'binary-search') s = binarySearchSteps(DEMO_ARRAY, DEMO_TARGET);
    else if (algoName === 'linear-search') s = linearSearchSteps(DEMO_ARRAY, DEMO_TARGET);
    else if (algoName === 'merge-sort') s = mergeSortSteps(DEMO_ARRAY);
    else if (algoName === 'quick-sort') s = quickSortSteps(DEMO_ARRAY);
    setSteps(s);
    return s;
  }, [algoName]);

  const advance = useCallback((currentIdx: number, currentSteps: AlgorithmStep[]) => {
    const nextIdx = currentIdx + 1;
    if (nextIdx >= currentSteps.length - 1) {
      setGameState('finished');
      return;
    }
    setCurrentStepIdx(nextIdx);
    setSelected(null);
    setTimeLeft(TIME_LIMIT);
    if (nextIdx + 1 < currentSteps.length) {
      setChoices(generateChoices(currentSteps[nextIdx + 1], currentSteps, nextIdx + 1));
    }
  }, []);

  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            return TIME_LIMIT;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [gameState, currentStepIdx]);

  useEffect(() => {
    if (gameState === 'finished' && algo) {
      const entry = {
        id: Date.now().toString(),
        name: playerName || 'Anonymous',
        algorithm: algo.name,
        score,
        time: TIME_LIMIT - timeLeft,
        steps: currentStepIdx + 1,
        date: new Date().toISOString(),
      };
      addLeaderboardEntry(entry);
      updateProgress(algo.slug, score);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  if (!algo) return notFound();

  const startGame = () => {
    const s = initSteps();
    setCurrentStepIdx(0);
    setScore(0);
    setCorrect(0);
    setIncorrect(0);
    setStreak(0);
    setMaxStreak(0);
    setSelected(null);
    setTimeLeft(TIME_LIMIT);
    setGameState('playing');
    if (s.length > 1) {
      setChoices(generateChoices(s[1], s, 1));
    }
  };

  const handleAnswer = (choice: string) => {
    if (selected) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setSelected(choice);

    const isCorrect = choice === steps[currentStepIdx + 1]?.message;
    if (isCorrect) {
      const bonus = Math.ceil(timeLeft / 5);
      setScore((prev) => prev + 10 + bonus);
      setCorrect((p) => p + 1);
      setStreak((prev) => {
        const newStreak = prev + 1;
        setMaxStreak((m) => Math.max(m, newStreak));
        return newStreak;
      });
    } else {
      setIncorrect((p) => p + 1);
      setStreak(0);
    }

    setTimeout(() => advance(currentStepIdx, steps), 1200);
  };

  const currentStep = steps[currentStepIdx];
  const timerColor = timeLeft > 15 ? 'text-green-400' : timeLeft > 7 ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-3xl font-bold gradient-text">Interview Mode</h1>
        <p className="text-slate-400 mt-1">{algo.name} – Predict the next step!</p>
      </motion.div>

      {gameState === 'idle' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-8 text-center">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold text-slate-200 mb-2">Ready to Practice?</h2>
          <p className="text-slate-400 mb-6">Watch the algorithm execute and predict what happens next. Score points based on accuracy and speed!</p>
          <input
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name (optional)"
            className="w-full max-w-xs mx-auto block bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-slate-200 mb-6 focus:outline-none focus:border-indigo-500"
          />
          <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mb-6 text-sm">
            <div className="glass rounded-xl p-3"><div className="text-xl font-bold text-indigo-400">10</div><div className="text-slate-400">pts/correct</div></div>
            <div className="glass rounded-xl p-3"><div className="text-xl font-bold text-yellow-400">+bonus</div><div className="text-slate-400">for speed</div></div>
            <div className="glass rounded-xl p-3"><div className="text-xl font-bold text-purple-400">🔥</div><div className="text-slate-400">streaks</div></div>
          </div>
          <button onClick={startGame} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-all hover:scale-105">
            Start Interview
          </button>
        </motion.div>
      )}

      {gameState === 'playing' && currentStep && (
        <div className="space-y-4">
          {/* Status Bar */}
          <div className="grid grid-cols-4 gap-3">
            <div className="glass rounded-xl p-3 text-center">
              <div className={`text-2xl font-bold ${timerColor}`}>{timeLeft}s</div>
              <div className="text-xs text-slate-400">Time Left</div>
            </div>
            <div className="glass rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-indigo-400">{score}</div>
              <div className="text-xs text-slate-400">Score</div>
            </div>
            <div className="glass rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-green-400">{correct}</div>
              <div className="text-xs text-slate-400">Correct</div>
            </div>
            <div className="glass rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-orange-400">🔥{streak}</div>
              <div className="text-xs text-slate-400">Streak</div>
            </div>
          </div>

          {/* Timer bar */}
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${timeLeft > 15 ? 'bg-green-400' : timeLeft > 7 ? 'bg-yellow-400' : 'bg-red-400'}`}
              animate={{ width: `${(timeLeft / TIME_LIMIT) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Current state */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
              <Timer className="w-4 h-4" />
              Current State – Step {currentStepIdx + 1} / {steps.length}
            </div>
            <ArrayVisualizer step={currentStep} maxValue={Math.max(...DEMO_ARRAY)} />
            <div className="mt-3 p-3 rounded-lg bg-slate-800/50 text-sm text-slate-300">
              {currentStep.message}
            </div>
          </div>

          {/* Question */}
          <div className="glass rounded-xl p-6">
            <h3 className="font-semibold text-slate-200 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              What happens next?
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <AnimatePresence>
                {choices.map((choice, i) => {
                  const isCorrectAnswer = choice === steps[currentStepIdx + 1]?.message;
                  const isSelected = selected === choice;
                  const showResult = selected !== null;

                  let btnClass = 'glass glass-hover border border-white/10 text-slate-300';
                  if (showResult) {
                    if (isCorrectAnswer) btnClass = 'bg-green-500/20 border border-green-500/50 text-green-300';
                    else if (isSelected && !isCorrectAnswer) btnClass = 'bg-red-500/20 border border-red-500/50 text-red-300';
                  }

                  return (
                    <motion.button
                      key={choice}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handleAnswer(choice)}
                      disabled={!!selected}
                      className={`p-4 rounded-xl text-left text-sm transition-all ${btnClass} flex items-center justify-between`}
                    >
                      <span>{choice}</span>
                      {showResult && isCorrectAnswer && <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />}
                      {showResult && isSelected && !isCorrectAnswer && <XCircle className="w-5 h-5 text-red-400 shrink-0" />}
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}

      {gameState === 'finished' && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-2xl p-8 text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold gradient-text mb-2">Interview Complete!</h2>
          <p className="text-slate-400 mb-6">{playerName ? `Great job, ${playerName}!` : 'Great job!'}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="glass rounded-xl p-4">
              <div className="text-3xl font-bold text-indigo-400">{score}</div>
              <div className="text-xs text-slate-400">Final Score</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-3xl font-bold text-green-400">{correct}</div>
              <div className="text-xs text-slate-400">Correct</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-3xl font-bold text-red-400">{incorrect}</div>
              <div className="text-xs text-slate-400">Incorrect</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-3xl font-bold text-orange-400">{maxStreak}🔥</div>
              <div className="text-xs text-slate-400">Best Streak</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <button onClick={startGame} className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-all">
              <RotateCcw className="w-4 h-4" />
              Play Again
            </button>
            <a href="/leaderboard" className="flex items-center gap-2 px-6 py-3 glass hover:bg-white/10 text-slate-200 rounded-xl font-medium transition-all">
              <Trophy className="w-4 h-4" />
              Leaderboard
            </a>
            <a href={`/algorithms/${algoName}`} className="flex items-center gap-2 px-6 py-3 glass hover:bg-white/10 text-slate-200 rounded-xl font-medium transition-all">
              <ArrowRight className="w-4 h-4" />
              Study Mode
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
}
