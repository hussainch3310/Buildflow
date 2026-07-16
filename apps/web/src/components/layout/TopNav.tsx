'use client';

import { useState } from 'react';

export default function TopNav() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Custom event trigger for Global Search
  const openSearch = () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
  };

  return (
    <header className="h-14 flex items-center justify-between px-4 md:px-6 border-b border-border bg-card">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground hidden sm:inline-block">
          Acme Corp / Production
        </span>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={openSearch}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground bg-muted rounded-md border border-border hover:bg-accent transition-colors"
        >
          <span>Search...</span>
          <kbd className="hidden sm:inline-block text-xs font-sans bg-background border border-border px-1.5 rounded">⌘K</kbd>
        </button>
        
        <div className="relative">
          <button 
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center border border-border transition-transform hover:scale-105"
          >
            <span className="text-xs font-medium">U</span>
          </button>
          
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg py-1 z-50">
              <div className="px-4 py-2 border-b border-border">
                <p className="text-sm font-medium">Guest User</p>
                <p className="text-xs text-muted-foreground truncate">Not logged in</p>
              </div>
              <button 
                onClick={() => window.location.href = '/login'}
                className="w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors"
              >
                Log In
              </button>
              <button 
                onClick={() => window.location.href = '/register'}
                className="w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
