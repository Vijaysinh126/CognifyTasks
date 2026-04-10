'use client';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';

interface Props {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}

export default function AlgorithmControls({
  currentStep, totalSteps, isPlaying, speed,
  onPlay, onPause, onNext, onPrev, onReset, onSpeedChange,
}: Props) {
  return (
    <div className="glass rounded-xl p-4">
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span>Step {currentStep + 1} / {totalSteps}</span>
          <span>{Math.round((currentStep / Math.max(totalSteps - 1, 1)) * 100)}%</span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / Math.max(totalSteps - 1, 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button onClick={onReset} className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
          <RotateCcw className="w-5 h-5" />
        </button>
        <button onClick={onPrev} disabled={currentStep === 0} className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors disabled:opacity-30">
          <SkipBack className="w-5 h-5" />
        </button>
        <button
          onClick={isPlaying ? onPause : onPlay}
          className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
        <button onClick={onNext} disabled={currentStep === totalSteps - 1} className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors disabled:opacity-30">
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      {/* Speed */}
      <div className="mt-4 flex items-center gap-3">
        <span className="text-xs text-slate-400 w-12">Speed</span>
        <input
          type="range"
          min={100}
          max={2000}
          step={100}
          value={2100 - speed}
          onChange={(e) => onSpeedChange(2100 - Number(e.target.value))}
          className="flex-1 accent-indigo-500"
        />
        <span className="text-xs text-slate-400 w-16 text-right">{speed}ms</span>
      </div>
    </div>
  );
}
