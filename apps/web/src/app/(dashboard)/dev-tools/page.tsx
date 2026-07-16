'use client';
import { useState } from 'react';

export default function DevToolsPage() {
  const [activeTab, setActiveTab] = useState('json');

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Developer Toolkit</h1>
        <p className="text-muted-foreground mt-1">100% client-side utilities for zero-latency workflows.</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-border">
        {['json', 'base64', 'jwt'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab 
                ? 'border-primary text-foreground' 
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Active Tool Content */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm min-h-[500px]">
        {activeTab === 'json' && (
          <div className="flex flex-col h-full gap-4">
            <h2 className="text-lg font-semibold">JSON Formatter & Validator</h2>
            <div className="grid grid-cols-2 gap-4 flex-1">
              <textarea 
                className="w-full h-full min-h-[400px] p-4 font-mono text-sm bg-muted rounded-md border border-input focus:ring-1 outline-none resize-none"
                placeholder="Paste raw JSON here..."
              />
              <div className="w-full h-full min-h-[400px] p-4 font-mono text-sm bg-black text-green-400 rounded-md border border-input overflow-auto">
                {/* Formatted output will go here */}
                {`{\n  "status": "waiting for input"\n}`}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'base64' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Base64 Encoder/Decoder</h2>
            <p className="text-muted-foreground">Tool implementation pending...</p>
          </div>
        )}

        {activeTab === 'jwt' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">JWT Debugger</h2>
            <p className="text-muted-foreground">Tool implementation pending...</p>
          </div>
        )}
      </div>
    </div>
  );
}
