import { TrendingUp, DollarSign, Calendar, Download, RefreshCw, ArrowUp, ArrowDown, Clock } from 'lucide-react';
import { useState } from 'react';

const Revenue = () => {
  const [transactions, setTransactions] = useState([
    { id: 'INV-001', company: 'Apex Construction', plan: 'Enterprise', amount: '$2,500.00', date: 'Feb 12, 2026', status: 'Paid' },
    { id: 'INV-002', company: 'BuildRight Inc.', plan: 'Pro', amount: '$899.00', date: 'Feb 11, 2026', status: 'Paid' },
    { id: 'INV-003', company: 'Miller Homes', plan: 'Starter', amount: '$299.00', date: 'Feb 10, 2026', status: 'Refunded' },
    { id: 'INV-004', company: 'SkyHigh Devs', plan: 'Enterprise', amount: '$2,500.00', date: 'Feb 09, 2026', status: 'Paid' },
  ]);

  const handleDownload = (id) => {
    const tx = transactions.find(t => t.id === id);
    const printWindow = window.open('', '_blank');

    // Check if window was blocked (e.g. popup blocker)
    if (!printWindow) {
      alert('Please allow popups to download the invoice.');
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice ${tx.id}</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #333; max-width: 800px; margin: 0 auto; }
            .header { display: flex; justify-content: space-between; margin-bottom: 40px; border-bottom: 2px solid #eee; padding-bottom: 20px; }
            .logo { font-size: 24px; font-weight: bold; color: #2563eb; }
            .invoice-details { text-align: right; }
            .invoice-details h1 { margin: 0 0 10px 0; color: #333; }
            .content { margin-bottom: 40px; }
            .bill-to { margin-bottom: 20px; }
            .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            .table th, .table td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
            .table th { background-color: #f8fafc; font-weight: 600; color: #64748b; }
            .total { text-align: right; margin-top: 20px; font-size: 18px; font-weight: bold; }
            .footer { margin-top: 60px; text-align: center; color: #94a3b8; font-size: 12px; border-top: 1px solid #eee; padding-top: 20px; }
            @media print { 
              body { padding: 20px; } 
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">Construction SaaS</div>
            <div class="invoice-details">
              <h1>INVOICE</h1>
              <p><strong>ID:</strong> ${tx.id}</p>
              <p><strong>Date:</strong> ${tx.date}</p>
              <p><strong>Status:</strong> ${tx.status}</p>
            </div>
          </div>
          
          <div class="content">
            <div class="bill-to">
              <h3>Bill To:</h3>
              <p><strong>${tx.company}</strong></p>
              <p>123 Business Rd.</p>
              <p>Cityville, State, 12345</p>
            </div>
            
            <table class="table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Plan Type</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Subscription Charge</td>
                  <td>${tx.plan}</td>
                  <td>${tx.amount}</td>
                </tr>
              </tbody>
            </table>
            
            <div class="total">
              Total: ${tx.amount}
            </div>
          </div>
          
          <div class="footer">
            <p>Thank you for your business!</p>
            <p>Questions? Contact support@constructionsaas.com</p>
          </div>
          
          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleRefresh = () => {
    const newTx = {
      id: `INV-00${transactions.length + 1}`,
      company: 'New Client Construction',
      plan: 'Starter',
      amount: '$299.00',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: 'Paid'
    };
    // Simulate fetching new data by adding a dummy record
    setTransactions([newTx, ...transactions]);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Financial Overview</h1>
        <p className="text-slate-500 text-sm">Track Monthly Recurring Revenue (MRR) and transaction history.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="text-slate-500 text-sm font-medium">Net Revenue (YTD)</h3>
          <p className="text-3xl font-bold text-slate-900 mt-2">$152,450</p>
          <div className="mt-4 flex items-center text-emerald-500 text-sm font-medium bg-emerald-50 px-2 py-1 rounded w-fit">
            <ArrowUp size={16} className="mr-1" /> +18% vs last year
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="text-slate-500 text-sm font-medium">Total Refunds</h3>
          <p className="text-3xl font-bold text-slate-900 mt-2">$1,240</p>
          <div className="mt-4 flex items-center text-red-500 text-sm font-medium bg-red-50 px-2 py-1 rounded w-fit">
            <ArrowDown size={16} className="mr-1" /> +2.1% this month
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="text-slate-500 text-sm font-medium">Pending Invoices</h3>
          <p className="text-3xl font-bold text-slate-900 mt-2">$5,300</p>
          <div className="mt-4 flex items-center text-slate-400 text-sm font-medium bg-slate-50 px-2 py-1 rounded w-fit">
            <Clock size={16} className="mr-1" /> Due in 7 days
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Revenue Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-blue-600" /> Monthly Revenue (MRR)
          </h3>
          <div className="h-64 flex items-end justify-between px-2 gap-2">
            {[45, 48, 52, 50, 55, 60, 65, 70, 72, 75, 80, 85].map((h, i) => (
              <div key={i} className="w-full bg-slate-100 rounded-t-lg relative group h-full flex items-end">
                <div
                  className="w-full bg-blue-500 rounded-t-lg hover:bg-blue-600 transition-all"
                  style={{ height: `${h}%` }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none">
                    ${h}k
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
            <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
          </div>
        </div>

        {/* Yearly Revenue Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Calendar size={20} className="text-emerald-600" /> Yearly Growth
          </h3>
          <div className="h-64 flex items-end justify-between px-8 gap-8">
            {[2023, 2024, 2025, 2026].map((year, i) => {
              const heights = [40, 60, 80, 25]; // 2026 is partial
              return (
                <div key={year} className="w-full flex flex-col items-center group">
                  <div className="w-16 bg-emerald-100 rounded-t-lg relative h-64 flex items-end">
                    <div className="w-full bg-emerald-500 rounded-t-lg transition-all hover:bg-emerald-600" style={{ height: `${heights[i]}%` }}></div>
                    <div className="opacity-0 group-hover:opacity-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-lg drop-shadow-md pointer-events-none">
                      {heights[i] * 10}k
                    </div>
                  </div>
                  <span className="mt-2 text-sm font-bold text-slate-600">{year}</span>
                </div>
              )
            })}
          </div>
          <p className="text-center text-xs text-slate-400 mt-4">2026 is projected based on Q1</p>
        </div>
      </div>

      {/* Invoice History */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="font-bold text-slate-800">Invoice History</h3>
          <button
            onClick={handleRefresh}
            className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-50 rounded-lg transition"
            title="Refresh Invoices"
          >
            <RefreshCw size={18} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-500">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Invoice ID</th>
                <th className="px-6 py-4 whitespace-nowrap">Company</th>
                <th className="px-6 py-4 whitespace-nowrap">Plan</th>
                <th className="px-6 py-4 whitespace-nowrap">Amount</th>
                <th className="px-6 py-4 whitespace-nowrap">Status</th>
                <th className="px-6 py-4 whitespace-nowrap">Date</th>
                <th className="px-6 py-4 whitespace-nowrap text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-mono text-xs">{tx.id}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{tx.company}</td>
                  <td className="px-6 py-4">{tx.plan}</td>
                  <td className="px-6 py-4 font-bold text-slate-800">{tx.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold border ${tx.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      tx.status === 'Refunded' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                        'bg-red-50 text-red-600 border-red-100'
                      }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{tx.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDownload(tx.id)}
                      className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition"
                      title="Download Invoice"
                    >
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
