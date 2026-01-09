import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container-photography">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div 
            className="artist-name cursor-pointer"
            onClick={() => scrollToSection('hero')}
            style={{ color: isScrolled ? 'var(--color-primary)' : 'var(--color-white)' }}
          >
            Alex Morgan
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="nav-link"
              style={{ color: isScrolled ? 'var(--color-gray-700)' : 'var(--color-white)' }}
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="nav-link"
              style={{ color: isScrolled ? 'var(--color-gray-700)' : 'var(--color-white)' }}
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="nav-link"
              style={{ color: isScrolled ? 'var(--color-gray-700)' : 'var(--color-white)' }}
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="nav-link"
              style={{ color: isScrolled ? 'var(--color-gray-700)' : 'var(--color-white)' }}
            >
              Testimonials
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="btn-primary"
              style={{ 
                padding: '0.75rem 2rem',
                fontSize: '0.875rem'
              }}
            >
              Contact
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ color: isScrolled ? 'var(--color-primary)' : 'var(--color-white)' }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-4 bg-white rounded-lg shadow-lg p-4 mt-2">
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="nav-link text-left"
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="nav-link text-left"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="nav-link text-left"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="nav-link text-left"
            >
              Testimonials
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="btn-primary w-full"
            >
              Contact
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
