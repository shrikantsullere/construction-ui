import { Save, Lock } from 'lucide-react';
import { useState } from 'react';

const SuperAdminSettings = () => {
  const [profile, setProfile] = useState({
    name: 'Super Admin',
    email: 'admin@constructos.com',
    role: 'Synthetix Overlord'
  });
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleProfileSave = (e) => {
    e.preventDefault();
    alert("Profile details updated successfully.");
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      alert("New passwords do not match.");
      return;
    }
    alert("Password reset successfully.");
    setPassword({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
        <p className="text-slate-400 text-sm">Update your personal information and security credentials.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="font-bold text-white mb-6 border-b border-slate-700 pb-4">Personal Details</h3>
          <form onSubmit={handleProfileSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Display Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Role</label>
                <input
                  type="text"
                  value={profile.role}
                  disabled
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-2.5 text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <div className="flex justify-end pt-2">
              <button type="submit" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg font-medium transition shadow-lg shadow-blue-900/20">
                <Save size={18} /> Update Details
              </button>
            </div>
          </form>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="font-bold text-white mb-6 border-b border-slate-700 pb-4 flex items-center gap-2">
            <Lock size={20} className="text-blue-400" /> Security
          </h3>
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Current Password</label>
              <input
                type="password"
                value={password.current}
                onChange={(e) => setPassword({ ...password, current: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">New Password</label>
                <input
                  type="password"
                  value={password.new}
                  onChange={(e) => setPassword({ ...password, new: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={password.confirm}
                  onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500 transition"
                />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button type="submit" className="bg-slate-700 hover:bg-slate-600 text-white px-5 py-2 rounded-lg font-medium transition border border-slate-600">
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminSettings;
