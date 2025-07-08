import React, { useState, useEffect } from 'react';
import { Package, Zap, Shield, Clock, Play, ChevronRight, MapPin } from 'lucide-react';
import './home.css'

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: Zap, title: "Lightning Fast", desc: "30-min delivery anywhere in the city", color: "from-yellow-400 to-orange-500" },
    { icon: Shield, title: "Ultra Secure", desc: "Military-grade tracking & protection", color: "from-blue-400 to-purple-500" },
    { icon: Clock, title: "24/7 Service", desc: "Round-the-clock delivery availability", color: "from-green-400 to-teal-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-white rounded-full animate-pulse opacity-20`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className={`relative z-10 p-6 flex justify-between items-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
            <Package className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            SkySwift
          </h1>
        </div>
        
        <div className="hidden md:flex space-x-8">
          {['Services', 'Coverage', 'Pricing', 'About'].map((item, i) => (
            <button 
              key={item}
              className="relative group text-gray-300 hover:text-white transition-colors duration-300"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
            </button>
          ))}
        </div>
        
        <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 rounded-full hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25">
          Download App
        </button>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
            <h2 className="text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Future
              </span>
              <br />
              <span className="text-white">Delivered</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Today
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
              Experience the next generation of delivery with autonomous drones that bring your packages to your doorstep in minutes, not hours.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="group bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-full font-semibold hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-cyan-500/25 flex items-center justify-center">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Track Your Delivery
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button className="group border-2 border-white/30 px-8 py-4 rounded-full font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 flex items-center justify-center">
                <MapPin className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Check Coverage
              </button>
            </div>
            
            <div className="flex items-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span>127 Active Drones</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                <span>2.3k Deliveries Today</span>
              </div>
            </div>
          </div>
          
          {/* Animated Drone Visualization */}
          <div className={`relative transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
            <div className="relative w-full h-96 flex items-center justify-center">
              {/* Drone */}
              <div className="relative animate-bounce">
                <div className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl shadow-2xl shadow-cyan-500/25 flex items-center justify-center transform hover:scale-110 transition-all duration-300">
                  <Package className="w-16 h-16 text-white" />
                </div>
                
                {/* Propellers */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full animate-spin"></div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full animate-spin"></div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full animate-spin"></div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full animate-spin"></div>
              </div>
              
              {/* Flight Path */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping animation-delay-1000"></div>
                <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-purple-400 rounded-full animate-ping animation-delay-2000"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className={`group relative p-8 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                  activeFeature === i ? 'bg-white/10 shadow-xl' : 'bg-white/5'
                }`}
                style={{
                  animationDelay: `${i * 0.2}s`,
                  transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                  opacity: isVisible ? 1 : 0,
                  transition: 'all 1s ease-out'
                }}
                onMouseEnter={() => setActiveFeature(i)}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                  {feature.desc}
                </p>
                
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "15", label: "Minutes", suffix: "avg" },
            { number: "99.9", label: "Accuracy", suffix: "%" },
            { number: "50k", label: "Deliveries", suffix: "+" },
            { number: "24/7", label: "Support", suffix: "" }
          ].map((stat, i) => (
            <div
              key={i}
              className={`text-center group transition-all duration-1000 delay-${i * 100} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.number}
                <span className="text-xl">{stat.suffix}</span>
              </div>
              <div className="text-gray-400 group-hover:text-white transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pb-20 text-center">
        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Ready to Experience the Future?
          </h3>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who've already made the switch to drone delivery.
          </p>
          
          <button className="group bg-gradient-to-r from-cyan-500 to-blue-600 px-12 py-4 rounded-full font-semibold text-lg hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-cyan-500/25">
            <span className="group-hover:mr-2 transition-all duration-300">Get Started Now</span>
            <ChevronRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home ;