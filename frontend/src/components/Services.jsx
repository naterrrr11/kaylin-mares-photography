import React from 'react';
import { services } from '../data/mockData';
import { Check } from 'lucide-react';

const Services = () => {
  return (
    <section id="services" className="section-spacing-large" style={{ backgroundColor: 'var(--color-gray-100)' }}>
      <div className="container-photography">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Services & Pricing</h2>
          <p className="body-text max-w-2xl mx-auto">
            Professional photography packages tailored to your needs. All packages include professional editing and online gallery access.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all fade-in-up"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                border: '1px solid var(--color-gray-200)'
              }}
            >
              <h3 className="artist-name mb-3">{service.title}</h3>
              <p className="body-text mb-4">{service.description}</p>
              
              <div className="mb-6">
                <span className="section-title" style={{ fontSize: '1.75rem' }}>
                  {service.price}
                </span>
              </div>

              <ul className="space-y-3 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check size={20} className="flex-shrink-0 mt-1" style={{ color: 'var(--color-primary)' }} />
                    <span className="body-text">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="btn-outline w-full"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="body-text mb-4">
            Looking for something custom? Let's discuss your specific needs.
          </p>
          <button 
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
          >
            Request Custom Quote
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
