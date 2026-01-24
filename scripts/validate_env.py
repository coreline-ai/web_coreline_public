#!/usr/bin/env python3
"""
Pre-deployment environment validation script.
Run this before deploying to ensure all required environment variables are set.

Usage:
    python scripts/validate_env.py --env production
"""

import os
import sys
import argparse

REQUIRED_PRODUCTION_VARS = [
    ("JWT_SECRET", "Strong secret key for JWT signing (min 32 characters)"),
    ("ADMIN_SETUP_KEY", "Secret key for first admin user creation"),
    ("ENVIRONMENT", "Must be set to 'production'"),
    ("BACKEND_URL", "Backend API URL (https://...)"),
    ("ALLOWED_ORIGINS", "Comma-separated list of allowed frontend origins"),
]

OPTIONAL_VARS = [
    ("S3_BUCKET_NAME", "S3/R2 bucket name for file uploads"),
    ("AWS_ACCESS_KEY_ID", "AWS access key for S3"),
    ("AWS_SECRET_ACCESS_KEY", "AWS secret key for S3"),
    ("AWS_REGION", "AWS region for S3"),
]


def validate_production():
    """Validate that all required production environment variables are set."""
    missing = []
    warnings = []
    
    print("🔍 Validating production environment variables...\n")
    
    for var, description in REQUIRED_PRODUCTION_VARS:
        value = os.getenv(var)
        if not value:
            missing.append((var, description))
            print(f"❌ {var}: NOT SET")
        else:
            # Additional validation
            if var == "JWT_SECRET" and len(value) < 32:
                warnings.append(f"{var}: Should be at least 32 characters (current: {len(value)})")
                print(f"⚠️  {var}: SET but too short ({len(value)} chars)")
            elif var == "ENVIRONMENT" and value != "production":
                warnings.append(f"{var}: Should be 'production' (current: {value})")
                print(f"⚠️  {var}: SET but value is '{value}'")
            elif var == "BACKEND_URL" and not value.startswith("https://"):
                warnings.append(f"{var}: Should use HTTPS in production")
                print(f"⚠️  {var}: SET but not HTTPS")
            else:
                # Mask secrets in output
                if "SECRET" in var or "KEY" in var:
                    print(f"✅ {var}: SET (****)")
                else:
                    print(f"✅ {var}: {value}")
    
    print("\n📋 Optional variables:")
    for var, description in OPTIONAL_VARS:
        value = os.getenv(var)
        if value:
            if "SECRET" in var or "KEY" in var:
                print(f"✅ {var}: SET (****)")
            else:
                print(f"✅ {var}: {value}")
        else:
            print(f"⬚  {var}: Not set ({description})")
    
    print("\n" + "=" * 50)
    
    if missing:
        print(f"\n❌ FAILED: {len(missing)} required variable(s) missing:")
        for var, desc in missing:
            print(f"   - {var}: {desc}")
        return False
    
    if warnings:
        print(f"\n⚠️  WARNINGS: {len(warnings)} issue(s) found:")
        for warning in warnings:
            print(f"   - {warning}")
    
    print("\n✅ All required environment variables are set!")
    return True


def main():
    parser = argparse.ArgumentParser(description="Validate environment variables for deployment")
    parser.add_argument("--env", choices=["production", "development"], default="production",
                        help="Environment to validate")
    args = parser.parse_args()
    
    if args.env == "production":
        success = validate_production()
        sys.exit(0 if success else 1)
    else:
        print("Development environment - no validation required")
        sys.exit(0)


if __name__ == "__main__":
    main()
