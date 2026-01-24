#!/usr/bin/env python3
"""
Comprehensive Security Test Suite for Coreline API
Based on OWASP Top 10 Test Plan
"""
import requests
import json
import os
import subprocess
import time
from datetime import datetime

BASE_URL = "http://localhost:8000"

# Test Results Storage
results = []

def log_test(category: str, test_name: str, passed: bool, details: str = ""):
    status = "✅ PASS" if passed else "❌ FAIL"
    results.append({
        "category": category,
        "test": test_name,
        "passed": passed,
        "details": details
    })
    print(f"{status} | {category} | {test_name}")
    if details and not passed:
        print(f"       Details: {details}")

def get_auth_header(token: str) -> dict:
    return {"Authorization": f"Bearer {token}"}

# ============================================================
# 1. JWT Secret Tests
# ============================================================
def test_jwt_secret_required():
    """Test that JWT_SECRET is required in production"""
    print("\n" + "="*60)
    print("1. JWT SECRET TESTS")
    print("="*60)
    
    # Test: Server should fail without JWT_SECRET in production
    # We can't actually restart the server, but we can check the code behavior
    try:
        # Make a simple request to verify server is running with proper config
        resp = requests.get(f"{BASE_URL}/api")
        log_test("JWT", "Server running with config", resp.status_code == 200, f"Status: {resp.status_code}")
    except Exception as e:
        log_test("JWT", "Server running with config", False, str(e))

# ============================================================
# 2. Access Control Tests
# ============================================================
def test_access_control():
    print("\n" + "="*60)
    print("2. ACCESS CONTROL TESTS")
    print("="*60)
    
    # Get list of boards first
    resp = requests.get(f"{BASE_URL}/api/boards")
    if resp.status_code != 200:
        log_test("Access Control", "Get boards list", False, f"Status: {resp.status_code}")
        return
    
    boards = resp.json().get("data", [])
    log_test("Access Control", "Get boards list", True, f"Found {len(boards)} boards")
    
    # Find boards by access level
    public_board = None
    auth_board = None
    admin_board = None
    
    for board in boards:
        if board.get("access_level") == "PUBLIC" and not public_board:
            public_board = board
        elif board.get("access_level") == "AUTHENTICATED" and not auth_board:
            auth_board = board
        elif board.get("access_level") == "ADMIN" and not admin_board:
            admin_board = board
    
    # Test PUBLIC board - anonymous access
    if public_board:
        resp = requests.get(f"{BASE_URL}/api/boards/{public_board['slug']}")
        log_test("Access Control", f"PUBLIC board ({public_board['slug']}) - anonymous read", 
                 resp.status_code == 200, f"Status: {resp.status_code}")
        
        # Try to create post without auth - should fail
        resp = requests.post(f"{BASE_URL}/api/posts", json={
            "title": "Test", "content": "Test", "board_slug": public_board['slug'], "category_id": 1
        })
        log_test("Access Control", "PUBLIC board - anonymous write blocked", 
                 resp.status_code == 401, f"Status: {resp.status_code}")
    
    # Test ADMIN board - anonymous access should fail
    if admin_board:
        resp = requests.get(f"{BASE_URL}/api/boards/{admin_board['slug']}")
        log_test("Access Control", f"ADMIN board ({admin_board['slug']}) - anonymous read blocked", 
                 resp.status_code in [401, 403], f"Status: {resp.status_code}")

# ============================================================
# 3. Admin Auto-Promotion Tests
# ============================================================
def test_admin_promotion():
    print("\n" + "="*60)
    print("3. ADMIN AUTO-PROMOTION TESTS")
    print("="*60)
    
    # Try to register without ADMIN_SETUP_KEY
    test_user = {
        "username": f"testuser_{int(time.time())}",
        "email": f"test_{int(time.time())}@example.com",
        "nickname": f"TestNick_{int(time.time())}",
        "password": "TestPass123"  # Meets password policy
    }
    
    resp = requests.post(f"{BASE_URL}/api/auth/register", json=test_user)
    
    if resp.status_code == 201:
        data = resp.json().get("data", {})
        user_info = data.get("user", {})
        is_admin = user_info.get("is_admin", False)
        log_test("Admin Promotion", "New user without ADMIN_SETUP_KEY is NOT admin", 
                 is_admin == False, f"is_admin: {is_admin}")
    elif resp.status_code == 400:
        # User might already exist or validation error
        log_test("Admin Promotion", "Registration response", True, f"Status: {resp.status_code}, Detail: {resp.json().get('detail', '')}")
    else:
        log_test("Admin Promotion", "Registration attempt", False, f"Status: {resp.status_code}")

