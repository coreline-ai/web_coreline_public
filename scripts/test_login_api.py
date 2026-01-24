import requests
import json

def test_login():
    url = "http://localhost:8000/api/auth/token"
    payload = {
        "username_or_email": "admin",
        "password": "admin1234"
    }
    headers = {
        "Content-Type": "application/json"
    }
    
    print(f"Sending POST request to {url}...")
    try:
        response = requests.post(url, data=json.dumps(payload), headers=headers, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        try:
            result = response.json()
            print("Response Body:")
            print(json.dumps(result, indent=2, ensure_ascii=False))
        except Exception:
            print(f"Raw Response: {response.text}")
            
    except Exception as e:
        print(f"Request failed: {e}")

if __name__ == "__main__":
    test_login()
