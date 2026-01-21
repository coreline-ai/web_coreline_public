from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
import uuid
import os
from ..utils import generate_presigned_url, S3_BUCKET_NAME, S3_ENDPOINT_URL
from ..models import User
from ..dependencies import get_current_user

router = APIRouter()

class FileUploadRequest(BaseModel):
    filename: str
    content_type: str

class FileUploadResponse(BaseModel):
    upload_url: str
    file_url: str

@router.post("/files/signed-url", response_model=FileUploadResponse)
def get_upload_url(
    req: FileUploadRequest,
    current_user: User = Depends(get_current_user)
):
    # Generate unique filename
    ext = req.filename.split('.')[-1] if '.' in req.filename else "bin"
    object_name = f"uploads/{current_user.id}/{uuid.uuid4()}.{ext}"
    
    upload_url = generate_presigned_url(object_name, req.content_type)
    
    if not upload_url:
        raise HTTPException(status_code=500, detail="Could not generate upload URL")
        
    # Construct public file URL
    # If using R2 custom domain or public endpoint
    # S3_ENDPOINT_URL typically looks like https://<account>.r2.cloudflarestorage.com
    # Public access might be via a separate domain. For now, assume a PUBLIC_ASSET_URL env or construct from S3 config.
    # User can configure PUBLIC_ASSET_URL in .env.
    
    public_base_url = os.environ.get("PUBLIC_ASSET_URL")
    if not public_base_url:
        # Fallback logic or just use endpoint/bucket
        file_url = f"{S3_ENDPOINT_URL}/{S3_BUCKET_NAME}/{object_name}"
    else:
        file_url = f"{public_base_url}/{object_name}"

    return FileUploadResponse(upload_url=upload_url, file_url=file_url)