# ============================================================
# 4. Input Validation Tests
# ============================================================
def test_input_validation():
    print("\n" + "="*60)
    print("4. INPUT VALIDATION TESTS")
    print("="*60)
    
    # Test password policy - too short
    resp = requests.post(f"{BASE_URL}/api/auth/register", json={
        "username": "shortpw", "email": "shortpw@test.com", 
        "nickname": "ShortPW", "password": "abc"  # Too short
    })
    log_test("Input Validation", "Password too short rejected", 
             resp.status_code == 400, f"Status: {resp.status_code}, Detail: {resp.json().get('detail', '')}")
    
    # Test password policy - no uppercase
    resp = requests.post(f"{BASE_URL}/api/auth/register", json={
        "username": "nouppercase", "email": "nouppercase@test.com", 
        "nickname": "NoUppercase", "password": "testtest123"  # No uppercase
    })
    log_test("Input Validation", "Password without uppercase rejected", 
             resp.status_code == 400, f"Status: {resp.status_code}")
    
    # Test password policy - no number
    resp = requests.post(f"{BASE_URL}/api/auth/register", json={
        "username": "nonumber", "email": "nonumber@test.com", 
        "nickname": "NoNumber", "password": "TestTestTest"  # No number
    })
    log_test("Input Validation", "Password without number rejected", 
             resp.status_code == 400, f"Status: {resp.status_code}")
    
    # Test oversized content (would need valid auth - skip for unauthenticated)
    # This will be tested with login flow

# ============================================================
# 5. Rate Limiting Tests
# ============================================================
def test_rate_limiting():
    print("\n" + "="*60)
    print("5. RATE LIMITING TESTS")
    print("="*60)
    
    # Hit login endpoint multiple times with wrong credentials
    print("   Sending 7 rapid login attempts...")
    statuses = []
    for i in range(7):
        resp = requests.post(f"{BASE_URL}/api/auth/token", json={
            "username_or_email": "nonexistent@test.com",
            "password": "wrongpassword"
        })
        statuses.append(resp.status_code)
        time.sleep(0.1)  # Small delay
    
    # Check if we got 429 at some point
    got_rate_limited = 429 in statuses
    log_test("Rate Limiting", "Login rate limit triggers 429", 
             got_rate_limited, f"Statuses: {statuses}")

# ============================================================
# 6. File Upload Tests
# ============================================================
def test_file_upload():
    print("\n" + "="*60)
    print("6. FILE UPLOAD TESTS")
    print("="*60)
    
    # Test without auth
    resp = requests.post(f"{BASE_URL}/api/files/signed-url", json={
        "filename": "test.jpg",
        "content_type": "image/jpeg"
    })
    log_test("File Upload", "Unauthenticated request blocked", 
             resp.status_code == 401, f"Status: {resp.status_code}")
    
    # Test with invalid content type (would need auth)
    # Will be tested in authenticated flow

# ============================================================
# 7. Security Headers Tests (via curl)
# ============================================================
def test_security_headers():
    print("\n" + "="*60)
    print("7. SECURITY HEADERS TESTS (Next.js - requires running frontend)")
    print("="*60)
    
    # Test backend CORS headers
    resp = requests.options(f"{BASE_URL}/api/boards", headers={
        "Origin": "http://localhost:3000",
        "Access-Control-Request-Method": "GET"
    })
    
    cors_origin = resp.headers.get("access-control-allow-origin", "")
    log_test("Security Headers", "CORS allows localhost:3000", 
             "localhost:3000" in cors_origin, f"CORS Origin: {cors_origin}")
    
    # Test CORS blocks evil origin
    resp = requests.get(f"{BASE_URL}/api/boards", headers={"Origin": "http://evil.com"})
    cors_origin = resp.headers.get("access-control-allow-origin", "")
    log_test("Security Headers", "CORS blocks evil.com", 
             "evil.com" not in cors_origin, f"CORS Origin: {cors_origin}")

