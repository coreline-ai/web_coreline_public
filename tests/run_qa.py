import requests
import json
import sys

BASE_URL = "http://localhost:8000/api"

# Color codes
GREEN = "\033[92m"
RED = "\033[91m"
RESET = "\033[0m"

results = {}

def log_result(tc_id, description, passed, resp=None):
    status = f"{GREEN}PASS{RESET}" if passed else f"{RED}FAIL{RESET}"
    print(f"[{tc_id}] {description}: {status}")
    if not passed and resp:
         print(f"    Got Status: {resp.status_code}")
         print(f"    Response: {resp.text}")
    results[tc_id] = "Pass" if passed else "Fail"

def main():
    print("🚀 Starting Automated QA Check...\n")
    
    # --- 1. Authentication ---
    # AUTH-01: Register (Skipped for known users, but can test new user)
    # We will use known users from seed.py for reliable role testing
    admin_creds = {"username_or_email": "admin", "password": "admin1234"}
    user_creds = {"username_or_email": "testuser", "password": "test1234"}
    
    unique_suffix = "qa" + str(hash(str(requests.get(BASE_URL).elapsed)))[-4:]

    # Login Admin
    resp = requests.post(f"{BASE_URL}/auth/token", json=admin_creds)
    log_result("AUTH-03", "Login Admin (Seed)", resp.status_code == 200)
    if resp.status_code == 200:
        admin_token = resp.json()["data"]["access_token"]
    else:
        print(f"CRITICAL: Failed to login as admin: {resp.text}")
        return

    # Login User
    resp = requests.post(f"{BASE_URL}/auth/token", json=user_creds)
    log_result("AUTH-03", "Login User (Seed)", resp.status_code == 200)
    if resp.status_code == 200:
        user_token = resp.json()["data"]["access_token"]
    else:
        print(f"CRITICAL: Failed to login as user: {resp.text}")
        return

    # Extra: Register New User Test (AUTH-01)
    new_user = {"username": f"new_{unique_suffix}", "email": f"new_{unique_suffix}@test.com", "password": "password123", "nickname": f"New_{unique_suffix}"}
    resp = requests.post(f"{BASE_URL}/auth/register", json=new_user)
    log_result("AUTH-01", "Register New User", resp.status_code == 201)

    admin_headers = {"Authorization": f"Bearer {admin_token}"}
    user_headers = {"Authorization": f"Bearer {user_token}"}

    # AUTH-02: Duplicate Register Check
    resp = requests.post(f"{BASE_URL}/auth/register", json=new_user) # Try to register same user again
    log_result("AUTH-02", "Duplicate Register Check", resp.status_code == 400)

    # AUTH-04: Login Invalid
    resp = requests.post(f"{BASE_URL}/auth/token", json={"username_or_email": "admin", "password": "wrongpassword"})
    log_result("AUTH-04", "Login Invalid", resp.status_code == 401)
    
    # AUTH-05: Protected Resource No Token
    resp = requests.post(f"{BASE_URL}/posts", json={})
    log_result("AUTH-05", "Protected Resource No Token", resp.status_code == 401)  # Or 403 depending on implementation

    # --- 2. Boards ---
    # BRD-01: List
    resp = requests.get(f"{BASE_URL}/boards")
    log_result("BRD-01", "List Boards", resp.status_code == 200 and isinstance(resp.json()["data"], list))
    current_boards = resp.json()["data"]
    test_board = next((b for b in current_boards if b["slug"] == "research"), None) # Assume research exists from prev tasks
    
    # BRD-02: Create Board (Admin)
    new_board_slug = f"qa-board-{unique_suffix}"
    resp = requests.post(f"{BASE_URL}/boards", json={
        "name": f"QA Board {unique_suffix}",
        "slug": new_board_slug,
        "description": "QA Test",
        "access_level": "PUBLIC"
    }, headers=admin_headers)
    log_result("BRD-02", "Create Board (Admin)", resp.status_code == 201, resp)

    # BRD-03: Create Board (User)
    resp = requests.post(f"{BASE_URL}/boards", json={
        "name": "Hacker Board",
        "slug": "hacker",
        "description": "Hack",
        "access_level": "PUBLIC"
    }, headers=user_headers)
    log_result("BRD-03", "Create Board (User)", resp.status_code == 403, resp)
    
    # Use the newly created board for testing
    target_board_slug = new_board_slug
    
    # CAT-02: Create Category (Admin)
    resp = requests.post(f"{BASE_URL}/boards/{target_board_slug}/categories", json={"name": "General"}, headers=admin_headers)
    log_result("CAT-02", "Create Category (Admin)", resp.status_code == 201, resp)
    if resp.status_code == 201:
        category_id = resp.json()["data"]["id"]
    else:
        print("CRITICAL: Failed to create category, stopping dependent tests.")
        return

    # BRD-04: Board Detail
    resp = requests.get(f"{BASE_URL}/boards/{target_board_slug}")
    data = resp.json().get("data", {})
    has_keys = all(k in data for k in ["board", "categories", "posts", "notices"])
    log_result("BRD-04", "Board Detail Structure", resp.status_code == 200 and has_keys)

    # --- 3. Posts ---
    # PST-01: Create Post
    post_data = {
        "title": "QA Test Post",
        "content": "Content Body",
        "board_slug": target_board_slug,
        "category_id": category_id,
        "is_notice": False
    }
    resp = requests.post(f"{BASE_URL}/posts", json=post_data, headers=user_headers)
    log_result("PST-01", "Create Post", resp.status_code == 201) # Strictly 201 now
    if resp.status_code == 201:
        post_id = resp.json()["data"]["id"]
    else:
        print(f"CRITICAL: Post creation failed: {resp.text}")
        return

    # PST-04: Post Detail
    resp = requests.get(f"{BASE_URL}/posts/{post_id}", headers=user_headers)
    data = resp.json().get("data", {})
    has_details = all(k in data for k in ["author", "board", "category"])
    log_result("PST-04", "Post Detail Structure", resp.status_code == 200 and has_details)

    # PST-05: View Count
    initial_views = data.get("view_count", 0)
    requests.get(f"{BASE_URL}/posts/{post_id}") # View again
    resp = requests.get(f"{BASE_URL}/posts/{post_id}")
    new_views = resp.json()["data"].get("view_count", 0)
    log_result("PST-05", "View Count Increment", new_views > initial_views)

    # --- 4. Interactions ---
    # INT-01: Create Comment (Admin commenting on User post)
    resp = requests.post(f"{BASE_URL}/posts/{post_id}/comments", json={"content": "Nice post"}, headers=admin_headers)
    log_result("INT-01", "Create Comment", resp.status_code == 201)
    
    # INT-03: Like Toggle On
    resp = requests.post(f"{BASE_URL}/posts/{post_id}/like", headers=admin_headers)
    data = resp.json().get("data", {})
    log_result("INT-03", "Like On", resp.status_code == 200 and data.get("liked") == True)

    # --- 5. Notifications ---
    # NOT-01: User should have notification from Admin's comment
    resp = requests.get(f"{BASE_URL}/notifications", headers=user_headers)
    data = resp.json().get("data", [])
    has_noti = any(n["post"]["id"] == post_id for n in data)
    log_result("NOT-01", "Notification Received", resp.status_code == 200 and has_noti)
    
    if has_noti:
        notif_id = next(n["id"] for n in data if n["post"]["id"] == post_id)
        # NOT-02: Read Notification
        resp = requests.post(f"{BASE_URL}/notifications/{notif_id}/read", headers=user_headers)
        log_result("NOT-02", "Read Notification", resp.status_code == 200)

    # --- 6. Admin ---
    # ADM-01: User List (Admin)
    resp = requests.get(f"{BASE_URL}/admin/users", headers=admin_headers)
    log_result("ADM-01", "Admin User List", resp.status_code == 200)

    # ADM-02: User List (Normal)
    resp = requests.get(f"{BASE_URL}/admin/users", headers=user_headers)
    log_result("ADM-02", "Normal User List Forbidden", resp.status_code == 403)

    print("\n✅ QA Check Complete.")

if __name__ == "__main__":
    main()
