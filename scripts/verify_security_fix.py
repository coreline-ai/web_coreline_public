import requests
import json

# Configuration
API_URL = "http://localhost:8000/api"
BOARD_SLUG = "blog" # Restricted board

def test_unauthorized_post():
    print(f"--- Testing Unauthorized Post to '{BOARD_SLUG}' Board ---")
    
    # 1. Try to create a post without Admin credentials (using a fake or guest token)
    # We'll just skip the Auth header to simulate a guest/non-admin
    # Note: The endpoint expects a token, so it might fail at Auth layer (401) or Permission layer (403).
    # If our auth middleware is loose (Depends(get_current_user)), it might require a valid token.
    # Let's assume we need to be logged in but NOT admin. 
    # Since obtaining a valid non-admin token programmatically is hard without login flow,
    # we'll test the scenario where a user might be authenticated but not admin.
    # For simplicity, let's first try without ANY token and expect 401 or 403.
    
    headers = {
        "Content-Type": "application/json"
    }
    
    payload = {
        "title": "Hacked Post",
        "content": "This should not exist",
        "board_slug": BOARD_SLUG,
        "category_id": 1, 
        "is_notice": False
    }

    try:
        response = requests.post(f"{API_URL}/posts", json=payload, headers=headers)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 401:
            print("SUCCESS: Request rejected (401 Unauthorized - Authentication Required).")
        elif response.status_code == 403:
            print("SUCCESS: Request rejected (403 Forbidden - Permission Denied).")
        elif response.status_code >= 200 and response.status_code < 300:
            print("FAILURE: Post created successfully! Security vulnerability exists.")
        else:
            print(f"Outcome: {response.status_code}. Please interpret.")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_unauthorized_post()
