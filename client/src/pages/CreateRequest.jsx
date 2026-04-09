import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestAPI } from '../services/api';
import { Send, MapPin, Type, Info, AlertTriangle } from 'lucide-react';

const CreateRequest = () => {
  const [formData, setFormData] = useState({
    resourceType: 'Food',
    description: '',
    location: '',
    urgency: 'Medium'
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await requestAPI.create(formData);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to create request');
    } finally {
      setLoading(false);
    }
  };

  const resourceTypes = ['Blood', 'Food', 'Medicine', 'Shelter'];
  const urgencyLevels = ['Low', 'Medium', 'High'];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="card">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-primary/10 p-3 rounded-xl">
            <Send className="text-primary h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Request Emergency Help</h1>
            <p className="text-gray-500">Provide details about the resources you need</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <Type className="h-4 w-4 mr-2 text-gray-400" />
                Resource Type
              </label>
              <select
                className="input-field appearance-none bg-white"
                value={formData.resourceType}
                onChange={(e) => setFormData({ ...formData, resourceType: e.target.value })}
              >
                {resourceTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-gray-400" />
                Urgency Level
              </label>
              <div className="flex space-x-2">
                {urgencyLevels.map(level => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData({ ...formData, urgency: level })}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg border-2 transition-all ${
                      formData.urgency === level
                        ? level === 'High' ? 'bg-red-500 border-red-500 text-white' : 
                          level === 'Medium' ? 'bg-amber-500 border-amber-500 text-white' : 
                          'bg-green-500 border-green-500 text-white'
                        : 'bg-white border-gray-100 text-gray-600'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
              Delivery Location
            </label>
            <input
              type="text"
              required
              className="input-field"
              placeholder="Full address or nearby landmark"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <Info className="h-4 w-4 mr-2 text-gray-400" />
              Detailed Description
            </label>
            <textarea
              required
              rows="4"
              className="input-field resize-none"
              placeholder="Ex: Need O+ blood for surgery, required in 2 hours..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-gray-500 font-medium hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`btn-primary px-10 py-3 shadow-lg shadow-primary/20 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Submitting...' : 'Post Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRequest;
