import Link from 'next/link';

const navItems = [
  { label: 'Dashboard', href: '/' },
  { label: 'AI Chat', href: '/chat' },
  { label: 'Projects', href: '/projects' },
  { label: 'AI Writing', href: '/writing' },
  { label: 'AI Coding', href: '/coding' },
  { label: 'Developer Tools', href: '/dev-tools' },
  { label: 'WordPress Toolkit', href: '/wordpress' },
  { label: 'Shopify Toolkit', href: '/shopify' },
  { label: 'SEO Toolkit', href: '/seo' },
  { label: 'PDF Toolkit', href: '/pdf' },
  { label: 'Image Toolkit', href: '/image' },
  { label: 'Resume Builder', href: '/resume' },
  { label: 'Invoice Generator', href: '/invoice' },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Analytics', href: '/analytics' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-border bg-card hidden md:flex flex-col">
      <div className="h-14 flex items-center px-4 border-b border-border shrink-0">
        <span className="font-semibold text-lg tracking-tight">BuildFlow AI</span>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block px-3 py-2 rounded-md hover:bg-accent text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-border shrink-0">
        <div className="text-sm font-medium">Dave Developer</div>
        <div className="text-xs text-muted-foreground">Pro Plan • 1,200 Credits</div>
      </div>
    </aside>
  );
}

