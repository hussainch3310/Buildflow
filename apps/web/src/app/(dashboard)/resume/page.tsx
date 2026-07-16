'use client';
import { useState } from 'react';

export default function ResumePage() {
  const [activeTemplate, setActiveTemplate] = useState('modern');
  const [jobDesc, setJobDesc] = useState('');
  const [tailoring, setTailoring] = useState(false);
  const [tailored, setTailored] = useState(false);

  const tailorResume = () => {
    if (!jobDesc.trim()) return;
    setTailoring(true);
    setTimeout(() => { setTailoring(false); setTailored(true); }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Resume Builder</h1>
        <p className="text-muted-foreground mt-1">Create ATS-friendly resumes and tailor them to any job description with AI.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <h2 className="font-semibold">Template</h2>
            <div className="grid grid-cols-2 gap-2">
              {['modern', 'minimal', 'executive', 'creative'].map((t) => (
                <button key={t} onClick={() => setActiveTemplate(t)}
                  className={`py-3 rounded-lg text-sm capitalize border transition-colors ${activeTemplate === t ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-accent'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 space-y-3">
            <h2 className="font-semibold">AI Tailoring</h2>
            <p className="text-xs text-muted-foreground">Paste a job description and AI will rewrite your resume to maximize ATS score.</p>
            <textarea
              className="w-full h-28 px-3 py-2 bg-background border border-input rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Paste job description here..."
              value={jobDesc}
              onChange={(e) => { setJobDesc(e.target.value); setTailored(false); }}
            />
            <button onClick={tailorResume} disabled={tailoring || !jobDesc.trim()}
              className="w-full py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50">
              {tailoring ? 'Tailoring...' : tailored ? '✓ Resume Tailored!' : '✨ Tailor with AI'}
            </button>
            {tailored && (
              <p className="text-xs text-green-500 font-medium text-center">ATS Score improved from 62% → 91%</p>
            )}
          </div>

          <button className="w-full py-3 bg-card border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors">
            ⬇ Export as PDF
          </button>
        </div>

        {/* Resume Preview */}
        <div className="lg:col-span-2 bg-white text-gray-900 rounded-xl shadow-lg p-10 min-h-[600px] border border-border">
          <div className={`${activeTemplate === 'modern' ? 'border-l-4 border-violet-600 pl-5' : ''}`}>
            <h2 className="text-2xl font-bold">Alex Johnson</h2>
            <p className="text-sm text-gray-500 mt-1">Senior Full-Stack Engineer · San Francisco, CA</p>
            <p className="text-sm text-gray-400 mt-0.5">alex@email.com · github.com/alexj · linkedin.com/in/alexj</p>
          </div>

          <div className="mt-6 space-y-5 text-sm">
            <div>
              <h3 className="font-semibold text-gray-700 uppercase text-xs tracking-wider mb-2">Summary</h3>
              <p className="text-gray-600 leading-relaxed">
                {tailored
                  ? 'Results-driven Full-Stack Engineer with 8+ years building scalable SaaS platforms. Expert in Next.js, TypeScript, and NestJS microservices with proven track record of 40% performance improvements and leading cross-functional teams.'
                  : 'Full-Stack Engineer with 8 years of experience building web applications. Skilled in React, Node.js, and cloud infrastructure. Passionate about clean code and developer experience.'}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 uppercase text-xs tracking-wider mb-2">Experience</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between"><span className="font-medium">Senior Engineer, Acme Corp</span><span className="text-gray-400">2021–Present</span></div>
                  <ul className="text-gray-500 mt-1 space-y-1 list-disc list-inside">
                    <li>Led migration of monolith to microservices architecture</li>
                    <li>Reduced API response times by 60% via Redis caching</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 uppercase text-xs tracking-wider mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {['TypeScript', 'React', 'Next.js', 'NestJS', 'PostgreSQL', 'Redis', 'AWS', 'Docker'].map((s) => (
                  <span key={s} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
