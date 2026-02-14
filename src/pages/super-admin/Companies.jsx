import { useState } from 'react';
import { Search, Shield, Plus, Trash2, Edit, Eye, AlertTriangle, Briefcase, Calendar, DollarSign, Users } from 'lucide-react';
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Form State
  const [formData, setFormData] = useState({ name: '', plan: 'Starter', users: 1, status: 'Active', renewal: '', revenue: 0 });
  const [editingId, setEditingId] = useState(null);
  const [viewingCompany, setViewingCompany] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Filter Logic
  const filteredCompanies = companies.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus === 'All' || c.status === filterStatus)
  );

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ name: '', plan: 'Starter', users: 1, status: 'Active', renewal: '', revenue: 0 });
  };

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

  const handleDeleteClick = (id) => {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setCompanies(companies.filter(c => c.id !== deletingId));
    setIsDeleteModalOpen(false);
    setDeletingId(null);
  };

  const handleView = (company) => {
    setViewingCompany(company);
    setIsViewModalOpen(true);
  }

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ name: '', plan: 'Starter', users: 1, status: 'Active', renewal: new Date().toISOString().split('T')[0], revenue: 0 });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Companies Management</h1>
          <p className="text-slate-500 text-sm">Overview of all registered construction companies.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={openAddModal} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-500/20 font-medium transition active:scale-95">
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
            className="bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
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
                  <tr key={company.id} className="hover:bg-slate-50 transition group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 font-bold border border-slate-200 group-hover:bg-white group-hover:border-blue-200 group-hover:text-blue-600 transition">
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
                          onClick={() => handleDeleteClick(company.id)}
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
                    <div className="flex flex-col items-center justify-center">
                      <Briefcase size={48} className="text-slate-200 mb-4" />
                      <p className="text-lg font-medium text-slate-900">No companies found</p>
                      <p className="text-sm text-slate-500">Try adjusting your search or filters.</p>
                    </div>
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
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 outline-none transition"
              placeholder="e.g. Acme Construction"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Plan</label>
              <select
                value={formData.plan}
                onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 outline-none transition cursor-pointer"
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
                min="1"
                value={formData.users}
                onChange={(e) => setFormData({ ...formData, users: parseInt(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 outline-none transition"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 outline-none transition cursor-pointer"
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
                  min="0"
                  value={formData.revenue}
                  onChange={(e) => setFormData({ ...formData, revenue: parseInt(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-6 pr-2.5 py-2.5 text-slate-900 focus:border-blue-500 outline-none transition"
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
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 outline-none transition"
            />
          </div>
          <div className="flex gap-3 pt-4 border-t border-slate-100 mt-6">
            <button type="button" onClick={closeModal} className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition font-medium">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition font-medium">Save Company</button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirm Deletion">
        <div className="flex flex-col items-center justify-center p-4 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-600">
            <AlertTriangle size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Delete Company?</h3>
          <p className="text-slate-500 mb-6">
            Are you sure you want to delete this company? This action cannot be undone and will remove all associated data.
          </p>
          <div className="flex gap-3 w-full">
            <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition font-medium">Cancel</button>
            <button onClick={confirmDelete} className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition font-medium">Delete Forever</button>
          </div>
        </div>
      </Modal>

      {/* View Details Modal */}
      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Company Details">
        {viewingCompany && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center text-2xl font-bold text-blue-600 border border-slate-100 shadow-sm">
                {viewingCompany.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{viewingCompany.name}</h3>
                <p className="text-slate-500 text-sm">ID: COMP-{1000 + viewingCompany.id}</p>
              </div>
              <div className="ml-auto">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${viewingCompany.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                  viewingCompany.status === 'Past Due' ? 'bg-orange-50 text-orange-600 border-orange-200' :
                    'bg-red-50 text-red-600 border-red-200'
                  }`}>
                  {viewingCompany.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-slate-500 text-sm font-medium">
                  <Shield size={16} /> Current Plan
                </div>
                <p className="text-lg font-bold text-slate-800">{viewingCompany.plan}</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-slate-500 text-sm font-medium">
                  <Users size={16} /> Total Users
                </div>
                <p className="text-lg font-bold text-slate-800">{viewingCompany.users} Members</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-slate-500 text-sm font-medium">
                  <DollarSign size={16} /> Monthly Revenue
                </div>
                <p className="text-lg font-bold text-slate-800">${viewingCompany.revenue}/mo</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-slate-500 text-sm font-medium">
                  <Calendar size={16} /> Renewal Date
                </div>
                <p className="text-lg font-bold text-slate-800">{viewingCompany.renewal}</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button onClick={() => setIsViewModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">Close</button>
              <button onClick={() => { setIsViewModalOpen(false); handleEdit(viewingCompany); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200">Edit Company</button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default Companies;
