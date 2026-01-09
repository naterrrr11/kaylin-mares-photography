# Self-Hosting Guide - Photography Website

This guide covers deploying your photography website to various hosting platforms.

## 🚀 Platform-Specific Guides

### 1. Vercel (Frontend) + Railway (Backend) - EASIEST

**Best for**: Beginners, quick deployment, automatic SSL

#### Step 1: Deploy Backend to Railway

1. Go to [railway.app](https://railway.app) and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository (or upload the backend folder)
4. Railway will auto-detect it's a Python app
5. Add environment variables:
   ```
   MONGO_URL=your_mongodb_connection_string
   DB_NAME=photography_website
   SECRET_KEY=generate_a_random_secure_key_here
   ```
6. Click "Deploy"
7. Copy your backend URL (e.g., `https://your-app.up.railway.app`)

#### Step 2: Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "New Project" → Import your repository
3. Select the `frontend` folder as root directory
4. Add environment variable:
   ```
   REACT_APP_BACKEND_URL=https://your-app.up.railway.app
   ```
5. Click "Deploy"
6. Your site will be live at `https://your-site.vercel.app`

#### Step 3: Setup MongoDB Atlas

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account → Create cluster (M0 Free tier)
3. Create database user (Database Access)
4. Allow network access (0.0.0.0/0 for all IPs)
5. Get connection string and update Railway env vars

#### Step 4: Seed Your Database

1. Install MongoDB locally or use Railway terminal
2. Update `.env` with your MongoDB connection
3. Run: `python seed_data.py`

---

### 2. Netlify (Frontend) + Render (Backend)

**Best for**: Simple deployment, generous free tier

#### Backend on Render:
1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect your GitHub repo
4. Build Command: `pip install -r requirements.txt`
5. Start Command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
6. Add environment variables (same as Railway)

#### Frontend on Netlify:
1. Go to [netlify.com](https://netlify.com)
2. New site from Git
3. Build command: `yarn build`
4. Publish directory: `build`
5. Add environment variable: `REACT_APP_BACKEND_URL`

---

### 3. DigitalOcean Droplet (Full Control)

**Best for**: Advanced users, full control, cost-effective

#### Step 1: Create Droplet
1. Sign up at [digitalocean.com](https://digitalocean.com)
2. Create Droplet (Ubuntu 22.04, $6/month)
3. SSH into your server: `ssh root@your_ip`

#### Step 2: Install Dependencies
```bash
# Update system
apt update && apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install Python
apt install -y python3 python3-pip

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list
apt update
apt install -y mongodb-org
systemctl start mongod
systemctl enable mongod

# Install Nginx
apt install -y nginx

# Install PM2 (process manager)
npm install -g pm2 yarn
```

#### Step 3: Deploy Backend
```bash
# Create app directory
mkdir -p /var/www/photography
cd /var/www/photography

# Upload your files (use scp or git)
# Assuming files are in /tmp/photography_package

# Copy backend
cp -r /tmp/photography_package/backend /var/www/photography/

# Install Python dependencies
cd /var/www/photography/backend
pip3 install -r requirements.txt

# Create .env file
cat > .env << EOF
MONGO_URL=mongodb://localhost:27017/
DB_NAME=photography_website
SECRET_KEY=$(openssl rand -hex 32)
EOF

# Seed database
python3 seed_data.py

# Start backend with PM2
pm2 start "uvicorn server:app --host 0.0.0.0 --port 8001" --name photography-backend
pm2 save
pm2 startup
```

#### Step 4: Deploy Frontend
```bash
# Copy frontend
cp -r /tmp/photography_package/frontend /var/www/photography/

cd /var/www/photography/frontend

# Create .env
echo "REACT_APP_BACKEND_URL=http://your_domain.com/api" > .env

# Install and build
yarn install
yarn build

# Copy build to nginx
cp -r build/* /var/www/html/
```

#### Step 5: Configure Nginx
```bash
cat > /etc/nginx/sites-available/photography << 'EOF'
server {
    listen 80;
    server_name your_domain.com;

    # Frontend
    location / {
        root /var/www/html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Enable site
ln -s /etc/nginx/sites-available/photography /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx
```

#### Step 6: Setup SSL with Let's Encrypt
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d your_domain.com
# Follow prompts to setup SSL
```

---

### 4. AWS (Advanced)

**Best for**: Enterprise, scalability, AWS credits

#### Services to use:
- **Frontend**: S3 + CloudFront
- **Backend**: EC2 or ECS
- **Database**: DocumentDB or MongoDB Atlas

#### Quick Setup:
1. **S3 for Frontend**:
   - Create S3 bucket
   - Enable static website hosting
   - Upload `yarn build` output
   - Configure CloudFront for CDN

2. **EC2 for Backend**:
   - Launch t2.micro instance
   - Follow DigitalOcean steps above
   - Configure security groups

3. **RDS or DocumentDB**:
   - Use managed MongoDB service
   - Update connection string

---

### 5. Docker Deployment (Any Platform)

**Best for**: Consistent environments, easy scaling

#### Using Docker Compose:
```bash
# Your package already includes docker-compose.yml!

# Update environment variables in docker-compose.yml
nano docker-compose.yml

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## 🔧 Environment Variables Reference

### Frontend (.env)
```bash
REACT_APP_BACKEND_URL=https://your-backend-url.com
```

### Backend (.env)
```bash
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/
DB_NAME=photography_website
SECRET_KEY=your-super-secret-jwt-key-min-32-chars
```

### Generate Secure SECRET_KEY:
```bash
# On Linux/Mac
openssl rand -hex 32

# On Windows (PowerShell)
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})

# Or use online generator:
# https://randomkeygen.com/ (use Fort Knox Passwords)
```

---

## 🗄️ MongoDB Options

### Option 1: MongoDB Atlas (Recommended)
- **Free tier**: 512MB storage
- **Setup**: 5 minutes
- **URL**: mongodb.com/cloud/atlas
- **Best for**: Most users

### Option 2: Self-hosted MongoDB
- **Install on same server as backend**
- **Free**: Unlimited storage
- **Requires**: Server management skills

### Option 3: Cloud Providers
- **AWS DocumentDB**: AWS users
- **DigitalOcean Managed MongoDB**: DO users
- **Railway MongoDB**: Railway users

---

## 🌐 Custom Domain Setup

### Using Namecheap/GoDaddy DNS:
1. Buy domain from registrar
2. Go to DNS management
3. Add these records:
   ```
   Type  Name    Value                TTL
   A     @       your_server_ip       300
   A     www     your_server_ip       300
   ```
4. Wait 24 hours for DNS propagation
5. Update your hosting platform with custom domain

### On Vercel:
1. Project Settings → Domains
2. Add your domain
3. Follow Vercel's DNS instructions

### On Railway:
1. Project → Settings → Domains
2. Add custom domain
3. Update your DNS records

---

## 📊 Monitoring & Maintenance

### Health Checks:
```bash
# Check backend
curl https://your-backend.com/api/

# Check frontend
curl https://your-website.com

# Check MongoDB
mongosh "your_connection_string"
```

### Logs:
- **Vercel**: Dashboard → Logs
- **Railway**: Dashboard → Deployments → Logs
- **Server**: `pm2 logs` or `journalctl -u nginx`

### Backups:
```bash
# Backup MongoDB
mongodump --uri="your_connection_string" --out=/backup/$(date +%Y%m%d)

# Automate with cron
crontab -e
# Add: 0 2 * * * mongodump --uri="..." --out=/backup/$(date +\%Y\%m\%d)
```

---

## 🆘 Troubleshooting

### Frontend can't reach backend:
- Check REACT_APP_BACKEND_URL is correct
- Verify CORS is enabled in backend
- Check backend is actually running

### 502 Bad Gateway:
- Backend server is down
- Check backend logs
- Restart backend service

### MongoDB connection failed:
- Verify connection string
- Check IP whitelist in MongoDB Atlas
- Ensure MongoDB service is running

### Admin can't login:
- Run seed_data.py to create admin user
- Check SECRET_KEY is set
- Clear browser cache and try again

---

## 💰 Cost Estimates

### Free Tier (Perfect for starting):
- Vercel: Free (generous limits)
- Railway: $5/month (500 hours free)
- MongoDB Atlas: Free (512MB)
- **Total: ~$5/month**

### Professional Setup:
- Vercel Pro: $20/month
- Railway: $20/month
- MongoDB Atlas M10: $57/month
- **Total: ~$97/month**

### Self-Hosted:
- DigitalOcean Droplet: $6/month
- Domain: $10-15/year
- **Total: ~$7/month**

---

## ✅ Deployment Checklist

- [ ] MongoDB database created and accessible
- [ ] Backend deployed and running
- [ ] Frontend deployed and loading
- [ ] Environment variables configured correctly
- [ ] Database seeded with initial data
- [ ] Admin login working
- [ ] Contact form sending to database
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Changed default admin password
- [ ] Backups configured
- [ ] Monitoring setup

---

**Need Help?** Check the logs on your hosting platform or review the deployment guide sections above.