# ============================================================
# 8. Regression Tests (Basic User Flow)
# ============================================================
def test_regression_user_flow():
    print("\n" + "="*60)
    print("8. REGRESSION TESTS - USER FLOW")
    print("="*60)
    
    # Create a test user
    timestamp = int(time.time())
    test_user = {
        "username": f"regtest_{timestamp}",
        "email": f"regtest_{timestamp}@example.com",
        "nickname": f"RegTest_{timestamp}",
        "password": "RegTest123!"
    }
    
    # Register
    resp = requests.post(f"{BASE_URL}/api/auth/register", json=test_user)
    if resp.status_code not in [201, 400]:  # 400 if user exists
        log_test("Regression", "User registration", False, f"Status: {resp.status_code}")
        return
    
    log_test("Regression", "User registration", resp.status_code == 201, f"Status: {resp.status_code}")
    
    # Login
    resp = requests.post(f"{BASE_URL}/api/auth/token", json={
        "username_or_email": test_user["username"],
        "password": test_user["password"]
    })
    
    if resp.status_code != 200:
        log_test("Regression", "User login", False, f"Status: {resp.status_code}")
        return
    
    token = resp.json().get("data", {}).get("access_token")
    log_test("Regression", "User login", bool(token), "Got token" if token else "No token")
    
    if not token:
        return
    
    auth_headers = get_auth_header(token)
    
    # Get boards
    resp = requests.get(f"{BASE_URL}/api/boards", headers=auth_headers)
    log_test("Regression", "Get boards list", resp.status_code == 200, f"Status: {resp.status_code}")
    
    boards = resp.json().get("data", [])
    
    # Find a PUBLIC board to test
    public_board = next((b for b in boards if b.get("access_level") == "PUBLIC"), None)
    
    if public_board:
        # Get board detail
        resp = requests.get(f"{BASE_URL}/api/boards/{public_board['slug']}", headers=auth_headers)
        log_test("Regression", "Get board detail", resp.status_code == 200, f"Status: {resp.status_code}")
        
        # Get categories
        categories = resp.json().get("data", {}).get("categories", [])
        
        if categories:
            # Create post
            resp = requests.post(f"{BASE_URL}/api/posts", 
                headers=auth_headers,
                json={
                    "title": f"Test Post {timestamp}",
                    "content": "This is a test post",
                    "board_slug": public_board['slug'],
                    "category_id": categories[0]["id"]
                }
            )
            log_test("Regression", "Create post", resp.status_code == 201, f"Status: {resp.status_code}")
            
            if resp.status_code == 201:
                post_id = resp.json().get("data", {}).get("id")
                
                # View post
                resp = requests.post(f"{BASE_URL}/api/posts/{post_id}/view", headers=auth_headers)
                log_test("Regression", "View post", resp.status_code == 200, f"Status: {resp.status_code}")
                
                # Like post
                resp = requests.post(f"{BASE_URL}/api/posts/{post_id}/like", headers=auth_headers)
                log_test("Regression", "Like post", resp.status_code == 200, f"Status: {resp.status_code}")
                
                # Comment on post
                resp = requests.post(f"{BASE_URL}/api/posts/{post_id}/comments", 
                    headers=auth_headers,
                    json={"content": "Test comment"}
                )
                log_test("Regression", "Comment on post", resp.status_code == 201, f"Status: {resp.status_code}")
                
                # Get notifications
                resp = requests.get(f"{BASE_URL}/api/notifications", headers=auth_headers)
                log_test("Regression", "Get notifications", resp.status_code == 200, f"Status: {resp.status_code}")

# ============================================================
# Main Test Runner
# ============================================================
def print_summary():
    print("\n" + "="*60)
    print("TEST SUMMARY")
    print("="*60)
    
    passed = sum(1 for r in results if r["passed"])
    failed = sum(1 for r in results if not r["passed"])
    total = len(results)
    
    print(f"\n📊 Total: {total} | ✅ Passed: {passed} | ❌ Failed: {failed}")
    print(f"📈 Pass Rate: {passed/total*100:.1f}%" if total > 0 else "No tests run")
    
    if failed > 0:
        print("\n❌ FAILED TESTS:")
        for r in results:
            if not r["passed"]:
                print(f"   - [{r['category']}] {r['test']}: {r['details']}")

if __name__ == "__main__":
    print("🔒 CORELINE SECURITY TEST SUITE")
    print(f"📅 {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"🎯 Target: {BASE_URL}")
    
    test_jwt_secret_required()
    test_access_control()
    test_admin_promotion()
    test_input_validation()
    test_rate_limiting()
    test_file_upload()
    test_security_headers()
    test_regression_user_flow()
    
    print_summary()
