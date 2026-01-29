import os
import logging
from typing import Optional
from pydantic import Field, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

logger = logging.getLogger(__name__)

class Settings(BaseSettings):
    """
    Centralized configuration management for the Backend API.
    Loads environment variables and provides safety checks.
    """
    # Security
    jwt_secret: Optional[str] = Field(None, alias="JWT_SECRET")
    
    # Environment Detection
    environment: str = Field("development", alias="ENVIRONMENT")
    vercel: bool = Field(False, alias="VERCEL")
    vercel_env: Optional[str] = Field(None, alias="VERCEL_ENV")
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

    @property
    def is_production(self) -> bool:
        """Helper to determine if running in a production-like environment."""
        return (
            self.environment == "production" or 
            self.vercel or 
            self.vercel_env in ["production", "preview"]
        )

    @model_validator(mode='after')
    def validate_security(self) -> 'Settings':
        """Ensure critical security settings are present in production."""
        if not self.jwt_secret:
            if self.is_production:
                logger.error("🛑 CRITICAL: JWT_SECRET environment variable is missing in production!")
                raise RuntimeError("JWT_SECRET must be set for production environments.")
            else:
                # Provide a clear, secure default for development + warning
                logger.warning("⚠️  JWT_SECRET is not set. Using a development-only secret.")
                self.jwt_secret = "dev-secret-key-not-for-production"
        
        return self

# Global singleton settings object
# Initialized once and imported where needed
settings = Settings()
