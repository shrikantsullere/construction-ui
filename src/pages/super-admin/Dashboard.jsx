import { Shield, Building, CreditCard, Users } from 'lucide-react';

const SuperAdminDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Platform Overview</h1>
        <p className="text-slate-400 mt-2">Monitor all companies and system health.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Companies', value: '124', icon: Building, color: 'text-blue-400' },
          { label: 'Active Subscriptions', value: '118', icon: CreditCard, color: 'text-emerald-400' },
          { label: 'Monthly Revenue', value: '$45.2k', icon: Shield, color: 'text-purple-400' },
          { label: 'Users Online', value: '342', icon: Users, color: 'text-orange-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                <h3 className="text-3xl font-bold text-white mt-2">{stat.value}</h3>
              </div>
              <stat.icon size={24} className={stat.color} />
            </div>
            <div className="mt-4 text-xs text-slate-500">
              <span className="text-emerald-400 font-bold">+5.2%</span> since last month
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="font-bold text-white mb-6">Revenue Growth</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {[35, 42, 58, 62, 75, 80, 85, 90, 88, 95, 100, 110].map((h, i) => (
              <div key={i} className="w-full bg-slate-700 rounded-t-sm relative group">
                <div
                  className="absolute bottom-0 w-full bg-blue-500 rounded-t-sm transition-all duration-500 group-hover:bg-blue-400"
                  style={{ height: `${h}%` }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="font-bold text-white mb-6">Recent Signups</h3>
          <div className="space-y-4">
            {[
              { name: 'Apex Construction', plan: 'Enterprise', date: 'Today' },
              { name: 'BuildRight Inc.', plan: 'Pro', date: 'Yesterday' },
              { name: 'Miller Homes', plan: 'Starter', date: '2 days ago' },
              { name: 'SkyHigh Developers', plan: 'Enterprise', date: '3 days ago' },
            ].map((company, i) => (
              <div key={i} className="flex justify-between items-center p-3 hover:bg-slate-700 rounded-lg transition">
                <div>
                  <p className="font-bold text-white">{company.name}</p>
                  <p className="text-xs text-slate-400">{company.plan} Plan</p>
                </div>
                <span className="text-xs text-slate-500">{company.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
