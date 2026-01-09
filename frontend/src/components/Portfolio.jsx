import React, { useState } from 'react';
import { portfolioImages, categories } from '../data/mockData';
import { ZoomIn } from 'lucide-react';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState(null);

  const filteredImages = selectedCategory === 'All' 
    ? portfolioImages 
    : portfolioImages.filter(img => img.category === selectedCategory);

  return (
    <section id="portfolio" className="section-spacing-large" style={{ backgroundColor: 'var(--color-gray-100)' }}>
      <div className="container-photography">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Portfolio</h2>
          <p className="body-text max-w-2xl mx-auto">
            Explore a curated selection of my work across various photography styles and genres.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`type-indicator px-6 py-2 transition-all ${
                selectedCategory === category 
                  ? 'bg-black text-white' 
                  : 'bg-white text-black border-2 border-black'
              }`}
              style={{ cursor: 'pointer' }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredImages.map((image, index) => (
            <div 
              key={image.id} 
              className="image-overlay-container fade-in-up"
              style={{ 
                height: '400px',
                animationDelay: `${index * 0.1}s`
              }}
              onClick={() => setLightboxImage(image)}
            >
              <img 
                src={image.url} 
                alt={image.title}
                style={{ objectFit: 'cover' }}
              />
              <div className="image-overlay">
                <div className="text-center">
                  <ZoomIn size={32} className="mx-auto mb-2" />
                  <p className="type-indicator text-white mb-1">{image.category}</p>
                  <h3 className="artist-name text-white">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-6xl max-h-screen">
            <button
              className="absolute top-4 right-4 text-white text-4xl font-bold hover:opacity-70"
              onClick={() => setLightboxImage(null)}
            >
              ×
            </button>
            <img 
              src={lightboxImage.url} 
              alt={lightboxImage.title}
              className="max-w-full max-h-screen object-contain"
            />
            <div className="text-center mt-4">
              <h3 className="artist-name text-white mb-2">{lightboxImage.title}</h3>
              <p className="caption-text text-white">{lightboxImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
