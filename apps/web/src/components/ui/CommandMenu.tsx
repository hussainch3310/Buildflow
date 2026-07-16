'use client';
import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import { Search, Code2, PenTool, MessageSquare, Image as ImageIcon, FileText, LayoutDashboard, ShoppingCart, Activity, FileSpreadsheet } from 'lucide-react';

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed left-[50%] top-[20%] z-50 w-full max-w-xl translate-x-[-50%] p-4">
        <Command 
          className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-2xl"
          label="Global Command Menu"
        >
          <div className="flex items-center border-b border-border px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Command.Input 
              placeholder="Type a command or search..." 
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              autoFocus
            />
          </div>
          <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </Command.Empty>
            
            <Command.Group heading="Toolkits" className="p-1 text-xs font-medium text-muted-foreground">
              <Command.Item onSelect={() => runCommand(() => router.push('/'))} className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard Home</span>
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => router.push('/writing'))} className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent">
                <PenTool className="mr-2 h-4 w-4" />
                <span>AI Writing Toolkit</span>
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => router.push('/coding'))} className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent">
                <Code2 className="mr-2 h-4 w-4" />
                <span>AI Coding Toolkit</span>
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => router.push('/chat'))} className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent">
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>AI Chat</span>
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => router.push('/seo'))} className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent">
                <Activity className="mr-2 h-4 w-4" />
                <span>SEO Toolkit</span>
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => router.push('/pdf'))} className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent">
                <FileText className="mr-2 h-4 w-4" />
                <span>PDF Toolkit</span>
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => router.push('/image'))} className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent">
                <ImageIcon className="mr-2 h-4 w-4" />
                <span>Image Tools</span>
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => router.push('/shopify'))} className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent">
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span>Shopify Integration</span>
              </Command.Item>
            </Command.Group>
            
            <Command.Group heading="Settings" className="p-1 text-xs font-medium text-muted-foreground mt-4">
              <Command.Item onSelect={() => runCommand(() => router.push('/login'))} className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground hover:bg-accent">
                <span>Login</span>
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => router.push('/register'))} className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground hover:bg-accent">
                <span>Register</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
      {/* Click outside to close */}
      <div className="fixed inset-0 -z-10" onClick={() => setOpen(false)} />
    </div>
  );
}
