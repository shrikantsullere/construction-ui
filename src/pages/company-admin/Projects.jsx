import { useState } from 'react';
import { Plus, Search, Filter, Calendar, MapPin, Eye, Edit, Trash2, X, Save, AlertTriangle } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-in">
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

const Projects = () => {
  const [view, setView] = useState('grid'); // 'grid' | 'table'
  const [projects, setProjects] = useState([
    { id: 1, name: 'Skyline Tower', location: 'New York, NY', value: '$12.5M', status: 'In Progress', progress: 75, due: '2026-12-01', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800' },
    { id: 2, name: 'Riverfront Park', location: 'Austin, TX', value: '$4.2M', status: 'Planning', progress: 15, due: '2025-08-15', image: 'https://images.unsplash.com/photo-1590644365607-1c5a38fc43a0?auto=format&fit=crop&q=80&w=800' },
    { id: 3, name: 'City Center Mall', location: 'Chicago, IL', value: '$45M', status: 'On Hold', progress: 90, due: '2024-03-10', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800' },
    { id: 4, name: 'Green Valley Housing', location: 'Seattle, WA', value: '$8.5M', status: 'Completed', progress: 100, due: '2023-01-20', image: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&q=80&w=800' },
  ]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '', location: '', value: '', status: 'Planning', progress: 0, due: '', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
  });

  // Handlers
  const handleCreate = () => {
    setFormData({ name: '', location: '', value: '', status: 'Planning', progress: 0, due: '', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800' });
    setIsCreateOpen(true);
  };

  const handleSaveCreate = () => {
    const newProject = { ...formData, id: Date.now() };
    setProjects([...projects, newProject]);
    setIsCreateOpen(false);
  };

  const handleView = (project) => {
    setSelectedProject(project);
    setIsViewOpen(true);
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setFormData(project);
    setIsEditOpen(true);
  };

  const handleSaveEdit = () => {
    setProjects(projects.map(p => p.id === selectedProject.id ? formData : p));
    setIsEditOpen(false);
  };

  const handleDelete = (project) => {
    setSelectedProject(project);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    setProjects(projects.filter(p => p.id !== selectedProject.id));
    setIsDeleteOpen(false);
  };

  const ProjectForm = ({ data, setData, onSubmit, submitLabel }) => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Project Name</label>
        <input
          type="text"
          value={data.name}
          onChange={e => setData({ ...data, name: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 transition"
          placeholder="e.g. Sunrise Apartments"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
          <input
            type="text"
            value={data.location}
            onChange={e => setData({ ...data, location: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 transition"
            placeholder="City, State"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Value</label>
          <input
            type="text"
            value={data.value}
            onChange={e => setData({ ...data, value: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 transition"
            placeholder="$0.0M"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
          <select
            value={data.status}
            onChange={e => setData({ ...data, status: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 transition"
          >
            <option>Planning</option>
            <option>In Progress</option>
            <option>On Hold</option>
            <option>Completed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
          <input
            type="date"
            value={data.due}
            onChange={e => setData({ ...data, due: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 transition"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Progress ({data.progress}%)</label>
        <input
          type="range"
          min="0" max="100"
          value={data.progress}
          onChange={e => setData({ ...data, progress: parseInt(e.target.value) })}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      <div className="flex justify-end pt-4">
        <button
          onClick={onSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition shadow-lg shadow-blue-200 flex items-center gap-2"
        >
          <Save size={18} /> {submitLabel}
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Projects</h1>
          <p className="text-slate-500 text-sm">Manage all your ongoing construction projects.</p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium shadow-lg shadow-blue-200 transition"
        >
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
                  <div className="flex gap-2">
                    <button onClick={() => handleView(project)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition" title="View Details">
                      <Eye size={18} />
                    </button>
                    <button onClick={() => handleEdit(project)} className="p-1.5 text-orange-500 hover:bg-orange-50 rounded-lg transition" title="Edit Project">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(project)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition" title="Delete Project">
                      <Trash2 size={18} />
                    </button>
                  </div>
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

      {/* Table View */}
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
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleView(project)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition" title="View Details">
                        <Eye size={18} />
                      </button>
                      <button onClick={() => handleEdit(project)} className="p-1.5 text-orange-500 hover:bg-orange-50 rounded-lg transition" title="Edit Project">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDelete(project)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition" title="Delete Project">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}

      {/* Create Modal */}
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create New Project">
        <ProjectForm data={formData} setData={setFormData} onSubmit={handleSaveCreate} submitLabel="Create Project" />
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Project">
        <ProjectForm data={formData} setData={setFormData} onSubmit={handleSaveEdit} submitLabel="Save Changes" />
      </Modal>

      {/* View Modal */}
      <Modal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} title="Project Details">
        {selectedProject && (
          <div className="space-y-4">
            <div className="h-40 w-full rounded-lg overflow-hidden mb-4">
              <img src={selectedProject.image} alt={selectedProject.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Project Name</p>
                <p className="font-semibold text-slate-800">{selectedProject.name}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Status</p>
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold mt-1
                            ${selectedProject.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                    selectedProject.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-slate-100 text-slate-700'}`}>
                  {selectedProject.status}
                </span>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Location</p>
                <p className="font-medium text-slate-700">{selectedProject.location}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Value</p>
                <p className="font-medium text-slate-700">{selectedProject.value}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Due Date</p>
                <p className="font-medium text-slate-700">{selectedProject.due}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Progress</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-20 bg-slate-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${selectedProject.progress}%` }}></div>
                  </div>
                  <span className="text-xs font-bold">{selectedProject.progress}%</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button onClick={() => setIsViewOpen(false)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium transition">
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Delete Project">
        <div className="text-center space-y-4">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="text-red-600" size={32} />
          </div>
          <div>
            <p className="font-medium text-slate-800">Are you sure you want to delete this project?</p>
            <p className="text-sm text-slate-500 mt-1">This action cannot be undone. All data associated with <b>{selectedProject?.name}</b> will be permanently removed.</p>
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <button onClick={() => setIsDeleteOpen(false)} className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition font-medium">
              Cancel
            </button>
            <button onClick={confirmDelete} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-medium shadow-lg shadow-red-200">
              Delete Project
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default Projects;
