import { TrendingUp, Users, AlertTriangle, CheckCircle, Calendar, Plus, MessageSquare, X, Check, ArrowRight, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const DashboardCard = ({ title, value, subtext, icon: Icon, color, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer transform hover:-translate-y-1"
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800 mt-2">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
    <div className="mt-4 flex items-center gap-2">
      <span className="text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-full">+12%</span>
      <span className="text-slate-400 text-xs">{subtext}</span>
    </div>
  </div>
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
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

const CompanyAdminDashboard = () => {
  const navigate = useNavigate();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterPeriod, setFilterPeriod] = useState('This Week');

  // AI State
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationComplete, setOptimizationComplete] = useState(false);

  // Data State for Charts
  const [barData, setBarData] = useState([
    { name: 'Skyline', progress: 75, budget: 60 },
    { name: 'Riverfront', progress: 45, budget: 30 },
    { name: 'City Ctr', progress: 90, budget: 85 },
    { name: 'Green V.', progress: 30, budget: 25 },
  ]);

  const [pieData, setPieData] = useState([
    { name: 'Completed', value: 45, color: '#10b981' }, // emerald-500
    { name: 'In Progress', value: 30, color: '#3b82f6' }, // blue-500
    { name: 'Delayed', value: 10, color: '#ef4444' }, // red-500
    { name: 'Not Started', value: 15, color: '#94a3b8' }, // slate-400
  ]);

  const handleOptimization = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      setOptimizationComplete(true);
      setTimeout(() => setOptimizationComplete(false), 5000); // Reset after 5s
    }, 2000);
  };

  const updateProgress = (period) => {
    setFilterPeriod(period);
    // Simulate data change based on filter
    if (period === 'This Month') {
      setBarData([
        { name: 'Skyline', progress: 85, budget: 70 },
        { name: 'Riverfront', progress: 60, budget: 50 },
        { name: 'City Ctr', progress: 95, budget: 90 },
        { name: 'Green V.', progress: 50, budget: 40 },
      ]);
    } else {
      setBarData([
        { name: 'Skyline', progress: 75, budget: 60 },
        { name: 'Riverfront', progress: 45, budget: 30 },
        { name: 'City Ctr', progress: 90, budget: 85 },
        { name: 'Green V.', progress: 30, budget: 25 },
      ]);
    }
  };

  const COLORS = ['#10b981', '#3b82f6', '#ef4444', '#94a3b8'];

  return (
    <div className="space-y-8 relative pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500 text-sm">Welcome back, here's your live project activity.</p>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition text-sm font-medium shadow-sm whitespace-nowrap"
          >
            <Calendar size={18} /> {filterPeriod}
          </button>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium shadow-lg shadow-blue-200 whitespace-nowrap"
          >
            <Plus size={18} /> Quick Create
          </button>
        </div>
      </div>

      {/* Top Metrics - Interactive & Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 px-1 md:px-0">
        <DashboardCard
          title="Active Projects"
          value="12"
          subtext="vs last month"
          icon={TrendingUp}
          color="bg-blue-500"
          onClick={() => navigate('/company-admin/projects')}
        />
        <DashboardCard
          title="Pending Tasks"
          value="45"
          subtext="due this week"
          icon={CheckCircle}
          color="bg-orange-500"
          onClick={() => navigate('/company-admin/schedule')}
        />
        <DashboardCard
          title="Open Issues"
          value="8"
          subtext="critical priority"
          icon={AlertTriangle}
          color="bg-red-500"
          onClick={() => navigate('/company-admin/issues')}
        />
        <DashboardCard
          title="Total Revenue"
          value="$1.2M"
          subtext="YTD earnings"
          icon={Activity}
          color="bg-emerald-500"
          onClick={() => navigate('/company-admin/estimates')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Chart Section - Project Progress */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Project Performance</h3>
            <div className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">Last Updated: Just now</div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: '#F1F5F9' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="progress" name="Progress %" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
                <Bar dataKey="budget" name="Budget Used %" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Task Status - Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <h3 className="font-bold text-slate-800 mb-4">Task Status Distribution</h3>
          <div className="h-60 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
              <span className="text-3xl font-bold text-slate-800">100</span>
              <span className="text-xs text-slate-500 uppercase font-bold">Total Tasks</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs font-medium text-slate-600">{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Assistant - Only if explicit opt-in or needed, but user likes "Interactive" */}
        <div className="lg:col-span-1 bg-gradient-to-br from-indigo-600 to-purple-600 p-6 rounded-xl shadow-lg text-white relative overflow-hidden transition-all hover:shadow-xl lg:row-start-2">
          <div className="relative z-10">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              <MessageSquare size={20} /> AI Scheduler
            </h3>
            {optimizationComplete ? (
              <div className="animate-fade-in bg-white/10 p-4 rounded-lg border border-white/20">
                <p className="flex items-center gap-2 font-medium text-emerald-300"><CheckCircle size={18} /> Schedule Optimized!</p>
                <p className="text-xs text-indigo-100 mt-2">3 conflicting tasks rescheduled to avoid delays on 'Riverfront Park'. Efficiency increased by 15%.</p>
              </div>
            ) : (
              <>
                <p className="text-indigo-100 text-sm mb-4">Potential delay detected in 'Riverfront Park' due to rain forecast. Re-optimize schedule?</p>
                <button
                  onClick={handleOptimization}
                  disabled={isOptimizing}
                  className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-indigo-50 transition w-full flex items-center justify-center gap-2 group"
                >
                  {isOptimizing ? (
                    <>
                      <span className="animate-spin h-4 w-4 border-2 border-indigo-600 border-t-transparent rounded-full"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      Optimize Now
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </>
            )}
          </div>
          {/* Decos */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-12 -mb-12 blur-xl"></div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100 lg:row-start-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800">Live Activity Feed</h3>
            <button className="text-blue-600 text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { user: 'Mike Ross', action: 'uploaded 5 site photos', project: 'Skyline Tower', time: '2m ago', type: 'photo' },
              { user: 'Sarah Jen', action: 'approved budget estimate', project: 'City Center', time: '1h ago', type: 'approval' },
              { user: 'System', action: 'auto-scheduled inspection', project: 'Riverfront Park', time: '3h ago', type: 'system' },
              { user: 'John Doe', action: 'commented on "Foundation Issue"', project: 'Green Valley', time: '5h ago', type: 'comment' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start hover:bg-slate-50 p-3 rounded-xl transition cursor-pointer group border border-transparent hover:border-slate-100">
                <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-slate-600 ${item.type === 'photo' ? 'bg-blue-100 text-blue-600' :
                  item.type === 'approval' ? 'bg-emerald-100 text-emerald-600' :
                    item.type === 'system' ? 'bg-purple-100 text-purple-600' : 'bg-slate-200'
                  }`}>
                  {item.user.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-800">
                    <span className="font-semibold text-slate-900">{item.user}</span> {item.action}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                    <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-medium">{item.project}</span>
                    <span>• {item.time}</span>
                  </p>
                </div>
                <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-500 transition-colors opacity-0 group-hover:opacity-100 self-center" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Create Modal */}
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Quick Create">
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => navigate('/company-admin/projects')} className="flex flex-col items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition gap-2 border border-blue-200">
            <TrendingUp size={24} />
            <span className="font-medium text-sm">New Project</span>
          </button>
          <button onClick={() => navigate('/company-admin/team')} className="flex flex-col items-center justify-center p-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl transition gap-2 border border-emerald-200">
            <Users size={24} />
            <span className="font-medium text-sm">Add Member</span>
          </button>
          <button onClick={() => navigate('/company-admin/issues')} className="flex flex-col items-center justify-center p-4 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl transition gap-2 border border-red-200">
            <AlertTriangle size={24} />
            <span className="font-medium text-sm">Report Issue</span>
          </button>
          <button onClick={() => navigate('/company-admin/schedule')} className="flex flex-col items-center justify-center p-4 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-xl transition gap-2 border border-orange-200">
            <CheckCircle size={24} />
            <span className="font-medium text-sm">Create Task</span>
          </button>
        </div>
      </Modal>

      {/* Date Filter Modal */}
      <Modal isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} title="Filter Dashboard Data">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Time Period</label>
            <select
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 transition"
            >
              <option>This Week</option>
              <option>This Month</option>
              <option>This Quarter</option>
              <option>Year to Date</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setIsFilterOpen(false)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition">Cancel</button>
            <button
              onClick={() => {
                updateProgress(filterPeriod);
                setIsFilterOpen(false);
              }}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default CompanyAdminDashboard;
