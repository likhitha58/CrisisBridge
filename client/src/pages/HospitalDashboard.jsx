import React, { useState, useEffect } from 'react';
import { resourceAPI, requestAPI } from '../services/api';
import { Plus, Package, MapPin, Trash2, CheckSquare } from 'lucide-react';

const HospitalDashboard = () => {
  const [resources, setResources] = useState([]);
  const [requests, setRequests] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newResource, setNewResource] = useState({ resourceType: 'Blood', quantity: '', location: '' });

  useEffect(() => {
    fetchResources();
    fetchRequests();
  }, []);

  const fetchResources = async () => {
    try {
      const res = await resourceAPI.getAll();
      setResources(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await requestAPI.getAll();
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddResource = async (e) => {
    e.preventDefault();
    try {
      await resourceAPI.add(newResource);
      setShowAddModal(false);
      setNewResource({ resourceType: 'Blood', quantity: '', location: '' });
      fetchResources();
    } catch (err) {
      alert('Failed to add resource');
    }
  };

  const handleDeleteResource = async (id) => {
    if (window.confirm('Are you sure you want to remove this resource?')) {
      try {
        await resourceAPI.delete(id);
        fetchResources();
      } catch (err) {
        alert('Failed to delete resource');
      }
    }
  };

  const resourceTypes = ['Blood', 'Food', 'Medicine', 'Shelter'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <span className="section-tag">Organization Portal</span>
          <h1 className="text-4xl font-black text-gray-900 mt-2">Inventory Management</h1>
          <p className="text-gray-500 font-medium mt-2">Manage live resource availability for regional response</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-accent flex items-center gap-3 px-8 shadow-xl shadow-[#d4ff3f]/20"
        >
          <Plus className="h-5 w-5" />
          <span className="text-lg">Update Stock</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Resource Management Table */}
        <div className="lg:col-span-2">
          <div className="card !p-0 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-white">
              <h2 className="text-2xl font-black flex items-center gap-3">
                <div className="bg-[#123524]/5 p-2 rounded-xl text-[#123524]">
                  <Package className="h-5 w-5" />
                </div>
                Live Inventory
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-gray-400 text-[10px] uppercase font-black tracking-[0.2em]">
                  <tr>
                    <th className="px-8 py-5">Resource Type</th>
                    <th className="px-8 py-5">Quantity</th>
                    <th className="px-8 py-5">Location</th>
                    <th className="px-8 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {resources.map((res) => (
                    <tr key={res._id} className="hover:bg-gray-50/30 transition-colors group">
                      <td className="px-8 py-6 font-black text-gray-900 text-lg">{res.resourceType}</td>
                      <td className="px-8 py-6">
                        <span className="text-gray-600 font-bold bg-gray-50 px-3 py-1 rounded-lg">{res.quantity} units</span>
                      </td>
                      <td className="px-8 py-6 text-gray-500 font-medium">{res.location}</td>
                      <td className="px-8 py-6 text-right">
                        <button onClick={() => handleDeleteResource(res._id)} className="text-gray-300 hover:text-red-500 transition-all transform hover:scale-110">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {resources.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-8 py-20 text-center">
                         <div className="text-gray-300 font-black uppercase text-xs tracking-widest">Global inventory is empty</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Global Tracker Sidebar */}
        <div className="space-y-8">
          <div className="card border border-gray-50">
            <h2 className="text-xl font-black mb-8 flex items-center gap-3 underline decoration-[#d4ff3f] decoration-4 underline-offset-8">
              Regional Needs
            </h2>
            <div className="space-y-6">
              {requests.slice(0, 4).map((req) => (
                <div key={req._id} className="p-6 rounded-[1.5rem] bg-gray-50/50 border border-gray-100 hover:border-[#d4ff3f]/50 transition-all cursor-default">
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-black text-gray-900 tracking-tight">{req.resourceType}</span>
                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${
                      req.urgency === 'High' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {req.urgency}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs font-medium line-clamp-2 leading-relaxed mb-4">{req.description}</p>
                  <div className="flex items-center text-gray-300 text-[10px] font-black uppercase tracking-widest">
                    <MapPin className="h-3 w-3 mr-2" />
                    {req.location}
                  </div>
                </div>
              ))}
              {requests.length === 0 && <p className="text-gray-400 text-center py-10 text-xs uppercase font-black">No active regional needs</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Add Resource Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#123524]/40 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] p-10 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="text-center mb-10">
              <span className="section-tag">Update Inventory</span>
              <h2 className="text-3xl font-black text-gray-900 mt-2">New Entry</h2>
            </div>
            
            <form onSubmit={handleAddResource} className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Supply Type</label>
                <select 
                  className="input-field appearance-none"
                  value={newResource.resourceType}
                  onChange={(e) => setNewResource({ ...newResource, resourceType: e.target.value })}
                >
                  {resourceTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Total Available</label>
                <input 
                  type="number" 
                  required
                  className="input-field"
                  placeholder="Ex: 100"
                  value={newResource.quantity}
                  onChange={(e) => setNewResource({ ...newResource, quantity: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Pickup Station</label>
                <input 
                  type="text" 
                  required
                  className="input-field"
                  placeholder="Zone-B, Logistics Center"
                  value={newResource.location}
                  onChange={(e) => setNewResource({ ...newResource, location: e.target.value })}
                />
              </div>
              <div className="flex gap-4 pt-6">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 btn-outline">Discard</button>
                <button type="submit" className="flex-1 btn-primary">Confirm</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalDashboard;
