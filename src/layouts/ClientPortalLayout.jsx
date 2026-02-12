import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PieChart, Clock, Image, FileCheck, DollarSign, MessageCircle, LogOut } from 'lucide-react';

const ClientPortalLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Client Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            C
          </div>
          <div>
            <h1 className="font-bold text-slate-800">Client Portal</h1>
            <p className="text-xs text-slate-500">View Only Access</p>
          </div>
        </div>
        <button onClick={() => logout()} className="flex items-center gap-2 text-slate-600 hover:text-red-500 transition text-sm font-medium">
          <LogOut size={18} /> Sign Out
        </button>
      </header>

      <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Sidebar Menu for Client */}
        <aside className="hidden lg:block lg:col-span-1 bg-white rounded-xl shadow-sm border border-slate-100 p-4 h-fit sticky top-6">
          <nav className="space-y-1">
            <Link to="/client-portal" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-700 font-medium">
              <PieChart size={20} /> Project Overview
            </Link>
            <Link to="/client-portal/timeline" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition font-medium">
              <Clock size={20} /> Timeline
            </Link>
            <Link to="/client-portal/photos" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition font-medium">
              <Image size={20} /> Photos
            </Link>
            <Link to="/client-portal/approvals" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition font-medium">
              <FileCheck size={20} /> Approvals
            </Link>
            <Link to="/client-portal/invoices" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition font-medium">
              <DollarSign size={20} /> Invoices
            </Link>
            <Link to="/client-portal/messages" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition font-medium">
              <MessageCircle size={20} /> Messages
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ClientPortalLayout;
