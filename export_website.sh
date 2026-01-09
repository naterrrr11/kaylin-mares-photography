#!/bin/bash

# Photography Website - Export Script
# This script packages your website for deployment

echo "================================================"
echo "Photography Website - Export Package Creator"
echo "================================================"
echo ""

# Create export directory
EXPORT_DIR="/app/export_package"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
PACKAGE_NAME="kaylin_mares_photography_${TIMESTAMP}"
PACKAGE_DIR="${EXPORT_DIR}/${PACKAGE_NAME}"

echo "Creating export package: ${PACKAGE_NAME}"
mkdir -p "${PACKAGE_DIR}"

# Copy frontend files
echo "📦 Packaging frontend..."
mkdir -p "${PACKAGE_DIR}/frontend"
cp -r /app/frontend/src "${PACKAGE_DIR}/frontend/"
cp -r /app/frontend/public "${PACKAGE_DIR}/frontend/"
cp /app/frontend/package.json "${PACKAGE_DIR}/frontend/"
cp /app/frontend/craco.config.js "${PACKAGE_DIR}/frontend/"
cp /app/frontend/tailwind.config.js "${PACKAGE_DIR}/frontend/"
cp /app/frontend/.eslintrc.cjs "${PACKAGE_DIR}/frontend/" 2>/dev/null || true

# Create frontend .env template
cat > "${PACKAGE_DIR}/frontend/.env.example" << 'EOF'
# Frontend Environment Variables
# Copy this file to .env and update with your values

REACT_APP_BACKEND_URL=http://localhost:8001
EOF

echo "✓ Frontend packaged"

# Copy backend files
echo "📦 Packaging backend..."
mkdir -p "${PACKAGE_DIR}/backend"
cp /app/backend/server.py "${PACKAGE_DIR}/backend/"
cp /app/backend/models.py "${PACKAGE_DIR}/backend/"
cp /app/backend/seed_data.py "${PACKAGE_DIR}/backend/"
cp /app/backend/requirements.txt "${PACKAGE_DIR}/backend/"

# Create backend .env template
cat > "${PACKAGE_DIR}/backend/.env.example" << 'EOF'
# Backend Environment Variables
# Copy this file to .env and update with your values

MONGO_URL=mongodb://localhost:27017/
DB_NAME=photography_website
SECRET_KEY=change-this-to-a-secure-random-string-in-production
EOF

echo "✓ Backend packaged"

# Copy documentation
echo "📦 Packaging documentation..."
cp /app/DEPLOYMENT_GUIDE.md "${PACKAGE_DIR}/"

# Create README
cat > "${PACKAGE_DIR}/README.md" << 'EOF'
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
EOF

echo "✓ Documentation packaged"

# Create deployment scripts
echo "📦 Creating deployment scripts..."

# Frontend build script
cat > "${PACKAGE_DIR}/frontend/build.sh" << 'EOF'
#!/bin/bash
echo "Building frontend..."
yarn install
yarn build
echo "✓ Frontend built successfully! Output in ./build directory"
EOF
chmod +x "${PACKAGE_DIR}/frontend/build.sh"

# Backend start script
cat > "${PACKAGE_DIR}/backend/start.sh" << 'EOF'
#!/bin/bash
echo "Starting backend server..."
python -m uvicorn server:app --host 0.0.0.0 --port 8001
EOF
chmod +x "${PACKAGE_DIR}/backend/start.sh"

echo "✓ Deployment scripts created"

# Create Docker setup (optional)
echo "📦 Creating Docker configuration..."

cat > "${PACKAGE_DIR}/docker-compose.yml" << 'EOF'
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_BACKEND_URL=http://localhost:8001
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "8001:8001"
    environment:
      - MONGO_URL=mongodb://mongo:27017/
      - DB_NAME=photography_website
      - SECRET_KEY=your-secret-key-here
    depends_on:
      - mongo

  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
EOF

# Create frontend Dockerfile
cat > "${PACKAGE_DIR}/frontend/Dockerfile" << 'EOF'
FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
CMD ["yarn", "start"]
EOF

# Create backend Dockerfile
cat > "${PACKAGE_DIR}/backend/Dockerfile" << 'EOF'
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "-m", "uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8001"]
EOF

echo "✓ Docker configuration created"

# Create zip archive
echo "📦 Creating zip archive..."
cd "${EXPORT_DIR}"
zip -r "${PACKAGE_NAME}.zip" "${PACKAGE_NAME}" > /dev/null 2>&1
ZIP_SIZE=$(du -h "${PACKAGE_NAME}.zip" | cut -f1)

echo ""
echo "================================================"
echo "✅ Export Package Created Successfully!"
echo "================================================"
echo ""
echo "📁 Package Location:"
echo "   ${EXPORT_DIR}/${PACKAGE_NAME}.zip"
echo "   Size: ${ZIP_SIZE}"
echo ""
echo "📋 Package Contents:"
echo "   ✓ Frontend (React application)"
echo "   ✓ Backend (FastAPI server)"
echo "   ✓ Database seeder"
echo "   ✓ Deployment guide"
echo "   ✓ Docker configuration"
echo "   ✓ Build scripts"
echo ""
echo "🚀 Next Steps:"
echo "   1. Extract the zip file"
echo "   2. Read DEPLOYMENT_GUIDE.md"
echo "   3. Set up MongoDB database"
echo "   4. Configure environment variables"
echo "   5. Deploy to your hosting platform"
echo ""
echo "💡 Quick Test Locally:"
echo "   cd ${PACKAGE_NAME}/backend && python seed_data.py"
echo "   cd ${PACKAGE_NAME}/frontend && yarn install && yarn start"
echo ""
echo "================================================"
