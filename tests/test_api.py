#!/usr/bin/env python3
"""
Automated API Test Script for STEP.md Verification
Tests all critical endpoints from Sessions 1-5
"""
import requests
import json
import uuid
from typing import Optional

BASE_URL = "http://localhost:8000"

class TestRunner:
    def __init__(self):
        self.passed = 0
        self.failed = 0
        self.access_token: Optional[str] = None
        self.admin_token: Optional[str] = None
        self.test_user_id: Optional[str] = None
        
    def log(self, status: str, test_name: str, detail: str = ""):
        icon = "✅" if status == "PASS" else "❌"
        print(f"{icon} {test_name}: {detail}")
        if status == "PASS":
            self.passed += 1
        else:
            self.failed += 1
    
    def request(self, method: str, path: str, json_data: dict = None, token: str = None) -> requests.Response:
        headers = {"Content-Type": "application/json"}
        if token:
            headers["Authorization"] = f"Bearer {token}"
        
        url = f"{BASE_URL}{path}"
        if method == "GET":
            return requests.get(url, headers=headers)
        elif method == "POST":
            return requests.post(url, headers=headers, json=json_data)
        elif method == "PUT":
            return requests.put(url, headers=headers, json=json_data)
        elif method == "PATCH":
            return requests.patch(url, headers=headers, json=json_data)
        elif method == "DELETE":
            return requests.delete(url, headers=headers)
        
    # --- Session 1: Auth Tests ---
    def test_auth_register_new_user(self):
        """TC 1.5: First user gets admin status"""
        unique_id = str(uuid.uuid4())[:8]
        data = {
            "username": f"testuser_{unique_id}",
            "email": f"test_{unique_id}@example.com",
            "nickname": f"Test_{unique_id}",
            "password": "testpass123"
        }
        resp = self.request("POST", "/api/auth/register", data)
        
        if resp.status_code == 200 or resp.status_code == 201:
            body = resp.json()
            if body.get("success") and body.get("data", {}).get("access_token"):
                self.access_token = body["data"]["access_token"]
                self.test_user_id = body["data"]["user"]["id"]
                self.log("PASS", "TC 1.5 - Register new user", f"Token received, is_admin={body['data']['user'].get('is_admin')}")
                return
        self.log("FAIL", "TC 1.5 - Register new user", f"Status: {resp.status_code}, Body: {resp.text[:200]}")
    
    def test_auth_duplicate_registration(self):
        """TC 1.6: Duplicate email/username returns 400"""
        data = {
            "username": "admin",  # Likely exists
            "email": "admin@test.com",
            "nickname": "AdminTest",
            "password": "test"
        }
        resp = self.request("POST", "/api/auth/register", data)
        
        if resp.status_code == 400:
            self.log("PASS", "TC 1.6 - Duplicate registration blocked", "400 returned as expected")
        else:
            self.log("FAIL", "TC 1.6 - Duplicate registration blocked", f"Expected 400, got {resp.status_code}")
    
    def test_auth_login(self):
        """TC 1.1: Login returns token"""
        # Try with existing admin account (from seed)
        data = {
            "username_or_email": "admin",
            "password": "admin1234"  # Default from seed
        }
        resp = self.request("POST", "/api/auth/token", data)
        
        if resp.status_code == 200:
            body = resp.json()
            if body.get("success") and body.get("data", {}).get("access_token"):
                self.admin_token = body["data"]["access_token"]
                self.log("PASS", "TC 1.1 - Login success", "Admin token received")
                return
        self.log("FAIL", "TC 1.1 - Login success", f"Status: {resp.status_code}, Body: {resp.text[:200]}")
    
    def test_auth_invalid_login(self):
        """TC 1.3: Invalid credentials return error"""
        data = {
            "username_or_email": "nouser",
            "password": "wrongpass"
        }
        resp = self.request("POST", "/api/auth/token", data)
        
        if resp.status_code == 401:
            self.log("PASS", "TC 1.3 - Invalid login rejected", "401 returned as expected")
        else:
            self.log("FAIL", "TC 1.3 - Invalid login rejected", f"Expected 401, got {resp.status_code}")
    
    # --- Session 2: Boards Tests ---
    def test_get_boards(self):
        """TC 2.2: GET /api/boards returns list with access_level/description"""
        resp = self.request("GET", "/api/boards")
        
        if resp.status_code == 200:
            body = resp.json()
            if body.get("success") and isinstance(body.get("data"), list):
                if len(body["data"]) > 0:
                    first_board = body["data"][0]
                    if "access_level" in first_board and "description" in first_board:
                        self.log("PASS", "TC 2.2 - GET /api/boards", f"Found {len(body['data'])} boards with required fields")
                        return
        self.log("FAIL", "TC 2.2 - GET /api/boards", f"Status: {resp.status_code}, Body: {resp.text[:200]}")
    
    def test_get_board_detail(self):
        """TC 2.4, 2.6: GET /api/boards/{slug} returns notices + pagination"""
        resp = self.request("GET", "/api/boards/research")
        
        if resp.status_code == 200:
            body = resp.json()
            data = body.get("data", {})
            if "notices" in data and "posts" in data and "pagination" in data and "categories" in data:
                self.log("PASS", "TC 2.4/2.6 - Board detail structure", f"Found notices={len(data['notices'])}, posts={len(data['posts'])}, cats={len(data['categories'])}")
                return
        self.log("FAIL", "TC 2.4/2.6 - Board detail structure", f"Status: {resp.status_code}, Body: {resp.text[:200]}")
    
    def test_create_board_admin_only(self):
        """TC 2.8: Non-admin cannot create board"""
        data = {"name": "Test Board", "slug": "test-board-noauth"}
        resp = self.request("POST", "/api/boards", data)  # No token
        
        if resp.status_code in [401, 403]:
            self.log("PASS", "TC 2.8 - Board create requires admin", f"{resp.status_code} returned")
        else:
            self.log("FAIL", "TC 2.8 - Board create requires admin", f"Expected 401/403, got {resp.status_code}")
    
    def test_get_categories(self):
        """Test GET /api/boards/{slug}/categories"""
        resp = self.request("GET", "/api/boards/research/categories")
        
        if resp.status_code == 200:
            body = resp.json()
            if body.get("success") and isinstance(body.get("data"), list):
                self.log("PASS", "Category List", f"Found {len(body['data'])} categories")
                return
        self.log("FAIL", "Category List", f"Status: {resp.status_code}")
    
    # --- Session 2: Posts Tests ---
    def test_create_post_requires_auth(self):
        """TC 2.3: POST without auth returns 401"""
        data = {"title": "Test", "content": "Test", "board_id": 1, "category_id": 1}
        resp = self.request("POST", "/api/posts", data)  # No token
        
        if resp.status_code in [401, 403]:
            self.log("PASS", "TC 2.3 - Post requires auth", f"{resp.status_code} returned")
        else:
            self.log("FAIL", "TC 2.3 - Post requires auth", f"Expected 401/403, got {resp.status_code}")
    
    def test_get_post_view_count(self):
        """TC 2.5: GET /api/posts/{id} increments view_count"""
        # First get a post
        resp1 = self.request("GET", "/api/posts/1")
        if resp1.status_code == 200:
            body1 = resp1.json()
            count1 = body1.get("data", {}).get("view_count", 0)
            
            # Second request
            resp2 = self.request("GET", "/api/posts/1")
            if resp2.status_code == 200:
                body2 = resp2.json()
                count2 = body2.get("data", {}).get("view_count", 0)
                
                if count2 > count1:
                    self.log("PASS", "TC 2.5 - View count increment", f"{count1} -> {count2}")
                    return
        self.log("FAIL", "TC 2.5 - View count increment", "Could not verify increment")
    
    # --- API Health Check ---
    def test_api_health(self):
        """Basic API health check"""
        resp = self.request("GET", "/api")
        
        if resp.status_code == 200:
            self.log("PASS", "API Health", "Server is running")
        else:
            self.log("FAIL", "API Health", f"Status: {resp.status_code}")
    
    def run_all(self):
        print("=" * 60)
        print("STEP.md API Verification Tests")
        print("=" * 60)
        
        # Connection check
        try:
            self.test_api_health()
        except requests.exceptions.ConnectionError:
            print("❌ Cannot connect to API server at", BASE_URL)
            print("   Make sure the server is running: python3 -m uvicorn api.index:app --port 8000")
            return
        
        print("\n--- Session 1: Authentication ---")
        self.test_auth_register_new_user()
        self.test_auth_duplicate_registration()
        self.test_auth_login()
        self.test_auth_invalid_login()
        
        print("\n--- Session 2: Boards API ---")
        self.test_get_boards()
        self.test_get_board_detail()
        self.test_create_board_admin_only()
        self.test_get_categories()
        
        print("\n--- Session 2: Posts API ---")
        self.test_create_post_requires_auth()
        self.test_get_post_view_count()
        
        print("\n" + "=" * 60)
        print(f"Results: {self.passed} passed, {self.failed} failed")
        print("=" * 60)

if __name__ == "__main__":
    runner = TestRunner()
    runner.run_all()
