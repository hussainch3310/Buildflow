'use client';
import { useState } from 'react';

const items = [
  { id: 1, title: 'Viral SaaS Cold-Email Prompt Pack', type: 'PROMPT', price: 12.99, rating: 4.8, sales: 342, author: 'growth_hacker' },
  { id: 2, title: 'Next.js Dashboard Starter Component', type: 'COMPONENT', price: 29.00, rating: 4.9, sales: 128, author: 'ui_craftsman' },
  { id: 3, title: 'Elementor Landing Page Template', type: 'TEMPLATE', price: 19.99, rating: 4.5, sales: 89, author: 'wp_wizard' },
  { id: 4, title: 'ChatGPT System Prompts — Dev Edition', type: 'PROMPT', price: 9.99, rating: 4.7, sales: 512, author: 'ai_prompter' },
  { id: 5, title: 'Tailwind CSS Component Library', type: 'COMPONENT', price: 49.00, rating: 5.0, sales: 67, author: 'design_sys' },
  { id: 6, title: 'E-commerce Email Sequence Templates', type: 'TEMPLATE', price: 24.99, rating: 4.6, sales: 203, author: 'email_pro' },
];

const typeColors: Record<string, string> = {
  PROMPT: 'bg-violet-500/10 text-violet-500',
  COMPONENT: 'bg-blue-500/10 text-blue-500',
  TEMPLATE: 'bg-green-500/10 text-green-500',
};

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ALL');

  const filtered = items.filter(i =>
    (filter === 'ALL' || i.type === filter) &&
    i.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
        <p className="text-muted-foreground mt-1">Buy and sell AI prompts, templates, and UI components from the community.</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          className="flex-1 px-4 py-2.5 bg-card border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Search marketplace..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2">
          {['ALL', 'PROMPT', 'COMPONENT', 'TEMPLATE'].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-xs font-medium border transition-colors ${filter === f ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-accent'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div key={item.id} className="bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition-colors flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${typeColors[item.type]}`}>{item.type}</span>
              <div className="flex items-center gap-1 text-yellow-500 text-xs">
                ★ <span className="font-medium">{item.rating}</span>
              </div>
            </div>
            <h3 className="font-semibold text-sm leading-snug">{item.title}</h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>by @{item.author}</span>
              <span>·</span>
              <span>{item.sales} sales</span>
            </div>
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
              <span className="font-bold text-lg">${item.price.toFixed(2)}</span>
              <button className="px-4 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-lg hover:bg-primary/90 transition-colors">
                Buy Now
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-3 text-center py-16 text-muted-foreground">
            No items match your search.
          </div>
        )}
      </div>
    </div>
  );
}
