from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

# Portfolio Image Model
class PortfolioImage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    url: str
    category: str
    title: str
    description: str
    order: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)

class PortfolioImageCreate(BaseModel):
    url: str
    category: str
    title: str
    description: str
    order: int = 0

class PortfolioImageUpdate(BaseModel):
    url: Optional[str] = None
    category: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    order: Optional[int] = None

# Photographer Info Model
class PhotographerInfo(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    tagline: str
    bio: str
    email: str
    phone: str
    location: str
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class PhotographerInfoUpdate(BaseModel):
    name: Optional[str] = None
    tagline: Optional[str] = None
    bio: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None

# Service Model
class Service(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    price: str
    features: List[str]
    order: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ServiceCreate(BaseModel):
    title: str
    description: str
    price: str
    features: List[str]
    order: int = 0

class ServiceUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    price: Optional[str] = None
    features: Optional[List[str]] = None
    order: Optional[int] = None

# Testimonial Model
class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str
    text: str
    rating: int = 5
    image: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class TestimonialCreate(BaseModel):
    name: str
    role: str
    text: str
    rating: int = 5
    image: str

class TestimonialUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    text: Optional[str] = None
    rating: Optional[int] = None
    image: Optional[str] = None

# Contact Form Submission Model
class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    service: str
    date: Optional[str] = None
    message: str
    status: str = "new"  # new, read, contacted, closed
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ContactSubmissionCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    service: str
    date: Optional[str] = None
    message: str

# Admin User Model
class AdminUser(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    username: str
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class AdminLogin(BaseModel):
    username: str
    password: str

class AdminToken(BaseModel):
    access_token: str
    token_type: str = "bearer"
