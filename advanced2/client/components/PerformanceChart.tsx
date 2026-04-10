'use client';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const generateData = () => {
  const data = [];
  for (let n = 10; n <= 200; n += 10) {
    data.push({
      n,
      'O(n)': n,
      'O(log n)': Math.round(Math.log2(n) * 10) / 10,
      'O(n log n)': Math.round(n * Math.log2(n)),
      'O(n²)': n * n,
    });
  }
  return data;
};

interface Props {
  algorithmType?: 'search' | 'sort';
}

export default function PerformanceChart({ algorithmType = 'search' }: Props) {
  const data = generateData();

  return (
    <div className="glass rounded-xl p-6">
      <h3 className="text-lg font-semibold text-slate-200 mb-4">Performance Comparison</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="n" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} label={{ value: 'Input Size (n)', position: 'insideBottom', offset: -5, fill: '#64748b' }} />
          <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} width={50} />
          <Tooltip
            contentStyle={{ background: 'rgba(15,15,25,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#e2e8f0' }}
          />
          <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
          <Line type="monotone" dataKey="O(n)" stroke="#6366f1" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="O(log n)" stroke="#22d3ee" strokeWidth={2} dot={false} />
          {algorithmType === 'sort' && (
            <>
              <Line type="monotone" dataKey="O(n log n)" stroke="#a78bfa" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="O(n²)" stroke="#f87171" strokeWidth={2} dot={false} />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
