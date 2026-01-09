# Professional Freelance Photography Website - PRD

## Original Problem Statement
Build a professional website for freelance photography showcasing portfolio, services, and enabling client inquiries.

## User Personas
1. **Potential Clients** - Individuals/businesses looking to book photography services (weddings, portraits, events, commercial)
2. **Photographer (Admin)** - Alex Morgan, managing portfolio, responding to inquiries, updating services
3. **Returning Clients** - Past clients checking new work and testimonials

## Core Requirements (Static)
- Professional portfolio gallery with category filtering
- About section highlighting experience and credentials
- Services & pricing information
- Contact form for inquiries and bookings
- Testimonials showcase
- Responsive design for all devices
- Fast loading with optimized images
- SEO-friendly structure

## What's Been Implemented (January 9, 2025)

### Frontend (Complete - Mock Data)
1. **Hero Section**
   - Full-screen immersive background with camera equipment
   - Compelling tagline: "Capturing Life's Beautiful Moments"
   - Clear CTAs: "Book a Session" and "View Portfolio"
   - Smooth scroll indicator

2. **Header/Navigation**
   - Sticky header with transparent-to-solid transition on scroll
   - Smooth scroll navigation to sections
   - Mobile-responsive menu
   - Clear branding with photographer name

3. **Portfolio Gallery**
   - Interactive grid layout (3 columns on desktop, responsive)
   - Category filters: All, Portrait, Wedding, Nature, Events
   - 9 high-quality professional images from Unsplash
   - Hover effects with zoom and overlay
   - Lightbox viewer for full-screen image viewing
   - Image metadata display

4. **About Section**
   - Professional photographer biography
   - Stats showcase (500+ projects, 8+ years, 300+ clients)
   - Large featured image of photographer at work
   - CTA button to contact section

5. **Services & Pricing**
   - 4 service packages with detailed features:
     - Wedding Photography (Starting at $2,500)
     - Portrait Sessions (Starting at $350)
     - Event Photography (Starting at $500)
     - Commercial & Product (Starting at $400)
   - Feature lists with checkmarks
   - "Book Now" CTA on each package

6. **Testimonials**
   - 3 client testimonials with 5-star ratings
   - Client photos and roles
   - Quote styling with professional layout

7. **Contact Section**
   - Comprehensive contact form with fields:
     - Name, Email, Phone
     - Service selection dropdown
     - Preferred date picker
     - Message textarea
   - Contact information display (email, phone, location)
   - Business hours and response time info
   - Form validation
   - Toast notification on submission (mock)

8. **Footer**
   - Quick links navigation
   - Service list
   - Contact information
   - Social media icons (Instagram, Facebook, Twitter, Email)
   - Copyright information

### Design System
- **Typography**: Playfair Display (serif) for headings, Inter (sans-serif) for body
- **Colors**: Black/white/gray palette for timeless elegance
- **Animations**: Fade-in-up effects, smooth transitions, hover interactions
- **Layout**: Max-width 1400px container, consistent spacing (8-point grid)
- **Buttons**: Primary (filled) and outline styles with hover effects
- **Images**: Hover zoom effects, overlay interactions

### Mock Data Structure
- `photographerInfo`: Name, tagline, bio, contact details
- `portfolioImages`: 9 images with categories, titles, descriptions
- `services`: 4 packages with features and pricing
- `testimonials`: 3 client reviews with ratings
- `categories`: Filter options for portfolio

## Prioritized Backlog

### P0 Features (Critical for Launch)
1. **Backend API Development**
   - Contact form submission endpoint
   - Email notification system
   - Form data validation
   - MongoDB storage for inquiries

2. **Portfolio Management**
   - Backend API for portfolio CRUD operations
   - Image upload functionality
   - Category management

### P1 Features (Important)
1. **Admin Dashboard**
   - Login/authentication
   - View and manage inquiries
   - Update portfolio images
   - Edit services and pricing
   - Manage testimonials

2. **Email Integration**
   - Automated email responses to clients
   - Admin notification on new inquiry
   - Booking confirmation emails

3. **Calendar Integration**
   - Availability calendar
   - Date booking system
   - Prevent double-bookings

### P2 Features (Nice to Have)
1. **Blog Section**
   - Photography tips and tricks
   - Recent shoot showcases
   - SEO content for organic traffic

2. **Client Portal**
   - Login for past clients
   - Access to their photo galleries
   - Download purchased images

3. **Analytics Dashboard**
   - Track inquiries and conversions
   - Popular services metrics
   - Traffic sources

4. **Enhanced Gallery**
   - Full-screen slideshow mode
   - Download/sharing options
   - Before/after comparisons

## API Contracts (To Be Implemented)

### Contact Form
```
POST /api/contact
Request Body: {
  name: string,
  email: string,
  phone: string,
  service: string,
  date: string,
  message: string
}
Response: {
  success: boolean,
  message: string,
  inquiry_id: string
}
```

### Portfolio Images
```
GET /api/portfolio
Response: {
  images: Array<{
    id, url, category, title, description
  }>
}

POST /api/portfolio (Admin only)
Request: FormData with image file and metadata
```

## Next Tasks
1. Implement backend contact form API with email notifications
2. Create MongoDB schema for inquiries
3. Add portfolio management backend
4. Build admin authentication system
5. Test full-stack integration with testing_agent_v3

## Technical Stack
- **Frontend**: React 19, Tailwind CSS, Lucide Icons
- **Backend**: FastAPI, Python
- **Database**: MongoDB
- **Styling**: Custom CSS with photography.css design system
- **Components**: Shadcn UI components
