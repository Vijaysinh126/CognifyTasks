'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, SortAsc, Trophy, BookOpen, Zap, Target, Code2, BarChart3 } from 'lucide-react';
import { algorithmsList } from '@/lib/algorithmData';

const features = [
  { icon: Zap, title: 'Step-by-Step Visualization', desc: 'Watch algorithms execute with real-time array state updates' },
  { icon: BarChart3, title: 'Performance Comparison', desc: 'Compare O(n) vs O(log n) with interactive charts' },
  { icon: Target, title: 'Interview Mode', desc: 'Predict next steps and score your algorithm knowledge' },
  { icon: Code2, title: 'Code Sync', desc: 'Highlighted code syncs with visualization in real-time' },
];

const categoryIcons: Record<string, React.ReactNode> = {
  Search: <Search className="w-5 h-5" />,
  Sort: <SortAsc className="w-5 h-5" />,
};

const difficultyColors: Record<string, string> = {
  Easy: 'text-green-400 bg-green-400/10',
  Medium: 'text-yellow-400 bg-yellow-400/10',
  Hard: 'text-red-400 bg-red-400/10',
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative px-4 pt-20 pb-16 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 via-transparent to-transparent pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 text-sm text-indigo-300">
            <Zap className="w-4 h-4" />
            Interactive DSA Learning Platform
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Learn DSA Through{' '}
            <span className="gradient-text">Stories</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            Visualize, understand, and master Data Structures &amp; Algorithms with step-by-step interactive animations, code sync, and interview practice.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/algorithms/binary-search" className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-all hover:scale-105 neon-border">
              Start Learning
            </Link>
            <Link href="/interview-mode/binary-search" className="px-8 py-3 glass hover:bg-white/10 text-slate-200 rounded-xl font-medium transition-all hover:scale-105">
              Interview Mode
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-4 py-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass glass-hover rounded-xl p-6"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-600/20 flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="font-semibold text-slate-200 mb-2">{title}</h3>
              <p className="text-sm text-slate-400">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Algorithms */}
      <section className="px-4 py-16 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-slate-200">Algorithms</h2>
          <Link href="/leaderboard" className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm">
            <Trophy className="w-4 h-4" />
            Leaderboard
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {algorithmsList.map((algo, i) => (
            <motion.div
              key={algo.slug}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/algorithms/${algo.slug}`} className="block glass glass-hover rounded-xl p-6 group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-600/20 flex items-center justify-center text-indigo-400">
                      {categoryIcons[algo.category]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors">{algo.name}</h3>
                      <span className="text-xs text-slate-500">{algo.category}</span>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${difficultyColors[algo.difficulty]}`}>
                    {algo.difficulty}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">{algo.description}</p>
                <div className="flex gap-4 text-xs text-slate-500">
                  <span>⏱ {algo.timeComplexity.average}</span>
                  <span>💾 {algo.spaceComplexity}</span>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/algorithms/${algo.slug}`}
                    className="flex-1 text-center py-2 text-sm rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/40 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <BookOpen className="w-4 h-4 inline mr-1" />
                    Visualize
                  </Link>
                  <Link
                    href={`/interview-mode/${algo.slug}`}
                    className="flex-1 text-center py-2 text-sm rounded-lg bg-purple-600/20 text-purple-300 hover:bg-purple-600/40 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Target className="w-4 h-4 inline mr-1" />
                    Interview
                  </Link>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
