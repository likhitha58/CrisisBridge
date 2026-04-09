import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { requestAPI } from '../services/api';
import { Clock, CheckCircle2, AlertCircle, Plus, MapPin } from 'lucide-react';

const CitizenDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await requestAPI.getAll();
        setRequests(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <Clock className="h-5 w-5 text-amber-500" />;
      case 'Assigned': return <AlertCircle className="h-5 w-5 text-blue-500" />;
      case 'Completed': return <CheckCircle2 className="h-5 w-5 text-[#d4ff3f]" />;
      default: return null;
    }
  };

  const getUrgencyBadge = (urgency) => {
    const base = "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ";
    if (urgency === 'High') return base + "bg-red-500 text-white shadow-lg shadow-red-500/20";
    if (urgency === 'Medium') return base + "bg-amber-400 text-white shadow-lg shadow-amber-500/20";
    return base + "bg-[#d4ff3f] text-[#123524]";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <span className="section-tag">Citizen Portal</span>
          <h1 className="text-4xl font-black text-gray-900 mt-2">Active Requests</h1>
          <p className="text-gray-500 font-medium mt-2">Track and manage your community support needs</p>
        </div>
        <Link to="/create-request" className="btn-accent flex items-center gap-3 px-8 shadow-xl shadow-[#d4ff3f]/20">
          <Plus className="h-5 w-5" />
          <span className="text-lg">New Request</span>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#123524]"></div>
        </div>
      ) : requests.length === 0 ? (
        <div className="card text-center py-24">
          <div className="bg-gray-50 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-8">
            <Plus className="h-10 w-10 text-gray-300" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-4">No active requests</h3>
          <p className="text-gray-500 mb-10 max-w-sm mx-auto">If you need emergency supplies or medical assistance, please create your first request.</p>
          <Link to="/create-request" className="btn-primary inline-flex px-12">Create My First Request</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {requests.map((req) => (
            <div key={req._id} className="card card-hover flex flex-col md:flex-row md:items-center justify-between group">
              <div className="flex items-start space-x-6">
                <div className={`mt-1 h-12 w-12 rounded-2xl flex items-center justify-center ${
                  req.status === 'Completed' ? 'bg-[#d4ff3f]/10' : 'bg-gray-50'
                }`}>
                  {getStatusIcon(req.status)}
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-2xl font-black text-gray-900">{req.resourceType}</h3>
                    <span className={getUrgencyBadge(req.urgency)}>{req.urgency}</span>
                  </div>
                  <p className="text-gray-500 font-medium mb-4 max-w-xl">{req.description}</p>
                  <div className="flex flex-wrap items-center gap-6 text-sm">
                    <div className="flex items-center text-gray-400 font-bold bg-gray-50 px-3 py-1 rounded-lg">
                      <MapPin className="h-4 w-4 mr-2" />
                      {req.location}
                    </div>
                    <div className="flex items-center text-gray-400 font-bold">
                      <Clock className="h-4 w-4 mr-2" />
                      {new Date(req.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 md:mt-0 flex flex-col items-end">
                <span className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest border-2 ${
                  req.status === 'Completed' ? 'bg-[#d4ff3f]/5 text-[#123524] border-[#d4ff3f]/20' : 
                  req.status === 'Assigned' ? 'bg-blue-50 text-blue-700 border-blue-100' : 
                  'bg-white text-gray-400 border-gray-100'
                }`}>
                  {req.status}
                </span>
                {req.assignedTo && (
                  <div className="flex items-center mt-3 gap-2">
                    <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-black uppercase">
                      {req.assignedTo.name.charAt(0)}
                    </div>
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-tighter">Assigned: {req.assignedTo.name}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CitizenDashboard;
