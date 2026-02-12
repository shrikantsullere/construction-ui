import { Clock, CheckCircle, FileText, Download } from 'lucide-react';

const ClientPortalDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Welcome, Mr. Johnson</h1>
        <p className="text-slate-500 mt-1">Here is the latest progress on your project: <span className="font-semibold text-blue-600">Skyline Tower</span></p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
        <h3 className="font-bold text-slate-800 mb-6">Phase 2: Structural Framework</h3>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-600 font-medium">Overall Completion</span>
            <span className="text-blue-600 font-bold">35%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-4">
            <div className="bg-blue-600 h-4 rounded-full relative">
              <div className="absolute top-0 right-0 -mt-1 -mr-1 w-6 h-6 bg-white border-4 border-blue-600 rounded-full shadow-sm"></div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-8 relative before:absolute before:left-4 before:top-4 before:bottom-0 before:w-0.5 before:bg-slate-200">
          {[
            { title: 'Foundation Completed', date: 'Jan 15, 2024', status: 'completed', desc: 'All inspections passed.' },
            { title: 'Ground Floor Pour', date: 'Feb 10, 2024', status: 'completed', desc: 'Concrete curing in progress.' },
            { title: 'Structural Steel Lvl 1-5', date: 'Mar 05, 2024', status: 'current', desc: 'Installation ongoing.' },
            { title: 'First Inspection', date: 'Mar 20, 2024', status: 'upcoming', desc: 'city inspector scheduled.' },
          ].map((item, i) => (
            <div key={i} className="flex gap-6 relative">
              <div className={`w-8 h-8 rounded-full border-4 flex-shrink-0 z-10 flex items-center justify-center
                ${item.status === 'completed' ? 'bg-emerald-500 border-white text-white' :
                  item.status === 'current' ? 'bg-blue-600 border-white text-white shadow-lg' :
                    'bg-slate-100 border-white text-slate-300'}`}>
                {item.status === 'completed' && <CheckCircle size={14} />}
                {item.status === 'current' && <Clock size={14} />}
              </div>
              <div className="flex-1 bg-slate-50 p-4 rounded-lg">
                <div className="flex justify-between">
                  <h4 className={`font-bold ${item.status === 'upcoming' ? 'text-slate-400' : 'text-slate-800'}`}>{item.title}</h4>
                  <span className="text-xs text-slate-500 font-medium bg-white px-2 py-1 rounded border border-slate-100">{item.date}</span>
                </div>
                <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800">Pending Approvals</h3>
            <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs font-bold">1 Action Required</span>
          </div>
          <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg flex justify-between items-center">
            <div>
              <p className="font-bold text-slate-800 text-sm">Kitchen Cabinet Material Change</p>
              <p className="text-xs text-slate-500 mt-1">Cost Impact: +$1,200</p>
            </div>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-orange-600 transition">
              Review
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">Recent Documents</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition border border-transparent hover:border-slate-100">
              <div className="flex items-center gap-3">
                <div className="bg-red-50 text-red-500 p-2 rounded">
                  <FileText size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">March_Invoice.pdf</p>
                  <p className="text-xs text-slate-400">2.4 MB</p>
                </div>
              </div>
              <button className="text-slate-400 hover:text-blue-600"><Download size={18} /></button>
            </div>
            <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition border border-transparent hover:border-slate-100">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 text-blue-500 p-2 rounded">
                  <FileText size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">Site_Plan_Revision_3.pdf</p>
                  <p className="text-xs text-slate-400">8.1 MB</p>
                </div>
              </div>
              <button className="text-slate-400 hover:text-blue-600"><Download size={18} /></button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ClientPortalDashboard;
