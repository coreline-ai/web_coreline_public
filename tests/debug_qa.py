import requests
import json
import sys

BASE_URL = "http://localhost:8000/api"

GREEN = "\033[92m"
RED = "\033[91m"
RESET = "\033[0m"

def log_result(tc_id, description, resp, expected_status):
    passed = resp.status_code == expected_status
    status = f"{GREEN}PASS{RESET}" if passed else f"{RED}FAIL{RESET}"
    print(f"[{tc_id}] {description}: {status}")
    if not passed:
        print(f"    Expected: {expected_status}, Got: {resp.status_code}")
        print(f"    Response: {resp.text}")
    return passed

def main():
    print("🚀 Starting Debug QA Check...\n")
    
    unique_suffix = "qa" + str(hash(str(requests.get(BASE_URL).elapsed)))[-4:]
    
    # 1. Login as known existing user (from seed) if possible, or register
    # Try default admin credentials often found in seed
    print("Attempting login as 'admin'...")
    resp = requests.post(f"{BASE_URL}/auth/token", json={"username_or_email": "admin", "password": "password123"}) # Guessing from common patterns
    if resp.status_code == 200:
        print("✅ Logged in as existing 'admin'")
        admin_token = resp.json()["data"]["access_token"]
    else:
        print(f"⚠️ Failed to login as 'admin': {resp.status_code}. Trying to register new 'admin_candidate'...")
        # Register new user
        admin_user = {"username": f"adm_{unique_suffix}", "email": f"adm_{unique_suffix}@test.com", "password": "password123", "nickname": f"Adm_{unique_suffix}"}
        resp = requests.post(f"{BASE_URL}/auth/register", json=admin_user)
        if resp.status_code == 201:
            admin_token = resp.json()["data"]["access_token"]
            print("✅ Registered new user (Role unknown, likely User)")
        else:
            print("❌ Critical Auth Failure")
            return

    headers = {"Authorization": f"Bearer {admin_token}"}

    # BRD-02: Create Board (Admin)
    print("\n--- Testing BRD-02 (Create Board) ---")
    resp = requests.post(f"{BASE_URL}/boards", json={
        "name": f"QA Board {unique_suffix}",
        "slug": f"qa-{unique_suffix}",
        "description": "QA Test",
        "access_level": "PUBLIC"
    }, headers=headers)
    log_result("BRD-02", "Create Board", resp, 201)
    
    # If 403, it means our user is not admin.
    if resp.status_code == 403:
        print("⚠️ User is not Admin. Skipping Admin tests. Using existing 'research' board for further tests.")
        target_board_slug = "research"
        category_id = 6 # Known ID
    elif resp.status_code == 200:
         print("⚠️ Status Code Mismatch (200 vs 201). Continuing...")
         target_board_slug = f"qa-{unique_suffix}"
         # Must get ID if possible, but let's assume subsequent tests can fail if board creation "failed" in logic but returned 200
    elif resp.status_code == 201:
        target_board_slug = f"qa-{unique_suffix}"
    else:
        print("❌ Create Board failed completely. Using 'research'.")
        target_board_slug = "research"
        category_id = 6

    # Need category ID if we created board
    if target_board_slug != "research":
         print("\n--- Testing CAT-02 (Create Category) ---")
         resp = requests.post(f"{BASE_URL}/boards/{target_board_slug}/categories", json={"name": "General"}, headers=headers)
         log_result("CAT-02", "Create Category", resp, 201)
         if resp.status_code in [200, 201]:
             category_id = resp.json()["data"]["id"]
         else:
             print("❌ Create Category failed.")
             return # Can't post without category

    # PST-01: Create Post
    print("\n--- Testing PST-01 (Create Post) ---")
    post_data = {
        "title": "QA Test Post",
        "content": "Content Body",
        "board_slug": target_board_slug,
        "category_id": category_id,
        "is_notice": False
    }
    resp = requests.post(f"{BASE_URL}/posts", json=post_data, headers=headers)
    log_result("PST-01", "Create Post", resp, 201)

if __name__ == "__main__":
    main()
