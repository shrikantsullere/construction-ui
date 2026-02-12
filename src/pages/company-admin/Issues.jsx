import { useState } from 'react';
import { AlertCircle, CheckCircle, Clock, Filter, Plus, X, Save, Trash2, Edit, AlertTriangle } from 'lucide-react';

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

const Issues = () => {
  const [issues, setIssues] = useState([
    { id: 1, title: 'Cracked Concrete Slab', project: 'Skyline Tower', priority: 'High', status: 'Open', assignee: 'Mike Ross', due: '2026-02-15', description: 'Significant crack observed in the northeast corner of the foundation slab.' },
    { id: 2, title: 'Incorrect Wiring Gauge', project: 'City Center', priority: 'Critical', status: 'In Progress', assignee: 'Electrician Team', due: '2026-02-12', description: 'Wiring in unit 304 uses 14 gauge instead of the required 12 gauge.' },
    { id: 3, title: 'Missing Safety Railing', project: 'Riverfront Park', priority: 'Medium', status: 'Open', assignee: 'Sarah Smith', due: '2026-02-18', description: 'Temporary safety railing missing on the 2nd floor balcony.' },
    { id: 4, title: 'Paint Color Mismatch', project: 'Skyline Tower', priority: 'Low', status: 'Resolved', assignee: 'Painters Inc.', due: '2026-02-10', description: 'Hallway paint shade matches "Eggshell" but spec calls for "Ivory".' },
  ]);

  // Modal States
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedIssue, setSelectedIssue] = useState(null);
  const [formData, setFormData] = useState({
    title: '', project: '', priority: 'Medium', status: 'Open', assignee: '', due: '', description: ''
  });

  // Handlers
  const openReportModal = () => {
    setFormData({ title: '', project: '', priority: 'Medium', status: 'Open', assignee: '', due: '', description: '' });
    setIsReportOpen(true);
  };

  const handleSaveReport = () => {
    const newIssue = { ...formData, id: Date.now() };
    setIssues([...issues, newIssue]);
    setIsReportOpen(false);
  };

  const openViewModal = (issue) => {
    setSelectedIssue(issue);
    setIsViewOpen(true);
  };

  const openEditModal = () => {
    setFormData(selectedIssue);
    setIsEditOpen(true);
    setIsViewOpen(false);
  };

  const handleSaveEdit = () => {
    setIssues(issues.map(i => i.id === selectedIssue.id ? formData : i));
    setIsEditOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteOpen(true);
    setIsViewOpen(false);
  };

  const confirmDelete = () => {
    setIssues(issues.filter(i => i.id !== selectedIssue.id));
    setIsDeleteOpen(false);
  };

  const IssueForm = ({ data, setData, onSubmit, submitLabel }) => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Issue Title</label>
        <input
          type="text"
          value={data.title}
          onChange={e => setData({ ...data, title: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 transition"
          placeholder="e.g. Broken Tile"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Project</label>
          <input
            type="text"
            value={data.project}
            onChange={e => setData({ ...data, project: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 transition"
            placeholder="Project Name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Assignee</label>
          <input
            type="text"
            value={data.assignee}
            onChange={e => setData({ ...data, assignee: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 transition"
            placeholder="Person or Team"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
          <select
            value={data.priority}
            onChange={e => setData({ ...data, priority: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 transition"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
          <select
            value={data.status}
            onChange={e => setData({ ...data, status: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 transition"
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>
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
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
        <textarea
          value={data.description}
          onChange={e => setData({ ...data, description: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 transition h-24 resize-none"
          placeholder="Describe the issue..."
        />
      </div>
      <div className="flex justify-end pt-2">
        <button
          onClick={onSubmit}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition shadow-lg shadow-red-200 flex items-center gap-2"
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
          <h1 className="text-2xl font-bold text-slate-800">Issues & Snags</h1>
          <p className="text-slate-500 text-sm">Track and resolve on-site problems.</p>
        </div>
        <button
          onClick={openReportModal}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 shadow-lg shadow-red-200 flex items-center gap-2 transition"
        >
          <Plus size={18} /> Report Issue
        </button>
      </div>

      {/* Kanban Board Container - Responsive */}
      <div className="flex flex-col md:flex-row gap-4 overflow-x-auto pb-4 items-start">
        {/* Kanban Columns */}
        {['Open', 'In Progress', 'Resolved'].map((status) => (
          <div key={status} className="flex-1 w-full md:min-w-[300px] bg-slate-100/50 border border-slate-200 rounded-xl p-4">
            <h3 className="font-bold text-slate-700 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full 
                    ${status === 'Open' ? 'bg-red-500' :
                    status === 'In Progress' ? 'bg-orange-500' :
                      'bg-emerald-500'}`}
                />
                {status}
              </div>
              <span className="bg-white text-slate-600 border border-slate-200 text-xs px-2 py-1 rounded-md font-bold shadow-sm">
                {issues.filter(i => i.status === status).length}
              </span>
            </h3>

            <div className="space-y-3">
              {issues.filter(i => i.status === status).map(issue => (
                <div
                  key={issue.id}
                  onClick={() => openViewModal(issue)}
                  className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition cursor-pointer group relative"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider
                      ${issue.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                        issue.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                          issue.priority === 'Medium' ? 'bg-blue-100 text-blue-700' :
                            'bg-slate-100 text-slate-600'}`}>
                      {issue.priority}
                    </span>
                    <span className="text-xs text-slate-400">#{issue.id}</span>
                  </div>
                  <h4 className="font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition">{issue.title}</h4>
                  <p className="text-xs text-slate-500 mb-3 font-medium">{issue.project}</p>

                  <div className="flex justify-between items-center pt-3 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 border border-slate-200">
                        {issue.assignee ? issue.assignee.charAt(0) : '?'}
                      </div>
                      <span className="text-xs text-slate-500 truncate max-w-[80px]">{issue.assignee || 'Unassigned'}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                      <Clock size={12} /> {issue.due}
                    </div>
                  </div>
                </div>
              ))}
              {issues.filter(i => i.status === status).length === 0 && (
                <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
                  <p className="text-slate-400 text-sm italic">No issues</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}

      {/* Report Modal */}
      <Modal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} title="Report New Issue">
        <IssueForm data={formData} setData={setFormData} onSubmit={handleSaveReport} submitLabel="Report Issue" />
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Issue Details">
        <IssueForm data={formData} setData={setFormData} onSubmit={handleSaveEdit} submitLabel="Save Changes" />
      </Modal>

      {/* View Modal */}
      <Modal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} title="Issue Details">
        {selectedIssue && (
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h4 className="text-lg font-bold text-slate-800">{selectedIssue.title}</h4>
              <span className={`px-2 py-1 rounded text-xs font-bold 
                        ${selectedIssue.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                  selectedIssue.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                    selectedIssue.priority === 'Medium' ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-600'}`}>
                {selectedIssue.priority}
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold mb-1">Status</p>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border
                        ${selectedIssue.status === 'Open' ? 'bg-red-50 text-red-600 border-red-100' :
                  selectedIssue.status === 'In Progress' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                    'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                {selectedIssue.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500 font-medium">Project</p>
                <p className="text-slate-800">{selectedIssue.project}</p>
              </div>
              <div>
                <p className="text-slate-500 font-medium">Due Date</p>
                <p className="text-slate-800">{selectedIssue.due}</p>
              </div>
              <div>
                <p className="text-slate-500 font-medium">Assignee</p>
                <p className="text-slate-800">{selectedIssue.assignee || 'Unassigned'}</p>
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <p className="text-xs text-slate-500 uppercase font-bold mb-1">Description</p>
              <p className="text-sm text-slate-700">{selectedIssue.description || "No description provided."}</p>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button onClick={openEditModal} className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition text-sm font-medium">
                <Edit size={16} /> Edit
              </button>
              <button onClick={openDeleteModal} className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-sm font-medium border border-red-200">
                <Trash2 size={16} /> Delete
              </button>
              <button onClick={() => setIsViewOpen(false)} className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition text-sm font-medium">
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Delete Issue">
        <div className="text-center space-y-4">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="text-red-600" size={32} />
          </div>
          <div>
            <p className="font-medium text-slate-800">Delete this issue?</p>
            <p className="text-sm text-slate-500 mt-1">
              Are you sure you want to delete <b>{selectedIssue?.title}</b>?<br />
              This action cannot be undone.
            </p>
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <button onClick={() => setIsDeleteOpen(false)} className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition font-medium">
              Cancel
            </button>
            <button onClick={confirmDelete} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-medium shadow-lg shadow-red-200">
              Delete Issue
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default Issues;
