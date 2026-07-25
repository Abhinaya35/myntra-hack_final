from pydantic import BaseModel, Field, EmailStr, field_validator
from typing import Optional
from datetime import datetime

class UserRegisterRequest(BaseModel):
    name: str = Field(..., description="User's full name (Required)")
    email: EmailStr = Field(..., description="User's login email address (Required)")
    password: str = Field(..., min_length=6, description="User password. Minimum 6 characters (Required)")

    @field_validator("name", "password")
    @classmethod
    def validate_non_empty_strings(cls, v: str, info) -> str:
        if v is None:
            raise ValueError(f"{info.field_name} is required")
        stripped = v.strip()
        if not stripped:
            raise ValueError(f"{info.field_name} cannot be empty or whitespace only")
        return stripped

    @field_validator("email")
    @classmethod
    def lowercase_and_trim_email(cls, v: EmailStr) -> str:
        return str(v).strip().lower()

class UserLoginRequest(BaseModel):
    email: EmailStr = Field(..., description="User's registered email address")
    password: str = Field(..., description="User password")

    @field_validator("email")
    @classmethod
    def process_email(cls, v: EmailStr) -> str:
        return str(v).strip().lower()
        
    @field_validator("password")
    @classmethod
    def process_password(cls, v: str) -> str:
        if not v:
            raise ValueError("Password cannot be empty")
        return v

class UserProfileResponse(BaseModel):
    id: str = Field(..., description="External string identifier")
    name: str = Field(..., description="User full name")
    email: str = Field(..., description="User registered email")
    role: str = Field(..., description="Access administrative roles")
    createdAt: datetime = Field(..., description="User instance creation timestamp")

    model_config = {
        "json_schema_extra": {
            "example": {
                "id": "60c72b2f9b1d8e1f5c6b4568",
                "name": "Jane Doe",
                "email": "jane@example.com",
                "role": "customer",
                "createdAt": "2026-07-22T13:40:00Z"
            }
        }
    }

class TokenResponse(BaseModel):
    message: str = Field(default="Login successful", description="Token acquisition status message")
    access_token: str = Field(..., description="Signed JWT Bearer Access Token")
    token_type: str = Field(default="Bearer", description="Token authentication typing header")
    expires_in: int = Field(..., description="Token lifespan remainder in seconds")
    user: UserProfileResponse = Field(..., description="Lightweight profile of the authenticated user")

    model_config = {
        "json_schema_extra": {
            "example": {
                "message": "Login successful",
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "token_type": "Bearer",
                "expires_in": 1800,
                "user": {
                    "id": "60c72b2f9b1d8e1f5c6b4568",
                    "name": "Jane Doe",
                    "email": "jane@example.com",
                    "role": "customer",
                    "createdAt": "2026-07-22T13:40:00Z"
                }
            }
        }
    }

class UserRegisterResponse(BaseModel):
    message: str = Field(default="User registered successfully", description="Status message")
    user: UserProfileResponse = Field(..., description="Lightweight profile of the newly registered user")

    model_config = {
        "json_schema_extra": {
            "example": {
                "message": "User registered successfully",
                "user": {
                    "id": "60c72b2f9b1d8e1f5c6b4568",
                    "name": "Jane Doe",
                    "email": "jane@example.com",
                    "role": "customer",
                    "createdAt": "2026-07-22T13:40:00Z"
                }
            }
        }
    }
