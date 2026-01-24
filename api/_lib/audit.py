from sqlalchemy.ext.asyncio import AsyncSession
from api._lib.models import AuditLog
import json

async def log_action(
    db: AsyncSession,
    action: str,
    user_id: str = None,
    target_id: str = None,
    target_type: str = None,
    ip_address: str = None,
    details: dict = None
):
    """
    Logs an administrative or security-critical action to the database.
    """
    try:
        details_json = json.dumps(details) if details else None
        
        log_entry = AuditLog(
            user_id=user_id,
            action=action,
            target_id=str(target_id) if target_id else None,
            target_type=target_type,
            ip_address=ip_address,
            details=details_json
        )
        
        db.add(log_entry)
        # We don't commit here to allow the caller to commit as part of their transaction,
        # or we might want to commit immediately? 
        # Usually audit logs should be committed even if the main action fails (if possible),
        # but sharing the session means it's part of the transaction.
        # For true independence, we'd need a separate session, but for now transaction-bound is okay.
        
    except Exception as e:
        print(f"Failed to create audit log: {e}")
