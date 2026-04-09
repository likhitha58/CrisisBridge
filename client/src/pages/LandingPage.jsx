import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Utensils, Home, Stethoscope, ArrowRight, ShieldCheck, Activity, Users, Search } from 'lucide-react';

const LandingPage = () => {
  const categories = [
    { title: 'Blood', icon: <Droplet className="text-red-500" />, count: '24 Requests', color: 'bg-red-50' },
    { title: 'Development', icon: <Activity className="text-emerald-500" />, count: '12 Requests', color: 'bg-emerald-50' },
    { title: 'Admin Marketing', icon: <Users className="text-lime-600" />, count: '8 Requests', color: 'bg-[#d4ff3f]' },
    { title: 'Medicine', icon: <Stethoscope className="text-blue-500" />, count: '15 Requests', color: 'bg-blue-50' },
    { title: 'Shelter', icon: <Home className="text-orange-500" />, count: '29 Requests', color: 'bg-orange-50' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-[#123524] pt-10 pb-24 px-4 rounded-b-[3rem] text-center md:text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <span className="section-tag bg-white/10 text-[#d4ff3f] border border-white/5">#1 Crisis Response Platform</span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1.1]">
              The <span className="highlight block md:inline px-2">Easiest Way</span> <br />
              To Get Help
            </h1>
            <p className="text-xl text-white/70 mb-10 max-w-lg leading-relaxed">
              Connecting professional volunteers, NGOs, and hospitals in real-time to save lives during emergencies.
            </p>
            
            <div className="bg-white p-2 rounded-[2rem] flex flex-col md:flex-row items-center gap-2 shadow-2xl max-w-xl">
              <div className="flex-1 flex items-center px-6 gap-3 border-r border-gray-100">
                <Search className="text-gray-400 h-5 w-5" />
                <input type="text" placeholder="Resource type (e.g. Blood)" className="w-full py-4 text-sm font-bold outline-none" />
              </div>
              <button className="btn-primary w-full md:w-auto px-10 py-5 rounded-[1.5rem]">
                Search Now
              </button>
            </div>
          </div>
          
          <div className="md:w-5/12 relative">
             <div className="bg-[#d4ff3f] absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20"></div>
             <img 
               src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800" 
               alt="Emergency Support" 
               className="rounded-[3rem] shadow-2xl relative z-10"
             />
             <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-[2rem] shadow-xl z-20 hidden md:block">
               <div className="flex items-center gap-4">
                 <div className="bg-[#d4ff3f] p-3 rounded-xl">
                   <Activity className="text-[#123524]" />
                 </div>
                 <div>
                   <p className="text-xs font-black text-gray-400 uppercase">Active Now</p>
                   <p className="text-lg font-bold">1.2k Volunteers</p>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-4">Browse Resources <br /> By <span className="highlight px-2">Category</span></h2>
            </div>
            <p className="text-gray-500 max-w-sm">Together with useful notifications, collaboration, insights, and improvement tips for everyone.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {categories.map((cat, idx) => (
              <div key={idx} className={`p-8 rounded-[2rem] border border-gray-50 transition-all hover:shadow-2xl hover:-translate-y-1 cursor-pointer group ${cat.color === 'bg-[#d4ff3f]' ? 'bg-[#d4ff3f]' : 'bg-white'}`}>
                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${cat.color === 'bg-[#d4ff3f]' ? 'bg-white' : 'bg-gray-50'}`}>
                  {cat.icon}
                </div>
                <h3 className="font-black text-lg mb-2 leading-tight">{cat.title}</h3>
                <p className="text-gray-400 text-xs font-bold group-hover:text-[#123524]">{cat.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-4 bg-gray-50 rounded-[4rem] mx-4 mb-24">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { title: 'Create Account', desc: 'Securely join the network as a citizen, volunteer, or organization.', icon: <Users /> },
              { title: 'Post or Search', desc: 'Detail your emergency need or offer available resources instantly.', icon: <Search /> },
              { title: 'Coordinate Help', desc: 'Real-time matching and tracking until fulfillment is reached.', icon: <ShieldCheck /> }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="h-20 w-20 rounded-full bg-white shadow-xl flex items-center justify-center mb-8 text-[#123524]">
                  {step.icon}
                </div>
                <h3 className="text-xl font-black mb-4">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm max-w-[250px] mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="pb-24 px-4">
        <div className="max-w-7xl mx-auto bg-[#123524] rounded-[4rem] overflow-hidden flex flex-col md:flex-row items-center p-12 md:p-20 text-white relative">
          <div className="md:w-1/2 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Get Your <span className="highlight px-2 text-[#123524]">Matched Help</span> In A Few Minutes</h2>
            <p className="text-lg opacity-70 mb-10 max-w-md">Our algorithm prioritizes urgency and location to ensure emergency resources reach where they are needed most, fastest.</p>
            <Link to="/register" className="btn-accent inline-flex px-12 py-5 text-lg">Join Now</Link>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 relative z-10 flex justify-center">
             <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=600" className="rounded-[2.5rem] shadow-2xl rotate-3" alt="Community" />
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4ff3f] opacity-5 rounded-full blur-[120px]"></div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
