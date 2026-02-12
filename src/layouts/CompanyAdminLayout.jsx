import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect, useRef } from 'react';
import {
  Building2, LayoutDashboard, Briefcase, Calendar,
  Camera, FileText, AlertCircle, Receipt,
  MessageSquare, Users, Settings, LogOut, Menu, X
} from 'lucide-react';

const CompanyAdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  // Close sidebar on route change for mobile
  useEffect(() => {
    setIsSidebarOpen(false);
    setIsProfileMenuOpen(false);
  }, [location.pathname]);

  // keydown esc to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setIsProfileMenuOpen(false);
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Click outside to close profile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/company-admin' },
    { icon: Briefcase, label: 'Projects', path: '/company-admin/projects' },
    { icon: Calendar, label: 'Scheduling', path: '/company-admin/schedule' },
    { icon: Camera, label: 'Photos', path: '/company-admin/photos' },
    { icon: FileText, label: 'Drawings', path: '/company-admin/drawings' },
    { icon: AlertCircle, label: 'Issues', path: '/company-admin/issues' },
    { icon: Receipt, label: 'Estimates', path: '/company-admin/estimates' },
    { icon: MessageSquare, label: 'Communication', path: '/company-admin/chat' },
    { icon: Users, label: 'Team', path: '/company-admin/team' },
    { icon: Settings, label: 'Settings', path: '/company-admin/settings' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white flex flex-col shadow-xl transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2 text-sky-400">
              <Building2 className="w-6 h-6" />
              ConstructOS
            </h1>
            <p className="text-xs text-slate-400 mt-1">Company Admin</p>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium
                  ${isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }
                `}
              >
                <item.icon size={18} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2 text-red-400 hover:bg-slate-800 rounded-lg transition text-sm">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">

        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shadow-sm z-10 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden text-slate-600 hover:text-slate-900"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-semibold text-slate-800">Overview</h2>
          </div>
          <div className="flex items-center gap-4 relative" ref={profileMenuRef}>
            {/* User Profile */}
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-3 hover:bg-slate-50 p-2 rounded-lg transition"
            >
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-slate-900">John Doe</div>
                <div className="text-xs text-slate-500">Company Owner</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border-2 border-white shadow-sm">
                JD
              </div>
            </button>

            {/* Profile Dropdown */}
            {isProfileMenuOpen && (
              <div className="absolute top-16 right-0 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-fade-in">
                <div className="px-4 py-3 border-b border-slate-100 sm:hidden">
                  <p className="text-sm font-medium text-slate-900">John Doe</p>
                  <p className="text-xs text-slate-500">Company Owner</p>
                </div>
                <button
                  onClick={() => { navigate('/company-admin/settings'); setIsProfileMenuOpen(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <Settings size={16} /> Profile Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-slate-50 scroll-smooth">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default CompanyAdminLayout;
