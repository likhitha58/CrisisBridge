import React, { useState, useEffect } from 'react';
import { userAPI, requestAPI } from '../services/api';
import { Users, FileText, Trash2, ShieldCheck, UserX } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'users') {
        const res = await userAPI.getUsers();
        setUsers(res.data);
      } else {
        const res = await requestAPI.getAll();
        setRequests(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Confirm user deletion? This action is permanent.')) {
      try {
        await userAPI.deleteUser(id);
        fetchData();
      } catch (err) {
        alert('Failed to delete user');
      }
    }
  };

  const handleDeleteRequest = async (id) => {
    if (window.confirm('Delete this request?')) {
      try {
        await requestAPI.delete(id);
        fetchData();
      } catch (err) {
        alert('Failed to delete request');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-[#123524] text-white rounded-[3rem] p-12 md:p-16 mb-16 relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <ShieldCheck className="h-12 w-12 text-[#d4ff3f]" />
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">System Control</h1>
          </div>
          <p className="text-white/60 font-medium text-lg max-w-lg">Global surveillance of users, resource requests, and mission coordination logs.</p>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4ff3f] opacity-5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
      </div>

      <div className="flex gap-4 mb-12">
        {[
          { id: 'users', label: 'User Directory', icon: <Users /> },
          { id: 'requests', label: 'Registry Logs', icon: <FileText /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest transition-all ${
              activeTab === tab.id ? 'bg-[#d4ff3f] text-[#123524] shadow-xl shadow-[#d4ff3f]/20' : 'bg-white text-gray-400 hover:text-[#123524]'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="card !p-0 overflow-hidden shadow-2xl border border-gray-50">
        {loading ? (
          <div className="py-24 flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#123524]"></div></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              {activeTab === 'users' ? (
                <>
                  <thead className="bg-gray-50/50 text-gray-400 text-[10px] uppercase font-black tracking-[0.2em]">
                    <tr>
                      <th className="px-10 py-6">Coordinator Identity</th>
                      <th className="px-10 py-6">System Role</th>
                      <th className="px-10 py-6">Assigned Station</th>
                      <th className="px-10 py-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {users.map(user => (
                      <tr key={user._id} className="hover:bg-gray-50/30 transition-colors">
                        <td className="px-10 py-8">
                          <div className="font-black text-gray-900 text-lg">{user.name}</div>
                          <div className="text-sm font-bold text-gray-300 tracking-tight">{user.email}</div>
                        </td>
                        <td className="px-10 py-8">
                          <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                            user.role === 'Admin' ? 'bg-[#123524] text-white' : 'bg-[#d4ff3f] text-[#123524]'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-10 py-8 font-bold text-gray-500">{user.location}</td>
                        <td className="px-10 py-8 text-right">
                          {user.role !== 'Admin' && (
                            <button onClick={() => handleDeleteUser(user._id)} className="text-gray-200 hover:text-red-500 transition-all">
                              <UserX className="h-6 w-6" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              ) : (
                <>
                  <thead className="bg-gray-50/50 text-gray-400 text-[10px] uppercase font-black tracking-[0.2em]">
                    <tr>
                      <th className="px-10 py-6">Request Type</th>
                      <th className="px-10 py-6">Requester Entity</th>
                      <th className="px-10 py-6">Priority Level</th>
                      <th className="px-10 py-6">Task Status</th>
                      <th className="px-10 py-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {requests.map(req => (
                      <tr key={req._id} className="hover:bg-gray-50/30 transition-colors">
                        <td className="px-10 py-8">
                          <div className="font-black text-[#123524] text-lg">{req.resourceType}</div>
                          <div className="text-xs font-medium text-gray-400 truncate w-48">{req.description}</div>
                        </td>
                        <td className="px-10 py-8 font-black text-gray-700">{req.userId?.name}</td>
                        <td className="px-10 py-8">
                          <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${
                            req.urgency === 'High' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-gray-100 text-gray-500'
                          }`}>
                            {req.urgency}
                          </span>
                        </td>
                        <td className="px-10 py-8">
                          <span className="font-black text-sm text-gray-300 uppercase italic tracking-tighter">{req.status}</span>
                        </td>
                        <td className="px-10 py-8 text-right">
                          <button onClick={() => handleDeleteRequest(req._id)} className="text-gray-200 hover:text-red-500 transition-all">
                            <Trash2 className="h-6 w-6" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
