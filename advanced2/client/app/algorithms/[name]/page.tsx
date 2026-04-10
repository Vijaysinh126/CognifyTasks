'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { Play, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { algorithmsData } from '@/lib/algorithmData';
import { binarySearchSteps } from '@/lib/algorithms/binarySearch';
import { linearSearchSteps } from '@/lib/algorithms/linearSearch';
import { mergeSortSteps } from '@/lib/algorithms/mergeSort';
import { quickSortSteps } from '@/lib/algorithms/quickSort';
import { AlgorithmStep } from '@/lib/types';
import ArrayVisualizer from '@/components/ArrayVisualizer';
import CodeDisplay from '@/components/CodeDisplay';
import AlgorithmControls from '@/components/AlgorithmControls';
import PerformanceChart from '@/components/PerformanceChart';
import Link from 'next/link';

const DEFAULT_ARRAY = [64, 34, 25, 12, 22, 11, 90];
const DEFAULT_TARGET = 25;

export default function AlgorithmPage() {
  const params = useParams();
  const name = params.name as string;

  const [arr, setArr] = useState(DEFAULT_ARRAY);
  const [target, setTarget] = useState(DEFAULT_TARGET);
  const [customInput, setCustomInput] = useState(DEFAULT_ARRAY.join(', '));
  const [customTarget, setCustomTarget] = useState(String(DEFAULT_TARGET));
  const [steps, setSteps] = useState<AlgorithmStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(700);
  const [inputError, setInputError] = useState('');
  const [activeTab, setActiveTab] = useState<'visualize' | 'code' | 'compare' | 'info'>('visualize');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const algo = algorithmsData[name];
  const isSearch = algo?.category === 'Search';

  const generateSteps = useCallback((a: number[], t: number) => {
    let s: AlgorithmStep[] = [];
    if (name === 'binary-search') s = binarySearchSteps(a, t);
    else if (name === 'linear-search') s = linearSearchSteps(a, t);
    else if (name === 'merge-sort') s = mergeSortSteps(a);
    else if (name === 'quick-sort') s = quickSortSteps(a);
    setSteps(s);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [name]);

  useEffect(() => {
    if (algo) generateSteps(arr, target);
  }, [generateSteps, arr, target, algo]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, speed, steps.length]);

  if (!algo) return notFound();

  const handleCustomInput = () => {
    setInputError('');
    try {
      const parsed = customInput.split(',').map((s) => {
        const n = Number(s.trim());
        if (isNaN(n)) throw new Error(`"${s.trim()}" is not a number`);
        return n;
      });
      if (parsed.length === 0) throw new Error('Array cannot be empty');
      if (parsed.length > 20) throw new Error('Maximum 20 elements allowed');
      const t = Number(customTarget);
      if (isSearch && isNaN(t)) throw new Error('Invalid target value');
      setArr(parsed);
      setTarget(isSearch ? t : DEFAULT_TARGET);
      generateSteps(parsed, isSearch ? t : DEFAULT_TARGET);
    } catch (e) {
      setInputError(e instanceof Error ? e.message : 'Invalid input');
    }
  };

  const step = steps[currentStep];

  const difficultyColors: Record<string, string> = {
    Easy: 'text-green-400 bg-green-400/10 border-green-400/30',
    Medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
    Hard: 'text-red-400 bg-red-400/10 border-red-400/30',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h1 className="text-4xl font-bold gradient-text">{algo.name}</h1>
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${difficultyColors[algo.difficulty]}`}>{algo.difficulty}</span>
          <span className="px-3 py-1 rounded-full text-sm bg-indigo-600/20 text-indigo-300 border border-indigo-600/30">{algo.category}</span>
        </div>
        <p className="text-slate-400 max-w-2xl">{algo.description}</p>
        <div className="flex gap-2 mt-4">
          <Link href={`/interview-mode/${name}`} className="px-4 py-2 bg-purple-600/20 text-purple-300 rounded-lg text-sm hover:bg-purple-600/40 transition-colors">
            🎯 Practice Interview Mode
          </Link>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 glass rounded-xl p-1 w-fit">
        {(['visualize', 'code', 'compare', 'info'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
              activeTab === tab ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'visualize' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {/* Visualizer */}
            <div className="glass rounded-xl p-6">
              {step && <ArrayVisualizer step={step} maxValue={Math.max(...arr)} />}
              {step && (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 rounded-lg bg-indigo-600/10 border border-indigo-600/20 text-sm text-indigo-300"
                >
                  {step.message}
                </motion.div>
              )}
            </div>

            {/* Stats */}
            {step && (
              <div className="grid grid-cols-3 gap-3">
                <div className="glass rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-indigo-400">{step.comparisons}</div>
                  <div className="text-xs text-slate-400 mt-1">Comparisons</div>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">{step.swaps}</div>
                  <div className="text-xs text-slate-400 mt-1">Swaps</div>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-400">{currentStep + 1}/{steps.length}</div>
                  <div className="text-xs text-slate-400 mt-1">Steps</div>
                </div>
              </div>
            )}

            {/* Controls */}
            <AlgorithmControls
              currentStep={currentStep}
              totalSteps={steps.length}
              isPlaying={isPlaying}
              speed={speed}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onNext={() => setCurrentStep((p) => Math.min(p + 1, steps.length - 1))}
              onPrev={() => setCurrentStep((p) => Math.max(p - 1, 0))}
              onReset={() => { setCurrentStep(0); setIsPlaying(false); }}
              onSpeedChange={setSpeed}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Custom Input */}
            <div className="glass rounded-xl p-4">
              <h3 className="text-sm font-semibold text-slate-200 mb-3">Custom Input</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Array (comma-separated)</label>
                  <input
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. 1, 5, 3, 8, 2"
                  />
                </div>
                {isSearch && (
                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">Target</label>
                    <input
                      value={customTarget}
                      onChange={(e) => setCustomTarget(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                      placeholder="e.g. 5"
                    />
                  </div>
                )}
                {inputError && (
                  <div className="flex items-center gap-2 text-red-400 text-xs">
                    <AlertCircle className="w-4 h-4" />
                    {inputError}
                  </div>
                )}
                <button
                  onClick={handleCustomInput}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Run Algorithm
                </button>
              </div>
            </div>

            {/* Complexity */}
            <div className="glass rounded-xl p-4">
              <h3 className="text-sm font-semibold text-slate-200 mb-3">Complexity</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-400">Best</span><span className="text-green-400">{algo.timeComplexity.best}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Average</span><span className="text-yellow-400">{algo.timeComplexity.average}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Worst</span><span className="text-red-400">{algo.timeComplexity.worst}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Space</span><span className="text-indigo-400">{algo.spaceComplexity}</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'code' && (
        <CodeDisplay
          codeJS={algo.codeJS}
          codePython={algo.codePython}
          activeLine={step?.codeLine}
        />
      )}

      {activeTab === 'compare' && (
        <PerformanceChart algorithmType={isSearch ? 'search' : 'sort'} />
      )}

      {activeTab === 'info' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass rounded-xl p-6">
            <h3 className="font-semibold text-slate-200 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-400" />
              When NOT to use {algo.name}
            </h3>
            <ul className="space-y-2">
              {algo.whyNotUse.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                  <ChevronRight className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-xl p-6">
            <h3 className="font-semibold text-slate-200 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              Edge Cases
            </h3>
            <ul className="space-y-2">
              {algo.edgeCases.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                  <ChevronRight className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
