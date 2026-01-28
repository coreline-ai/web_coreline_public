import requests
import time
import asyncio
from api._lib.db import AsyncSessionLocal
from api._lib.models import AuditLog
from sqlalchemy import select

API_URL = "http://localhost:8000/api"

def test_cors():
    print("\n--- Testing CORS ---")
    try:
        # Normal request (simulating localhost)
        headers = {"Origin": "http://localhost:3000"}
        res = requests.get(f"{API_URL}/boards", headers=headers)
        if res.status_code == 200 and res.headers.get("access-control-allow-origin") == "http://localhost:3000":
            print("PASS: Localhost Origin allowed.")
        else:
            print(f"FAIL: Localhost check. Status: {res.status_code}, Headers: {res.headers}")

        # Evil request
        headers = {"Origin": "http://evil.com"}
        res = requests.get(f"{API_URL}/boards", headers=headers)
        ac_allow = res.headers.get("access-control-allow-origin")
        if ac_allow != "http://evil.com":
             print("PASS: Evil Origin BLOCKED (No Allow-Origin header or mismatch).")
        else:
             print(f"FAIL: Evil Origin was ALLOWED! Header: {ac_allow}")

    except Exception as e:
        print(f"Error testing CORS: {e}")

def test_rate_limit():
    print("\n--- Testing Rate Limit (Create Post) ---")
    # We need a token to hit create_post usually? 
    # Actually create_post requires auth. 
    # If we hit it without auth, we get 401, which might bypass rate limiter depending on middleware order.
    # SlowAPI usually runs before Auth if applied globally or on route? 
    # Let's check if 401s assume "request processed".
    # Assuming we get 401s, let's see if we get 429 after 5 attempts.
    
    # NOTE: The limit is 5/minute.
    for i in range(7):
        res = requests.post(f"{API_URL}/posts", json={})
        print(f"Req {i+1}: Status {res.status_code}")
        if res.status_code == 429:
            print("PASS: Rate Limit Triggered (429 Too Many Requests).")
            return
            
    # If we are here, we might not have hit limit or auth error is returned first.
    print("NOTE: Did not hit 429. If all are 401, Auth might block before Limiter.")

async def verify_audit_log():
    print("\n--- Verifying Audit Log (DB Check) ---")
    async with AsyncSessionLocal() as db:
        # Check if any logs exist (we haven't triggered one yet unless I delete a post)
        result = await db.execute(select(AuditLog).order_by(AuditLog.id.desc()).limit(1))
        log = result.scalars().first()
        if log:
            print(f"PASS: Found Audit Log! ID: {log.id}, Action: {log.action}, Details: {log.details}")
        else:
            print("INFO: No Audit Logs found yet (Expected if no Admin Action performed).")

if __name__ == "__main__":
    test_cors()
    test_rate_limit()
    asyncio.run(verify_audit_log())
