'use client';
import { useState } from 'react';
import { Code2, Copy, Check } from 'lucide-react';

interface Props {
  codeJS: string;
  codePython: string;
  activeLine?: number;
}

export default function CodeDisplay({ codeJS, codePython, activeLine }: Props) {
  const [lang, setLang] = useState<'js' | 'python'>('js');
  const [copied, setCopied] = useState(false);

  const code = lang === 'js' ? codeJS : codePython;
  const lines = code.split('\n');

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-indigo-400" />
          <span className="text-sm font-medium text-slate-300">Code</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg overflow-hidden border border-white/10">
            <button
              onClick={() => setLang('js')}
              className={`px-3 py-1 text-xs transition-colors ${lang === 'js' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              JavaScript
            </button>
            <button
              onClick={() => setLang('python')}
              className={`px-3 py-1 text-xs transition-colors ${lang === 'python' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Python
            </button>
          </div>
          <button onClick={copyCode} className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono">
          {lines.map((line, i) => (
            <div
              key={i}
              className={`flex gap-3 px-2 py-0.5 rounded transition-colors ${
                activeLine === i ? 'bg-indigo-500/30 border-l-2 border-indigo-400' : ''
              }`}
            >
              <span className="text-slate-600 w-5 text-right shrink-0 select-none">{i + 1}</span>
              <span className={activeLine === i ? 'text-indigo-300' : 'text-slate-300'}>{line}</span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
