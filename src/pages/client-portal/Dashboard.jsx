import {
  Clock, CheckCircle, FileText, Download,
  TrendingUp, Calendar, AlertCircle,
  Image as ImageIcon, MoreHorizontal,
  ArrowUpRight, DollarSign, Target, ShieldCheck
} from 'lucide-react';

const ClientStatCard = ({ title, value, subtext, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:shadow-slate-200/50 transition-all">
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={22} className="text-white" />
      </div>
      <button className="p-1.5 text-slate-300 hover:text-slate-500 rounded-lg">
        <MoreHorizontal size={20} />
      </button>
    </div>
    <div className="mt-4">
      <p className="text-slate-400 text-xs font-black uppercase tracking-widest">{title}</p>
      <h3 className="text-2xl font-black text-slate-800 mt-1">{value}</h3>
      <p className="text-[10px] text-slate-500 font-medium mt-2 flex items-center gap-1.5">
        <ShieldCheck size={12} className="text-emerald-500" /> {subtext}
      </p>
    </div>
  </div>
);

const ClientPortalDashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[10px] font-black text-blue-600 background-blue-50 px-2 py-1 rounded-full uppercase tracking-tighter mb-2 inline-block">Client Overview</span>
          <h1 className="text-3xl font-black text-slate-800">Welcome, Mr. Johnson</h1>
          <p className="text-slate-500 mt-1 max-w-lg">Everything is on track for <span className="font-bold text-slate-700 underline decoration-blue-500 underline-offset-4">Skyline Tower</span>. Expected handover in 124 days.</p>
        </div>
        <div className="flex gap-3">
          {/* Actions removed as per request */}
        </div>
      </div>

      {/* High-Level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ClientStatCard
          title="Project Budget"
          value="$2.4M"
          subtext="Budget utilization at 42%"
          icon={DollarSign}
          color="bg-blue-600 shadow-lg shadow-blue-100"
        />
        <ClientStatCard
          title="Completion"
          value="35%"
          subtext="Ahead of schedule by 4 days"
          icon={Target}
          color="bg-emerald-500 shadow-lg shadow-emerald-100"
        />
        <ClientStatCard
          title="Active Workers"
          value="48"
          subtext="Full team attendance today"
          icon={ShieldCheck}
          color="bg-indigo-600 shadow-lg shadow-indigo-100"
        />
        <ClientStatCard
          title="Handover Date"
          value="June 2026"
          subtext="Phase 3 starts next week"
          icon={Clock}
          color="bg-amber-500 shadow-lg shadow-amber-100"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Progress & Timeline Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest flex items-center gap-2">
                <TrendingUp size={18} className="text-blue-600" /> Construction Velocity
              </h3>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <ArrowUpRight size={14} /> Phase 2 Active
              </span>
            </div>

            <div className="p-8">
              {/* Advanced Progress Bar */}
              <div className="mb-12">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <p className="text-2xl font-black text-slate-800">35.4%</p>
                    <p className="text-xs text-slate-400 font-bold uppercase">Overall Structural Progress</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-800">Phase 2 of 5</p>
                    <p className="text-xs text-blue-600 font-black uppercase">Concrete Framework</p>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-2xl h-6 p-1">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-xl w-[35%] relative shadow-inner">
                    <div className="absolute -top-1 right-0 w-6 h-6 bg-white border-4 border-blue-600 rounded-full shadow-xl"></div>
                  </div>
                </div>
              </div>

              {/* Rich Timeline */}
              <div className="space-y-8 relative before:absolute before:left-5 before:top-4 before:bottom-0 before:w-1 before:bg-slate-100">
                {[
                  { title: 'Foundation Completed', date: 'Jan 15, 2026', status: 'completed', desc: 'Deep-pile foundation verified by city engineers.' },
                  { title: 'Ground Floor Concrete Pour', date: 'Feb 10, 2026', status: 'completed', desc: 'Concrete curing in progress for 48 hours.' },
                  { title: 'Structural Steel Lvl 1-5', date: 'Today', status: 'current', desc: 'Columns for Level 4 currently being installed.' },
                  { title: 'MEP Rough-in Work', date: 'Apr 2026', status: 'upcoming', desc: 'Mechanical, electrical, and plumbing infrastructure.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 relative group">
                    <div className={`w-10 h-10 rounded-2xl border-4 flex-shrink-0 z-10 flex items-center justify-center transition-all
                        ${item.status === 'completed' ? 'bg-emerald-500 border-white text-white shadow-lg shadow-emerald-100' :
                        item.status === 'current' ? 'bg-blue-600 border-white text-white shadow-xl shadow-blue-200 ring-4 ring-blue-50' :
                          'bg-slate-100 border-white text-slate-400'}`}>
                      {item.status === 'completed' && <CheckCircle size={18} />}
                      {item.status === 'current' && <Clock size={18} className="animate-spin-slow" />}
                    </div>
                    <div className={`flex-1 p-6 rounded-2xl border transition-all 
                        ${item.status === 'current' ? 'bg-blue-50 border-blue-100 shadow-sm' : 'bg-white border-slate-50 group-hover:bg-slate-50'}`}>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                        <h4 className={`text-base font-black ${item.status === 'upcoming' ? 'text-slate-400' : 'text-slate-800 underline-none group-hover:text-blue-600'}`}>
                          {item.title}
                        </h4>
                        <span className="text-[10px] font-black text-slate-400 bg-white px-2 py-1 rounded-lg border border-slate-100 h-fit w-fit uppercase tracking-tighter">{item.date}</span>
                      </div>
                      <p className="text-sm text-slate-500 mt-2 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-8">
          {/* Pending Approvals */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest">Pending Choices</h3>
              <div className="bg-amber-100 text-amber-600 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black">1</div>
            </div>
            <div className="p-5 border border-amber-100 bg-amber-50/50 rounded-2xl space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                  <AlertCircle size={20} />
                </div>
                <div>
                  <h4 className="font-black text-slate-800 text-sm">Cabinet Finish Change</h4>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Draft selection for Level 3 Penthouse. Cost impact: +1.2k</p>
                </div>
              </div>
              <button className="w-full bg-amber-500 text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-amber-200 hover:bg-amber-600 transition active:scale-95">
                Review Proposal
              </button>
            </div>
          </div>

          {/* Site Progress Photos */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest">Latest Site Views</h3>
              <button className="text-[10px] font-black text-blue-600 uppercase">View Gallery</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=300',
                'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=300',
                'https://images.unsplash.com/photo-1503387762-592dee58c460?q=80&w=300',
                'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=300'
              ].map((url, i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden relative group cursor-pointer shadow-sm">
                  <img src={url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Site" />
                  <div className="absolute inset-0 bg-blue-600/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ImageIcon size={20} className="text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Document Section */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest mb-6">Vault & Documents</h3>
            <div className="space-y-3">
              {[
                { name: 'Feb_Progress_Report.pdf', size: '2.4 MB', type: 'doc', color: 'bg-blue-50 text-blue-600' },
                { name: 'Invoice_Mar_2026.pdf', size: '1.1 MB', type: 'invoice', color: 'bg-emerald-50 text-emerald-600' },
                { name: 'Revised_Site_Plan.pdf', size: '8.4 MB', type: 'drawing', color: 'bg-indigo-50 text-indigo-600' },
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${doc.color}`}>
                      <FileText size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-800 truncate max-w-[120px]">{doc.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{doc.size}</p>
                    </div>
                  </div>
                  <Download size={16} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 border border-slate-100 text-slate-400 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-slate-50 transition">
              View All Vault
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPortalDashboard;
