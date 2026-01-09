from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List, Optional
from datetime import datetime, timedelta
import jwt
from passlib.context import CryptContext

from models import (
    PortfolioImage, PortfolioImageCreate, PortfolioImageUpdate,
    PhotographerInfo, PhotographerInfoUpdate,
    Service, ServiceCreate, ServiceUpdate,
    Testimonial, TestimonialCreate, TestimonialUpdate,
    ContactSubmission, ContactSubmissionCreate,
    AdminLogin, AdminToken
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Security
SECRET_KEY = os.environ.get('SECRET_KEY', 'your-secret-key-change-in-production')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440  # 24 hours

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Helper Functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        return username
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")

# Initialize default admin user
async def init_admin():
    admin_exists = await db.admins.find_one({"username": "admin"})
    if not admin_exists:
        default_admin = {
            "username": "admin",
            "password_hash": get_password_hash("admin123"),  # Change this password!
            "created_at": datetime.utcnow()
        }
        await db.admins.insert_one(default_admin)
        logger.info("Default admin user created: username=admin, password=admin123")

# Public Routes
@api_router.get("/")
async def root():
    return {"message": "Photography Website API"}

# Portfolio Routes (Public)
@api_router.get("/portfolio", response_model=List[PortfolioImage])
async def get_portfolio():
    images = await db.portfolio.find().sort("order", 1).to_list(1000)
    return [PortfolioImage(**img) for img in images]

@api_router.get("/portfolio/{image_id}", response_model=PortfolioImage)
async def get_portfolio_image(image_id: str):
    image = await db.portfolio.find_one({"id": image_id})
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    return PortfolioImage(**image)

# Photographer Info Routes (Public)
@api_router.get("/photographer-info", response_model=PhotographerInfo)
async def get_photographer_info():
    info = await db.photographer_info.find_one()
    if not info:
        # Return default info if none exists
        default_info = {
            "name": "Kaylin Mares",
            "tagline": "Capturing Life's Beautiful Moments",
            "bio": "With over 8 years of experience in professional photography, I specialize in creating timeless images that tell your unique story.",
            "email": "hello@kaylinmares.photo",
            "phone": "+1 (555) 123-4567",
            "location": "Los Angeles, CA"
        }
        return PhotographerInfo(**default_info)
    return PhotographerInfo(**info)

# Services Routes (Public)
@api_router.get("/services", response_model=List[Service])
async def get_services():
    services = await db.services.find().sort("order", 1).to_list(1000)
    return [Service(**service) for service in services]

# Testimonials Routes (Public)
@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    testimonials = await db.testimonials.find().to_list(1000)
    return [Testimonial(**testimonial) for testimonial in testimonials]

# Contact Form Routes (Public)
@api_router.post("/contact", response_model=ContactSubmission)
async def submit_contact_form(submission: ContactSubmissionCreate):
    submission_dict = submission.dict()
    contact_obj = ContactSubmission(**submission_dict)
    await db.contact_submissions.insert_one(contact_obj.dict())
    return contact_obj

# Admin Authentication Routes
@api_router.post("/admin/login", response_model=AdminToken)
async def admin_login(login_data: AdminLogin):
    admin = await db.admins.find_one({"username": login_data.username})
    if not admin or not verify_password(login_data.password, admin["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    access_token = create_access_token(data={"sub": login_data.username})
    return AdminToken(access_token=access_token)

# Admin Portfolio Routes
@api_router.post("/admin/portfolio", response_model=PortfolioImage)
async def create_portfolio_image(image: PortfolioImageCreate, admin: str = Depends(get_current_admin)):
    image_dict = image.dict()
    portfolio_obj = PortfolioImage(**image_dict)
    await db.portfolio.insert_one(portfolio_obj.dict())
    return portfolio_obj

@api_router.put("/admin/portfolio/{image_id}", response_model=PortfolioImage)
async def update_portfolio_image(image_id: str, image_update: PortfolioImageUpdate, admin: str = Depends(get_current_admin)):
    existing_image = await db.portfolio.find_one({"id": image_id})
    if not existing_image:
        raise HTTPException(status_code=404, detail="Image not found")
    
    update_data = {k: v for k, v in image_update.dict().items() if v is not None}
    if update_data:
        await db.portfolio.update_one({"id": image_id}, {"$set": update_data})
    
    updated_image = await db.portfolio.find_one({"id": image_id})
    return PortfolioImage(**updated_image)

@api_router.delete("/admin/portfolio/{image_id}")
async def delete_portfolio_image(image_id: str, admin: str = Depends(get_current_admin)):
    result = await db.portfolio.delete_one({"id": image_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Image not found")
    return {"message": "Image deleted successfully"}

# Admin Photographer Info Routes
@api_router.put("/admin/photographer-info", response_model=PhotographerInfo)
async def update_photographer_info(info_update: PhotographerInfoUpdate, admin: str = Depends(get_current_admin)):
    existing_info = await db.photographer_info.find_one()
    
    update_data = {k: v for k, v in info_update.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    if existing_info:
        await db.photographer_info.update_one({"id": existing_info["id"]}, {"$set": update_data})
        updated_info = await db.photographer_info.find_one({"id": existing_info["id"]})
    else:
        # Create new if doesn't exist
        new_info = PhotographerInfo(**update_data)
        await db.photographer_info.insert_one(new_info.dict())
        updated_info = new_info.dict()
    
    return PhotographerInfo(**updated_info)

# Admin Services Routes
@api_router.post("/admin/services", response_model=Service)
async def create_service(service: ServiceCreate, admin: str = Depends(get_current_admin)):
    service_dict = service.dict()
    service_obj = Service(**service_dict)
    await db.services.insert_one(service_obj.dict())
    return service_obj

@api_router.put("/admin/services/{service_id}", response_model=Service)
async def update_service(service_id: str, service_update: ServiceUpdate, admin: str = Depends(get_current_admin)):
    existing_service = await db.services.find_one({"id": service_id})
    if not existing_service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    update_data = {k: v for k, v in service_update.dict().items() if v is not None}
    if update_data:
        await db.services.update_one({"id": service_id}, {"$set": update_data})
    
    updated_service = await db.services.find_one({"id": service_id})
    return Service(**updated_service)

@api_router.delete("/admin/services/{service_id}")
async def delete_service(service_id: str, admin: str = Depends(get_current_admin)):
    result = await db.services.delete_one({"id": service_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Service not found")
    return {"message": "Service deleted successfully"}

# Admin Testimonials Routes
@api_router.post("/admin/testimonials", response_model=Testimonial)
async def create_testimonial(testimonial: TestimonialCreate, admin: str = Depends(get_current_admin)):
    testimonial_dict = testimonial.dict()
    testimonial_obj = Testimonial(**testimonial_dict)
    await db.testimonials.insert_one(testimonial_obj.dict())
    return testimonial_obj

@api_router.put("/admin/testimonials/{testimonial_id}", response_model=Testimonial)
async def update_testimonial(testimonial_id: str, testimonial_update: TestimonialUpdate, admin: str = Depends(get_current_admin)):
    existing_testimonial = await db.testimonials.find_one({"id": testimonial_id})
    if not existing_testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    
    update_data = {k: v for k, v in testimonial_update.dict().items() if v is not None}
    if update_data:
        await db.testimonials.update_one({"id": testimonial_id}, {"$set": update_data})
    
    updated_testimonial = await db.testimonials.find_one({"id": testimonial_id})
    return Testimonial(**updated_testimonial)

@api_router.delete("/admin/testimonials/{testimonial_id}")
async def delete_testimonial(testimonial_id: str, admin: str = Depends(get_current_admin)):
    result = await db.testimonials.delete_one({"id": testimonial_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return {"message": "Testimonial deleted successfully"}

# Admin Contact Submissions Routes
@api_router.get("/admin/contact-submissions", response_model=List[ContactSubmission])
async def get_contact_submissions(admin: str = Depends(get_current_admin)):
    submissions = await db.contact_submissions.find().sort("created_at", -1).to_list(1000)
    return [ContactSubmission(**submission) for submission in submissions]

@api_router.put("/admin/contact-submissions/{submission_id}/status")
async def update_submission_status(submission_id: str, status: str, admin: str = Depends(get_current_admin)):
    result = await db.contact_submissions.update_one(
        {"id": submission_id},
        {"$set": {"status": status}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Submission not found")
    return {"message": "Status updated successfully"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_db_client():
    await init_admin()
    logger.info("Database initialized")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
