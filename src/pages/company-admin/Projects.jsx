import { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Calendar, MapPin } from 'lucide-react';

const Projects = () => {
  const [view, setView] = useState('grid'); // 'grid' | 'table'

  const projects = [
    { id: 1, name: 'Skyline Tower', location: 'New York, NY', value: '$12.5M', status: 'In Progress', progress: 75, due: 'Dec 2026', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800' },
    { id: 2, name: 'Riverfront Park', location: 'Austin, TX', value: '$4.2M', status: 'Planning', progress: 15, due: 'Aug 2025', image: 'https://images.unsplash.com/photo-1590644365607-1c5a38fc43a0?auto=format&fit=crop&q=80&w=800' },
    { id: 3, name: 'City Center Mall', location: 'Chicago, IL', value: '$45M', status: 'On Hold', progress: 90, due: 'Mar 2024', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800' },
    { id: 4, name: 'Green Valley Housing', location: 'Seattle, WA', value: '$8.M', status: 'Completed', progress: 100, due: 'Jan 2023', image: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Projects</h1>
          <p className="text-slate-500 text-sm">Manage all your ongoing construction projects.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium shadow-lg shadow-blue-200 transition">
          <Plus size={18} /> New Project
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 flex items-center gap-2 text-sm">
            <Filter size={18} /> Filters
          </button>
          <div className="bg-slate-100 p-1 rounded-lg flex">
            <button
              onClick={() => setView('grid')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition ${view === 'grid' ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setView('table')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition ${view === 'table' ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {view === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition group">
              <div className="h-48 overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm glass 
                    ${project.status === 'In Progress' ? 'bg-blue-500/90 text-white' :
                      project.status === 'Completed' ? 'bg-emerald-500/90 text-white' :
                        'bg-slate-500/90 text-white'}`}>
                    {project.status}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition">{project.name}</h3>
                  <button className="text-slate-400 hover:text-slate-600">
                    <MoreHorizontal size={20} />
                  </button>
                </div>

                <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                  <MapPin size={16} /> {project.location}
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 font-medium">Progress</span>
                    <span className="text-blue-600 font-bold">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-100 text-sm">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar size={16} /> Due {project.due}
                  </div>
                  <span className="font-bold text-slate-800">{project.value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View Placeholder */}
      {view === 'table' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Project Name</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Progress</th>
                <th className="px-6 py-4">Value</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-medium text-slate-900">{project.name}</td>
                  <td className="px-6 py-4">{project.location}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold 
                      ${project.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                        project.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                          'bg-slate-100 text-slate-700'}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-200 rounded-full h-1.5">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                      </div>
                      <span className="text-xs">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{project.value}</td>
                  <td className="px-6 py-4">{project.due}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Projects;
