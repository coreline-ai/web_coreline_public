import requests
import uuid
import json

BASE_URL = "http://localhost:8000/api"

def test_full_flow():
    unique_id = str(uuid.uuid4())[:8]
    user_data = {
        "username": f"flow_{unique_id}",
        "email": f"flow_{unique_id}@test.com",
        "nickname": f"Flow_{unique_id}",
        "password": "testpass123"
    }
    
    # 1. Register
    print(f"1. Registering {user_data['username']}...")
    resp = requests.post(f"{BASE_URL}/auth/register", json=user_data)
    if resp.status_code not in [200, 201]:
        print(f"❌ Register failed: {resp.status_code} {resp.text}")
        return
    print("✅ Register success")
    
    # 2. Login
    print("2. Logging in...")
    resp = requests.post(f"{BASE_URL}/auth/token", json={
        "username_or_email": user_data["username"],
        "password": user_data["password"]
    })
    if resp.status_code != 200:
        print(f"❌ Login failed: {resp.status_code} {resp.text}")
        return
    token = resp.json()["data"]["access_token"]
    print("✅ Login success")
    
    # 3. Get Boards (Unauthenticated)
    print("3. Getting boards (Public)...")
    resp = requests.get(f"{BASE_URL}/boards")
    if resp.status_code != 200:
        print(f"❌ Get boards failed: {resp.status_code}")
        return
    print(f"✅ Got {len(resp.json()['data'])} boards")
    
    # 4. Get Board Detail (Authenticated)
    print("4. Getting 'research' board detail (Auth)...")
    headers = {"Authorization": f"Bearer {token}"}
    resp = requests.get(f"{BASE_URL}/boards/research", headers=headers)
    if resp.status_code != 200:
        print(f"❌ Get detail failed: {resp.status_code} {resp.text}")
        return
    data = resp.json()["data"]
    print(f"✅ Got detail. Categories: {len(data.get('categories', []))}")

    # 5. Create Post (Admin check - first user is admin?)
    # flow_ user might be admin if it's the first one? Probably not.
    # But let's check profile
    print(f"User is admin? {resp.json().get('user', {}).get('is_admin')}")

if __name__ == "__main__":
    test_full_flow()
