import { useState } from 'react';
import {
    Search, Filter, CheckCircle2, Clock,
    AlertCircle, ChevronRight, MessageSquare,
    MoreHorizontal, Calendar, Tag
} from 'lucide-react';

const Tasks = () => {
    const [filter, setFilter] = useState('All');

    const tasks = [
        {
            id: 1,
            title: 'Inspect Reinforcement Section B',
            priority: 'High',
            status: 'In Progress',
            dueDate: 'Today, 4:00 PM',
            location: 'Site Block 2, Lvl 3',
            category: 'Inspection'
        },
        {
            id: 2,
            title: 'Concrete Pouring Lvl 4',
            priority: 'Critical',
            status: 'Pending',
            dueDate: 'Tomorrow, 9:00 AM',
            location: 'Main Tower',
            category: 'Masonry'
        },
        {
            id: 3,
            title: 'Site Cleanup & Material Sorting',
            priority: 'Medium',
            status: 'Completed',
            dueDate: 'Yesterday',
            location: 'Ground Floor',
            category: 'Maintenance'
        },
        {
            id: 4,
            title: 'Install Safety Nets - East Side',
            priority: 'High',
            status: 'Pending',
            dueDate: 'Feb 15, 2026',
            location: 'Exterior Scaffold',
            category: 'Safety'
        },
    ];

    const getPriorityColor = (p) => {
        switch (p) {
            case 'Critical': return 'text-red-600 bg-red-50 border-red-100';
            case 'High': return 'text-orange-600 bg-orange-50 border-orange-100';
            default: return 'text-blue-600 bg-blue-50 border-blue-100';
        }
    };

    const getStatusIcon = (s) => {
        switch (s) {
            case 'Completed': return <CheckCircle2 size={18} className="text-emerald-500" />;
            case 'In Progress': return <Clock size={18} className="text-blue-500" />;
            default: return <AlertCircle size={18} className="text-slate-400" />;
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search tasks, locations, or IDs..."
                        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                    {['All', 'Pending', 'In Progress', 'Completed'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all
                ${filter === f
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Task List */}
            <div className="grid grid-cols-1 gap-4">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className="group bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-xl hover:shadow-slate-200/50 transition-all cursor-pointer relative overflow-hidden"
                    >
                        {/* Hover bar */}
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className="mt-1">
                                    {getStatusIcon(task.status)}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className={`font-bold transition-colors ${task.status === 'Completed' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                                            {task.title}
                                        </h4>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-black uppercase tracking-tighter ${getPriorityColor(task.priority)}`}>
                                            {task.priority}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                                        <span className="text-xs text-slate-500 flex items-center gap-1.5">
                                            <Calendar size={14} className="text-slate-400" /> {task.dueDate}
                                        </span>
                                        <span className="text-xs text-slate-500 flex items-center gap-1.5">
                                            <Tag size={14} className="text-slate-400" /> {task.category}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-none pt-4 md:pt-0">
                                <div className="text-right">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">Location</p>
                                    <p className="text-xs font-semibold text-slate-700">{task.location}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition">
                                        <MessageSquare size={18} />
                                    </button>
                                    <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition">
                                        <MoreHorizontal size={18} />
                                    </button>
                                    <ChevronRight size={20} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Stats Footer */}
            <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl flex flex-wrap gap-8 items-center justify-around md:justify-start">
                <div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">My Performance</p>
                    <div className="flex items-center gap-3">
                        <span className="text-2xl font-black">92%</span>
                        <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className="bg-blue-500 h-full w-[92%]"></div>
                        </div>
                    </div>
                </div>
                <div className="h-10 w-px bg-slate-800 hidden md:block"></div>
                <div className="text-center md:text-left">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Completed</p>
                    <p className="text-2xl font-black text-emerald-400">24 <span className="text-sm text-slate-500 font-medium">this week</span></p>
                </div>
                <div className="text-center md:text-left">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Overdue</p>
                    <p className="text-2xl font-black text-red-500">1</p>
                </div>
            </div>
        </div>
    );
};

export default Tasks;
