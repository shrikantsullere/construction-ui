import { useState } from 'react';
import { Search, Shield, Plus, Trash2, Edit, UserCheck, Power, LogIn, Eye } from 'lucide-react';
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
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this company?')) {
      setCompanies(companies.filter(c => c.id !== id));
    }
  };

  const handleImpersonate = (company) => {
    alert(`Impersonating ${company.name} admin...`);
  };

  const handleToggleStatus = (company) => {
    const newStatus = company.status === 'Active' ? 'Suspended' : 'Active';
    if (confirm(`Are you sure you want to ${newStatus === 'Active' ? 'activate' : 'suspend'} ${company.name}?`)) {
      setCompanies(companies.map(c => c.id === company.id ? { ...c, status: newStatus } : c));
    }
  }

  const handleView = (company) => {
    alert(`Viewing details for ${company.name}`);
  }

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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Companies Management</h1>
          <p className="text-slate-500 text-sm">Overview of all registered construction companies.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={openAddModal} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-500/20 font-medium">
            <Plus size={18} /> Add Company
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm min-h-[400px]">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between bg-white">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Past Due">Past Due</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Company Name</th>
                <th className="px-6 py-4">Current Plan</th>
                <th className="px-6 py-4">Users</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Renewal Date</th>
                <th className="px-6 py-4">Monthly Rev.</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company) => (
                  <tr key={company.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 font-bold border border-slate-200">
                          {company.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{company.name}</p>
                          <p className="text-xs text-slate-500">ID: COMP-{1000 + company.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Shield size={14} className={company.plan === 'Enterprise' ? 'text-purple-600' : 'text-blue-600'} />
                        <span className="text-slate-700">{company.plan}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{company.users}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold flex w-fit items-center gap-1
                        ${company.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                          company.status === 'Past Due' ? 'bg-orange-50 text-orange-600 border border-orange-200' :
                            company.status === 'Suspended' ? 'bg-slate-100 text-slate-500 border border-slate-200' :
                              'bg-red-50 text-red-600 border border-red-200'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${company.status === 'Active' ? 'bg-emerald-500' :
                          company.status === 'Past Due' ? 'bg-orange-500' :
                            company.status === 'Suspended' ? 'bg-slate-400' :
                              'bg-red-500'
                          }`}></span>
                        {company.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{company.renewal}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">${company.revenue}/mo</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleView(company)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleEdit(company)}
                          className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(company.id)}
                          className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
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
            <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 outline-none"
              placeholder="e.g. Acme Construction"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Plan</label>
              <select
                value={formData.plan}
                onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 outline-none"
              >
                <option>Starter</option>
                <option>Pro</option>
                <option>Enterprise</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Users</label>
              <input
                type="number"
                value={formData.users}
                onChange={(e) => setFormData({ ...formData, users: parseInt(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 outline-none"
              >
                <option>Active</option>
                <option>Past Due</option>
                <option>Cancelled</option>
                <option>Suspended</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Cost</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-500">$</span>
                <input
                  type="number"
                  value={formData.revenue}
                  onChange={(e) => setFormData({ ...formData, revenue: parseInt(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-6 pr-2.5 py-2.5 text-slate-900 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Renewal Date</label>
            <input
              type="date"
              value={formData.renewal}
              onChange={(e) => setFormData({ ...formData, renewal: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 outline-none"
            />
          </div>
          <div className="flex gap-3 pt-4 border-t border-slate-100 mt-6">
            <button type="button" onClick={closeModal} className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition font-medium">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition font-medium">Save Company</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Companies;
