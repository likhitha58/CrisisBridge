import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UserPlus, Mail, Lock, User, MapPin, AlertCircle, ArrowRight } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Citizen',
    location: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const roles = ['Citizen', 'Volunteer', 'Hospital', 'NGO'];

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-gray-50/50">
      <div className="card w-full max-w-2xl !p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-48 h-48 bg-[#d4ff3f] opacity-5 rounded-full blur-[80px] -ml-24 -mt-24"></div>
        
        <div className="text-center mb-10">
          <span className="section-tag">Join the Mission</span>
          <h2 className="text-4xl font-black text-gray-900 mt-2">Create Account</h2>
          <p className="text-gray-400 font-medium mt-2">Choose your role in the coordination network</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-500 px-6 py-4 rounded-2xl flex items-center mb-10">
            <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
            <span className="text-sm font-bold leading-tight">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Identity / Org Name</label>
              <div className="relative">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
                <input
                  type="text"
                  required
                  className="input-field pl-14"
                  placeholder="John Doe / City Hospital"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
                <input
                  type="email"
                  required
                  className="input-field pl-14"
                  placeholder="secure@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Secure Password</label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
                <input
                  type="password"
                  required
                  className="input-field pl-14"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Current Location</label>
              <div className="relative">
                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
                <input
                  type="text"
                  required
                  className="input-field pl-14"
                  placeholder="Dhaka, Bangladesh"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-4 ml-1">Select Your Account Type</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {roles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setFormData({ ...formData, role })}
                  className={`py-4 text-xs font-black uppercase tracking-widest rounded-2xl border-2 transition-all ${
                    formData.role === role
                      ? 'bg-[#123524] border-[#123524] text-white shadow-xl shadow-[#123524]/20'
                      : 'bg-white border-gray-100 text-gray-400 hover:border-[#123524]/20 hover:text-[#123524]'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn-primary w-full py-5 rounded-[1.5rem] mt-6 flex items-center justify-center gap-3 shadow-xl ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            <span className="text-lg">{loading ? 'Creating Profile...' : 'Finalize Registration'}</span>
            {!loading && <ArrowRight className="h-5 w-5" />}
          </button>
        </form>

        <p className="text-center mt-12 text-sm text-gray-500 font-medium">
          Already a member?{' '}
          <Link to="/login" className="text-[#123524] font-black hover:underline underline-offset-4 decoration-[#d4ff3f] decoration-4">
            Login now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
