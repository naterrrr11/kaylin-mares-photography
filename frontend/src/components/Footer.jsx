import React from 'react';
import { photographerInfo } from '../data/mockData';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer style={{ backgroundColor: 'var(--color-gray-900)', color: 'var(--color-white)' }}>
      <div className="container-photography py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="artist-name mb-4" style={{ color: 'var(--color-white)' }}>
              {photographerInfo.name}
            </h3>
            <p className="caption-text" style={{ color: 'var(--color-gray-300)' }}>
              {photographerInfo.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="nav-link mb-4" style={{ color: 'var(--color-white)' }}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('portfolio')}
                  className="caption-text hover:underline"
                  style={{ color: 'var(--color-gray-300)' }}
                >
                  Portfolio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="caption-text hover:underline"
                  style={{ color: 'var(--color-gray-300)' }}
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="caption-text hover:underline"
                  style={{ color: 'var(--color-gray-300)' }}
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="caption-text hover:underline"
                  style={{ color: 'var(--color-gray-300)' }}
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="nav-link mb-4" style={{ color: 'var(--color-white)' }}>
              Services
            </h4>
            <ul className="space-y-2">
              <li className="caption-text" style={{ color: 'var(--color-gray-300)' }}>
                Wedding Photography
              </li>
              <li className="caption-text" style={{ color: 'var(--color-gray-300)' }}>
                Portrait Sessions
              </li>
              <li className="caption-text" style={{ color: 'var(--color-gray-300)' }}>
                Event Photography
              </li>
              <li className="caption-text" style={{ color: 'var(--color-gray-300)' }}>
                Commercial & Product
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="nav-link mb-4" style={{ color: 'var(--color-white)' }}>
              Get In Touch
            </h4>
            <ul className="space-y-2">
              <li className="caption-text" style={{ color: 'var(--color-gray-300)' }}>
                {photographerInfo.email}
              </li>
              <li className="caption-text" style={{ color: 'var(--color-gray-300)' }}>
                {photographerInfo.phone}
              </li>
              <li className="caption-text" style={{ color: 'var(--color-gray-300)' }}>
                {photographerInfo.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="caption-text" style={{ color: 'var(--color-gray-400)' }}>
              © {currentYear} {photographerInfo.name}. All rights reserved.
            </p>
            
            <div className="flex gap-4">
              <a 
                href="#" 
                className="hover:opacity-70 transition-opacity"
                style={{ color: 'var(--color-white)' }}
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="hover:opacity-70 transition-opacity"
                style={{ color: 'var(--color-white)' }}
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="hover:opacity-70 transition-opacity"
                style={{ color: 'var(--color-white)' }}
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href={`mailto:${photographerInfo.email}`}
                className="hover:opacity-70 transition-opacity"
                style={{ color: 'var(--color-white)' }}
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
