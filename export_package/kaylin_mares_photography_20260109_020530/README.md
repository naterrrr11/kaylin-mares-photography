# Kaylin Mares Photography Website

Professional photography portfolio website with admin CMS.

## Quick Start

### 1. Frontend Setup
```bash
cd frontend
cp .env.example .env
# Edit .env with your backend URL
yarn install
yarn start
```

### 2. Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB credentials
pip install -r requirements.txt
python seed_data.py  # Seed initial data
python -m uvicorn server:app --host 0.0.0.0 --port 8001
```

### 3. Access Your Website
- **Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/login
- **Default Login**: username=`admin`, password=`admin123`

## Deployment

See `DEPLOYMENT_GUIDE.md` for detailed deployment instructions.

## Features

- ✅ Portfolio gallery with category filters
- ✅ Services & pricing management
- ✅ Client testimonials
- ✅ Contact form with inquiry management
- ✅ Full admin dashboard to edit all content
- ✅ Responsive design
- ✅ JWT authentication
- ✅ MongoDB database

## Tech Stack

- **Frontend**: React 19, Tailwind CSS, Shadcn UI
- **Backend**: FastAPI (Python)
- **Database**: MongoDB
- **Authentication**: JWT with bcrypt

## Support

For deployment help, see DEPLOYMENT_GUIDE.md

---

Built with ❤️ for Kaylin Mares
