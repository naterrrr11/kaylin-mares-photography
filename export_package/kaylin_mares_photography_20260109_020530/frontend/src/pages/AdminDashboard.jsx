import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Image, User, Briefcase, MessageSquare, Mail, LogOut, Plus, Edit, Trash2, Save
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);

  // State for all data
  const [portfolio, setPortfolio] = useState([]);
  const [photographerInfo, setPhotographerInfo] = useState({});
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [contactSubmissions, setContactSubmissions] = useState([]);

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Axios interceptor for auth
  const getAuthHeaders = () => {
    const token = localStorage.getItem('admin_token');
    return {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
    toast({
      title: "Logged out successfully",
    });
  };

  // Fetch functions
  const fetchPortfolio = async () => {
    try {
      const response = await axios.get(`${API}/portfolio`);
      setPortfolio(response.data);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    }
  };

  const fetchPhotographerInfo = async () => {
    try {
      const response = await axios.get(`${API}/photographer-info`);
      setPhotographerInfo(response.data);
    } catch (error) {
      console.error('Error fetching photographer info:', error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API}/services`);
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(`${API}/testimonials`);
      setTestimonials(response.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  const fetchContactSubmissions = async () => {
    try {
      const response = await axios.get(`${API}/admin/contact-submissions`, getAuthHeaders());
      setContactSubmissions(response.data);
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
    }
  };

  useEffect(() => {
    fetchPortfolio();
    fetchPhotographerInfo();
    fetchServices();
    fetchTestimonials();
    fetchContactSubmissions();
  }, []);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'portfolio', label: 'Portfolio', icon: <Image size={20} /> },
    { id: 'info', label: 'Personal Info', icon: <User size={20} /> },
    { id: 'services', label: 'Services', icon: <Briefcase size={20} /> },
    { id: 'testimonials', label: 'Testimonials', icon: <MessageSquare size={20} /> },
    { id: 'inquiries', label: 'Inquiries', icon: <Mail size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container-photography py-4 flex justify-between items-center">
          <h1 className="artist-name">Admin Dashboard</h1>
          <button onClick={handleLogout} className="btn-outline flex items-center gap-2">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      <div className="container-photography py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-all ${
                      activeTab === item.id
                        ? 'bg-black text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {item.icon}
                    <span className="nav-link">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              {activeTab === 'overview' && <OverviewTab 
                portfolio={portfolio}
                services={services}
                testimonials={testimonials}
                inquiries={contactSubmissions}
              />}
              {activeTab === 'portfolio' && <PortfolioTab 
                portfolio={portfolio}
                fetchPortfolio={fetchPortfolio}
                getAuthHeaders={getAuthHeaders}
                toast={toast}
              />}
              {activeTab === 'info' && <InfoTab 
                photographerInfo={photographerInfo}
                fetchPhotographerInfo={fetchPhotographerInfo}
                getAuthHeaders={getAuthHeaders}
                toast={toast}
              />}
              {activeTab === 'services' && <ServicesTab 
                services={services}
                fetchServices={fetchServices}
                getAuthHeaders={getAuthHeaders}
                toast={toast}
              />}
              {activeTab === 'testimonials' && <TestimonialsTab 
                testimonials={testimonials}
                fetchTestimonials={fetchTestimonials}
                getAuthHeaders={getAuthHeaders}
                toast={toast}
              />}
              {activeTab === 'inquiries' && <InquiriesTab 
                inquiries={contactSubmissions}
                fetchContactSubmissions={fetchContactSubmissions}
                getAuthHeaders={getAuthHeaders}
                toast={toast}
              />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Overview Tab Component
const OverviewTab = ({ portfolio, services, testimonials, inquiries }) => {
  const newInquiries = inquiries.filter(i => i.status === 'new').length;
  
  return (
    <div>
      <h2 className="section-title mb-6">Dashboard Overview</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <Image size={32} style={{ color: 'var(--color-primary)' }} />
            <span className="section-title" style={{ fontSize: '2rem' }}>{portfolio.length}</span>
          </div>
          <p className="body-text">Portfolio Images</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <Briefcase size={32} style={{ color: 'var(--color-primary)' }} />
            <span className="section-title" style={{ fontSize: '2rem' }}>{services.length}</span>
          </div>
          <p className="body-text">Services</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <MessageSquare size={32} style={{ color: 'var(--color-primary)' }} />
            <span className="section-title" style={{ fontSize: '2rem' }}>{testimonials.length}</span>
          </div>
          <p className="body-text">Testimonials</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <Mail size={32} style={{ color: 'var(--color-primary)' }} />
            <span className="section-title" style={{ fontSize: '2rem' }}>{newInquiries}</span>
          </div>
          <p className="body-text">New Inquiries</p>
        </div>
      </div>
    </div>
  );
};

// Portfolio Tab Component
const PortfolioTab = ({ portfolio, fetchPortfolio, getAuthHeaders, toast }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    url: '',
    category: '',
    title: '',
    description: '',
    order: 0
  });

  const handleAdd = () => {
    setIsAdding(true);
    setFormData({ url: '', category: '', title: '', description: '', order: 0 });
  };

  const handleEdit = (image) => {
    setEditingId(image.id);
    setFormData({
      url: image.url,
      category: image.category,
      title: image.title,
      description: image.description,
      order: image.order
    });
  };

  const handleSave = async () => {
    try {
      if (isAdding) {
        await axios.post(`${API}/admin/portfolio`, formData, getAuthHeaders());
        toast({ title: "Image added successfully!" });
      } else {
        await axios.put(`${API}/admin/portfolio/${editingId}`, formData, getAuthHeaders());
        toast({ title: "Image updated successfully!" });
      }
      setIsAdding(false);
      setEditingId(null);
      fetchPortfolio();
    } catch (error) {
      toast({
        title: "Error saving image",
        description: error.response?.data?.detail || "An error occurred",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await axios.delete(`${API}/admin/portfolio/${id}`, getAuthHeaders());
        toast({ title: "Image deleted successfully!" });
        fetchPortfolio();
      } catch (error) {
        toast({
          title: "Error deleting image",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title">Portfolio Management</h2>
        <button onClick={handleAdd} className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          Add Image
        </button>
      </div>

      {(isAdding || editingId) && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="artist-name mb-4">{isAdding ? 'Add New Image' : 'Edit Image'}</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Image URL"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-300 focus:border-black outline-none"
            />
            <input
              type="text"
              placeholder="Category (e.g., Portrait, Wedding, Nature)"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-300 focus:border-black outline-none"
            />
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-300 focus:border-black outline-none"
            />
            <input
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-300 focus:border-black outline-none"
            />
            <input
              type="number"
              placeholder="Order"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border-2 border-gray-300 focus:border-black outline-none"
            />
            <div className="flex gap-2">
              <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                <Save size={18} />
                Save
              </button>
              <button 
                onClick={() => { setIsAdding(false); setEditingId(null); }} 
                className="btn-outline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {portfolio.map((image) => (
          <div key={image.id} className="border rounded-lg overflow-hidden">
            <img src={image.url} alt={image.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <span className="type-indicator bg-black text-white px-2 py-1">{image.category}</span>
              <h3 className="nav-link mt-2">{image.title}</h3>
              <p className="caption-text">{image.description}</p>
              <div className="flex gap-2 mt-4">
                <button onClick={() => handleEdit(image)} className="btn-outline flex-1 flex items-center justify-center gap-2">
                  <Edit size={16} />
                  Edit
                </button>
                <button onClick={() => handleDelete(image.id)} className="btn-outline flex-1 flex items-center justify-center gap-2 text-red-600 border-red-600">
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Personal Info Tab Component
const InfoTab = ({ photographerInfo, fetchPhotographerInfo, getAuthHeaders, toast }) => {
  const [formData, setFormData] = useState(photographerInfo);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setFormData(photographerInfo);
  }, [photographerInfo]);

  const handleSave = async () => {
    try {
      await axios.put(`${API}/admin/photographer-info`, formData, getAuthHeaders());
      toast({ title: "Information updated successfully!" });
      setIsEditing(false);
      fetchPhotographerInfo();
    } catch (error) {
      toast({
        title: "Error updating information",
        variant: "destructive"
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title">Personal Information</h2>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="btn-primary flex items-center gap-2">
            <Edit size={18} />
            Edit
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="nav-link block mb-2">Name</label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={!isEditing}
            className="w-full px-4 py-2 border-2 border-gray-300 focus:border-black outline-none"
          />
        </div>
        <div>
          <label className="nav-link block mb-2">Tagline</label>
          <input
            type="text"
            value={formData.tagline || ''}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            disabled={!isEditing}
            className="w-full px-4 py-2 border-2 border-gray-300 focus:border-black outline-none"
          />
        </div>
        <div>
          <label className="nav-link block mb-2">Bio</label>
          <textarea
            value={formData.bio || ''}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            disabled={!isEditing}
            rows="4"
            className="w-full px-4 py-2 border-2 border-gray-300 focus:border-black outline-none resize-none"
          />
        </div>
        <div>
          <label className="nav-link block mb-2">Email</label>
          <input
            type="email"
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={!isEditing}
            className="w-full px-4 py-2 border-2 border-gray-300 focus:border-black outline-none"
          />
        </div>
        <div>
          <label className="nav-link block mb-2">Phone</label>
          <input
            type="text"
            value={formData.phone || ''}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            disabled={!isEditing}
            className="w-full px-4 py-2 border-2 border-gray-300 focus:border-black outline-none"
          />
        </div>
        <div>
          <label className="nav-link block mb-2">Location</label>
          <input
            type="text"
            value={formData.location || ''}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            disabled={!isEditing}
            className="w-full px-4 py-2 border-2 border-gray-300 focus:border-black outline-none"
          />
        </div>

        {isEditing && (
          <div className="flex gap-2 pt-4">
            <button onClick={handleSave} className="btn-primary flex items-center gap-2">
              <Save size={18} />
              Save Changes
            </button>
            <button onClick={() => setIsEditing(false)} className="btn-outline">
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Services Tab - Similar pattern to Portfolio
const ServicesTab = ({ services, fetchServices, getAuthHeaders, toast }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    features: [],
    order: 0
  });
  const [newFeature, setNewFeature] = useState('');

  const handleAdd = () => {
    setIsAdding(true);
    setFormData({ title: '', description: '', price: '', features: [], order: 0 });
  };

  const handleEdit = (service) => {
    setEditingId(service.id);
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price,
      features: service.features,
      order: service.order
    });
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData({ ...formData, features: [...formData.features, newFeature] });
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) });
  };

  const handleSave = async () => {
    try {
      if (isAdding) {
        await axios.post(`${API}/admin/services`, formData, getAuthHeaders());
        toast({ title: "Service added successfully!" });
      } else {
        await axios.put(`${API}/admin/services/${editingId}`, formData, getAuthHeaders());
        toast({ title: "Service updated successfully!" });
      }
      setIsAdding(false);
      setEditingId(null);
      fetchServices();
    } catch (error) {
      toast({
        title: "Error saving service",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await axios.delete(`${API}/admin/services/${id}`, getAuthHeaders());
        toast({ title: "Service deleted successfully!" });
        fetchServices();
      } catch (error) {
        toast({
          title: "Error deleting service",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title">Services Management</h2>
        <button onClick={handleAdd} className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          Add Service
        </button>
      </div>

      {(isAdding || editingId) && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="artist-name mb-4">{isAdding ? 'Add New Service' : 'Edit Service'}</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Service Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-300 focus:border-black outline-none"
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="3"
              className="w-full px-4 py-2 border-2 border-gray-300 focus:border-black outline-none resize-none"
            />
            <input
              type="text"
              placeholder="Price (e.g., Starting at $500)"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-300 focus:border-black outline-none"
            />
            
            <div>
              <label className="nav-link block mb-2">Features</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Add a feature"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 focus:border-black outline-none"
                />
                <button onClick={handleAddFeature} className="btn-outline">
                  <Plus size={18} />
                </button>
              </div>
              <ul className="space-y-2">
                {formData.features.map((feature, index) => (
                  <li key={index} className="flex justify-between items-center bg-white p-2 rounded">
                    <span className="body-text">{feature}</span>
                    <button onClick={() => handleRemoveFeature(index)} className="text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-2">
              <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                <Save size={18} />
                Save
              </button>
              <button 
                onClick={() => { setIsAdding(false); setEditingId(null); }} 
                className="btn-outline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="border rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="artist-name">{service.title}</h3>
                <p className="section-title" style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }}>
                  {service.price}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(service)} className="btn-outline flex items-center gap-2">
                  <Edit size={16} />
                  Edit
                </button>
                <button onClick={() => handleDelete(service.id)} className="btn-outline flex items-center gap-2 text-red-600 border-red-600">
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
            <p className="body-text mb-4">{service.description}</p>
            <ul className="space-y-2">
              {service.features.map((feature, idx) => (
                <li key={idx} className="caption-text flex items-start gap-2">
                  <span>•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

// Testimonials Tab - Similar pattern
const TestimonialsTab = ({ testimonials, fetchTestimonials, getAuthHeaders, toast }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    text: '',
    rating: 5,
    image: ''
  });

  const handleAdd = () => {
    setIsAdding(true);
    setFormData({ name: '', role: '', text: '', rating: 5, image: '' });
  };

  const handleEdit = (testimonial) => {
    setEditingId(testimonial.id);
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      text: testimonial.text,
      rating: testimonial.rating,
      image: testimonial.image
    });
  };

  const handleSave = async () => {
    try {
      if (isAdding) {
        await axios.post(`${API}/admin/testimonials`, formData, getAuthHeaders());
        toast({ title: "Testimonial added successfully!" });
      } else {
        await axios.put(`${API}/admin/testimonials/${editingId}`, formData, getAuthHeaders());
        toast({ title: "Testimonial updated successfully!" });
      }
      setIsAdding(false);
      setEditingId(null);
      fetchTestimonials();
    } catch (error) {
      toast({
        title: "Error saving testimonial",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await axios.delete(`${API}/admin/testimonials/${id}`, getAuthHeaders());
        toast({ title: "Testimonial deleted successfully!" });
        fetchTestimonials();
      } catch (error) {
        toast({
          title: "Error deleting testimonial",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title">Testimonials Management</h2>
        <button onClick={handleAdd} className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          Add Testimonial
        </button>
      </div>

      {(isAdding || editingId) && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="artist-name mb-4">{isAdding ? 'Add New Testimonial' : 'Edit Testimonial'}</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Client Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-300 focus:border-black outline-none"
            />
            <input
              type="text"
              placeholder="Role/Title"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-300 focus:border-black outline-none"
            />
            <textarea
              placeholder="Testimonial Text"
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              rows="4"
              className="w-full px-4 py-2 border-2 border-gray-300 focus:border-black outline-none resize-none"
            />
            <input
              type="number"
              placeholder="Rating (1-5)"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              min="1"
              max="5"
              className="w-full px-4 py-2 border-2 border-gray-300 focus:border-black outline-none"
            />
            <input
              type="text"
              placeholder="Client Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-300 focus:border-black outline-none"
            />

            <div className="flex gap-2">
              <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                <Save size={18} />
                Save
              </button>
              <button 
                onClick={() => { setIsAdding(false); setEditingId(null); }} 
                className="btn-outline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="border rounded-lg p-6">
            <div className="flex items-start gap-4 mb-4">
              <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1">
                <h3 className="nav-link">{testimonial.name}</h3>
                <p className="caption-text">{testimonial.role}</p>
                <div className="flex gap-1 mt-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
              </div>
            </div>
            <p className="body-text mb-4 italic">"{testimonial.text}"</p>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(testimonial)} className="btn-outline flex-1 flex items-center justify-center gap-2">
                <Edit size={16} />
                Edit
              </button>
              <button onClick={() => handleDelete(testimonial.id)} className="btn-outline flex-1 flex items-center justify-center gap-2 text-red-600 border-red-600">
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Inquiries Tab
const InquiriesTab = ({ inquiries, fetchContactSubmissions, getAuthHeaders, toast }) => {
  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`${API}/admin/contact-submissions/${id}/status?status=${status}`, {}, getAuthHeaders());
      toast({ title: "Status updated successfully!" });
      fetchContactSubmissions();
    } catch (error) {
      toast({
        title: "Error updating status",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-500 text-white';
      case 'read': return 'bg-gray-500 text-white';
      case 'contacted': return 'bg-green-500 text-white';
      case 'closed': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div>
      <h2 className="section-title mb-6">Contact Inquiries</h2>
      
      <div className="space-y-4">
        {inquiries.map((inquiry) => (
          <div key={inquiry.id} className="border rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="artist-name">{inquiry.name}</h3>
                <p className="body-text">{inquiry.email} • {inquiry.phone}</p>
                <p className="caption-text">Service: {inquiry.service}</p>
                {inquiry.date && <p className="caption-text">Preferred Date: {inquiry.date}</p>}
              </div>
              <span className={`type-indicator px-3 py-1 rounded ${getStatusColor(inquiry.status)}`}>
                {inquiry.status}
              </span>
            </div>
            
            <p className="body-text mb-4">{inquiry.message}</p>
            
            <div className="flex gap-2">
              <select
                value={inquiry.status}
                onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                className="px-4 py-2 border-2 border-gray-300 focus:border-black outline-none"
              >
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            
            <p className="caption-text mt-4">
              Received: {new Date(inquiry.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
