import { FileText, Eye, Download, Search } from 'lucide-react';

const Drawings = () => {
  const drawings = [
    { id: 1, name: 'A-101 Ground Floor Plan', version: 'v3.0', date: 'Feb 10, 2026', size: '2.4 MB', status: 'Approved' },
    { id: 2, name: 'S-201 Structural Layout', version: 'v2.1', date: 'Feb 08, 2026', size: '4.1 MB', status: 'In Review' },
    { id: 3, name: 'E-301 Electrical Schematics', version: 'v1.0', date: 'Jan 25, 2026', size: '1.8 MB', status: 'Draft' },
    { id: 4, name: 'P-401 Plumbing Routing', version: 'v1.2', date: 'Jan 20, 2026', size: '3.2 MB', status: 'Approved' },
    { id: 5, name: 'L-501 Landscape Details', version: 'v2.0', date: 'Dec 15, 2025', size: '5.5 MB', status: 'Approved' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Drawings & Blueprints</h1>
          <p className="text-slate-500 text-sm">Manage latest revisions and architectural plans.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200">
          Upload Revision
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="p-4 border-b border-slate-50 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={20} />
            <input type="text" placeholder="Search drawings..." className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-lg text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <select className="bg-white border border-slate-200 rounded-lg px-4 text-sm text-slate-600">
            <option>All Disciplines</option>
            <option>Architectural</option>
            <option>Structural</option>
            <option>Electrical</option>
          </select>
        </div>

        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-semibold">
            <tr>
              <th className="px-6 py-4">Drawing Name</th>
              <th className="px-6 py-4">Version</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Size</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {drawings.map((drawing) => (
              <tr key={drawing.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-50 p-2 rounded text-blue-600">
                      <FileText size={20} />
                    </div>
                    <span className="font-semibold text-slate-800">{drawing.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-500">{drawing.version}</td>
                <td className="px-6 py-4">{drawing.date}</td>
                <td className="px-6 py-4">{drawing.size}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold 
                    ${drawing.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                      drawing.status === 'In Review' ? 'bg-orange-100 text-orange-700' :
                        'bg-slate-100 text-slate-600'}`}>
                    {drawing.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded hover:bg-blue-50 transition">
                      <Eye size={18} />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded hover:bg-blue-50 transition">
                      <Download size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Drawings;
