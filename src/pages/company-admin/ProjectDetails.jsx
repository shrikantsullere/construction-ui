import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, LayoutDashboard, Calendar, Camera, FileText,
  AlertCircle, Users, Receipt, MessageSquare
} from 'lucide-react';

const ProjectDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'photos', label: 'Photos', icon: Camera },
    { id: 'drawings', label: 'Drawings', icon: FileText },
    { id: 'issues', label: 'Issues', icon: AlertCircle },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'invoice', label: 'Invoice', icon: Receipt },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}

      <div className="bg-white border-b border-slate-200 px-4 md:px-6 py-4 flex flex-col gap-4 sticky top-0 z-10 shrink-0">
        <div className="flex flex-wrap items-center gap-4">
          <Link to="/company-admin/projects" className="p-2 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-slate-800 truncate">Skyline Tower</h1>
            <p className="text-sm text-slate-500 truncate">New York, NY • Project ID: #{id || '101'}</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">In Progress</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap snap-start
                ${activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 overflow-auto bg-slate-50">

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4">Project Summary</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Construction of a 45-story residential tower with commercial space on the ground floor.
                  Currently in the structural phase, focused on levels 15-20.
                  Timeline is heavily dependent on concrete curing and steel delivery.
                </p>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500 uppercase font-bold">Start Date</p>
                    <p className="font-semibold text-slate-800">Feb 10, 2024</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500 uppercase font-bold">End Date</p>
                    <p className="font-semibold text-slate-800">Dec 15, 2026</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500 uppercase font-bold">Budget</p>
                    <p className="font-semibold text-slate-800">$12,500,000</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500 uppercase font-bold">Manager</p>
                    <p className="font-semibold text-slate-800">John Smith</p>
                  </div>
                </div>
              </div>

              {/* Activity Feed Placeholder */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4">Latest Updates</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0"></div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">Foundation check completed</p>
                      <p className="text-xs text-slate-500">2 hours ago by Sarah Lee</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500 shrink-0"></div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">Materials for Lvl 5 delivered</p>
                      <p className="text-xs text-slate-500">Yesterday by Mike Ross</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Weather Widget Placeholder */}
              <div className="bg-gradient-to-br from-sky-400 to-blue-500 p-6 rounded-xl shadow-lg text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">New York, NY</h3>
                    <p className="text-sky-100 text-sm">Sunny</p>
                  </div>
                  <span className="text-4xl font-bold">72°</span>
                </div>
                <div className="mt-4 flex justify-between text-sm text-sky-100">
                  <span>H: 75° L: 65°</span>
                  <span>Wind: 5mph</span>
                </div>
              </div>

              {/* Team Preview */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-800">Team Members</h3>
                  <button className="text-blue-600 text-xs font-bold hover:underline">View All</button>
                </div>
                <div className="flex -space-x-2 overflow-hidden mb-4">
                  <div className="w-10 h-10 border-2 border-white rounded-full bg-slate-200"></div>
                  <div className="w-10 h-10 border-2 border-white rounded-full bg-slate-300"></div>
                  <div className="w-10 h-10 border-2 border-white rounded-full bg-slate-400"></div>
                  <div className="w-10 h-10 border-2 border-white rounded-full bg-slate-500 flex items-center justify-center text-white text-xs font-bold">+8</div>
                </div>
                <button className="w-full py-2 border border-slate-200 rounded-lg text-sm text-slate-600 font-medium hover:bg-slate-50 transition">
                  Invite Member
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Other Tabs Placeholders */}
        {activeTab === 'schedule' && <div className="text-center py-20 text-slate-500">Gantt Chart & Timeline View</div>}
        {activeTab === 'photos' && <div className="text-center py-20 text-slate-500">Photo Gallery Grid</div>}
        {activeTab === 'drawings' && <div className="text-center py-20 text-slate-500">PDF / Drawing Viewer</div>}
        {activeTab === 'issues' && <div className="text-center py-20 text-slate-500">Kanban Board for Issues</div>}
        {activeTab === 'team' && <div className="text-center py-20 text-slate-500">Team Roster</div>}
        {activeTab === 'invoice' && <div className="text-center py-20 text-slate-500">Invoices & Estimates Table</div>}
        {activeTab === 'chat' && <div className="text-center py-20 text-slate-500">Project Chat Channel</div>}

      </div>
    </div>
  );
};

export default ProjectDetails;
