import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Heart, User, LogOut, PlusSquare } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-[#123524] text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-[#d4ff3f] p-1.5 rounded-lg">
              <Heart className="h-6 w-6 text-[#123524]" fill="currentColor" />
            </div>
            <span className="text-2xl font-black tracking-tight">CrisisBridge</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white/80 hover:text-[#d4ff3f] font-bold text-sm uppercase tracking-wider transition-colors">Home</Link>
            {user && user.role === 'Citizen' && (
              <Link to="/create-request" className="flex items-center space-x-1 text-white/80 hover:text-[#d4ff3f] font-bold text-sm uppercase tracking-wider transition-colors">
                <PlusSquare className="h-4 w-4" />
                <span>Request Help</span>
              </Link>
            )}
            
            {user ? (
              <div className="flex items-center space-x-6">
                <Link to="/profile" className="flex items-center space-x-2 text-white bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-all border border-white/5">
                  <User className="h-4 w-4" />
                  <span className="font-bold text-sm">{user.name}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-white/50 hover:text-red-400 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-white/80 hover:text-[#d4ff3f] font-bold text-sm uppercase tracking-wider transition-colors">Login</Link>
                <Link to="/register" className="btn-accent text-sm py-2 px-6">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
