import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate(); // Can't use navigate here directly if provider is outside Router

  useEffect(() => {
    // Check for stored token/user on load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login logic
    // In a real app, this would be an API call

    let role = 'guest';
    let userData = { email };

    if (email.includes('super')) {
      role = 'super_admin';
      userData = { id: 1, name: 'Super Admin', role: 'super_admin', email };
    } else if (email.includes('company')) {
      role = 'company_admin';
      userData = { id: 2, name: 'Company Admin', role: 'company_admin', email, companyId: 'comp_123' };
    } else if (email.includes('project')) {
      role = 'project_manager';
      // or foreman, worker
      userData = { id: 3, name: 'Project Manager', role: 'project_manager', email, companyId: 'comp_123', projectId: 'proj_456' };
    } else if (email.includes('client')) {
      role = 'client';
      userData = { id: 4, name: 'Client User', role: 'client', email, projectId: 'proj_456' };
    } else {
      // Default fallback for demo
      role = 'company_admin';
      userData = { id: 99, name: 'Demo Admin', role: 'company_admin', email };
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', 'mock-jwt-token');

    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // window.location.href = '/login'; // Force reload or redirect
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
