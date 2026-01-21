import os
import boto3
from fastapi import APIRouter, Depends, HTTPException
from api._lib.auth import get_current_user
from api._lib.models import User
from api._lib.schemas import ResponseModel
from pydantic import BaseModel
from botocore.config import Config

router = APIRouter()

class SignedUrlRequest(BaseModel):
    filename: str
    content_type: str

@router.post("/api/files/signed-url")
async def get_signed_url(req: SignedUrlRequest, current_user: User = Depends(get_current_user)):
    # Configuration
    S3_BUCKET = os.getenv("S3_BUCKET_NAME")
    AWS_REGION = os.getenv("AWS_REGION", "ap-northeast-2")
    
    if not S3_BUCKET:
        raise HTTPException(status_code=500, detail="S3 configuration missing")
    
    s3_client = boto3.client(
        's3',
        aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
        region_name=AWS_REGION,
        config=Config(signature_version='s3v4')
    )
    
    # Generate a unique key for the file
    import uuid
    file_key = f"uploads/{uuid.uuid4()}-{req.filename}"
    
    try:
        presigned_post = s3_client.generate_presigned_post(
            Bucket=S3_BUCKET,
            Key=file_key,
            Fields={"Content-Type": req.content_type},
            Conditions=[{"Content-Type": req.content_type}],
            ExpiresIn=300 # 5 minutes
        )
        
        file_url = f"https://{S3_BUCKET}.s3.{AWS_REGION}.amazonaws.com/{file_key}"
        
        return ResponseModel.success_res({
            "upload_url": presigned_post["url"],
            "fields": presigned_post["fields"],
            "file_url": file_url
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Vercel entry point
from fastapi import FastAPI
app = FastAPI()
app.include_router(router)
