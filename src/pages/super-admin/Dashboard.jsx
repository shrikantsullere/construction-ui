import { Shield, Building, CreditCard, Users, TrendingUp, ArrowUpRight } from 'lucide-react';

const DashboardCard = ({ title, value, subtext, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <h3 className="text-3xl font-bold text-slate-800 mt-2">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
    <div className="mt-4 flex items-center gap-2">
      <span className="text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-full">+5.2%</span>
      <span className="text-slate-400 text-xs">{subtext}</span>
    </div>
  </div>
);

const SuperAdminDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Platform Overview</h1>
        <p className="text-slate-500 text-sm">Monitor all companies and system health across the ConstructOS network.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Companies"
          value="124"
          subtext="since last month"
          icon={Building}
          color="bg-blue-500"
        />
        <DashboardCard
          title="Active Subscriptions"
          value="118"
          subtext="95% retention rate"
          icon={CreditCard}
          color="bg-emerald-500"
        />
        <DashboardCard
          title="Monthly Revenue"
          value="$45.2k"
          subtext="recurring revenue"
          icon={TrendingUp}
          color="bg-indigo-500"
        />
        <DashboardCard
          title="Users Online"
          value="342"
          subtext="peak usage hours"
          icon={Users}
          color="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart Placeholder */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp size={20} className="text-blue-600" /> Revenue Growth (12 Months)
            </h3>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                <ArrowUpRight size={14} /> +12% YoY
              </span>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-3 px-2">
            {[35, 42, 58, 62, 75, 80, 85, 90, 88, 95, 100, 110].map((h, i) => (
              <div key={i} className="w-full bg-slate-50 rounded-t-lg relative group">
                <div
                  className="absolute bottom-0 w-full bg-blue-600 rounded-t-lg transition-all duration-1000 ease-out group-hover:bg-blue-400"
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition shadow-lg pointer-events-none">
                    ${(h * 0.5).toFixed(1)}k
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
            <span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span><span>Dec</span>
          </div>
        </div>

        {/* Recent Companies Sidebar */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Recent Signups</h3>
            <button className="text-xs font-bold text-blue-600 hover:text-blue-700">View All</button>
          </div>
          <div className="space-y-5">
            {[
              { name: 'Apex Construction', plan: 'Enterprise', date: 'Today', color: 'bg-blue-100 text-blue-600' },
              { name: 'BuildRight Inc.', plan: 'Pro', date: 'Yesterday', color: 'bg-emerald-100 text-emerald-600' },
              { name: 'Miller Homes', plan: 'Starter', date: '2 days ago', color: 'bg-orange-100 text-orange-600' },
              { name: 'SkyHigh Developers', plan: 'Enterprise', date: '3 days ago', color: 'bg-blue-100 text-blue-600' },
              { name: 'Foundations Co.', plan: 'Pro', date: '5 days ago', color: 'bg-emerald-100 text-emerald-600' },
            ].map((company, i) => (
              <div key={i} className="flex gap-4 items-center group cursor-pointer p-1 rounded-lg hover:bg-slate-50 transition">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${company.color}`}>
                  {company.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-bold text-slate-800 transition-colors group-hover:text-blue-600 text-sm">{company.name}</p>
                    <span className="text-[10px] font-medium text-slate-400">{company.date}</span>
                  </div>
                  <p className="text-xs text-slate-500">{company.plan} Plan</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;

