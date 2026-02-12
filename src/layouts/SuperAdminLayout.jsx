import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, LayoutDashboard, Building, Users, CreditCard, Settings, Ticket, LogOut } from 'lucide-react';

const SuperAdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Super Admin
          </h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/super-admin" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-slate-700 transition">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/super-admin/companies" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-slate-700 transition">
            <Building size={20} /> Companies
          </Link>
          <Link to="/super-admin/subscriptions" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-slate-700 transition">
            <CreditCard size={20} /> Subscriptions
          </Link>
          <Link to="/super-admin/tickets" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-slate-700 transition">
            <Ticket size={20} /> Support Tickets
          </Link>
          <Link to="/super-admin/settings" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-slate-700 transition">
            <Settings size={20} /> Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-700">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2 text-red-400 hover:bg-slate-700 rounded transition">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-slate-900 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default SuperAdminLayout;
