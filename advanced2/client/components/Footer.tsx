import Link from 'next/link';
import { Brain, ExternalLink, Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="glass border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold gradient-text">DSA Storyboard</span>
          </div>
          <p className="text-slate-500 text-sm">
            © 2024 DSA Storyboard · Interactive Algorithm Learning
          </p>
          <div className="flex items-center gap-3">
            <Link href="/about" className="text-slate-400 hover:text-white text-sm transition-colors">About</Link>
            <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">
              <Code2 className="w-5 h-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-sky-400 transition-colors">
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
