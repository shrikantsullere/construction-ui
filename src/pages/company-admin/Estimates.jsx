import { DollarSign, FileText, CheckCircle, Clock, Download, Plus } from 'lucide-react';

const Estimates = () => {
  const estimates = [
    { id: 'EST-1023', client: 'Skyline Developers', amount: '$450,000', date: 'Feb 12, 2026', status: 'Pending', type: 'Estimate' },
    { id: 'INV-2045', client: 'Riverfront Corp', amount: '$12,500', date: 'Feb 10, 2026', status: 'Paid', type: 'Invoice' },
    { id: 'INV-2044', client: 'City Center Mall', amount: '$85,000', date: 'Jan 28, 2026', status: 'Overdue', type: 'Invoice' },
    { id: 'EST-1022', client: 'Private Home', amount: '$120,000', date: 'Jan 15, 2026', status: 'Rejected', type: 'Estimate' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Estimates & Invoices</h1>
          <p className="text-slate-500 text-sm">Manage company finances and client billing.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50">Create Estimate</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200">New Invoice</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm font-medium">Total Invoiced</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">$1.2M</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm font-medium">Outstanding</p>
          <h3 className="text-2xl font-bold text-orange-500 mt-1">$345k</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm font-medium">Paid this Month</p>
          <h3 className="text-2xl font-bold text-emerald-500 mt-1">$125k</h3>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="p-4 border-b border-slate-50 text-sm font-bold text-slate-700">Recent Transactions</div>
        <table className="w-full text-left text-sm text-slate-600">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {estimates.map((item) => (
              <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                <td className="px-6 py-4 font-bold text-slate-800">{item.id}</td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-slate-900">{item.client}</p>
                    <p className="text-xs text-slate-400">{item.type}</p>
                  </div>
                </td>
                <td className="px-6 py-4">{item.date}</td>
                <td className="px-6 py-4 font-bold text-slate-800">{item.amount}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold 
                      ${item.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' :
                      item.status === 'Pending' ? 'bg-blue-100 text-blue-700' :
                        item.status === 'Overdue' ? 'bg-red-100 text-red-700' :
                          'bg-slate-100 text-slate-500'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-blue-600 p-2"><Download size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Estimates;
