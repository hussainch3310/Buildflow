export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-xl p-8">
        <div className="flex justify-center mb-8">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center rotate-3 shadow-lg">
            <div className="w-5 h-5 border-2 border-primary-foreground rounded-sm -rotate-3" />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
