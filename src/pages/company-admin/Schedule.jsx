import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const Schedule = () => {
  const [currentMonth, setCurrentMonth] = useState('February 2026');

  const events = [
    { id: 1, title: 'Foundation Pour', project: 'Skyline Tower', start: 2, end: 4, color: 'bg-blue-500' },
    { id: 2, title: 'Steel Framework', project: 'Riverfront Park', start: 5, end: 12, color: 'bg-emerald-500' },
    { id: 3, title: 'Electrical Wiring', project: 'City Center Mall', start: 10, end: 15, color: 'bg-orange-500' },
    { id: 4, title: 'Plumbing Rough-in', project: 'Skyline Tower', start: 18, end: 22, color: 'bg-purple-500' },
    { id: 5, title: 'Roof Installation', project: 'Green Valley', start: 25, end: 28, color: 'bg-red-500' },
  ];

  const daysInMonth = 28; // Feb 2026
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Project Schedule</h1>
          <p className="text-slate-500 text-sm">Manage timelines and milestones.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-200">
          <Plus size={18} /> Add Event
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-full"><ChevronLeft size={20} /></button>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <CalendarIcon size={24} className="text-blue-600" />
              {currentMonth}
            </h2>
            <button className="p-2 hover:bg-slate-100 rounded-full"><ChevronRight size={20} /></button>
          </div>
          <div className="flex gap-2">
            <span className="flex items-center gap-1 text-xs"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Skyline</span>
            <span className="flex items-center gap-1 text-xs"><div className="w-3 h-3 rounded-full bg-emerald-500"></div> Riverfront</span>
            <span className="flex items-center gap-1 text-xs"><div className="w-3 h-3 rounded-full bg-orange-500"></div> City Center</span>
          </div>
        </div>

        {/* Gantt / Calendar Hybrid View */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-28 gap-px bg-slate-200 border border-slate-200 rounded-t-lg">
              {days.map(d => (
                <div key={d} className="bg-slate-50 p-2 text-center text-xs font-semibold text-slate-600">
                  {d}
                </div>
              ))}
            </div>

            <div className="border-x border-b border-slate-200 bg-white relative h-64 rounded-b-lg">
              {/* Grid Lines */}
              <div className="absolute inset-0 grid grid-cols-28 pointer-events-none">
                {days.map(d => <div key={d} className="border-r border-slate-100 h-full"></div>)}
              </div>

              {/* Events */}
              <div className="relative pt-4 space-y-3 z-10 px-0.5">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className={`${event.color} text-white text-xs p-2 rounded-md shadow-sm opacity-90 hover:opacity-100 cursor-pointer transition flex justify-between items-center overflow-hidden whitespace-nowrap`}
                    style={{
                      marginLeft: `${((event.start - 1) / daysInMonth) * 100}%`,
                      width: `${((event.end - event.start + 1) / daysInMonth) * 100}%`
                    }}
                  >
                    <span className="font-bold mr-2">{event.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">Upcoming Milestones</h3>
          <ul className="space-y-4">
            <li className="flex justify-between items-center border-b border-slate-50 pb-2">
              <div>
                <p className="font-semibold text-slate-800">Phase 1 Completion</p>
                <p className="text-xs text-slate-500">Skyline Tower</p>
              </div>
              <span className="text-sm font-bold text-red-500">Feb 28</span>
            </li>
            <li className="flex justify-between items-center border-b border-slate-50 pb-2">
              <div>
                <p className="font-semibold text-slate-800">Safety Inspection</p>
                <p className="text-xs text-slate-500">All Sites</p>
              </div>
              <span className="text-sm font-bold text-blue-500">Mar 05</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
