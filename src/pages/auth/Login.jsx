import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Loader } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e, overrideEmail, overridePass) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    // Use overrides if provided (for quick login), otherwise use state
    const loginEmail = overrideEmail || email;
    const loginPass = overridePass || password;

    try {
      const user = await login(loginEmail, loginPass);
      // Navigate based on role
      if (user.role === 'super_admin') navigate('/super-admin');
      else if (user.role === 'company_admin') navigate('/company-admin');
      else if (user.role === 'project_manager') navigate('/project-team');
      else if (user.role === 'client') navigate('/client-portal');
      else navigate('/'); // Fallback
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const quickLogin = async (roleEmail) => {
    setEmail(roleEmail);
    setPassword('password');
    // Pass values directly to avoid waiting for state re-render
    handleLogin(null, roleEmail, 'password');
  };

  return (
    <div className="flex min-h-screen w-full bg-[#0f172a] overflow-hidden relative font-sans">

      {/* Background with Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-40 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1920&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)'
        }}
      />

      {/* Left Side: Branding */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center items-start p-16 z-10 relative">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <ArrowRight className="text-white -rotate-45" size={28} />
            </div>
            <h1 className="text-6xl font-black text-white tracking-tighter">
              Construct<span className="text-cyan-400">OS</span>
            </h1>
          </div>
          <p className="text-2xl text-slate-300 font-medium tracking-tight">
            Build Smarter. Manage Better.
          </p>
        </div>
        <div className="max-w-md space-y-6">
          <p className="text-lg text-slate-400 leading-relaxed">
            The next-generation platform for construction management. Streamline logistics, empower field teams, and satisfy clients with total transparency.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <p className="text-white font-bold text-xl">120+</p>
              <p className="text-slate-500 text-xs uppercase font-black">Active Sites</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <p className="text-white font-bold text-xl">99.9%</p>
              <p className="text-slate-500 text-xs uppercase font-black">Safety Compliance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 z-10">
        <div className="w-full max-w-md space-y-8">

          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8 transition-all">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-white mb-2">Welcome</h2>
              <p className="text-slate-400 text-sm font-medium">Access your enterprise dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950/50 border border-slate-800 text-white pl-11 pr-4 py-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all placeholder:text-slate-700 text-sm"
                    placeholder="name@company.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950/50 border border-slate-800 text-white pl-11 pr-4 py-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all placeholder:text-slate-700 text-sm"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black uppercase tracking-widest text-sm py-4 rounded-2xl shadow-xl shadow-cyan-900/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader className="animate-spin" size={20} />
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Login Section */}
            <div className="mt-10 pt-8 border-t border-white/5">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center mb-4">Quick Developer Access</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Super Admin', email: 'super@admin.com', color: 'hover:bg-purple-500/10 hover:border-purple-500/50' },
                  { label: 'Company Admin', email: 'company@admin.com', color: 'hover:bg-blue-500/10 hover:border-blue-500/50' },
                  { label: 'Project Team', email: 'project@team.com', color: 'hover:bg-emerald-500/10 hover:border-emerald-500/50' },
                  { label: 'Client Portal', email: 'client@portal.com', color: 'hover:bg-amber-500/10 hover:border-amber-500/50' },
                ].map((demo) => (
                  <button
                    key={demo.label}
                    onClick={() => quickLogin(demo.email)}
                    className={`p-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold text-slate-300 transition-all text-left group flex items-center justify-between ${demo.color}`}
                  >
                    <span>{demo.label}</span>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p className="text-center text-slate-500 text-xs font-medium">
            &copy; 2026 ConstructOS Enterprise. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
