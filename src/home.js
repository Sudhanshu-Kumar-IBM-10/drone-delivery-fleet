import React, { useState, useEffect, useRef } from 'react';

const Home = () => {
  const [isVisible, setIsVisible] = useState({});
  const [stats, setStats] = useState({ deliveries: 0, customers: 0, cities: 0, uptime: 0 });
  const [dronePosition, setDronePosition] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState(null);
  const heroRef = useRef(null);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Stats animation
  useEffect(() => {
    if (isVisible.stats) {
      const targets = { deliveries: 50000, customers: 25000, cities: 150, uptime: 99.9 };
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      const timer = setInterval(() => {
        setStats(prev => {
          const newStats = {};
          Object.keys(targets).forEach(key => {
            const target = targets[key];
            const current = prev[key];
            const step = (target - current) / 10;
            newStats[key] = Math.min(current + step, target);
          });
          return newStats;
        });
      }, interval);

      setTimeout(() => clearInterval(timer), duration);
    }
  }, [isVisible.stats]);

  // Mouse tracking for drone
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setDronePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const features = [
    {
      icon: '⚡',
      title: 'Lightning Speed',
      description: 'Deliver packages in under 15 minutes with our advanced drone network',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: '🌍',
      title: 'Eco-Friendly',
      description: 'Zero emissions delivery that helps protect our planet',
      color: 'from-green-400 to-blue-500'
    },
    {
      icon: '📱',
      title: 'Real-Time Tracking',
      description: 'Watch your package journey with live GPS tracking',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: '🛡️',
      title: 'Secure & Safe',
      description: 'Advanced security features ensure safe delivery',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      icon: '🎯',
      title: 'Precision Landing',
      description: 'Accurate delivery with centimeter-level precision',
      color: 'from-red-400 to-pink-500'
    },
    {
      icon: '💰',
      title: 'Cost Effective',
      description: 'Competitive pricing that saves you money',
      color: 'from-indigo-400 to-purple-500'
    }
  ];

  const steps = [
    {
      number: 1,
      title: 'Place Order',
      description: 'Select items and delivery location through our app'
    },
    {
      number: 2,
      title: 'Drone Dispatch',
      description: 'Nearest drone automatically picks up your package'
    },
    {
      number: 3,
      title: 'Live Tracking',
      description: 'Track your package in real-time as it flies to you'
    },
    {
      number: 4,
      title: 'Secure Delivery',
      description: 'Receive your package safely at your doorstep'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black bg-opacity-20 backdrop-blur-lg z-50 transition-all duration-300">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            SkySwift
          </div>
          <div className="hidden md:flex space-x-8">
            {['Features', 'How It Works', 'Stats', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="hover:text-yellow-400 transition-colors duration-300 cursor-pointer"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        id="hero"
      >
        {/* Floating Drones */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-12 h-12 bg-yellow-400 rounded-lg shadow-lg animate-pulse"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.5}s`,
                transform: `translate(${dronePosition.x * 20}px, ${dronePosition.y * 20}px)`,
                transition: 'transform 0.3s ease-out'
              }}
            >
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-gray-600 rounded-full animate-spin"></div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gray-600 rounded-full animate-spin"></div>
            </div>
          ))}
        </div>

        <div className={`text-center z-10 transform transition-all duration-1000 ${
          isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
            Sky<span className="text-white">Swift</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience the future of delivery with lightning-fast drone technology
          </p>
          <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-2xl">
            Start Your Journey
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black" id="features">
        <div className="container mx-auto px-6">
          <h2 className={`text-5xl font-bold text-center mb-16 transform transition-all duration-1000 ${
            isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            Why Choose SkySwift?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl bg-gradient-to-br ${feature.color} transform transition-all duration-500 hover:scale-105 hover:rotate-1 cursor-pointer ${
                  isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setActiveFeature(index)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className={`text-6xl mb-4 transform transition-all duration-300 ${
                  activeFeature === index ? 'scale-110 rotate-12' : 'scale-100'
                }`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-100 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-blue-900" id="stats">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className={`transform transition-all duration-1000 ${
              isVisible.stats ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}>
              <div className="text-5xl font-bold text-yellow-400 mb-2">
                {Math.floor(stats.deliveries).toLocaleString()}+
              </div>
              <div className="text-gray-300">Deliveries</div>
            </div>
            <div className={`transform transition-all duration-1000 ${
              isVisible.stats ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`} style={{ transitionDelay: '0.2s' }}>
              <div className="text-5xl font-bold text-yellow-400 mb-2">
                {Math.floor(stats.customers).toLocaleString()}+
              </div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div className={`transform transition-all duration-1000 ${
              isVisible.stats ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`} style={{ transitionDelay: '0.4s' }}>
              <div className="text-5xl font-bold text-yellow-400 mb-2">
                {Math.floor(stats.cities)}+
              </div>
              <div className="text-gray-300">Cities</div>
            </div>
            <div className={`transform transition-all duration-1000 ${
              isVisible.stats ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`} style={{ transitionDelay: '0.6s' }}>
              <div className="text-5xl font-bold text-yellow-400 mb-2">
                {stats.uptime.toFixed(1)}%
              </div>
              <div className="text-gray-300">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black" id="how-it-works">
        <div className="container mx-auto px-6">
          <h2 className={`text-5xl font-bold text-center mb-16 transform transition-all duration-1000 ${
            isVisible['how-it-works'] ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`text-center p-8 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 transform transition-all duration-500 hover:scale-105 ${
                  isVisible['how-it-works'] ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-2xl mx-auto mb-6 animate-bounce">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-200 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 to-orange-500">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-black mb-8">Ready to Experience the Future?</h2>
          <p className="text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have revolutionized their delivery experience
          </p>
          <button className="bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-2xl">
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
            SkySwift
          </div>
          <p className="text-gray-400">
            © 2025 SkySwift. Revolutionizing delivery, one drone at a time.
          </p>
        </div>
      </footer>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg hover:scale-110 transform transition-all duration-300 flex items-center justify-center text-2xl animate-pulse"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          🚁
        </button>
      </div>
    </div>
  );
};

export default Home;