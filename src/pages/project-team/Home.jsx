import { useState } from 'react';
import { Camera, MapPin, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const ProjectTeamHome = () => {
  const [clockedIn, setClockedIn] = useState(false);

  return (
    <div className="space-y-6">

      {/* Clock In/Out Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
        <p className="text-slate-500 text-sm mb-2">{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <h2 className="text-4xl font-bold text-slate-800 mb-6">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h2>

        <button
          onClick={() => setClockedIn(!clockedIn)}
          className={`w-32 h-32 rounded-full border-4 flex items-center justify-center text-xl font-bold mx-auto transition-all transform active:scale-95 shadow-lg
            ${clockedIn
              ? 'border-red-500 bg-red-50 text-red-600 shadow-red-100'
              : 'border-emerald-500 bg-emerald-50 text-emerald-600 shadow-emerald-100'
            }`}
        >
          {clockedIn ? 'Clock Out' : 'Clock In'}
        </button>

        <p className="mt-4 text-xs text-slate-400 flex items-center justify-center gap-1">
          <MapPin size={12} /> Location: Skyline Tower (Verified)
        </p>
      </div>

      {/* Today's Tasks */}
      <div>
        <h3 className="font-bold text-slate-800 mb-3 px-1">Today's Tasks</h3>
        <div className="space-y-3">
          {[
            { title: 'Inspect Reinforcement', time: '08:00 AM', status: 'Completed', priority: 'High' },
            { title: 'Pour Concrete Lvl 3', time: '10:30 AM', status: 'Pending', priority: 'High' },
            { title: 'Site Cleanup', time: '04:00 PM', status: 'Pending', priority: 'Medium' },
          ].map((task, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
              <div>
                <h4 className={`font-semibold ${task.status === 'Completed' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{task.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock size={12} /> {task.time}
                  </span>
                  {task.priority === 'High' && (
                    <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold">High</span>
                  )}
                </div>
              </div>
              <button className={`w-8 h-8 rounded-full flex items-center justify-center border 
                ${task.status === 'Completed' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 text-slate-300'}`}>
                <CheckCircle size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ProjectTeamHome;
