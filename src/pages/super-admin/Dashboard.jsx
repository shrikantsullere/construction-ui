import { Shield, Building, CreditCard, Users, TrendingUp, AlertCircle, Clock, ArrowUpRight, ArrowRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardCard = ({ title, value, subtext, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer group">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-500 text-sm font-medium group-hover:text-slate-700 transition-colors">{title}</p>
        <h3 className="text-3xl font-bold text-slate-800 mt-2">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color} shadow-sm group-hover:scale-105 transition-transform`}>
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
  const revenueData = [
    { name: 'Jan', value: 35 }, { name: 'Feb', value: 42 }, { name: 'Mar', value: 58 },
    { name: 'Apr', value: 62 }, { name: 'May', value: 75 }, { name: 'Jun', value: 80 },
    { name: 'Jul', value: 85 }, { name: 'Aug', value: 90 }, { name: 'Sep', value: 88 },
    { name: 'Oct', value: 95 }, { name: 'Nov', value: 100 }, { name: 'Dec', value: 110 },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Platform Overview</h1>
          <p className="text-slate-500 text-sm">Monitor all companies and system health across the ConstructOS network.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider border border-blue-100">
            Visible to: Super Admin Only
          </span>
        </div>
      </div>

      {/* Metrics Grid - Adjusted for better responsiveness */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        <DashboardCard
          title="Total Companies"
          value="124"
          subtext="Active Tenants"
          icon={Building}
          color="bg-blue-500"
        />
        <DashboardCard
          title="Active Subscriptions"
          value="118"
          subtext="95% Retention"
          icon={CreditCard}
          color="bg-emerald-500"
        />
        <DashboardCard
          title="Monthly Revenue"
          value="$45.2k"
          subtext="Recurring"
          icon={TrendingUp}
          color="bg-indigo-500"
        />
        <DashboardCard
          title="Pending Tickets"
          value="12"
          subtext="Needs Attention"
          icon={AlertCircle}
          color="bg-orange-500"
        />
        <DashboardCard
          title="Expiring Trials"
          value="5"
          subtext="Next 7 Days"
          icon={Clock}
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart - Interactive Recharts */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp size={20} className="text-blue-600" /> Revenue Growth (12 Months)
            </h3>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                <ArrowUpRight size={14} /> +12% YoY
              </span>
            </div>
          </div>

          <div className="h-80 w-full flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`$${value}k`, 'Revenue']}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Companies Sidebar */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Recent Signups</h3>
            <button className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1">
              View All <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Apex Construction', plan: 'Enterprise', date: 'Today', color: 'bg-blue-100 text-blue-600' },
              { name: 'BuildRight Inc.', plan: 'Pro', date: 'Yesterday', color: 'bg-emerald-100 text-emerald-600' },
              { name: 'Miller Homes', plan: 'Starter', date: '2 days ago', color: 'bg-orange-100 text-orange-600' },
              { name: 'SkyHigh Developers', plan: 'Enterprise', date: '3 days ago', color: 'bg-blue-100 text-blue-600' },
              { name: 'Foundations Co.', plan: 'Pro', date: '5 days ago', color: 'bg-emerald-100 text-emerald-600' },
            ].map((company, i) => (
              <div key={i} className="flex gap-4 items-center group cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${company.color} shadow-sm`}>
                  {company.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-slate-800 transition-colors group-hover:text-blue-600 text-sm truncate">{company.name}</p>
                    <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap">{company.date}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{company.plan} Plan</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100">
            <button className="w-full bg-slate-900 text-white py-3 rounded-xl text-sm font-bold hover:bg-slate-800 transition shadow-lg shadow-slate-200">
              Add New Company manually
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
