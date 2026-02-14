import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import SuperAdminLayout from './layouts/SuperAdminLayout';
import CompanyAdminLayout from './layouts/CompanyAdminLayout';
import ProjectTeamLayout from './layouts/ProjectTeamLayout';
import ClientPortalLayout from './layouts/ClientPortalLayout';
import { useAuth } from './context/AuthContext';
import ComingSoon from './components/ComingSoon';

// Import Real Pages
import SuperAdminDashboard from './pages/super-admin/Dashboard';
import SuperAdminCompanies from './pages/super-admin/Companies';
import SuperAdminSubscriptions from './pages/super-admin/Subscriptions';
import SuperAdminRevenue from './pages/super-admin/Revenue';
import SuperAdminTickets from './pages/super-admin/SupportTickets';
import SuperAdminSettings from './pages/super-admin/Settings';

import CompanyAdminDashboard from './pages/company-admin/Dashboard';
import Projects from './pages/company-admin/Projects';
import ProjectDetails from './pages/company-admin/ProjectDetails';
import Team from './pages/company-admin/Team';
import Schedule from './pages/company-admin/Schedule';
import Photos from './pages/company-admin/Photos';
import Drawings from './pages/company-admin/Drawings';
import Issues from './pages/company-admin/Issues';
import Estimates from './pages/company-admin/Estimates';
import Chat from './pages/company-admin/Chat';
import Settings from './pages/company-admin/Settings';

import ProjectTeamHome from './pages/project-team/Home';
import UploadPage from './pages/project-team/Upload';
import TasksPage from './pages/project-team/Tasks';
import ProjectTeamChat from './pages/project-team/Chat';
import ProjectTeamProfile from './pages/project-team/Profile';

import ClientPortalDashboard from './pages/client-portal/Dashboard';
import ClientTimeline from './pages/client-portal/Timeline';
import ClientPhotos from './pages/client-portal/Photos';
import ClientApprovals from './pages/client-portal/Approvals';
import ClientInvoices from './pages/client-portal/Invoices';
import ClientMessages from './pages/client-portal/Messages';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="flex h-screen items-center justify-center bg-slate-900 text-white font-black tracking-widest uppercase animate-pulse">Constructing...</div>;
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Super Admin Routes */}
      <Route
        path="/super-admin"
        element={
          <ProtectedRoute allowedRoles={['super_admin']}>
            <SuperAdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<SuperAdminDashboard />} />
        <Route path="companies" element={<SuperAdminCompanies />} />
        <Route path="subscriptions" element={<SuperAdminSubscriptions />} />
        <Route path="revenue" element={<SuperAdminRevenue />} />
        <Route path="tickets" element={<SuperAdminTickets />} />
        <Route path="settings" element={<SuperAdminSettings />} />
        <Route path="*" element={<ComingSoon title="Super Admin Module" />} />
      </Route>

      {/* Company Admin Routes */}
      <Route
        path="/company-admin"
        element={
          <ProtectedRoute allowedRoles={['company_admin']}>
            <CompanyAdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<CompanyAdminDashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:id" element={<ProjectDetails />} />
        <Route path="team" element={<Team />} />

        <Route path="schedule" element={<Schedule />} />
        <Route path="photos" element={<Photos />} />
        <Route path="drawings" element={<Drawings />} />
        <Route path="issues" element={<Issues />} />
        <Route path="estimates" element={<Estimates />} />
        <Route path="chat" element={<Chat />} />
        <Route path="settings" element={<Settings />} />

        <Route path="*" element={<ComingSoon title="Module Not Found" />} />
      </Route>

      {/* Project Team Routes */}
      <Route
        path="/project-team"
        element={
          <ProtectedRoute allowedRoles={['project_manager', 'foreman', 'worker']}>
            <ProjectTeamLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ProjectTeamHome />} />
        <Route path="upload" element={<UploadPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="chat" element={<ProjectTeamChat />} />
        <Route path="profile" element={<ProjectTeamProfile />} />
        <Route path="files" element={<ComingSoon title="Project Files" description="Access important project documents on the go." />} />
      </Route>

      {/* Client Portal Routes */}
      <Route
        path="/client-portal"
        element={
          <ProtectedRoute allowedRoles={['client']}>
            <ClientPortalLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ClientPortalDashboard />} />
        <Route path="timeline" element={<ClientTimeline />} />
        <Route path="photos" element={<ClientPhotos />} />
        <Route path="approvals" element={<ClientApprovals />} />
        <Route path="invoices" element={<ClientInvoices />} />
        <Route path="messages" element={<ClientMessages />} />
        <Route path="profile" element={<ProjectTeamProfile />} />
      </Route>

    </Routes>
  );
}

export default App;
