# Photography Website - Deployment Guide

## 📦 What You Have

A complete professional photography portfolio website with:
- **Frontend**: React application (runs on port 3000)
- **Backend**: FastAPI Python server (runs on port 8001)
- **Database**: MongoDB for storing all content
- **Admin Panel**: Full CMS to manage your content

## 🚀 Deployment Options

### Option 1: Deploy to Vercel (Recommended - Easiest)

**Frontend Deployment:**
1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "New Project" → Import from Git
3. Point to your frontend folder
4. Set build command: `yarn build`
5. Set output directory: `build`
6. Add environment variable:
   - `REACT_APP_BACKEND_URL` = your backend URL (see backend deployment)

**Backend Deployment:**
- Use [Railway.app](https://railway.app), [Render.com](https://render.com), or [Fly.io](https://fly.io)
- Connect your GitHub repo
- Set the root directory to `/backend`
- Add environment variables:
  - `MONGO_URL` = your MongoDB connection string
  - `DB_NAME` = your database name
  - `SECRET_KEY` = generate a random secure key

### Option 2: Deploy to Traditional Hosting (cPanel, VPS)

**Requirements:**
- Node.js 16+ for frontend
- Python 3.11+ for backend
- MongoDB (Atlas free tier recommended)

**Steps:**
1. Upload all files via FTP/SSH
2. Install dependencies:
   ```bash
   cd frontend && yarn install && yarn build
   cd backend && pip install -r requirements.txt
   ```
3. Configure environment variables (see below)
4. Use PM2 or systemd to run services
5. Set up nginx as reverse proxy

### Option 3: Deploy to Your Own Server (Full Control)

See detailed instructions in `SELF_HOSTING.md`

## 🔧 Environment Setup

### Frontend (.env file)
```
REACT_APP_BACKEND_URL=https://your-backend-url.com
```

### Backend (.env file)
```
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/
DB_NAME=photography_website
SECRET_KEY=your-super-secret-key-change-this-in-production
```

## 🗄️ Database Setup

### Using MongoDB Atlas (Free & Recommended)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier available)
4. Go to "Database Access" → Add new database user
5. Go to "Network Access" → Add IP (use 0.0.0.0/0 for all IPs)
6. Click "Connect" → Get your connection string
7. Replace `<password>` with your actual password
8. Use this as your `MONGO_URL`

### Seeding Initial Data

After setting up MongoDB, run the data seeder:
```bash
cd backend
python seed_data.py
```

This populates your database with initial content (portfolio images, services, testimonials).

## 🔐 Admin Access

- **Login URL**: `https://your-website.com/admin/login`
- **Default Username**: `admin`
- **Default Password**: `admin123`

**⚠️ IMPORTANT**: Change the default password after first login!

To change the password, you'll need to update the database:
1. Hash a new password using bcrypt
2. Update the `admins` collection in MongoDB

## 📁 Files You Need

### Essential Files:
```
frontend/
  ├── src/
  ├── public/
  ├── package.json
  ├── .env (create this)
  └── craco.config.js

backend/
  ├── server.py
  ├── models.py
  ├── seed_data.py
  ├── requirements.txt
  └── .env (create this)
```

## 🌐 Custom Domain Setup

1. **Purchase domain** from Namecheap, GoDaddy, etc.
2. **Update DNS records**:
   - Frontend: Point A record to your frontend host IP
   - Backend: Point A record or CNAME to backend host
3. **SSL Certificate**: Most hosts (Vercel, Netlify, Railway) provide free SSL automatically

## 📝 Post-Deployment Checklist

- [ ] Update photographer name and info in admin panel
- [ ] Upload your own portfolio images
- [ ] Update services and pricing
- [ ] Add real testimonials
- [ ] Test contact form submissions
- [ ] Change admin password
- [ ] Add your custom domain
- [ ] Enable SSL certificate
- [ ] Test all admin CRUD operations
- [ ] Verify email notifications (if configured)

## 🆘 Common Issues

### Frontend shows "Network Error"
- Check if REACT_APP_BACKEND_URL is correctly set
- Ensure backend is running and accessible
- Check CORS settings in backend

### Backend won't start
- Verify all dependencies are installed
- Check MongoDB connection string
- Ensure port 8001 is available

### Can't login to admin
- Verify you ran `seed_data.py` to create admin user
- Check browser console for errors
- Ensure JWT SECRET_KEY is set

### Images not loading
- Check if image URLs are accessible
- Verify portfolio data exists in MongoDB
- Check browser console for CORS errors

## 💡 Next Steps

1. **Backup your data**: Export MongoDB data regularly
2. **Monitor performance**: Use services like Sentry for error tracking
3. **SEO optimization**: Add meta tags, sitemap, robots.txt
4. **Analytics**: Add Google Analytics or similar
5. **Email notifications**: Configure SMTP for contact form emails

## 📧 Support

If you need help:
- Check the logs in your hosting platform
- Verify all environment variables are set correctly
- Ensure MongoDB is accessible from your backend

---

**Remember**: This is YOUR website. You own all the code and can modify it as needed!
