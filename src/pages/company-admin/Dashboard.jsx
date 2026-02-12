import { TrendingUp, Users, AlertTriangle, CheckCircle, Calendar, Plus, MessageSquare, X, Check, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardCard = ({ title, value, subtext, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-default">
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
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
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

  // Data State
  const [progressData, setProgressData] = useState([75, 45, 90, 30]);

  const handleOptimization = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      setOptimizationComplete(true);
      setTimeout(() => setOptimizationComplete(false), 3000); // Reset after 3s
    }, 2000);
  };

  const updateProgress = (period) => {
    setFilterPeriod(period);
    // Simulate data change
    if (period === 'This Month') {
      setProgressData([85, 60, 95, 50]);
    } else {
      setProgressData([75, 45, 90, 30]);
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500 text-sm">Welcome back, here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition text-sm font-medium shadow-sm"
          >
            <Calendar size={18} /> Filter Date
          </button>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium shadow-lg shadow-blue-200"
          >
            <Plus size={18} /> Quick Create
          </button>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Active Projects"
          value="12"
          subtext="vs last month"
          icon={TrendingUp}
          color="bg-blue-500"
        />
        <DashboardCard
          title="Pending Tasks"
          value="45"
          subtext="due this week"
          icon={CheckCircle}
          color="bg-orange-500"
        />
        <DashboardCard
          title="Open Issues"
          value="8"
          subtext="critical priority"
          icon={AlertTriangle}
          color="bg-red-500"
        />
        <DashboardCard
          title="Total Revenue"
          value="$1.2M"
          subtext="YTD earnings"
          icon={TrendingUp}
          color="bg-emerald-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Task Progress Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Project Progress</h3>
            <select
              value={filterPeriod}
              onChange={(e) => updateProgress(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-600 text-sm rounded-lg px-3 py-1 outline-none cursor-pointer hover:border-blue-400 transition"
            >
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>

          <div className="space-y-4">
            {['Skyline Tower', 'Riverfront Park', 'City Center Mall', 'Green Valley Housing'].map((project, i) => (
              <div key={project} className="group cursor-default">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-slate-700 group-hover:text-blue-600 transition-colors">{project}</span>
                  <span className="text-slate-500">{progressData[i]}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out group-hover:bg-blue-500"
                    style={{ width: `${progressData[i]}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Assistant & Recent Activity */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-6 rounded-xl shadow-lg text-white relative overflow-hidden transition-all hover:shadow-xl">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <MessageSquare size={20} /> AI Assistant
              </h3>
              {optimizationComplete ? (
                <div className="animate-fade-in bg-white/10 p-3 rounded-lg border border-white/20">
                  <p className="flex items-center gap-2 font-medium text-emerald-300"><CheckCircle size={18} /> Schedule Optimized!</p>
                  <p className="text-xs text-indigo-100 mt-1">3 tasks rescheduled to avoid delays.</p>
                </div>
              ) : (
                <>
                  <p className="text-indigo-100 text-sm mb-4">You have 3 unscheduled tasks that might delay 'Riverfront Park'. Should I optimize the schedule?</p>
                  <button
                    onClick={handleOptimization}
                    disabled={isOptimizing}
                    className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-indigo-50 transition w-full flex items-center justify-center gap-2"
                  >
                    {isOptimizing ? (
                      <>Processing...</>
                    ) : (
                      <>Optimize Schedule</>
                    )}
                  </button>
                </>
              )}
            </div>
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-12 -mb-12 blur-xl"></div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { user: 'Mike Ross', action: 'uploaded 5 photos', project: 'Skyline Tower', time: '2m ago' },
                { user: 'Sarah Jen', action: 'approved estimate', project: 'City Center', time: '1h ago' },
                { user: 'Admin', action: 'updated schedule', project: 'Riverfront', time: '3h ago' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start hover:bg-slate-50 p-2 rounded-lg transition cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0 text-xs flex items-center justify-center font-bold text-slate-600">
                    {item.user.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm text-slate-800">
                      <span className="font-semibold">{item.user}</span> {item.action}
                    </p>
                    <p className="text-xs text-slate-400">in {item.project} • {item.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-center text-sm text-blue-600 hover:text-blue-700 font-medium transition flex items-center justify-center gap-1">
              View All Activity <ArrowRight size={14} />
            </button>
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
            <span className="font-medium text-sm">Add Team Member</span>
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
            <label className="block text-sm font-medium text-slate-700 mb-1">Date Range</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 transition">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Quarter</option>
              <option>Year to Date</option>
              <option>Custom Range</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
              <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
              <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm outline-none" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setIsFilterOpen(false)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition">Cancel</button>
            <button onClick={() => { setIsFilterOpen(false); alert("Filters applied!"); }} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200">Apply Filters</button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default CompanyAdminDashboard;
