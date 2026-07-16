'use client';
import { useEffect, useState } from 'react';

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);

  // In a real scenario, this would use TanStack Query to fetch from our NestJS /analytics/usage endpoint
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics Overview</h1>
        <p className="text-muted-foreground mt-1">Track your token consumption and API usage.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total AI Credits Used', value: '45,231', trend: '+12.5%' },
          { label: 'Active Projects', value: '12', trend: '+2' },
          { label: 'Marketplace Sales', value: '$1,240.00', trend: '+5.4%' },
        ].map((metric, i) => (
          <div key={i} className="p-6 bg-card border border-border rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">{metric.label}</h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold">{metric.value}</span>
              <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">
                {metric.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Area */}
      <div className="p-6 bg-card border border-border rounded-xl shadow-sm h-[400px] flex flex-col">
        <h3 className="text-lg font-semibold mb-4">Token Consumption (Last 7 Days)</h3>
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-muted/30 border border-dashed border-border rounded-lg">
            <p className="text-muted-foreground">Chart.js Canvas Placeholder</p>
          </div>
        )}
      </div>
    </div>
  );
}
