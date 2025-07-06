from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'portfolio_db')]

# Create the main app
app = FastAPI(title="Watty Eventice Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Portfolio Data Models
class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: str
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    technologies: List[str]
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    image_url: Optional[str] = None
    featured: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ProjectCreate(BaseModel):
    title: str
    description: str
    technologies: List[str]
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    image_url: Optional[str] = None
    featured: bool = False

class Skill(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    category: str  # frontend, backend, tools, etc.
    proficiency: int  # 1-10
    icon: Optional[str] = None

class Experience(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    company: str
    location: str
    start_date: str
    end_date: Optional[str] = None
    description: List[str]
    is_current: bool = False

# API Routes
@api_router.get("/")
async def root():
    return {"message": "Watty Eventice Portfolio API - Welcome to my developer portfolio backend"}

# Contact Form Routes
@api_router.post("/contact", response_model=ContactMessage)
async def submit_contact_form(contact_data: ContactMessageCreate):
    """Submit a contact form message"""
    contact_dict = contact_data.dict()
    contact_obj = ContactMessage(**contact_dict)
    
    try:
        await db.contact_messages.insert_one(contact_obj.dict())
        return contact_obj
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save contact message: {str(e)}")

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    """Get all contact messages (admin only)"""
    try:
        messages = await db.contact_messages.find().sort("timestamp", -1).to_list(100)
        return [ContactMessage(**msg) for msg in messages]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch messages: {str(e)}")

# Projects Routes
@api_router.get("/projects", response_model=List[Project])
async def get_projects():
    """Get all projects"""
    try:
        projects = await db.projects.find().sort("created_at", -1).to_list(100)
        return [Project(**project) for project in projects]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch projects: {str(e)}")

@api_router.get("/projects/featured", response_model=List[Project])
async def get_featured_projects():
    """Get featured projects only"""
    try:
        projects = await db.projects.find({"featured": True}).sort("created_at", -1).to_list(10)
        return [Project(**project) for project in projects]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch featured projects: {str(e)}")

@api_router.post("/projects", response_model=Project)
async def create_project(project_data: ProjectCreate):
    """Create a new project"""
    project_dict = project_data.dict()
    project_obj = Project(**project_dict)
    
    try:
        await db.projects.insert_one(project_obj.dict())
        return project_obj
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create project: {str(e)}")

# Skills Routes
@api_router.get("/skills", response_model=List[Skill])
async def get_skills():
    """Get all skills"""
    try:
        skills = await db.skills.find().sort("proficiency", -1).to_list(100)
        return [Skill(**skill) for skill in skills]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch skills: {str(e)}")

@api_router.get("/skills/{category}")
async def get_skills_by_category(category: str):
    """Get skills by category"""
    try:
        skills = await db.skills.find({"category": category}).sort("proficiency", -1).to_list(100)
        return [Skill(**skill) for skill in skills]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch skills: {str(e)}")

# Experience Routes
@api_router.get("/experience", response_model=List[Experience])
async def get_experience():
    """Get all work experience"""
    try:
        experiences = await db.experiences.find().sort("start_date", -1).to_list(100)
        return [Experience(**exp) for exp in experiences]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch experience: {str(e)}")

# Data seeding route for initial portfolio data
@api_router.post("/seed-data")
async def seed_portfolio_data():
    """Seed initial portfolio data"""
    try:
        # Sample projects
        sample_projects = [
            {
                "id": str(uuid.uuid4()),
                "title": "E-Commerce Platform",
                "description": "A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.",
                "technologies": ["React", "Node.js", "MongoDB", "Express", "Stripe", "JWT"],
                "github_url": "https://github.com/watty-eventice/ecommerce-platform",
                "live_url": "https://ecommerce-demo.com",
                "featured": True,
                "created_at": datetime.utcnow()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Task Management App",
                "description": "A responsive task management application with drag-and-drop functionality, real-time updates, and team collaboration features.",
                "technologies": ["React", "TypeScript", "Firebase", "Material-UI", "React DnD"],
                "github_url": "https://github.com/watty-eventice/task-manager",
                "live_url": "https://task-manager-demo.com",
                "featured": True,
                "created_at": datetime.utcnow()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Weather Dashboard",
                "description": "A beautiful weather dashboard with location-based forecasts, interactive maps, and weather alerts using OpenWeatherMap API.",
                "technologies": ["React", "OpenWeatherMap API", "Chart.js", "CSS3", "Geolocation"],
                "github_url": "https://github.com/watty-eventice/weather-dashboard",
                "live_url": "https://weather-dashboard-demo.com",
                "featured": False,
                "created_at": datetime.utcnow()
            }
        ]
        
        # Sample skills
        sample_skills = [
            {"id": str(uuid.uuid4()), "name": "React", "category": "frontend", "proficiency": 9},
            {"id": str(uuid.uuid4()), "name": "JavaScript", "category": "frontend", "proficiency": 9},
            {"id": str(uuid.uuid4()), "name": "TypeScript", "category": "frontend", "proficiency": 8},
            {"id": str(uuid.uuid4()), "name": "HTML5", "category": "frontend", "proficiency": 10},
            {"id": str(uuid.uuid4()), "name": "CSS3", "category": "frontend", "proficiency": 9},
            {"id": str(uuid.uuid4()), "name": "Tailwind CSS", "category": "frontend", "proficiency": 8},
            {"id": str(uuid.uuid4()), "name": "Node.js", "category": "backend", "proficiency": 7},
            {"id": str(uuid.uuid4()), "name": "Express", "category": "backend", "proficiency": 7},
            {"id": str(uuid.uuid4()), "name": "MongoDB", "category": "backend", "proficiency": 6},
            {"id": str(uuid.uuid4()), "name": "Git", "category": "tools", "proficiency": 8},
            {"id": str(uuid.uuid4()), "name": "Webpack", "category": "tools", "proficiency": 7},
            {"id": str(uuid.uuid4()), "name": "Figma", "category": "tools", "proficiency": 6}
        ]
        
        # Sample experience
        sample_experience = [
            {
                "id": str(uuid.uuid4()),
                "title": "Senior Frontend Developer",
                "company": "TechCorp Solutions",
                "location": "San Francisco, CA",
                "start_date": "2022-01",
                "end_date": None,
                "is_current": True,
                "description": [
                    "Led frontend development for 5+ enterprise web applications using React and TypeScript",
                    "Improved application performance by 40% through code optimization and lazy loading",
                    "Mentored 3 junior developers and conducted code reviews",
                    "Collaborated with UX/UI team to implement responsive and accessible designs"
                ]
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Frontend Developer",
                "company": "StartupXYZ",
                "location": "Remote",
                "start_date": "2020-06",
                "end_date": "2021-12",
                "is_current": False,
                "description": [
                    "Developed and maintained React-based SaaS platform serving 10,000+ users",
                    "Implemented real-time features using WebSockets and Socket.io",
                    "Built responsive UI components with Material-UI and custom CSS",
                    "Integrated third-party APIs and payment gateways"
                ]
            }
        ]
        
        # Clear existing data
        await db.projects.delete_many({})
        await db.skills.delete_many({})
        await db.experiences.delete_many({})
        
        # Insert sample data
        await db.projects.insert_many(sample_projects)
        await db.skills.insert_many(sample_skills)
        await db.experiences.insert_many(sample_experience)
        
        return {"message": "Portfolio data seeded successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to seed data: {str(e)}")

# Include the API router
app.include_router(api_router)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_db_client():
    """Initialize database connection"""
    logger.info("Portfolio database connection established")

@app.on_event("shutdown")
async def shutdown_db_client():
    """Close database connection"""
    client.close()
    logger.info("Database connection closed")
