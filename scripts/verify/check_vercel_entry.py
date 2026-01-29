
import sys
import os
import traceback

# Add project root to sys.path
sys.path.append(os.getcwd())

print("Checking API Imports...")

try:
    print("Importing api.index...")
    import api.index
    print("SUCCESS: api.index imported.")
except Exception:
    print("FAIL: api.index failed to import.")
    traceback.print_exc()
    sys.exit(1)

# Check individual routers just in case
routers = [
    "api.routers.boards",
    "api.routers.posts",
    "api.routers.comments",
    "api.routers.admin",
    "api.routers.files",
    "api.routers.notifications"
]

for r in routers:
    try:
        print(f"Importing {r}...")
        __import__(r, fromlist=['router'])
        print(f"SUCCESS: {r} imported.")
    except Exception:
        print(f"FAIL: {r} failed to import.")
        traceback.print_exc()
        sys.exit(1)

print("All API imports verified successfully.")
