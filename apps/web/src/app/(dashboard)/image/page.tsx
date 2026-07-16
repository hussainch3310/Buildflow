'use client';
import { useState, useRef } from 'react';

export default function ImagePage() {
  const [activeTab, setActiveTab] = useState<'resize' | 'convert' | 'remove-bg' | 'ai-gen'>('resize');
  const [preview, setPreview] = useState<string | null>(null);
  const [width, setWidth] = useState('1920');
  const [height, setHeight] = useState('1080');
  const [format, setFormat] = useState('WebP');
  const [aiPrompt, setAiPrompt] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const tabs = [
    { id: 'resize', label: 'Resize' },
    { id: 'convert', label: 'Convert' },
    { id: 'remove-bg', label: 'Remove BG' },
    { id: 'ai-gen', label: 'AI Generate' },
  ] as const;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Image Toolkit</h1>
        <p className="text-muted-foreground mt-1">Resize, convert, background removal, and AI image generation with facial consistency mode.</p>
      </div>

      <div className="flex gap-2 border-b border-border">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === t.id ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-5">
          {activeTab !== 'ai-gen' && (
            <div
              onClick={() => inputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
            >
              <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
              <div className="text-3xl mb-2">🖼️</div>
              <p className="text-sm font-medium">Upload image</p>
              <p className="text-xs text-muted-foreground">PNG, JPG, WebP, AVIF supported</p>
            </div>
          )}

          {activeTab === 'resize' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium block mb-1">Width (px)</label>
                <input className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm" value={width} onChange={(e) => setWidth(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Height (px)</label>
                <input className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm" value={height} onChange={(e) => setHeight(e.target.value)} />
              </div>
            </div>
          )}

          {activeTab === 'convert' && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Output Format</label>
              <div className="flex gap-2">
                {['WebP', 'AVIF', 'PNG', 'JPEG'].map((f) => (
                  <button key={f} onClick={() => setFormat(f)}
                    className={`px-4 py-2 rounded-lg text-sm border transition-colors ${format === f ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-accent'}`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'remove-bg' && (
            <div className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground">
              🧠 AI-powered background removal. Upload an image and the model will isolate the subject with precision.
            </div>
          )}

          {activeTab === 'ai-gen' && (
            <div className="space-y-4">
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-sm text-amber-600">
                <strong>Facial Consistency Mode Active</strong> — Facial structure is preserved exactly when a reference image is provided.
              </div>
              <textarea className="w-full h-28 px-3 py-2 bg-background border border-input rounded-lg text-sm resize-none focus:ring-2 focus:ring-ring focus:outline-none"
                placeholder="Describe the image to generate... e.g. 'Professional headshot with soft studio lighting, blue background'"
                value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} />
            </div>
          )}

          <button className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
            {activeTab === 'resize' ? 'Resize & Download' : activeTab === 'convert' ? `Convert to ${format}` : activeTab === 'remove-bg' ? 'Remove Background' : '✨ Generate Image'}
          </button>
        </div>

        {/* Preview */}
        <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-semibold text-sm">Preview</h2>
          </div>
          <div className="flex-1 flex items-center justify-center bg-[url('/grid.svg')] bg-muted/20 min-h-[300px]">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="Preview" className="max-h-80 max-w-full object-contain rounded-lg shadow-md" />
            ) : (
              <p className="text-muted-foreground text-sm">No image uploaded yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
