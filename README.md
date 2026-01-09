# Kaylin Mares Photography Website

Professional photography portfolio with admin CMS built for Kaylin Mares.

## 🌟 Features

- ✅ Beautiful portfolio gallery with category filters
- ✅ Services & pricing management  
- ✅ Client testimonials showcase
- ✅ Contact form with inquiry tracking
- ✅ **Complete admin dashboard** to edit all content
- ✅ Responsive design for all devices
- ✅ Modern tech stack (React + FastAPI + MongoDB)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and Yarn
- Python 3.11+
- MongoDB (or use MongoDB Atlas free tier)

### Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB connection string
pip install -r requirements.txt
python seed_data.py
python -m uvicorn server:app --host 0.0.0.0 --port 8001
```

### Frontend Setup
```bash
cd frontend
cp .env.example .env
# Edit .env with your backend URL (default: http://localhost:8001)
yarn install
yarn start
```

### Access
- **Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/login
- **Credentials**: username=`admin`, password=`admin123`

⚠️ **Change the default password after first login!**

## 📚 Documentation

- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Deploy to Vercel, Railway, or your own server
- **[COMPLETE_OWNERSHIP_GUIDE.md](COMPLETE_OWNERSHIP_GUIDE.md)** - Everything about owning & customizing
- **[GITHUB_PUSH_GUIDE.md](GITHUB_PUSH_GUIDE.md)** - How to manage your code on GitHub

## 🎨 Admin Panel

Login at `/admin/login` to manage:
- Portfolio images (add/edit/delete)
- Personal information (name, bio, contact)
- Services & pricing
- Testimonials
- Contact form submissions

## 🛠️ Tech Stack

- **Frontend**: React 19, Tailwind CSS, Shadcn UI
- **Backend**: FastAPI (Python 3.11)
- **Database**: MongoDB
- **Authentication**: JWT with bcrypt

## 📦 Deployment

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.

**Recommended Setup (Free/Low Cost):**
- Frontend: Vercel (FREE)
- Backend: Railway ($5/month)
- Database: MongoDB Atlas (FREE)

## 🔒 Security

- Change default admin password immediately
- Use environment variables for sensitive data
- Enable SSL in production (auto on Vercel/Railway)
- Keep dependencies updated

## 💼 License

This website was custom built for Kaylin Mares. All rights reserved.

## 🆘 Support

For deployment help, see the comprehensive guides in this repository.

---

Built with ❤️ for professional photography
