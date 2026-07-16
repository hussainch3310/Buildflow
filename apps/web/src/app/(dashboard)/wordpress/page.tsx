'use client';
import { useState } from 'react';

const sites = [
  { name: 'client-portfolio.com', status: 'Healthy', plugins: 24, phpVersion: '8.2', lastChecked: '5 min ago' },
  { name: 'ecommerce-store.net', status: 'Warning', plugins: 31, phpVersion: '7.4', lastChecked: '1 hour ago' },
  { name: 'blog.agency.io', status: 'Healthy', plugins: 18, phpVersion: '8.1', lastChecked: '12 min ago' },
];

const agents = [
  { name: 'Elementor Popup Debugger', desc: 'Resolves JS conflicts with Elementor Pro popup scripts', tag: 'JS Conflicts' },
  { name: 'Scrollspy Nav Fixer', desc: 'Debugs custom scrollspy menus and anchor link offsets', tag: 'Navigation' },
  { name: 'Timezone Scheduler', desc: 'Diagnoses server vs WordPress timezone scheduling issues', tag: 'Scheduling' },
];

export default function WordPressPage() {
  const [activeTab, setActiveTab] = useState<'sites' | 'agents'>('sites');

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">WordPress Toolkit</h1>
          <p className="text-muted-foreground mt-1">Manage, monitor, and debug WordPress sites with specialized AI agents.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90">+ Add Site</button>
      </div>

      <div className="flex gap-2 border-b border-border">
        {(['sites', 'agents'] as const).map((t) => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors capitalize ${activeTab === t ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground'}`}>
            {t === 'sites' ? 'Site Monitor' : 'AI Debug Agents'}
          </button>
        ))}
      </div>

      {activeTab === 'sites' && (
        <div className="space-y-3">
          {sites.map((s) => (
            <div key={s.name} className="flex items-center justify-between p-5 bg-card border border-border rounded-xl hover:border-primary/40 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-2.5 h-2.5 rounded-full ${s.status === 'Healthy' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                <div>
                  <p className="font-semibold">{s.name}</p>
                  <p className="text-xs text-muted-foreground">Checked {s.lastChecked} · PHP {s.phpVersion}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-center hidden sm:block">
                  <p className="font-semibold">{s.plugins}</p>
                  <p className="text-muted-foreground text-xs">Plugins</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${s.status === 'Healthy' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-600'}`}>{s.status}</span>
                <button className="text-xs px-3 py-1.5 border border-border rounded-lg hover:bg-accent">Inspect</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'agents' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {agents.map((a) => (
            <div key={a.name} className="bg-card border border-border rounded-xl p-5 space-y-3 hover:border-primary/40 transition-colors">
              <div className="flex items-start justify-between">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">{a.tag}</span>
                <div className="w-2 h-2 rounded-full bg-green-500" title="Agent Online" />
              </div>
              <h3 className="font-semibold">{a.name}</h3>
              <p className="text-sm text-muted-foreground">{a.desc}</p>
              <button className="w-full py-2 text-sm border border-border rounded-lg hover:bg-accent transition-colors">Run Agent</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
