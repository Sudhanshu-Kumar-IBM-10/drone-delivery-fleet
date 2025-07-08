import React, { useState, useEffect } from 'react';
import { Package, Zap, Shield, Clock, Play, ChevronRight, MapPin } from 'lucide-react';
import './home.css';

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
    { icon: Zap, title: "Lightning Fast", desc: "30-min delivery anywhere in the city", color: "feature-icon-yellow" },
    { icon: Shield, title: "Ultra Secure", desc: "Military-grade tracking & protection", color: "feature-icon-blue" },
    { icon: Clock, title: "24/7 Service", desc: "Round-the-clock delivery availability", color: "feature-icon-green" }
  ];

  return (
    <div className="main-container">
      {/* Animated Background Elements */}
      <div className="bg-overlay">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-dot"
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
      <nav className={`nav ${isVisible ? 'nav-visible' : 'nav-hidden'}`}>
        <div className="nav-brand">
          <div className="nav-logo">
            <Package className="w-6 h-6 text-white" />
          </div>
          <h1 className="nav-title">
            SkySwift
          </h1>
        </div>
        
        <div className="nav-menu">
          {['Services', 'Coverage', 'Pricing', 'About'].map((item, i) => (
            <button 
              key={item}
              className={`nav-menu-item delay-${i * 100}`}
            >
              {item}
            </button>
          ))}
        </div>
        
        <button className="nav-cta">
          Download App
        </button>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-grid">
          <div className={`hero-content ${isVisible ? 'hero-content-visible' : 'hero-content-hidden'}`}>
            <h2 className="hero-title">
              <span className="hero-title-gradient1">
                Future
              </span>
              <br />
              <span>Delivered</span>
              <br />
              <span className="hero-title-gradient2">
                Today
              </span>
            </h2>
            
            <p className="hero-subtitle">
              Experience the next generation of delivery with autonomous drones that bring your packages to your doorstep in minutes, not hours.
            </p>
            
            <div className="hero-buttons">
              <button className="hero-btn-primary">
                <Play className="w-5 h-5 icon-hover" />
                Track Your Delivery
                <ChevronRight className="w-5 h-5 icon-translate" />
              </button>
              
              <button className="hero-btn-secondary">
                <MapPin className="w-5 h-5 icon-hover" />
                Check Coverage
              </button>
            </div>
            
            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-dot hero-stat-dot-green"></div>
                <span>127 Active Drones</span>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-dot hero-stat-dot-blue"></div>
                <span>2.3k Deliveries Today</span>
              </div>
            </div>
          </div>
          
          {/* Animated Drone Visualization */}
          <div className={`drone-container ${isVisible ? 'drone-container-visible' : 'drone-container-hidden'}`}>
            <div className="drone-wrapper">
              {/* Drone */}
              <div className="drone">
                <div className="drone-body">
                  <Package className="w-16 h-16 text-white" />
                </div>
                
                {/* Propellers */}
                <div className="propeller propeller-tl"></div>
                <div className="propeller propeller-tr"></div>
                <div className="propeller propeller-bl"></div>
                <div className="propeller propeller-br"></div>
              </div>
              
              {/* Flight Path */}
              <div className="flight-path">
                <div className="flight-dot flight-dot-1"></div>
                <div className="flight-dot flight-dot-2"></div>
                <div className="flight-dot flight-dot-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features">
        <div className="features-grid">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className={`feature-card group ${
                  activeFeature === i ? 'feature-card-active' : 'feature-card-inactive'
                }`}
                style={{
                  animationDelay: `${i * 0.2}s`,
                  transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                  opacity: isVisible ? 1 : 0,
                  transition: 'all 1s ease-out'
                }}
                onMouseEnter={() => setActiveFeature(i)}
              >
                <div className={`feature-icon ${feature.color}`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="feature-title">
                  {feature.title}
                </h3>
                
                <p className="feature-desc">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats">
        <div className="stats-grid">
          {[
            { number: "15", label: "Minutes", suffix: "avg" },
            { number: "99.9", label: "Accuracy", suffix: "%" },
            { number: "50k", label: "Deliveries", suffix: "+" },
            { number: "24/7", label: "Support", suffix: "" }
          ].map((stat, i) => (
            <div
              key={i}
              className={`stat-item ${isVisible ? 'stat-item-visible' : 'stat-item-hidden'}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="stat-number">
                {stat.number}
                <span className="stat-suffix">{stat.suffix}</span>
              </div>
              <div className="stat-label">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta">
        <div className={`cta-content ${isVisible ? 'cta-content-visible' : 'cta-content-hidden'}`}>
          <h3 className="cta-title">
            Ready to Experience the Future?
          </h3>
          
          <p className="cta-subtitle">
            Join thousands of satisfied customers who've already made the switch to drone delivery.
          </p>
          
          <button className="cta-button group">
            <span className="cta-button-text">Get Started Now</span>
            <ChevronRight className="w-5 h-5 cta-button-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;