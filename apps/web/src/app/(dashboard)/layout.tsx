import Sidebar from '@/components/layout/Sidebar';
import TopNav from '@/components/layout/TopNav';
import { CommandMenu } from '@/components/ui/CommandMenu';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:block lg:w-64 border-r border-border bg-card">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <TopNav />
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 bg-muted/20">
          {children}
        </main>
      </div>
      
      {/* Global Command Menu */}
      <CommandMenu />
    </div>
  );
}
