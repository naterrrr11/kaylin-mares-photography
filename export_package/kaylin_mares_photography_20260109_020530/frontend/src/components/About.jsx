import React, { useState, useEffect } from 'react';
import { photographerInfo as mockInfo, aboutImage } from '../data/mockData';
import { Camera, Award, Users, Heart } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const About = () => {
  const [photographerInfo, setPhotographerInfo] = useState(mockInfo);

  useEffect(() => {
    fetchPhotographerInfo();
  }, []);

  const fetchPhotographerInfo = async () => {
    try {
      const response = await axios.get(`${API}/photographer-info`);
      setPhotographerInfo(response.data);
    } catch (error) {
      console.error('Error fetching photographer info:', error);
    }
  };

  const stats = [
    { icon: <Camera size={32} />, value: '500+', label: 'Projects Completed' },
    { icon: <Award size={32} />, value: '8+', label: 'Years Experience' },
    { icon: <Users size={32} />, value: '300+', label: 'Happy Clients' },
    { icon: <Heart size={32} />, value: '100%', label: 'Passion & Dedication' }
  ];

  return (
    <section id="about" className="section-spacing-large">
      <div className="container-photography">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 md:order-1">
            <div 
              className="image-overlay-container"
              style={{ height: '600px', borderRadius: '4px', overflow: 'hidden' }}
            >
              <img 
                src={aboutImage} 
                alt="Photographer at work"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 md:order-2">
            <h2 className="section-title mb-6">About Me</h2>
            <h3 className="artist-name mb-4">{photographerInfo.name}</h3>
            <p className="body-text mb-6">{photographerInfo.bio}</p>
            
            <p className="body-text mb-8">
              My approach to photography is simple: authenticity over perfection. 
              I believe the best photos happen when you're comfortable being yourself. 
              Whether it's a wedding, portrait session, or commercial project, 
              I work to create an environment where genuine moments can unfold naturally.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-gray-100 rounded">
                  <div className="flex justify-center mb-2" style={{ color: 'var(--color-primary)' }}>
                    {stat.icon}
                  </div>
                  <div className="artist-name mb-1">{stat.value}</div>
                  <div className="caption-text">{stat.label}</div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              Let's Work Together
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
