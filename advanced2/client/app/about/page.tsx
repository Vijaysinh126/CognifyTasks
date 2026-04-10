'use client';
import { motion } from 'framer-motion';
import { Brain, Code2, BarChart3, Target, Zap, ExternalLink } from 'lucide-react';

const techStack = [
  { name: 'Next.js 14', desc: 'App Router, SSR', color: 'text-slate-200' },
  { name: 'React 18', desc: 'Concurrent features', color: 'text-cyan-400' },
  { name: 'TypeScript', desc: 'Type safety', color: 'text-blue-400' },
  { name: 'Tailwind CSS', desc: 'Utility-first styling', color: 'text-sky-400' },
  { name: 'Framer Motion', desc: 'Animations', color: 'text-purple-400' },
  { name: 'Recharts', desc: 'Performance graphs', color: 'text-green-400' },
  { name: 'Zustand', desc: 'State management', color: 'text-orange-400' },
  { name: 'Lucide React', desc: 'Icons', color: 'text-pink-400' },
];

const features = [
  { icon: Brain, title: 'Algorithm Visualization', desc: 'Step-by-step execution with real-time array state updates for Binary Search, Merge Sort, Quick Sort, and Linear Search.' },
  { icon: BarChart3, title: 'Performance Comparison', desc: 'Interactive Recharts graphs comparing O(n), O(log n), O(n log n), and O(n²) complexities.' },
  { icon: Code2, title: 'Code Sync', desc: 'JavaScript and Python code with highlighted lines synced to visualization steps.' },
  { icon: Target, title: 'Interview Mode', desc: 'Predict next algorithm steps, earn points for accuracy and speed, track streaks.' },
  { icon: Zap, title: 'Custom Input', desc: 'Enter custom arrays and targets with edge case handling for empty arrays, duplicates, and invalid input.' },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 flex items-center justify-center mx-auto mb-4">
          <Brain className="w-8 h-8 text-indigo-400" />
        </div>
        <h1 className="text-4xl font-bold gradient-text mb-3">About DSA Storyboard</h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          An interactive platform for learning Data Structures &amp; Algorithms through visual storytelling, interview practice, and performance analysis.
        </p>
      </motion.div>

      {/* Features */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mb-12">
        <h2 className="text-2xl font-bold text-slate-200 mb-6">Core Features</h2>
        <div className="space-y-4">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-5 flex gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-600/20 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-200 mb-1">{title}</h3>
                <p className="text-sm text-slate-400">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Tech stack */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mb-12">
        <h2 className="text-2xl font-bold text-slate-200 mb-6">Tech Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {techStack.map(({ name, desc, color }) => (
            <div key={name} className="glass rounded-xl p-4 text-center">
              <div className={`font-semibold text-sm ${color}`}>{name}</div>
              <div className="text-xs text-slate-500 mt-1">{desc}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* GitHub */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="glass rounded-xl p-6 text-center">
        <ExternalLink className="w-8 h-8 text-slate-400 mx-auto mb-3" />
        <h3 className="font-semibold text-slate-200 mb-2">Open Source</h3>
        <p className="text-slate-400 text-sm mb-4">This project is open source. Star it on GitHub and contribute!</p>
        <a href="#" className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-sm transition-colors inline-flex items-center gap-2">
          <ExternalLink className="w-4 h-4" />
          View on GitHub
        </a>
      </motion.div>
    </div>
  );
}
