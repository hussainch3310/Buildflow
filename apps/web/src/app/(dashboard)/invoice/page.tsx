'use client';
import { useState } from 'react';

const lineItems = [
  { description: 'UI/UX Design — 20 hrs @ $85/hr', qty: 20, rate: 85 },
  { description: 'Next.js Development — 35 hrs @ $120/hr', qty: 35, rate: 120 },
  { description: 'SEO Optimization Package', qty: 1, rate: 450 },
];

export default function InvoicePage() {
  const [items] = useState(lineItems);
  const [discount, setDiscount] = useState(10);

  const subtotal = items.reduce((acc, i) => acc + i.qty * i.rate, 0);
  const discountAmt = (subtotal * discount) / 100;
  const tax = (subtotal - discountAmt) * 0.08;
  const total = subtotal - discountAmt + tax;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoice Generator</h1>
          <p className="text-muted-foreground mt-1">Create professional invoices. Formulas are frozen to static values on PDF export.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90">⬇ Export PDF</button>
      </div>

      <div className="bg-white text-gray-900 rounded-xl shadow-md border border-border overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 to-violet-800 px-8 py-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">BuildFlow Agency</h2>
              <p className="text-violet-200 text-sm mt-1">hello@buildflow.ai · +1 (555) 000-1234</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">INVOICE</p>
              <p className="text-violet-200 text-sm">#INV-2026-0042</p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* Bill To */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Bill To</h3>
              <p className="font-semibold">Acme Corporation</p>
              <p className="text-gray-500 text-sm">123 Business Ave, Suite 100</p>
              <p className="text-gray-500 text-sm">New York, NY 10001</p>
            </div>
            <div className="text-right">
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Issue Date</span><span>July 16, 2026</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Due Date</span><span className="font-medium text-red-500">Aug 15, 2026</span></div>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200 text-gray-500 text-xs uppercase">
                <th className="text-left py-2">Description</th>
                <th className="text-right py-2">Qty</th>
                <th className="text-right py-2">Rate</th>
                <th className="text-right py-2">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item, i) => (
                <tr key={i}>
                  <td className="py-3">{item.description}</td>
                  <td className="py-3 text-right">{item.qty}</td>
                  <td className="py-3 text-right">${item.rate.toFixed(2)}</td>
                  <td className="py-3 text-right font-medium">${(item.qty * item.rate).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2 text-sm">
              <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between items-center text-gray-500">
                <span>Discount</span>
                <div className="flex items-center gap-2">
                  <input type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} className="w-12 text-right border border-gray-200 rounded px-1 py-0.5 text-xs" />
                  <span>%</span>
                  <span className="text-red-400">-${discountAmt.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between text-gray-500"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-lg border-t-2 border-gray-900 pt-2">
                <span>Total Due</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
