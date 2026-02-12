import { useState, useRef } from 'react';
import { DollarSign, FileText, CheckCircle, Clock, Download, Plus, X, Printer, PieChart, TrendingUp, AlertCircle, Calendar, User, Save } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in print:hidden">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 sticky top-0 bg-white z-10">
          <h3 className="font-bold text-slate-800">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

const InvoiceSlip = ({ data, onClose }) => {
  if (!data) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4 animate-fade-in overflow-y-auto print:absolute print:inset-0 print:bg-white print:z-[100] print:p-0 print:block">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-scale-in print:shadow-none print:w-full print:max-w-none print:rounded-none">
        <div className="p-8 print:p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-8 border-b border-slate-100 pb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-1">ConstructOS</h1>
              <p className="text-slate-500 text-sm">Construction Management Solutions</p>
              <div className="mt-4 text-sm text-slate-600">
                <p>123 Builder Lane</p>
                <p>Metropolis, NY 10012</p>
                <p>contact@constructos.com</p>
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-wide text-blue-600">{data.type}</h2>
              <p className="text-slate-500 font-medium mt-1">#{data.id}</p>
              <div className="mt-4 text-sm text-slate-600">
                <p className="font-bold text-slate-800">Date Issued:</p>
                <p>{data.date}</p>
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div className="mb-8 bg-slate-50 p-6 rounded-lg print:bg-white print:border print:border-slate-200">
            <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">Bill To:</h3>
            <h4 className="text-xl font-bold text-slate-800">{data.client}</h4>
            <p className="text-slate-600 text-sm mt-1">Client ID: CL-{Math.floor(Math.random() * 1000)}</p>
          </div>

          {/* Line Items (Mocked for Demo) */}
          <div className="mb-8">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 print:bg-slate-50">
                <tr>
                  <th className="p-3">Description</th>
                  <th className="p-3 text-right">Qty</th>
                  <th className="p-3 text-right">Rate</th>
                  <th className="p-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3 font-medium text-slate-800">
                    {data.description || `Construction services for ${data.type} #${data.id}`}
                  </td>
                  <td className="p-3 text-right text-slate-600">1</td>
                  <td className="p-3 text-right text-slate-600">{data.amount}</td>
                  <td className="p-3 text-right font-bold text-slate-800">{data.amount}</td>
                </tr>
                {/* Mock extra item */}
                <tr>
                  <td className="p-3 font-medium text-slate-800">Service Fee & Processing</td>
                  <td className="p-3 text-right text-slate-600">1</td>
                  <td className="p-3 text-right text-slate-600">$150.00</td>
                  <td className="p-3 text-right font-bold text-slate-800">$150.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end border-t border-slate-200 pt-6">
            <div className="w-64 space-y-3">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Subtotal:</span>
                <span>{data.amount}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>Tax (8%):</span>
                <span>$0.00 (exempt)</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-slate-900 border-t border-slate-200 pt-3">
                <span>Total:</span>
                <span>{data.amount}</span>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold border
                            ${data.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                data.status === 'Overdue' ? 'bg-red-50 text-red-600 border-red-100' :
                  'bg-blue-50 text-blue-600 border-blue-100'}`}>
              STATUS: {data.status.toUpperCase()}
            </span>
            <p className="text-xs text-slate-400 mt-4">Thank you for your business!</p>
          </div>
        </div>

        {/* Print Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end gap-3 print:hidden">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 transition font-medium">
            Close
          </button>
          <button onClick={handlePrint} className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium shadow-lg shadow-blue-200 flex items-center gap-2">
            <Printer size={18} /> Print / Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

const Estimates = () => {
  const [transactions, setTransactions] = useState([
    { id: 'EST-1023', client: 'Skyline Developers', amount: '$450,000', date: '2026-02-12', status: 'Pending', type: 'Estimate', description: 'Phase 1 Structural Assessment' },
    { id: 'INV-2045', client: 'Riverfront Corp', amount: '$12,500', date: '2026-02-10', status: 'Paid', type: 'Invoice', description: 'Monthly Maintenance Fee' },
    { id: 'INV-2044', client: 'City Center Mall', amount: '$85,000', date: '2026-01-28', status: 'Overdue', type: 'Invoice', description: 'Electrical Renovation Materials' },
    { id: 'EST-1022', client: 'Private Home', amount: '$120,000', date: '2026-01-15', status: 'Rejected', type: 'Estimate', description: 'Backyard Landscape Design' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('Invoice'); // 'Invoice' or 'Estimate'
  const [slipData, setSlipData] = useState(null);

  const [formData, setFormData] = useState({
    client: '', amount: '', date: '', status: 'Pending', type: 'Invoice', description: ''
  });

  const openModal = (type) => {
    setModalType(type);
    setFormData({
      client: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      type: type,
      description: ''
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const newTransaction = {
      ...formData,
      id: (formData.type === 'Invoice' ? 'INV-' : 'EST-') + Math.floor(1000 + Math.random() * 9000),
      amount: formData.amount.startsWith('$') ? formData.amount : `$${formData.amount}`
    };
    setTransactions([newTransaction, ...transactions]);
    setIsModalOpen(false);
  };

  const handleViewSlip = (transaction) => {
    setSlipData(transaction);
  };

  const TransactionForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Client Name</label>
        <div className="relative">
          <User size={18} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={formData.client}
            onChange={e => setFormData({ ...formData, client: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 transition"
            placeholder="e.g. Acme Construction"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Amount ($)</label>
          <div className="relative">
            <DollarSign size={18} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={formData.amount}
              onChange={e => setFormData({ ...formData, amount: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 transition"
              placeholder="0.00"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Date Issued</label>
          <div className="relative">
            <Calendar size={18} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="date"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 transition"
            />
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
        <select
          value={formData.status}
          onChange={e => setFormData({ ...formData, status: e.target.value })}
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 transition"
        >
          <option>Pending</option>
          <option>Paid</option>
          <option>Overdue</option>
          <option>Rejected</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Description / Items</label>
        <textarea
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 transition h-24 resize-none"
          placeholder="Details of services rendered..."
        />
      </div>
      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition shadow-lg shadow-blue-200 flex items-center gap-2"
        >
          <Save size={18} /> Save {modalType}
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Estimates & Invoices</h1>
          <p className="text-slate-500 text-sm">Manage company finances and client billing.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => openModal('Estimate')}
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition font-medium"
          >
            <Plus size={18} /> Create Estimate
          </button>
          <button
            onClick={() => openModal('Invoice')}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition font-medium"
          >
            <FileText size={18} /> New Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-sm font-medium">Total Invoiced</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">$1.2M</h3>
            </div>
            <PieChart className="text-blue-500 bg-blue-50 p-2 rounded-lg" size={36} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-sm font-medium">Outstanding</p>
              <h3 className="text-2xl font-bold text-orange-500 mt-1">$345k</h3>
            </div>
            <AlertCircle className="text-orange-500 bg-orange-50 p-2 rounded-lg" size={36} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-sm font-medium">Paid this Month</p>
              <h3 className="text-2xl font-bold text-emerald-500 mt-1">$125k</h3>
            </div>
            <TrendingUp className="text-emerald-500 bg-emerald-50 p-2 rounded-lg" size={36} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-50 text-sm font-bold text-slate-700 flex justify-between items-center">
          <span>Recent Transactions</span>
          <span className="text-xs font-normal text-slate-400">Viewing {transactions.length} records</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">ID</th>
                <th className="px-6 py-4 whitespace-nowrap">Client</th>
                <th className="px-6 py-4 whitespace-nowrap">Date</th>
                <th className="px-6 py-4 whitespace-nowrap">Amount</th>
                <th className="px-6 py-4 whitespace-nowrap">Status</th>
                <th className="px-6 py-4 text-right whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((item) => (
                <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50 transition group">
                  <td className="px-6 py-4 font-bold text-slate-800">{item.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-900">{item.client}</p>
                      <p className="text-xs text-slate-400 group-hover:text-blue-500 transition">{item.type}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">{item.date}</td>
                  <td className="px-6 py-4 font-bold text-slate-800">{item.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1
                        ${item.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' :
                        item.status === 'Pending' ? 'bg-blue-100 text-blue-700' :
                          item.status === 'Overdue' ? 'bg-red-100 text-red-700 border border-red-200' :
                            'bg-slate-100 text-slate-500'}`}>
                      {item.status === 'Paid' && <CheckCircle size={10} />}
                      {item.status === 'Pending' && <Clock size={10} />}
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleViewSlip(item)}
                      className="text-slate-400 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition" title="View & Download"
                    >
                      <Download size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Models */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Create New ${modalType}`}>
        <TransactionForm />
      </Modal>

      {/* Invoice Slip View/Print Modal */}
      {slipData && (
        <InvoiceSlip data={slipData} onClose={() => setSlipData(null)} />
      )}

    </div>
  );
};

export default Estimates;
