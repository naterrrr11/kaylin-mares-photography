import React from 'react';
import { heroImage } from '../data/mockData';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero"
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container-photography text-center fade-in-up">
        <h1 className="hero-title mb-6" style={{ color: 'var(--color-white)' }}>
          Capturing Life's<br />Beautiful Moments
        </h1>
        <p 
          className="body-text mb-8 max-w-2xl mx-auto"
          style={{ color: 'var(--color-white)', opacity: 0.9 }}
        >
          Professional photography services for weddings, portraits, events, and commercial projects.
          Every image tells a story, let me tell yours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={scrollToContact}
            className="btn-primary"
          >
            Book a Session
          </button>
          <button 
            onClick={scrollToPortfolio}
            className="btn-outline"
            style={{
              color: 'var(--color-white)',
              borderColor: 'var(--color-white)'
            }}
          >
            View Portfolio
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToPortfolio}
      >
        <div 
          className="w-6 h-10 border-2 rounded-full flex justify-center"
          style={{ borderColor: 'var(--color-white)' }}
        >
          <div 
            className="w-1 h-3 mt-2 rounded-full animate-bounce"
            style={{ backgroundColor: 'var(--color-white)' }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
