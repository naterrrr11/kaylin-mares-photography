import React, { useState, useEffect } from 'react';
import { photographerInfo as mockInfo } from '../data/mockData';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const { toast } = useToast();
  const [photographerInfo, setPhotographerInfo] = useState(mockInfo);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: ''
  });

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post(`${API}/contact`, formData);
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your inquiry. I'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or contact directly via email.",
        variant: "destructive"
      });
    }
  };

  return (
    <section id="contact" className="section-spacing-large" style={{ backgroundColor: 'var(--color-gray-100)' }}>
      <div className="container-photography">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Get In Touch</h2>
          <p className="body-text max-w-2xl mx-auto">
            Ready to capture your special moments? Fill out the form below or reach out directly. 
            I'm excited to hear about your project!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="artist-name mb-6">Contact Information</h3>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <Mail size={24} style={{ color: 'var(--color-primary)' }} className="flex-shrink-0 mt-1" />
                <div>
                  <p className="nav-link mb-1">Email</p>
                  <a 
                    href={`mailto:${photographerInfo.email}`}
                    className="body-text hover:underline"
                  >
                    {photographerInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone size={24} style={{ color: 'var(--color-primary)' }} className="flex-shrink-0 mt-1" />
                <div>
                  <p className="nav-link mb-1">Phone</p>
                  <a 
                    href={`tel:${photographerInfo.phone}`}
                    className="body-text hover:underline"
                  >
                    {photographerInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin size={24} style={{ color: 'var(--color-primary)' }} className="flex-shrink-0 mt-1" />
                <div>
                  <p className="nav-link mb-1">Location</p>
                  <p className="body-text">{photographerInfo.location}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h4 className="nav-link mb-3">Response Time</h4>
              <p className="body-text mb-4">
                I typically respond to all inquiries within 24 hours. For urgent requests, 
                please call directly.
              </p>
              <h4 className="nav-link mb-3">Availability</h4>
              <p className="body-text">
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday - Sunday: By Appointment
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="nav-link block mb-2" style={{ fontSize: '0.875rem' }}>
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black outline-none transition-all"
                  placeholder="Your full name"
                />
              </div>

              <div className="mb-4">
                <label className="nav-link block mb-2" style={{ fontSize: '0.875rem' }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black outline-none transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="mb-4">
                <label className="nav-link block mb-2" style={{ fontSize: '0.875rem' }}>
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black outline-none transition-all"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="mb-4">
                <label className="nav-link block mb-2" style={{ fontSize: '0.875rem' }}>
                  Service Interested In *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black outline-none transition-all"
                >
                  <option value="">Select a service</option>
                  <option value="wedding">Wedding Photography</option>
                  <option value="portrait">Portrait Session</option>
                  <option value="event">Event Photography</option>
                  <option value="commercial">Commercial & Product</option>
                  <option value="other">Other/Custom</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="nav-link block mb-2" style={{ fontSize: '0.875rem' }}>
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black outline-none transition-all"
                />
              </div>

              <div className="mb-6">
                <label className="nav-link block mb-2" style={{ fontSize: '0.875rem' }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black outline-none transition-all resize-none"
                  placeholder="Tell me about your project, timeline, and any specific requirements..."
                ></textarea>
              </div>

              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                <Send size={20} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
