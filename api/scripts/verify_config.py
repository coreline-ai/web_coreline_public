import os
import sys
from pathlib import Path

# Add the project root to sys.path
sys.path.append(str(Path(__file__).parent.parent.parent))

def test_config():
    print("🔍 Testing Configuration Logic...")
    
    # 1. Test Development Fallback
    print("\n[Test 1] Development Fallback")
    os.environ["ENVIRONMENT"] = "development"
    os.environ["VERCEL"] = "0"
    if "JWT_SECRET" in os.environ:
        del os.environ["JWT_SECRET"]
    
    from api._lib.config import Settings
    dev_settings = Settings()
    print(f"✅ JWT_SECRET used: {dev_settings.jwt_secret}")
    assert dev_settings.jwt_secret == "dev-secret-key-not-for-production"

    # 2. Test Production Missing Secret
    print("\n[Test 2] Production Missing Secret (Should Fail)")
    os.environ["ENVIRONMENT"] = "production"
    try:
        production_settings = Settings()
        print("❌ Test failed: Should have raised RuntimeError")
    except RuntimeError as e:
        print(f"✅ Correctly raised: {e}")

    # 3. Test Production With Secret
    print("\n[Test 3] Production With Secret")
    os.environ["JWT_SECRET"] = "super-secret-production-key"
    prod_settings_ok = Settings()
    print(f"✅ Loaded secret: {prod_settings_ok.jwt_secret}")
    assert prod_settings_ok.jwt_secret == "super-secret-production-key"

    print("\n🎉 All configuration tests passed!")

if __name__ == "__main__":
    test_config()
