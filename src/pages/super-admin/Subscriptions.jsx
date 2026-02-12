import { TrendingUp, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';

const Subscriptions = () => {
  const plans = [
    { name: 'Starter', price: '$299', active: 45, color: 'border-blue-500' },
    { name: 'Pro', price: '$899', active: 62, color: 'border-purple-500' },
    { name: 'Enterprise', price: 'Custom', active: 17, color: 'border-emerald-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Subscription & Revenue</h1>
        <p className="text-slate-400 text-sm">Monitor platform financial health.</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="text-slate-400 text-sm font-medium">Monthly Recurring Revenue</h3>
          <p className="text-3xl font-bold text-white mt-2">$45,200</p>
          <div className="mt-4 flex items-center text-emerald-400 text-sm">
            <TrendingUp size={16} className="mr-1" /> +12.5% vs last month
          </div>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="text-slate-400 text-sm font-medium">Avg. Revenue Per User</h3>
          <p className="text-3xl font-bold text-white mt-2">$385</p>
          <div className="mt-4 flex items-center text-emerald-400 text-sm">
            <TrendingUp size={16} className="mr-1" /> +2.1% vs last month
          </div>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="text-slate-400 text-sm font-medium">Churn Rate</h3>
          <p className="text-3xl font-bold text-white mt-2">1.2%</p>
          <div className="mt-4 flex items-center text-red-400 text-sm">
            <TrendingUp size={16} className="mr-1 rotate-180" /> +0.4% vs last month
          </div>
        </div>
      </div>

      {/* Plans Overview */}
      <h2 className="text-xl font-bold text-white pt-4">Active Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.name} className={`bg-slate-800 p-6 rounded-xl border-t-4 ${plan.color} shadow-lg`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-white text-lg">{plan.name} Plan</h3>
                <p className="text-slate-400 text-sm">{plan.active} Companies</p>
              </div>
              <span className="bg-slate-700 text-white px-3 py-1 rounded-full text-xs font-bold">{plan.price}/mo</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-slate-500 h-2 rounded-full" style={{ width: '70%' }}></div>
            </div>
            <p className="text-xs text-slate-500 mt-2">70% utilization rate</p>
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h3 className="font-bold text-white">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-slate-900/50 text-slate-300">
              <tr>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-slate-700/50 transition">
                  <td className="px-6 py-4 font-medium text-white">Apex Construction</td>
                  <td className="px-6 py-4">Enterprise</td>
                  <td className="px-6 py-4 text-white">$2,500.00</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded w-fit text-xs font-bold border border-emerald-400/20">
                      <CheckCircle size={12} /> Paid
                    </span>
                  </td>
                  <td className="px-6 py-4">Feb 11, 2026</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
