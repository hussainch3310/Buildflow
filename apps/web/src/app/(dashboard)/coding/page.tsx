'use client';
import { useState } from 'react';

const languages = ['TypeScript', 'Python', 'Rust', 'Go', 'Java', 'SQL'];
const tasks = ['Generate', 'Refactor', 'Write Tests', 'Explain', 'Debug'];

export default function CodingPage() {
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('TypeScript');
  const [task, setTask] = useState('Generate');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    
    try {
      // 1. Get dev token
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const authRes = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@buildflow.ai', password: 'test' })
      });
      
      const authText = await authRes.text();
      if (!authRes.ok) {
        throw new Error(`Auth API Error: ${authRes.status} on URL ${apiUrl}/auth/login - ${authText.substring(0, 100)}`);
      }
      
      let authData;
      try {
        authData = JSON.parse(authText);
      } catch (e) {
        throw new Error(`Auth API Error: Expected JSON but received HTML/Text. URL: ${apiUrl}/auth/login`);
      }
      const token = authData.accessToken;

      // 2. Generate code
      const res = await fetch(`${apiUrl}/ai-coding/generate`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ prompt, language, task })
      });
      
      const resText = await res.text();
      if (!res.ok) {
        throw new Error(`API Error: ${res.status} - ${resText.substring(0, 100)}`);
      }
      
      let data;
      try {
        data = JSON.parse(resText);
      } catch (e) {
        throw new Error(`API Error: Expected JSON but received HTML/Text. URL: ${apiUrl}/ai-coding/generate`);
      }
      
      setOutput(data.output);
    } catch (error: any) {
      console.error(error);
      setOutput(`// An error occurred while generating code:\n// ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Coding Assistant</h1>
        <p className="text-muted-foreground mt-1">Generate, refactor, debug, and document code across any language.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Controls */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Task</label>
            <div className="flex flex-wrap gap-2">
              {tasks.map((t) => (
                <button key={t} onClick={() => setTask(t)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${task === t ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-accent'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Language</label>
            <div className="flex flex-wrap gap-2">
              {languages.map((l) => (
                <button key={l} onClick={() => setLanguage(l)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${language === l ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-accent'}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Describe what you need</label>
            <textarea
              className="w-full h-32 px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              placeholder="e.g. A function that fetches user data from an API with error handling and caching"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <button onClick={generate} disabled={loading || !prompt.trim()}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
            {loading ? 'Generating...' : '⚡ Generate Code'}
          </button>
        </div>

        {/* Code Output */}
        <div className="lg:col-span-3 bg-[#0d1117] border border-border rounded-xl overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs text-white/40 font-mono">{task.toLowerCase()}.{language === 'TypeScript' ? 'ts' : language.toLowerCase()}</span>
            {output && (
              <button onClick={() => navigator.clipboard.writeText(output)}
                className="text-xs text-white/50 hover:text-white transition-colors">Copy</button>
            )}
          </div>
          <div className="flex-1 p-4 overflow-auto min-h-[400px]">
            {output ? (
              <pre className="text-sm font-mono text-green-400 whitespace-pre-wrap leading-relaxed">{output}</pre>
            ) : (
              <div className="flex items-center justify-center h-full text-white/30 text-sm">
                Your generated code will appear here
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
