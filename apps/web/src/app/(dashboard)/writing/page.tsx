'use client';
import { useState } from 'react';

const frameworks = ['AIDA', 'PAS', 'BAB', 'FAB'];
const tones = ['Professional', 'Casual', 'Persuasive', 'Witty', 'Empathetic'];

export default function WritingPage() {
  const [topic, setTopic] = useState('');
  const [framework, setFramework] = useState('AIDA');
  const [tone, setTone] = useState('Professional');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    
    try {
      // 1. Get dev token
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const authRes = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@buildflow.ai', password: 'test' })
      });
      const authData = await authRes.json();
      const token = authData.accessToken;

      // 2. Generate copy
      const res = await fetch(`${apiUrl}/ai-writing/generate`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ topic, framework, tone })
      });
      
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      setOutput(data.output);
    } catch (error) {
      console.error(error);
      setOutput('An error occurred while generating copy. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Writing Assistant</h1>
        <p className="text-muted-foreground mt-1">Generate long-form content, ad copy, and email sequences using proven frameworks.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-5">
          <h2 className="font-semibold text-lg">Configuration</h2>

          <div className="space-y-2">
            <label className="text-sm font-medium">Topic / Product</label>
            <input
              className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="e.g. SaaS productivity tool for freelancers"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Copywriting Framework</label>
            <div className="flex flex-wrap gap-2">
              {frameworks.map((f) => (
                <button
                  key={f}
                  onClick={() => setFramework(f)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${framework === f ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-accent'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tone</label>
            <div className="flex flex-wrap gap-2">
              {tones.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${tone === t ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-accent'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generate}
            disabled={loading || !topic.trim()}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating...' : '✨ Generate Copy'}
          </button>
        </div>

        {/* Output */}
        <div className="bg-card border border-border rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Output</h2>
            {output && (
              <button
                onClick={() => navigator.clipboard.writeText(output)}
                className="text-xs px-3 py-1.5 border border-border rounded-lg hover:bg-accent transition-colors"
              >
                Copy
              </button>
            )}
          </div>
          {output ? (
            <div className="flex-1 text-sm leading-relaxed whitespace-pre-wrap text-foreground bg-muted/30 rounded-lg p-4 font-mono">
              {output}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm border border-dashed border-border rounded-lg">
              Generated content will appear here
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
