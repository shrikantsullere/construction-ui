import { useState } from 'react';
import { FileText, Eye, Download, Search, Filter, Upload, Trash2, X, Save, AlertTriangle, CheckCircle } from 'lucide-react';

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

const Drawings = () => {
  const [drawings, setDrawings] = useState([
    { id: 1, name: 'A-101 Ground Floor Plan', version: 'v3.0', date: '2026-02-10', size: '2.4 MB', status: 'Approved', discipline: 'Architectural' },
    { id: 2, name: 'S-201 Structural Layout', version: 'v2.1', date: '2026-02-08', size: '4.1 MB', status: 'In Review', discipline: 'Structural' },
    { id: 3, name: 'E-301 Electrical Schematics', version: 'v1.0', date: '2026-01-25', size: '1.8 MB', status: 'Draft', discipline: 'Electrical' },
    { id: 4, name: 'P-401 Plumbing Routing', version: 'v1.2', date: '2026-01-20', size: '3.2 MB', status: 'Approved', discipline: 'Plumbing' },
    { id: 5, name: 'L-501 Landscape Details', version: 'v2.0', date: '2025-12-15', size: '5.5 MB', status: 'Approved', discipline: 'Landscape' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterDiscipline, setFilterDiscipline] = useState('All Disciplines');

  // Modal States
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedDrawing, setSelectedDrawing] = useState(null);
  const [formData, setFormData] = useState({
    name: '', version: 'v1.0', status: 'Draft', discipline: 'Architectural', file: null
  });

  // Derived State (Filtering)
  const filteredDrawings = drawings.filter(drawing => {
    const matchesSearch = drawing.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterDiscipline === 'All Disciplines' || drawing.discipline === filterDiscipline;
    return matchesSearch && matchesFilter;
  });

  // Handlers
  const handleUploadClick = () => {
    setFormData({ name: '', version: 'v1.0', status: 'Draft', discipline: 'Architectural', file: null });
    setIsUploadOpen(true);
  };

  const handleSaveUpload = () => {
    const newDrawing = {
      id: Date.now(),
      name: formData.name || 'New Drawing',
      version: formData.version,
      date: new Date().toISOString().split('T')[0],
      size: (Math.random() * 5 + 1).toFixed(1) + ' MB', // Mock size
      status: formData.status,
      discipline: formData.discipline
    };
    setDrawings([newDrawing, ...drawings]);
    setIsUploadOpen(false);
  };

  const handleView = (drawing) => {
    setSelectedDrawing(drawing);
    setIsViewOpen(true);
  };

  const handleDelete = (drawing) => {
    setSelectedDrawing(drawing);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    setDrawings(drawings.filter(d => d.id !== selectedDrawing.id));
    setIsDeleteOpen(false);
  };

  const handleDownload = (name) => {
    alert(`Downloading ${name}...`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Drawings & Blueprints</h1>
          <p className="text-slate-500 text-sm">Manage latest revisions and architectural plans.</p>
        </div>
        <button
          onClick={handleUploadClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200 flex items-center gap-2 transition"
        >
          <Upload size={18} /> Upload Revision
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-50 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search drawings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-lg text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <select
            value={filterDiscipline}
            onChange={(e) => setFilterDiscipline(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
          >
            <option>All Disciplines</option>
            <option>Architectural</option>
            <option>Structural</option>
            <option>Electrical</option>
            <option>Plumbing</option>
            <option>Landscape</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-semibold">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Drawing Name</th>
                <th className="px-6 py-4 whitespace-nowrap">Version</th>
                <th className="px-6 py-4 whitespace-nowrap">Date</th>
                <th className="px-6 py-4 whitespace-nowrap">Size</th>
                <th className="px-6 py-4 whitespace-nowrap">Status</th>
                <th className="px-6 py-4 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDrawings.length > 0 ? (
                filteredDrawings.map((drawing) => (
                  <tr key={drawing.id} className="border-b border-slate-50 hover:bg-slate-50 transition group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-50 p-2 rounded text-blue-600 group-hover:bg-blue-100 transition">
                          <FileText size={20} />
                        </div>
                        <div>
                          <span className="font-semibold text-slate-800 block">{drawing.name}</span>
                          <span className="text-xs text-slate-400">{drawing.discipline}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{drawing.version}</td>
                    <td className="px-6 py-4">{drawing.date}</td>
                    <td className="px-6 py-4">{drawing.size}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1
                        ${drawing.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                          drawing.status === 'In Review' ? 'bg-orange-100 text-orange-700' :
                            'bg-slate-100 text-slate-600'}`}>
                        {drawing.status === 'Approved' && <CheckCircle size={10} />}
                        {drawing.status === 'In Review' && <AlertTriangle size={10} />}
                        {drawing.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleView(drawing)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition" title="View Details">
                          <Eye size={18} />
                        </button>
                        <button onClick={() => handleDownload(drawing.name)} className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition" title="Download">
                          <Download size={18} />
                        </button>
                        <button onClick={() => handleDelete(drawing)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition" title="Delete">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-400">
                    No drawings found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}

      {/* Upload Modal */}
      <Modal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} title="Upload New Revision">
        <div className="space-y-4">
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50 hover:bg-slate-100 transition cursor-pointer">
            <Upload className="mx-auto text-slate-400 mb-2" size={32} />
            <p className="text-sm font-medium text-slate-600">Click to upload or drag and drop</p>
            <p className="text-xs text-slate-400">PDF, DWG, DXF up to 50MB</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Drawing Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 transition"
              placeholder="e.g. A-102 First Floor Plan"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Version</label>
              <input
                type="text"
                value={formData.version}
                onChange={e => setFormData({ ...formData, version: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 transition"
                placeholder="v1.0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Discipline</label>
              <select
                value={formData.discipline}
                onChange={e => setFormData({ ...formData, discipline: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 transition"
              >
                <option>Architectural</option>
                <option>Structural</option>
                <option>Electrical</option>
                <option>Plumbing</option>
                <option>Landscape</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 transition"
            >
              <option>Draft</option>
              <option>In Review</option>
              <option>Approved</option>
            </select>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleSaveUpload}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition shadow-lg shadow-blue-200 flex items-center gap-2"
            >
              <Save size={18} /> Upload Drawing
            </button>
          </div>
        </div>
      </Modal>

      {/* View Modal */}
      <Modal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} title="Drawing Details">
        {selectedDrawing && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="bg-white p-3 rounded-lg shadow-sm text-blue-600">
                <FileText size={32} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-lg">{selectedDrawing.name}</h4>
                <p className="text-sm text-slate-500">{selectedDrawing.discipline} • {selectedDrawing.size}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <div>
                <p className="text-slate-500 mb-1">Version</p>
                <p className="font-medium text-slate-800">{selectedDrawing.version}</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">Upload Date</p>
                <p className="font-medium text-slate-800">{selectedDrawing.date}</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">Status</p>
                <span className={`px-2 py-1 rounded-full text-xs font-bold inline-block
                        ${selectedDrawing.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                    selectedDrawing.status === 'In Review' ? 'bg-orange-100 text-orange-700' :
                      'bg-slate-100 text-slate-600'}`}>
                  {selectedDrawing.status}
                </span>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <button onClick={() => handleDownload(selectedDrawing.name)} className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium flex justify-center items-center gap-2">
                <Download size={18} /> Download
              </button>
              <button onClick={() => setIsViewOpen(false)} className="flex-1 bg-slate-100 text-slate-700 py-2 rounded-lg hover:bg-slate-200 transition font-medium">
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Delete Drawing">
        <div className="text-center space-y-4">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="text-red-600" size={32} />
          </div>
          <div>
            <p className="font-medium text-slate-800">Delete this drawing revision?</p>
            <p className="text-sm text-slate-500 mt-1">
              Are you sure you want to delete <b>{selectedDrawing?.name}</b>?<br />
              This action cannot be undone.
            </p>
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <button onClick={() => setIsDeleteOpen(false)} className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition font-medium">
              Cancel
            </button>
            <button onClick={confirmDelete} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-medium shadow-lg shadow-red-200">
              Delete
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default Drawings;
