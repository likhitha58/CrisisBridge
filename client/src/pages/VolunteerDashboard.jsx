import React, { useState, useEffect } from 'react';
import { requestAPI } from '../services/api';
import { MapPin, Clock, CheckCircle2, Navigation, Search } from 'lucide-react';

const VolunteerDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Pending');

  useEffect(() => {
    fetchRequests();
  }, [filter]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await requestAPI.getAll({ status: filter });
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
    try {
      await requestAPI.accept(id);
      fetchRequests();
    } catch (err) {
      alert('Failed to accept request');
    }
  };

  const handleComplete = async (id) => {
    try {
      await requestAPI.updateStatus(id, 'Completed');
      fetchRequests();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
        <div>
          <span className="section-tag">Volunteer Hub</span>
          <h1 className="text-4xl font-black text-gray-900 mt-2">Impact Opportunities</h1>
          <p className="text-gray-500 font-medium mt-2">Find and fulfill high-priority emergency requests</p>
        </div>

        <div className="flex items-center p-1.5 bg-gray-100 rounded-[2rem] shadow-inner">
          {['Pending', 'Assigned', 'Completed'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                filter === s ? 'bg-[#123524] text-white shadow-xl' : 'text-gray-400 hover:text-[#123524]'
              }`}
            >
              {s === 'Pending' ? 'Nearby' : s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#123524]"></div>
        </div>
      ) : requests.length === 0 ? (
        <div className="card text-center py-24">
          <h3 className="text-2xl font-black text-gray-900 mb-4">No {filter.toLowerCase()} tasks</h3>
          <p className="text-gray-500 max-w-sm mx-auto">The area is currently stable or you have fulfilled all assigned tasks. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {requests.map((req) => (
            <div key={req._id} className="card card-hover flex flex-col justify-between border border-gray-50">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-[#123524]/5 text-[#123524] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border border-[#123524]/5">
                    {req.resourceType}
                  </div>
                  <span className={`text-[10px] uppercase font-black tracking-widest px-3 py-1.5 rounded-full ${
                    req.urgency === 'High' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-[#d4ff3f] text-[#123524]'
                  }`}>
                    {req.urgency} Urgency
                  </span>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-4 leading-tight">{req.description}</h3>
                <div className="space-y-3 mb-8 text-sm font-bold text-gray-400">
                  <div className="flex items-center bg-gray-50 p-3 rounded-xl">
                    <MapPin className="h-4 w-4 mr-3 text-[#123524]" />
                    {req.location}
                  </div>
                  <div className="flex items-center px-3">
                    <Clock className="h-4 w-4 mr-3" />
                    Requested by {req.userId?.name}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-50 mt-auto">
                {req.status === 'Pending' && (
                  <button 
                    onClick={() => handleAccept(req._id)}
                    className="btn-primary w-full shadow-lg shadow-[#123524]/20"
                  >
                    <Navigation className="h-4 w-4" />
                    <span>Accept Task</span>
                  </button>
                )}
                {req.status === 'Assigned' && (
                  <button 
                    onClick={() => handleComplete(req._id)}
                    className="w-full bg-[#d4ff3f] text-[#123524] rounded-full py-4 font-black uppercase text-xs tracking-[0.2em] hover:bg-[#c2ef26] flex items-center justify-center gap-2 shadow-xl shadow-[#d4ff3f]/20 transition-all active:scale-95"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Fulfill Need</span>
                  </button>
                )}
                {req.status === 'Completed' && (
                  <div className="text-center py-2 text-[#d4ff3f] font-black uppercase tracking-widest flex items-center justify-center bg-[#123524] rounded-full">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Request Fulfilled
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

export default VolunteerDashboard;
