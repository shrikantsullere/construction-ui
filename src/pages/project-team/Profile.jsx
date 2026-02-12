import { useState } from 'react';
import {
    User, Mail, Phone, MapPin,
    Shield, Key, Bell, ShieldCheck,
    Edit2, Camera, LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState(true);

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
            {/* Profile Header Card */}
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-end -mt-12 mb-6">
                        <div className="relative group">
                            <div className="w-24 h-24 rounded-full bg-blue-100 border-4 border-white flex items-center justify-center text-3xl font-black text-blue-600 shadow-lg">
                                {(user?.name || 'T M').split(' ').map(n => n[0]).join('')}
                            </div>
                            <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border border-slate-100 text-blue-600 hover:scale-110 transition">
                                <Camera size={16} />
                            </button>
                        </div>
                        <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 transition flex items-center gap-2">
                            <Edit2 size={16} /> Edit Profile
                        </button>
                    </div>

                    <div>
                        <h1 className="text-2xl font-black text-slate-800">{user?.name || 'Construct Team Member'}</h1>
                        <p className="text-slate-500 font-medium flex items-center gap-2 mt-1 uppercase tracking-wider text-xs">
                            <ShieldCheck size={14} className="text-blue-500 fill-blue-500/10" />
                            {user?.role?.replace('_', ' ') || 'Site Operative'} @ ConstructOS
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column - Details */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <User size={20} className="text-blue-600" /> Account Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-transparent hover:border-blue-100 transition">
                                    <User size={18} className="text-slate-400" />
                                    <span className="text-sm font-semibold text-slate-700">{user?.name || 'Team Member'}</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-transparent hover:border-blue-100 transition">
                                    <Mail size={18} className="text-slate-400" />
                                    <span className="text-sm font-semibold text-slate-700">{user?.email || 'worker@constructos.com'}</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</label>
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-transparent hover:border-blue-100 transition">
                                    <Phone size={18} className="text-slate-400" />
                                    <span className="text-sm font-semibold text-slate-700">+1 (555) 012-3456</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Site</label>
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-transparent hover:border-blue-100 transition">
                                    <MapPin size={18} className="text-slate-400" />
                                    <span className="text-sm font-semibold text-slate-700">Skyline Tower, Site A</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <Key size={20} className="text-blue-600" /> Security
                        </h3>
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-transparent hover:border-blue-100 transition">
                            <div className="flex items-center gap-3">
                                <Shield size={20} className="text-slate-400" />
                                <div>
                                    <p className="text-sm font-bold text-slate-700">Password</p>
                                    <p className="text-xs text-slate-400">Last changed 3 months ago</p>
                                </div>
                            </div>
                            <button className="text-xs font-black text-blue-600 uppercase tracking-widest">Change</button>
                        </div>
                    </div>
                </div>

                {/* Right Column - Settings */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <Bell size={20} className="text-blue-600" /> Preferences
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-bold text-slate-700">Push Notifications</p>
                                    <p className="text-xs text-slate-400">Receive alerts via mobile</p>
                                </div>
                                <button
                                    onClick={() => setNotifications(!notifications)}
                                    className={`w-12 h-6 rounded-full transition-all relative ${notifications ? 'bg-blue-600' : 'bg-slate-200'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notifications ? 'left-7' : 'left-1'}`}></div>
                                </button>
                            </div>
                            <div className="h-px bg-slate-100"></div>
                            <div className="flex items-center justify-between opacity-50 cursor-not-allowed">
                                <div>
                                    <p className="text-sm font-bold text-slate-700">Offline Mode</p>
                                    <p className="text-xs text-slate-400">Sync data without internet</p>
                                </div>
                                <div className="w-12 h-6 bg-slate-100 rounded-full relative">
                                    <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="w-full p-4 bg-red-50 text-red-600 font-black uppercase text-sm tracking-widest rounded-2xl flex items-center justify-center gap-3 hover:bg-red-600 hover:text-white transition-all shadow-sm">
                        <LogOut size={20} /> Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
