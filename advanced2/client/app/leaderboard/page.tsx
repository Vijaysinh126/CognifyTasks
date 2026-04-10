'use client';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star, Clock, Hash } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function LeaderboardPage() {
  const { leaderboard, userProgress } = useStore();

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-400';
    if (rank === 2) return 'text-slate-300';
    if (rank === 3) return 'text-amber-600';
    return 'text-slate-500';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold gradient-text mb-2">Leaderboard</h1>
        <p className="text-slate-400">Top performers in Interview Mode challenges</p>
      </motion.div>

      {/* User stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="glass rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-green-600/20 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-sm text-slate-400">Algorithms Mastered</span>
          </div>
          <div className="text-3xl font-bold text-slate-200">{userProgress.completedAlgorithms.length}</div>
        </div>
        <div className="glass rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-indigo-600/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-indigo-400" />
            </div>
            <span className="text-sm text-slate-400">Total Sessions</span>
          </div>
          <div className="text-3xl font-bold text-slate-200">{userProgress.totalSessions}</div>
        </div>
        <div className="glass rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-purple-600/20 flex items-center justify-center">
              <Medal className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-sm text-slate-400">Best Scores</span>
          </div>
          <div className="text-sm text-slate-300 mt-1 space-y-1">
            {Object.entries(userProgress.scores).length === 0 ? (
              <span className="text-slate-500">No scores yet</span>
            ) : (
              Object.entries(userProgress.scores).map(([alg, score]) => (
                <div key={alg} className="flex justify-between">
                  <span className="text-slate-400 capitalize">{alg.replace('-', ' ')}</span>
                  <span className="text-indigo-400">{score}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Leaderboard table */}
      <div className="glass rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="font-semibold text-slate-200">Top Scores</h2>
        </div>
        {leaderboard.length === 0 ? (
          <div className="px-6 py-12 text-center text-slate-500">
            <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No scores yet. Complete Interview Mode to appear here!</p>
            <a href="/algorithms/binary-search" className="mt-4 inline-block px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm transition-colors">
              Start Practicing
            </a>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {leaderboard.map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition-colors"
              >
                <div className={`text-xl font-bold w-8 text-center ${getRankColor(i + 1)}`}>
                  {getRankIcon(i + 1)}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-slate-200">{entry.name}</div>
                  <div className="text-xs text-slate-500">{entry.algorithm}</div>
                </div>
                <div className="flex items-center gap-5 text-sm">
                  <div className="flex items-center gap-1.5 text-indigo-400">
                    <Star className="w-4 h-4" />
                    <span className="font-semibold">{entry.score}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Hash className="w-4 h-4" />
                    <span>{entry.steps} steps</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(entry.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
