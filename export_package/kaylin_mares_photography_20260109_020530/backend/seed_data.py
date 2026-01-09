"""
Data seeder to populate database with mock data from frontend
Run this once to migrate frontend mock data to MongoDB
"""
import asyncio
import sys
from pathlib import Path

# Add backend directory to path
sys.path.insert(0, str(Path(__file__).parent))

from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from datetime import datetime

# Load environment
load_dotenv()

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Mock data
photographer_info = {
    "id": "photographer-info-1",
    "name": "Kaylin Mares",
    "tagline": "Capturing Life's Beautiful Moments",
    "bio": "With over 8 years of experience in professional photography, I specialize in creating timeless images that tell your unique story. My passion lies in capturing authentic emotions and genuine moments that you'll treasure forever.",
    "email": "hello@kaylinmares.photo",
    "phone": "+1 (555) 123-4567",
    "location": "Los Angeles, CA",
    "updated_at": datetime.utcnow()
}

portfolio_images = [
    {
        "id": "img-1",
        "url": "https://images.unsplash.com/photo-1684919556999-a42d37ffccc1",
        "category": "Portrait",
        "title": "Professional Headshot",
        "description": "Corporate portrait session",
        "order": 1,
        "created_at": datetime.utcnow()
    },
    {
        "id": "img-2",
        "url": "https://images.unsplash.com/photo-1767439567636-792a76f6e4b7",
        "category": "Portrait",
        "title": "Artistic Portrait",
        "description": "Creative outdoor portrait",
        "order": 2,
        "created_at": datetime.utcnow()
    },
    {
        "id": "img-3",
        "url": "https://images.unsplash.com/photo-1533091090875-1ff4acc497dd",
        "category": "Wedding",
        "title": "Wedding Details",
        "description": "Elegant ring ceremony",
        "order": 3,
        "created_at": datetime.utcnow()
    },
    {
        "id": "img-4",
        "url": "https://images.unsplash.com/photo-1573676048035-9c2a72b6a12a",
        "category": "Wedding",
        "title": "Wedding Ceremony",
        "description": "Classic wedding moments",
        "order": 4,
        "created_at": datetime.utcnow()
    },
    {
        "id": "img-5",
        "url": "https://images.unsplash.com/flagged/photo-1552981941-424aac2b4311",
        "category": "Wedding",
        "title": "Romantic Moments",
        "description": "Couple photography",
        "order": 5,
        "created_at": datetime.utcnow()
    },
    {
        "id": "img-6",
        "url": "https://images.unsplash.com/photo-1584282479918-1ea22427dc0f",
        "category": "Nature",
        "title": "Landscape Beauty",
        "description": "Natural scenery",
        "order": 6,
        "created_at": datetime.utcnow()
    },
    {
        "id": "img-7",
        "url": "https://images.unsplash.com/photo-1501446529957-6226bd447c46",
        "category": "Nature",
        "title": "Mountain Reflections",
        "description": "Scenic landscape photography",
        "order": 7,
        "created_at": datetime.utcnow()
    },
    {
        "id": "img-8",
        "url": "https://images.unsplash.com/photo-1617724975854-70b5d0cedb0a",
        "category": "Wedding",
        "title": "Beach Wedding",
        "description": "Destination wedding photography",
        "order": 8,
        "created_at": datetime.utcnow()
    },
    {
        "id": "img-9",
        "url": "https://images.unsplash.com/photo-1521753643072-122f97ed86e4",
        "category": "Nature",
        "title": "Botanical Beauty",
        "description": "Macro nature photography",
        "order": 9,
        "created_at": datetime.utcnow()
    }
]

services = [
    {
        "id": "service-1",
        "title": "Wedding Photography",
        "description": "Comprehensive wedding coverage capturing every precious moment from preparation to celebration. Includes engagement session and online gallery.",
        "price": "Starting at $2,500",
        "features": [
            "8-10 hours coverage",
            "Second photographer",
            "Engagement session included",
            "Online gallery with high-res images",
            "Print release included"
        ],
        "order": 1,
        "created_at": datetime.utcnow()
    },
    {
        "id": "service-2",
        "title": "Portrait Sessions",
        "description": "Professional portraits for individuals, families, or corporate headshots. Perfect for personal branding and special occasions.",
        "price": "Starting at $350",
        "features": [
            "1-2 hours session",
            "Location of your choice",
            "20-30 edited images",
            "Online gallery access",
            "Personal consultation"
        ],
        "order": 2,
        "created_at": datetime.utcnow()
    },
    {
        "id": "service-3",
        "title": "Event Photography",
        "description": "Professional coverage for corporate events, parties, and special celebrations. Capturing the energy and atmosphere of your event.",
        "price": "Starting at $500",
        "features": [
            "4-6 hours coverage",
            "Candid and posed shots",
            "Same-day sneak peeks",
            "Full edited gallery",
            "Fast turnaround"
        ],
        "order": 3,
        "created_at": datetime.utcnow()
    },
    {
        "id": "service-4",
        "title": "Commercial & Product",
        "description": "High-quality product photography for businesses, e-commerce, and marketing materials. Make your products stand out.",
        "price": "Starting at $400",
        "features": [
            "Studio or on-location",
            "Multiple angles & styling",
            "Professional retouching",
            "Commercial usage rights",
            "Quick delivery"
        ],
        "order": 4,
        "created_at": datetime.utcnow()
    }
]

testimonials = [
    {
        "id": "testimonial-1",
        "name": "Sarah Johnson",
        "role": "Bride",
        "text": "Alex captured our wedding day perfectly! Every emotion, every moment was beautifully preserved. We couldn't be happier with the results.",
        "rating": 5,
        "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        "created_at": datetime.utcnow()
    },
    {
        "id": "testimonial-2",
        "name": "Michael Chen",
        "role": "Business Owner",
        "text": "Professional, creative, and delivered exactly what we needed for our marketing campaign. The product shots exceeded our expectations!",
        "rating": 5,
        "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        "created_at": datetime.utcnow()
    },
    {
        "id": "testimonial-3",
        "name": "Emily Rodriguez",
        "role": "Marketing Director",
        "text": "Working with Alex was a pleasure. The corporate headshots turned out amazing and the team loved their photos. Highly recommend!",
        "rating": 5,
        "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        "created_at": datetime.utcnow()
    }
]

async def seed_data():
    print("Starting data migration...")
    
    # Clear existing data
    await db.photographer_info.delete_many({})
    await db.portfolio.delete_many({})
    await db.services.delete_many({})
    await db.testimonials.delete_many({})
    print("✓ Cleared existing data")
    
    # Insert photographer info
    await db.photographer_info.insert_one(photographer_info)
    print("✓ Inserted photographer info")
    
    # Insert portfolio images
    await db.portfolio.insert_many(portfolio_images)
    print(f"✓ Inserted {len(portfolio_images)} portfolio images")
    
    # Insert services
    await db.services.insert_many(services)
    print(f"✓ Inserted {len(services)} services")
    
    # Insert testimonials
    await db.testimonials.insert_many(testimonials)
    print(f"✓ Inserted {len(testimonials)} testimonials")
    
    print("\n✅ Data migration completed successfully!")
    print("\nYou can now:")
    print("1. Login to admin at: http://localhost:3000/admin/login")
    print("2. Use credentials: admin / admin123")
    print("3. Edit all content through the dashboard")

if __name__ == "__main__":
    asyncio.run(seed_data())
    client.close()
