'use client';
import { useState, useEffect } from 'react';
import { useKeyPress } from '@/hooks/useKeyPress';
import { useDebounce } from '@/hooks/useDebounce';

// Mock data to simulate search API
const mockData = [
  { id: 1, title: 'Project Alpha', type: 'Project' },
  { id: 2, title: 'Stripe Webhook Integration', type: 'Task' },
  { id: 3, title: 'Chat Thread: Architecture Design', type: 'Chat' },
];

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(mockData);
  
  const isCmdK = useKeyPress('k', true);
  const debouncedQuery = useDebounce(query, 300);

  // Toggle search modal on Cmd/Ctrl + K
  useEffect(() => {
    if (isCmdK) {
      setIsOpen((prev) => !prev);
    }
  }, [isCmdK]);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Simulate API call for real-time filtering (no Enter key required)
  useEffect(() => {
    if (debouncedQuery.trim() === '') {
      setResults(mockData);
      return;
    }
    
    // This is where we would call our NestJS backend API `/api/search?q=${debouncedQuery}`
    const filtered = mockData.filter(item => 
      item.title.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
    
    setResults(filtered);
  }, [debouncedQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-32 bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-lg border border-border bg-card rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Input */}
        <div className="flex items-center px-4 border-b border-border">
          <svg className="w-5 h-5 text-muted-foreground mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            autoFocus
            type="text"
            className="w-full py-4 text-lg bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
            placeholder="Search projects, settings, marketplace..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className="hidden sm:inline-block text-xs font-sans bg-muted border border-border px-1.5 py-0.5 rounded ml-2">ESC</kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">No results found.</p>
          ) : (
            <ul className="space-y-1">
              {results.map((item) => (
                <li 
                  key={item.id} 
                  className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                >
                  <span className="font-medium text-sm">{item.title}</span>
                  <span className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded-full">{item.type}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      {/* Click outside overlay to close */}
      <div className="absolute inset-0 z-[-1]" onClick={() => setIsOpen(false)} />
    </div>
  );
}
