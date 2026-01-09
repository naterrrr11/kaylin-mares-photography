import React, { useState, useEffect } from 'react';
import { testimonials as mockTestimonials } from '../data/mockData';
import { Star, Quote } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(mockTestimonials);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(`${API}/testimonials`);
      setTestimonials(response.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  return (
    <section id="testimonials" className="section-spacing-large">
      <div className="container-photography">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Client Testimonials</h2>
          <p className="body-text max-w-2xl mx-auto">
            Don't just take my word for it. Here's what my clients have to say about their experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all fade-in-up relative"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                border: '1px solid var(--color-gray-200)'
              }}
            >
              <Quote 
                size={40} 
                className="absolute top-4 right-4 opacity-10"
                style={{ color: 'var(--color-primary)' }}
              />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    fill="var(--color-primary)" 
                    style={{ color: 'var(--color-primary)' }}
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="body-text mb-6 italic">"{testimonial.text}"</p>

              {/* Client Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="nav-link" style={{ fontSize: '0.875rem' }}>
                    {testimonial.name}
                  </p>
                  <p className="caption-text">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
