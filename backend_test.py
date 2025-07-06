#!/usr/bin/env python3
import requests
import json
import unittest
import os
import sys
from dotenv import load_dotenv
import random
import string

# Load environment variables from frontend/.env to get the backend URL
load_dotenv('/app/frontend/.env')

# Get the backend URL from environment variables
BACKEND_URL = os.environ.get('REACT_APP_BACKEND_URL')
if not BACKEND_URL:
    print("Error: REACT_APP_BACKEND_URL not found in environment variables")
    sys.exit(1)

# Ensure the URL has the /api prefix
API_URL = f"{BACKEND_URL}/api"
print(f"Testing backend API at: {API_URL}")

class PortfolioBackendTests(unittest.TestCase):
    """Test suite for the Portfolio Backend APIs"""

    def setUp(self):
        """Set up test environment"""
        # Seed the database with sample data if needed
        self.seed_data()

    def seed_data(self):
        """Seed the database with sample data"""
        try:
            response = requests.post(f"{API_URL}/seed-data")
            if response.status_code == 200:
                print("Database seeded successfully")
            else:
                print(f"Failed to seed database: {response.status_code} - {response.text}")
        except Exception as e:
            print(f"Error seeding database: {str(e)}")

    def test_api_root(self):
        """Test the API root endpoint"""
        print("\n--- Testing API Root ---")
        response = requests.get(f"{API_URL}/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("message", data)
        self.assertIn("Watty Eventice Portfolio API", data["message"])
        print(f"API Root Response: {data}")

    def test_contact_form_submission(self):
        """Test the contact form submission endpoint"""
        print("\n--- Testing Contact Form Submission ---")
        
        # Generate random data for the contact form
        random_suffix = ''.join(random.choices(string.ascii_lowercase, k=5))
        contact_data = {
            "name": f"Test User {random_suffix}",
            "email": f"test.user.{random_suffix}@example.com",
            "subject": "Test Contact Form Submission",
            "message": "This is a test message from the automated test suite."
        }
        
        # Submit the contact form
        response = requests.post(f"{API_URL}/contact", json=contact_data)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        
        # Verify the response contains the expected fields
        self.assertIn("id", data)
        self.assertEqual(data["name"], contact_data["name"])
        self.assertEqual(data["email"], contact_data["email"])
        self.assertEqual(data["subject"], contact_data["subject"])
        self.assertEqual(data["message"], contact_data["message"])
        self.assertIn("timestamp", data)
        
        print(f"Contact Form Submission Response: {data}")
        
        # Verify the contact message was saved to the database
        get_response = requests.get(f"{API_URL}/contact")
        self.assertEqual(get_response.status_code, 200)
        messages = get_response.json()
        self.assertTrue(len(messages) > 0)
        
        # Find our submitted message in the list
        found = False
        for message in messages:
            if message["id"] == data["id"]:
                found = True
                break
        
        self.assertTrue(found, "Submitted contact message not found in database")
        print(f"Contact message successfully saved to database")

    def test_projects_api(self):
        """Test the projects API endpoints"""
        print("\n--- Testing Projects API ---")
        
        # Test get all projects
        response = requests.get(f"{API_URL}/projects")
        self.assertEqual(response.status_code, 200)
        projects = response.json()
        self.assertTrue(len(projects) > 0)
        print(f"Found {len(projects)} projects")
        
        # Verify project structure
        project = projects[0]
        required_fields = ["id", "title", "description", "technologies", "featured", "created_at"]
        for field in required_fields:
            self.assertIn(field, project)
        
        # Test get featured projects
        response = requests.get(f"{API_URL}/projects/featured")
        self.assertEqual(response.status_code, 200)
        featured_projects = response.json()
        
        # Verify all returned projects are featured
        for project in featured_projects:
            self.assertTrue(project["featured"])
        
        print(f"Found {len(featured_projects)} featured projects")
        
        # Test creating a new project
        new_project = {
            "title": "Test Project",
            "description": "This is a test project created by the automated test suite",
            "technologies": ["Python", "FastAPI", "Testing"],
            "github_url": "https://github.com/test/test-project",
            "live_url": "https://test-project.com",
            "featured": False
        }
        
        response = requests.post(f"{API_URL}/projects", json=new_project)
        self.assertEqual(response.status_code, 200)
        created_project = response.json()
        
        # Verify the project was created with the correct data
        self.assertEqual(created_project["title"], new_project["title"])
        self.assertEqual(created_project["description"], new_project["description"])
        self.assertEqual(created_project["technologies"], new_project["technologies"])
        self.assertEqual(created_project["github_url"], new_project["github_url"])
        self.assertEqual(created_project["live_url"], new_project["live_url"])
        self.assertEqual(created_project["featured"], new_project["featured"])
        
        print(f"Successfully created new project: {created_project['title']}")

    def test_skills_api(self):
        """Test the skills API endpoints"""
        print("\n--- Testing Skills API ---")
        
        # Test get all skills
        response = requests.get(f"{API_URL}/skills")
        self.assertEqual(response.status_code, 200)
        skills = response.json()
        self.assertTrue(len(skills) > 0)
        print(f"Found {len(skills)} skills")
        
        # Verify skill structure
        skill = skills[0]
        required_fields = ["id", "name", "category", "proficiency"]
        for field in required_fields:
            self.assertIn(field, skill)
        
        # Test get skills by category (frontend)
        response = requests.get(f"{API_URL}/skills/frontend")
        self.assertEqual(response.status_code, 200)
        frontend_skills = response.json()
        
        # Verify all returned skills are in the frontend category
        for skill in frontend_skills:
            self.assertEqual(skill["category"], "frontend")
        
        print(f"Found {len(frontend_skills)} frontend skills")

    def test_experience_api(self):
        """Test the experience API endpoint"""
        print("\n--- Testing Experience API ---")
        
        # Test get all experience
        response = requests.get(f"{API_URL}/experience")
        self.assertEqual(response.status_code, 200)
        experiences = response.json()
        self.assertTrue(len(experiences) > 0)
        print(f"Found {len(experiences)} work experiences")
        
        # Verify experience structure
        experience = experiences[0]
        required_fields = ["id", "title", "company", "location", "start_date", "description", "is_current"]
        for field in required_fields:
            self.assertIn(field, experience)
        
        # Verify at least one current position
        current_positions = [exp for exp in experiences if exp["is_current"]]
        self.assertTrue(len(current_positions) > 0, "No current work experience found")
        print(f"Found {len(current_positions)} current work experiences")

if __name__ == "__main__":
    unittest.main(argv=['first-arg-is-ignored'], exit=False)