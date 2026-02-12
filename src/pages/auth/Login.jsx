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

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const user = await login(email, password);
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

  return (
    <div className="flex min-h-screen w-full bg-[#0f172a] overflow-hidden relative">

      {/* Background with Overlay - only visible on large screens or as a full bg */}
      <div
        className="absolute inset-0 z-0 opacity-40 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1920&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)'
        }}
      />

      {/* Left Side: Branding (Hidden on mobile usually, but requested as Left Side) */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center items-start p-16 z-10 relative">
        <div className="mb-8">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 tracking-tight">
            ConstructOS
          </h1>
          <p className="text-2xl text-slate-300 mt-4 font-light tracking-wide">
            Build Smarter. Manage Better.
          </p>
        </div>
        <div className="prose prose-lg text-slate-400">
          <p>The all-in-one platform for construction management. Streamline your projects, connect your teams, and deliver with excellence.</p>
        </div>
      </div>

      {/* Right Side: Login Form (Glassmorphism) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 z-10">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 transform transition-all hover:scale-[1.01]">

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-slate-400 text-sm">Enter your credentials to access your dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all placeholder:text-slate-600"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all placeholder:text-slate-600"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-slate-400 hover:text-white cursor-pointer transition">
                <input type="checkbox" className="mr-2 w-4 h-4 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-offset-0 focus:ring-2 focus:ring-cyan-500" />
                Remember me
              </label>
              <a href="#" className="text-cyan-400 hover:text-cyan-300 transition">Forgot Password?</a>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-cyan-900/20 active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              {isSubmitting ? (
                <Loader className="animate-spin" size={20} />
              ) : (
                <>
                  Login to Account
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-700/50 text-center">
            <p className="text-slate-400 text-sm">
              Don't have an account?
              <a href="#" className="text-cyan-400 hover:text-cyan-300 font-medium ml-1 transition">Create Company Account</a>
            </p>
          </div>

          <div className="mt-4 text-xs text-center text-slate-600">
            <p>Demo Logins: super@admin, company@admin, project@team, client@portal</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
