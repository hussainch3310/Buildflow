'use client';
import { useState } from 'react';

const products = [
  { title: 'Minimal Runner Shoes', sku: 'SHOE-001', inventory: 142, price: '$89.99', status: 'Active' },
  { title: 'Wireless Earbuds Pro', sku: 'ELEC-042', inventory: 8, price: '$129.99', status: 'Low Stock' },
  { title: 'Organic Cotton T-Shirt', sku: 'APP-007', inventory: 312, price: '$34.99', status: 'Active' },
  { title: 'Bamboo Water Bottle', sku: 'ECO-019', inventory: 0, price: '$24.99', status: 'Out of Stock' },
];

export default function ShopifyPage() {
  const [liquidSnippet, setLiquidSnippet] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Shopify Toolkit</h1>
        <p className="text-muted-foreground mt-1">Manage inventory, generate Liquid code, and write AI product descriptions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inventory Table */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold">Inventory Sync</h2>
            <button className="text-xs px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">Sync from Shopify</button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground text-xs">
                <th className="text-left px-5 py-3 font-medium">Product</th>
                <th className="text-left px-4 py-3 font-medium">SKU</th>
                <th className="text-right px-4 py-3 font-medium">Stock</th>
                <th className="text-right px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((p) => (
                <tr key={p.sku} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5 font-medium">{p.title}</td>
                  <td className="px-4 py-3.5 text-muted-foreground font-mono text-xs">{p.sku}</td>
                  <td className="px-4 py-3.5 text-right">{p.inventory}</td>
                  <td className="px-5 py-3.5 text-right">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.status === 'Active' ? 'bg-green-500/10 text-green-500' : p.status === 'Low Stock' ? 'bg-yellow-500/10 text-yellow-600' : 'bg-red-500/10 text-red-500'}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* AI Tools */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-5 space-y-3">
            <h2 className="font-semibold">Liquid Snippet Generator</h2>
            <textarea
              className="w-full h-24 px-3 py-2 bg-background border border-input rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Describe the Liquid snippet you need..."
              value={liquidSnippet}
              onChange={(e) => setLiquidSnippet(e.target.value)}
            />
            <button className="w-full py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">Generate Liquid</button>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 space-y-3">
            <h2 className="font-semibold">Product Description Writer</h2>
            <input
              className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Product name..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button className="w-full py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">Write Description</button>
          </div>
        </div>
      </div>
    </div>
  );
}
