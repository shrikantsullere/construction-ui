import { CheckCircle, XCircle, AlertTriangle, CreditCard, Plus } from 'lucide-react';
import { useState } from 'react';
import Modal from '../../components/Modal';

const Subscriptions = () => {
  const [plans, setPlans] = useState([
    {
      name: 'Starter',
      price: '$299',
      features: ['5 Projects', '10 Users', 'Basic Support'],
      companies: 45,
      stripeId: 'prod_starter_123'
    },
    {
      name: 'Pro',
      price: '$899',
      features: ['Unlimited Projects', '50 Users', 'Priority Support', 'Analytics'],
      companies: 62,
      stripeId: 'prod_pro_456'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: ['Unlimited Everything', 'Dedicated Account Manager', 'SLA', 'API Access'],
      companies: 17,
      stripeId: 'prod_ent_789'
    }
  ]);

  const failures = [
    { id: 1, company: 'Urban Architects', amount: '$899.00', date: 'Feb 10, 2026', reason: 'Insufficient Funds' },
    { id: 2, company: 'Miller Homes', amount: '$299.00', date: 'Feb 08, 2026', reason: 'Card Expired' },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: '',
    price: '',
    stripeId: '',
    features: ''
  });

  const handleCreatePlan = (e) => {
    e.preventDefault();
    if (!newPlan.name) return;

    setPlans([...plans, {
      name: newPlan.name,
      price: newPlan.price || '$0',
      features: newPlan.features ? newPlan.features.split('\n').filter(f => f.trim() !== '') : ['New Feature'],
      companies: 0,
      stripeId: newPlan.stripeId || `prod_${newPlan.name.toLowerCase()}_${Date.now()}`
    }]);

    setNewPlan({ name: '', price: '', stripeId: '', features: '' });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Subscriptions Management</h1>
          <p className="text-slate-500 text-sm">Manage pricing plans, Stripe integration, and billing issues.</p>
        </div>
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium shadow-sm transition whitespace-nowrap"
          >
            <Plus size={18} /> Add Plan
          </button>
        </div>
      </div>

      {/* Stripe Status */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <CreditCard className="text-blue-600" size={24} /> Stripe Connect Status
          </h3>
          <p className="text-sm text-slate-500 mt-1">Accepting payments via Stripe Payments.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 font-bold text-sm">
            <CheckCircle size={18} /> Operational
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Pricing Plans & Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-slate-800">{plan.name}</h3>
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">{plan.price}/mo</span>
              </div>
              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle size={14} className="text-emerald-500 shrink-0" /> {feature}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-4">
                <span className="truncate max-w-[120px]" title={plan.stripeId}>ID: {plan.stripeId}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Failures */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <AlertTriangle className="text-red-500" size={20} /> Payment Failures (Last 30 Days)
            </h3>
            <p className="text-sm text-slate-500">Failed charges that require attention.</p>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium p-2 hover:bg-blue-50 rounded-lg transition">View All Failed</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Company</th>
                <th className="px-6 py-4 whitespace-nowrap">Amount</th>
                <th className="px-6 py-4 whitespace-nowrap">Date</th>
                <th className="px-6 py-4 whitespace-nowrap">Failure Reason</th>
                <th className="px-6 py-4 whitespace-nowrap text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {failures.map((fail) => (
                <tr key={fail.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-medium text-slate-900">{fail.company}</td>
                  <td className="px-6 py-4">{fail.amount}</td>
                  <td className="px-6 py-4">{fail.date}</td>
                  <td className="px-6 py-4 text-red-600 flex items-center gap-1 font-medium">
                    <XCircle size={14} /> {fail.reason}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:underline">Retry Charge</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Subscription Plan"
      >
        <form onSubmit={handleCreatePlan} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Plan Name</label>
            <input
              type="text"
              required
              value={newPlan.name}
              onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 outline-none"
              placeholder="e.g. Diamond Plan"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Price</label>
            <input
              type="text"
              required
              value={newPlan.price}
              onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 outline-none"
              placeholder="$499"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Stripe Product ID</label>
            <input
              type="text"
              value={newPlan.stripeId}
              onChange={(e) => setNewPlan({ ...newPlan, stripeId: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 outline-none"
              placeholder="prod_..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Features (one per line)</label>
            <textarea
              rows="4"
              value={newPlan.features}
              onChange={(e) => setNewPlan({ ...newPlan, features: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 outline-none"
              placeholder="Unlimited Projects&#10;Priority Support&#10;API Access"
            />
          </div>
          <div className="flex gap-3 pt-4 border-t border-slate-100 mt-6">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition font-medium">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition font-medium">Create Plan</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Subscriptions;
