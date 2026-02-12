import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, ClipboardList, Camera, MessageSquare, Menu, User } from 'lucide-react';

const ProjectTeamLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/project-team' },
    { icon: ClipboardList, label: 'Tasks', path: '/project-team/tasks' },
    { icon: Camera, label: 'Upload', path: '/project-team/upload' },
    { icon: MessageSquare, label: 'Chat', path: '/project-team/chat' },
    { icon: User, label: 'Profile', path: '/project-team/profile' },
  ];

  return (
    <div className="flex flex-col h-screen bg-slate-100">

      {/* Mobile Top Bar */}
      <header className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="font-bold text-lg">Project View</h1>
        <button onClick={() => logout()} className="text-xs bg-slate-700 px-2 py-1 rounded">Logout</button>
      </header>

      {/* Main Content (Scrollable) */}
      <main className="flex-1 overflow-y-auto pb-20 p-4">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around items-center p-2 pb-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition ${isActive ? 'text-blue-600' : 'text-slate-500'}`}
            >
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default ProjectTeamLayout;
