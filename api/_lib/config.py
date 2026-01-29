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
        """Ensure critical security settings are present."""
        if not self.jwt_secret:
            raise RuntimeError(
                "🛑 JWT_SECRET not set!\n"
                "Please create a .env file:\n"
                "  echo 'JWT_SECRET=$(openssl rand -base64 32)' > .env\n"
            )
        
        return self

# Global singleton settings object
# Initialized once and imported where needed
settings = Settings()
