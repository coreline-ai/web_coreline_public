
import requests
import uuid
import time
import sys

# Configuration
BASE_URL = "http://localhost:8000"
TEST_USER_EMAIL = f"testuser_{uuid.uuid4().hex[:6]}@example.com"
TEST_USER_PASSWORD = "testpassword123"
TEST_USER_NICKNAME = f"Tester_{uuid.uuid4().hex[:6]}"

# Global State
TOKEN = None
USER_ID = None
BOARD_SLUG = "blog" # 'blog' is public but needs authentication for some actions? No, blog is usually Public Read, Admin Write.
# Wait, standard users might not be able to write to blog.
# I should check access levels.
# If 'blog' is Admin only, I need an admin token or I should use a different board.
# Let's try to create a 'test-board' if possible, or assume 'blog' allows comments.

# Color helpers
class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

def log(msg, type="INFO"):
    if type == "INFO":
        print(f"{bcolors.OKBLUE}[INFO]{bcolors.ENDC} {msg}")
    elif type == "SUCCESS":
        print(f"{bcolors.OKGREEN}[PASS]{bcolors.ENDC} {msg}")
    elif type == "ERROR":
        print(f"{bcolors.FAIL}[FAIL]{bcolors.ENDC} {msg}")
    elif type == "WARN":
        print(f"{bcolors.WARNING}[WARN]{bcolors.ENDC} {msg}")

def check(response, expected_status=200, check_fn=None):
    if response.status_code != expected_status:
        log(f"Expected status {expected_status}, got {response.status_code}", "ERROR")
        try:
            print(response.json())
        except:
            print(response.text)
        return False
    
    if check_fn:
        try:
            if not check_fn(response.json()):
                log("Response content check failed", "ERROR")
                print(response.json())
                return False
        except Exception as e:
            log(f"Check function exception: {e}", "ERROR")
            return False
            
    return True

def main():
    global TOKEN, USER_ID
    
    print(f"{bcolors.HEADER}=== Starting Coreline Board Feature Tests ==={bcolors.ENDC}")
    
    # 1. Register
    log(f"Registering test user: {TEST_USER_EMAIL}")
    res = requests.post(f"{BASE_URL}/api/py-auth/register", json={
        "email": TEST_USER_EMAIL,
        "password": TEST_USER_PASSWORD,
        "nickname": TEST_USER_NICKNAME,
        "username": TEST_USER_NICKNAME 
    })
    
    if not check(res, 201):
        log("Registration failed. Aborting.", "ERROR")
        return

    # 2. Login
    log("Logging in...")
    # Token endpoint expects JSON with username_or_email
    res = requests.post(f"{BASE_URL}/api/py-auth/token", json={ 
        "username_or_email": TEST_USER_EMAIL,
        "password": TEST_USER_PASSWORD
    }) 

    if not check(res, 200):
        log("Login failed. Aborting.", "ERROR")
        return

    data = res.json()
    TOKEN = data.get("access_token") 
    if not TOKEN:
        # Maybe inside 'data'?
        TOKEN = data.get("data", {}).get("access_token")

    if not TOKEN:
        log("No access token found in response.", "ERROR")
        print(data)
        return
        
    log("Logged in successfully.")
    headers = {"Authorization": f"Bearer {TOKEN}"}

    # 3. Get Boards
    log("Fetching boards...")
    res = requests.get(f"{BASE_URL}/api/boards", headers=headers)
    if not check(res, 200): return
    boards = res.json().get("data", [])
    log(f"Found {len(boards)} boards: {[b['slug'] for b in boards]}")
    
    # Use 'blog' or 'research' or find one that is writable
    target_board = next((b for b in boards if b['slug'] == 'blog'), None)
    if not target_board:
        log("Target board 'blog' not found.", "ERROR")
        return
    
    # 4. Check Categories for board
    log(f"Fetching categories for {target_board['slug']}")
    res = requests.get(f"{BASE_URL}/api/boards/{target_board['slug']}/categories", headers=headers)
    if not check(res, 200): return
    categories = res.json().get("data", [])
    if not categories:
        log("No categories found. Cannot create post.", "ERROR")
        return
    target_category_id = categories[0]['id']
    
    # 5. Create Post (Might fail if blog is admin only? Let's try)
    log("Creating new Post...")
    post_title = f"Test Post {uuid.uuid4().hex[:6]}"
    res = requests.post(f"{BASE_URL}/api/posts", headers=headers, json={
        "title": post_title,
        "content": "This is an automated test post content. It should be long enough to be summarized by the AI.",
        "board_slug": target_board['slug'],
        "category_id": target_category_id,
        "is_notice": False
    })
    
    if res.status_code == 403:
        log("Created post permission denied (403). 'blog' might be admin-only.", "WARN")
        # Proceed to read-only tests if creation failed? 
        # Or try 'CL_Project_QnA' if exists?
        qna_board = next((b for b in boards if b['slug'] == 'CL_Project_QnA'), None)
        if qna_board:
             log("Retrying with 'CL_Project_QnA'...")
             target_board = qna_board
             # Get cat
             res = requests.get(f"{BASE_URL}/api/boards/{target_board['slug']}/categories", headers=headers)
             categories = res.json().get("data", [])
             if not categories: return
             target_category_id = categories[0]['id']
             
             # Retry create
             res = requests.post(f"{BASE_URL}/api/posts", headers=headers, json={
                "title": post_title,
                "content": "This is an automated test post content for QnA.",
                "board_slug": target_board['slug'],
                "category_id": target_category_id,
                "is_notice": False
            })
    
    if not check(res, 201): return
    post_data = res.json().get("data")
    post_id = post_data['id']
    log(f"Post created. ID: {post_id}")
    
    # Check if summary was generated
    if post_data.get('summary'):
        log("AI Summary generated successfully during creation.", "SUCCESS")
    else:
        log("AI Summary missing in creation response.", "WARN")

    # 6. Get Post Detail (The Critical Regression Test)
    log(f"Fetching Post Detail for #{post_id}...")
    res = requests.get(f"{BASE_URL}/api/posts/{post_id}", headers=headers)
    if check(res, 200):
        log("Get Post Detail Successful (No 405 Error).", "SUCCESS")
        detail = res.json().get("data")
        if detail['id'] == post_id:
            log("Post ID matches.", "SUCCESS")
    
    # 7. Update Post
    log("Updating Post content...")
    res = requests.patch(f"{BASE_URL}/api/posts/{post_id}", headers=headers, json={
        "content": "Updated content. Should trigger re-summarization."
    })
    if check(res, 200):
        log("Post updated.", "SUCCESS")
        
    # 8. Create Comment
    log("Creating comment...")
    res = requests.post(f"{BASE_URL}/api/posts/{post_id}/comments", headers=headers, json={
        "content": "Test comment"
    })
    if check(res, 201):
        log("Comment created.", "SUCCESS")
        
    # 9. Toggle Like
    log("Toggling like...")
    res = requests.post(f"{BASE_URL}/api/posts/{post_id}/like", headers=headers)
    if check(res, 200):
        data = res.json().get("data")
        if data['liked']:
            log("Post liked.", "SUCCESS")
            
    # 10. Increment View
    requests.post(f"{BASE_URL}/api/posts/{post_id}/view")
    
    # 11. Delete Post
    log("Deleting Post...")
    res = requests.delete(f"{BASE_URL}/api/posts/{post_id}", headers=headers)
    if check(res, 200):
        log("Post deleted.", "SUCCESS")
        
    log("All tests completed.")

if __name__ == "__main__":
    main()
