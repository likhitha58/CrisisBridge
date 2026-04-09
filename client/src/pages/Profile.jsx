import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, MapPin, Shield, Calendar, ArrowRight } from 'lucide-react';

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  const stats = [
    { label: 'Role Status', value: user.role, icon: <Shield /> },
    { label: 'Member Since', value: 'April 2024', icon: <Calendar /> },
    { label: 'Location Tracking', value: user.location, icon: <MapPin /> },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <div className="card text-center mb-12 relative overflow-hidden shadow-2xl !p-16">
        <div className="absolute top-0 left-0 w-full h-40 bg-[#123524]/5"></div>
        <div className="relative z-10">
          <div className="h-32 w-32 bg-white rounded-[2.5rem] shadow-2xl flex items-center justify-center mx-auto mb-10 text-[#123524] border-8 border-white group hover:scale-105 transition-transform">
             <User size={64} />
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-2">{user.name}</h1>
          <p className="text-gray-400 font-bold flex items-center justify-center uppercase tracking-widest text-xs">
            <Mail size={14} className="mr-2" />
            {user.email}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {stats.map((stat, i) => (
            <div key={i} className="bg-gray-50/50 rounded-[2rem] p-8 border border-gray-100 group hover:border-[#d4ff3f]/50 transition-all">
              <div className="flex justify-center mb-6 text-[#123524] transform group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-2">{stat.label}</div>
              <div className="text-lg font-black text-gray-900 tracking-tight">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card border border-gray-50 !p-12">
        <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
           <div className="w-2 h-8 bg-[#d4ff3f] rounded-full"></div>
           System Preferences
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-between p-6 rounded-[2rem] bg-gray-50 border border-gray-50 hover:bg-white hover:shadow-xl transition-all cursor-not-allowed group">
            <div>
              <div className="font-black text-gray-900 text-lg">Change Credentials</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Security Audit Required</div>
            </div>
            <ArrowRight className="text-gray-200 group-hover:text-[#123524] transition-colors" />
          </div>
          <div className="flex items-center justify-between p-6 rounded-[2rem] bg-gray-50 border border-gray-50 hover:bg-white hover:shadow-xl transition-all cursor-not-allowed group">
            <div>
              <div className="font-black text-gray-900 text-lg">Global Alerts</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">SMART Notification System</div>
            </div>
            <ArrowRight className="text-gray-200 group-hover:text-[#123524] transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
