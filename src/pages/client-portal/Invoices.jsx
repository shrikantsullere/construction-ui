import { Download, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

const Invoices = () => {
  const [invoices, setInvoices] = useState([
    {
      id: 'INV-2026-003',
      amount: 12500,
      date: 'Feb 05, 2026',
      status: 'Paid',
      description: 'Phase 1 - Initial Consultation & Design Fee',
      icon: CheckCircle,
      color: 'text-emerald-500 bg-emerald-50 border-emerald-200'
    },
    {
      id: 'INV-2026-004',
      amount: 25000,
      date: 'Due Feb 28, 2026',
      status: 'Unpaid',
      description: 'Foundation Materials & Labor - 50% Upfront',
      icon: AlertTriangle,
      color: 'text-amber-500 bg-amber-50 border-amber-200'
    },
    {
      id: 'INV-2026-005',
      amount: 8500,
      date: 'Due Mar 15, 2026',
      status: 'Pending',
      description: 'Permitting & City Inspection Fees',
      icon: Clock,
      color: 'text-blue-500 bg-blue-50 border-blue-200'
    }
  ]);

  const handleDownload = (id) => {
    alert(`Downloading invoice ${id}...`);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Invoices & Payments</h1>
          <p className="text-slate-500 text-sm">View and manage your project billing history.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm text-right hidden sm:block">
          <span className="text-xs text-slate-500 uppercase tracking-wide font-semibold block mb-1">Total Outstanding</span>
          <span className="text-xl font-bold text-slate-800">$33,500.00</span>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Invoice ID</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Description</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">{invoice.id}</td>
                <td className="px-6 py-4 hidden md:table-cell">{invoice.description}</td>
                <td className="px-6 py-4 text-slate-500">{invoice.date}</td>
                <td className="px-6 py-4 font-semibold text-slate-800">${invoice.amount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${invoice.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : invoice.status === 'Unpaid' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                    {invoice.status === 'Paid' && <CheckCircle size={12} />}
                    {invoice.status === 'Unpaid' && <AlertTriangle size={12} />}
                    {invoice.status === 'Pending' && <Clock size={12} />}
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDownload(invoice.id)}
                    className="text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 hover:bg-blue-100 p-2 rounded-lg"
                    title="Download Invoice"
                  >
                    <Download size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {invoices.length === 0 && (
          <div className="p-8 text-center text-slate-400">
            No invoices found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoices;
