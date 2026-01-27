
import subprocess
import os
import sys
from datetime import datetime

def run_auto_migration():
    print("\n🔄 [Auto-Migrate] Checking for DB schema changes...")
    
    # 1. Generate revision (will be skipped if no changes due to env.py modification)
    # We use a timestamped message
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    msg = f"auto_dev_{timestamp}"
    
    # Run alembic revision
    # autogenerate is critical here
    result = subprocess.run(
        ["alembic", "revision", "--autogenerate", "-m", msg], 
        capture_output=True, 
        text=True
    )
    
    # stdout/stderr retrieval
    output = result.stdout + result.stderr
    print(output)
    
    if result.returncode != 0:
        print("❌ [Auto-Migrate] Error checking revisions.")
        # Optional: exit(1) if we want to block dev server, 
        # but usually we might want to let it continue if it's just a connection error
        return

    # 2. Check if alembic said "No schema changes detected" (our custom message)
    if "No schema changes detected" in output:
        print("✅ [Auto-Migrate] DB is up to date.")
    else:
        # If a file was generated or other output, we try to upgrade
        print("🚀 [Auto-Migrate] Changes detected. Applying migrations...")
        upgrade_result = subprocess.run(["alembic", "upgrade", "head"], capture_output=True, text=True)
        print(upgrade_result.stdout)
        
        if upgrade_result.returncode == 0:
            print("✅ [Auto-Migrate] Successfully synchronized DB.")
        else:
            print("❌ [Auto-Migrate] Migration application failed.")
            print(upgrade_result.stderr)
            sys.exit(1)

if __name__ == "__main__":
    run_auto_migration()
