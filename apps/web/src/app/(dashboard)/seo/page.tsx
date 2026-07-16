'use client';
import { useState } from 'react';

export default function SEOPage() {
  const [url, setUrl] = useState('');
  const [audited, setAudited] = useState(false);
  const [loading, setLoading] = useState(false);

  const [metrics, setMetrics] = useState<{label: string, score: number, color: string, bg: string}[]>([]);
  const [issues, setIssues] = useState<{type: string, msg: string}[]>([]);

  const audit = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setAudited(false);
    
    try {
      // 1. Get dev token
      const authRes = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@buildflow.ai', password: 'test' })
      });
      const authData = await authRes.json();
      const token = authData.accessToken;

      // 2. Run Audit
      const res = await fetch('http://localhost:4000/seo/audit', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ url })
      });
      
      if (!res.ok) throw new Error('Audit failed');
      const data = await res.json();
      
      setMetrics(data.metrics);
      setIssues(data.issues);
      setAudited(true);
    } catch (error) {
      console.error(error);
      alert('Failed to audit URL. Make sure it is a valid, accessible website.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">SEO Toolkit</h1>
        <p className="text-muted-foreground mt-1">Run technical SEO audits, generate schema markup, and optimize metadata.</p>
      </div>

      {/* URL Input */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex gap-3">
          <input
            className="flex-1 px-4 py-2.5 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="https://yourwebsite.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button onClick={audit} disabled={loading || !url.trim()}
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 disabled:opacity-50">
            {loading ? 'Auditing...' : 'Run Audit'}
          </button>
        </div>
      </div>

      {audited && (
        <>
          {/* Score Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((m) => (
              <div key={m.label} className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-end justify-between mb-3">
                  <span className="text-sm text-muted-foreground">{m.label}</span>
                  <span className={`text-2xl font-bold ${m.color}`}>{m.score}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className={`h-2 rounded-full ${m.bg}`} style={{ width: `${m.score}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Issues */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="font-semibold">Audit Issues</h2>
            </div>
            <ul className="divide-y divide-border">
              {issues.map((issue, i) => (
                <li key={i} className="flex items-start gap-3 px-5 py-4">
                  <span className={`mt-0.5 text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    issue.type === 'error' ? 'bg-red-500/10 text-red-500' :
                    issue.type === 'warning' ? 'bg-yellow-500/10 text-yellow-600' :
                    'bg-blue-500/10 text-blue-500'
                  }`}>{issue.type.toUpperCase()}</span>
                  <span className="text-sm">{issue.msg}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Schema Generator */}
          <div className="bg-card border border-border rounded-xl p-5 space-y-3">
            <h2 className="font-semibold">JSON-LD Schema Generator</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {['Article', 'Product', 'Organization', 'FAQPage'].map((schema) => (
                <button key={schema} className="py-2 text-sm border border-border rounded-lg hover:bg-accent transition-colors hover:border-primary/50">
                  {schema}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
