import { User, Bell, Lock, Globe, CreditCard } from 'lucide-react';

const Settings = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
          <p className="text-slate-500 text-sm">Manage your account and preferences.</p>
        </div>
        <button className="bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800 shadow-lg">Save Changes</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar Nav */}
        <div className="col-span-1 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 font-medium rounded-lg border border-blue-100">
            <User size={18} /> Profile
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 font-medium rounded-lg transition border border-transparent hover:border-slate-100">
            <Bell size={18} /> Notifications
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 font-medium rounded-lg transition border border-transparent hover:border-slate-100">
            <Lock size={18} /> Security
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 font-medium rounded-lg transition border border-transparent hover:border-slate-100">
            <Globe size={18} /> Company Info
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 font-medium rounded-lg transition border border-transparent hover:border-slate-100">
            <CreditCard size={18} /> Billing
          </button>
        </div>

        {/* Main Content */}
        <div className="col-span-2 space-y-6">

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-6 border-b border-slate-100 pb-2">Profile Information</h3>

            <div className="flex items-center gap-6 mb-6">
              <img src="https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff&size=128" className="w-20 h-20 rounded-full border-4 border-slate-50" />
              <div>
                <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50">Change Avatar</button>
                <p className="text-xs text-slate-400 mt-2">JPG, GIF or PNG. Max 1MB.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">First Name</label>
                <input type="text" defaultValue="John" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Last Name</label>
                <input type="text" defaultValue="Doe" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium text-slate-700 block mb-1">Email Address</label>
                <input type="email" defaultValue="john@constructos.com" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium text-slate-700 block mb-1">Role</label>
                <input type="text" defaultValue="Company Owner" disabled className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-500 cursor-not-allowed" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-800 text-sm">Email Notifications</p>
                  <p className="text-xs text-slate-500">Receive emails about new tasks and messages.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-800 text-sm">Dark Mode</p>
                  <p className="text-xs text-slate-500">Enable dark theme for the dashboard.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;
