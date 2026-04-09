import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogIn, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to login. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-gray-50/50">
      <div className="card w-full max-w-md !p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4ff3f] opacity-10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        
        <div className="text-center mb-10 relative z-10">
          <span className="section-tag">Welcome Back</span>
          <h2 className="text-4xl font-black text-gray-900 mt-2">Sign In</h2>
          <p className="text-gray-400 font-medium mt-2">Access your coordinator dashboard</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-500 px-6 py-4 rounded-2xl flex items-center mb-8 animate-shake">
            <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
            <span className="text-sm font-bold leading-tight">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
              <input
                type="email"
                required
                className="input-field pl-14"
                placeholder="coordinator@rescue.org"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Password</label>
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

          <button
            type="submit"
            disabled={loading}
            className={`btn-primary w-full py-5 rounded-[1.5rem] mt-4 flex items-center justify-center gap-3 shadow-xl shadow-[#123524]/20 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            <span className="text-lg">{loading ? 'Verifying...' : 'Access Dashboard'}</span>
            {!loading && <ArrowRight className="h-5 w-5" />}
          </button>
        </form>

        <p className="text-center mt-12 text-sm text-gray-500 font-medium">
          New to CrisisBridge?{' '}
          <Link to="/register" className="text-[#123524] font-black hover:underline underline-offset-4 decoration-[#d4ff3f] decoration-4">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
