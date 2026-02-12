import { useState } from 'react';
import { Search, MoreVertical, Shield, Filter, Download, Plus, Trash2, Edit, X } from 'lucide-react';
import Modal from '../../components/Modal';

const Companies = () => {
  const [companies, setCompanies] = useState([
    { id: 1, name: 'Apex Construction', plan: 'Enterprise', users: 45, status: 'Active', renewal: '2026-03-12', revenue: 2500 },
    { id: 2, name: 'BuildRight Inc.', plan: 'Pro', users: 12, status: 'Active', renewal: '2026-02-28', revenue: 850 },
    { id: 3, name: 'Miller Homes', plan: 'Starter', users: 5, status: 'Past Due', renewal: '2026-01-15', revenue: 250 },
    { id: 4, name: 'SkyHigh Developers', plan: 'Enterprise', users: 80, status: 'Active', renewal: '2026-04-05', revenue: 3200 },
    { id: 5, name: 'Urban Architects', plan: 'Pro', users: 22, status: 'Cancelled', renewal: '2025-12-20', revenue: 0 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [menuOpenId, setMenuOpenId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({ name: '', plan: 'Starter', users: 1, status: 'Active', renewal: '', revenue: 0 });
  const [editingId, setEditingId] = useState(null);

  // Filter Logic
  const filteredCompanies = companies.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus === 'All' || c.status === filterStatus)
  );

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      setCompanies(companies.map(c => c.id === editingId ? { ...c, ...formData } : c));
    } else {
      setCompanies([...companies, { id: Date.now(), ...formData }]);
    }
    closeModal();
  };

  const handleEdit = (company) => {
    setEditingId(company.id);
    setFormData(company);
    setIsModalOpen(true);
    setMenuOpenId(null);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this company?')) {
      setCompanies(companies.filter(c => c.id !== id));
    }
    setMenuOpenId(null);
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ name: '', plan: 'Starter', users: 1, status: 'Active', renewal: new Date().toISOString().split('T')[0], revenue: 0 });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  return (
    <div className="space-y-6" onClick={() => setMenuOpenId(null)}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Companies Management</h1>
          <p className="text-slate-400 text-sm">Overview of all registered construction companies.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => alert("Exporting data to CSV...")} className="flex items-center gap-2 bg-slate-800 text-slate-300 border border-slate-700 px-4 py-2 rounded-lg hover:bg-slate-700 transition font-medium">
            <Download size={18} /> Export
          </button>
          <button onClick={openAddModal} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-500/20 font-medium">
            <Plus size={18} /> Add Company
          </button>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-xl min-h-[400px]">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-700 flex flex-col md:flex-row gap-4 justify-between bg-slate-800/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 text-slate-500" size={20} />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-300 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Past Due">Past Due</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-slate-900 text-slate-200 font-semibold border-b border-slate-700">
              <tr>
                <th className="px-6 py-4">Company Name</th>
                <th className="px-6 py-4">Current Plan</th>
                <th className="px-6 py-4">Users</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Renewal Date</th>
                <th className="px-6 py-4">Monthly Rev.</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company) => (
                  <tr key={company.id} className="hover:bg-slate-700/50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-slate-300 font-bold border border-slate-600">
                          {company.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{company.name}</p>
                          <p className="text-xs text-slate-500">ID: COMP-{1000 + company.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Shield size={14} className={company.plan === 'Enterprise' ? 'text-purple-400' : 'text-blue-400'} />
                        <span className="text-slate-300">{company.plan}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{company.users}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold flex w-fit items-center gap-1
                        ${company.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          company.status === 'Past Due' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                            'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${company.status === 'Active' ? 'bg-emerald-400' :
                          company.status === 'Past Due' ? 'bg-orange-400' :
                            'bg-red-400'
                          }`}></span>
                        {company.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{company.renewal}</td>
                    <td className="px-6 py-4 font-medium text-white">${company.revenue}/mo</td>
                    <td className="px-6 py-4 text-right relative">
                      <button
                        onClick={(e) => { e.stopPropagation(); setMenuOpenId(menuOpenId === company.id ? null : company.id); }}
                        className="text-slate-500 hover:text-white p-2 hover:bg-slate-600 rounded-lg transition"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {/* Dropdown Menu */}
                      {menuOpenId === company.id && (
                        <div className="absolute right-10 top-8 w-32 bg-slate-800 border border-slate-600 rounded-lg shadow-xl z-10 overflow-hidden animate-fade-in">
                          <button onClick={() => handleEdit(company)} className="w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white flex items-center gap-2 text-sm">
                            <Edit size={14} /> Edit
                          </button>
                          <button onClick={() => handleDelete(company.id)} className="w-full text-left px-4 py-2 text-red-400 hover:bg-slate-700 hover:text-red-300 flex items-center gap-2 text-sm">
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-slate-500">
                    No companies found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingId ? "Edit Company" : "Add New Company"}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Company Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-white focus:border-blue-500 outline-none"
              placeholder="e.g. Acme Construction"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Plan</label>
              <select
                value={formData.plan}
                onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-white focus:border-blue-500 outline-none"
              >
                <option>Starter</option>
                <option>Pro</option>
                <option>Enterprise</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Users</label>
              <input
                type="number"
                value={formData.users}
                onChange={(e) => setFormData({ ...formData, users: parseInt(e.target.value) })}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-white focus:border-blue-500 outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-white focus:border-blue-500 outline-none"
              >
                <option>Active</option>
                <option>Past Due</option>
                <option>Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Monthly Cost</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-500">$</span>
                <input
                  type="number"
                  value={formData.revenue}
                  onChange={(e) => setFormData({ ...formData, revenue: parseInt(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg pl-6 pr-2.5 py-2.5 text-white focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Renewal Date</label>
            <input
              type="date"
              value={formData.renewal}
              onChange={(e) => setFormData({ ...formData, renewal: e.target.value })}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-white focus:border-blue-500 outline-none"
            />
          </div>
          <div className="flex gap-3 pt-4 border-t border-slate-700 mt-6">
            <button type="button" onClick={closeModal} className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition font-medium">Save Company</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Companies;
