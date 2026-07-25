from pydantic import BaseModel, Field, EmailStr, field_validator
from typing import Optional
from datetime import datetime

class ProfileResponse(BaseModel):
    full_name: str = Field(..., description="User's full name")
    email: str = Field(..., description="User's email address")
    gender: Optional[str] = Field(default=None, description="User's gender")
    date_of_birth: Optional[str] = Field(default=None, description="User's date of birth (DD-MM-YYYY)")

    model_config = {
        "json_schema_extra": {
            "example": {
                "full_name": "Jane Doe",
                "email": "jane@example.com",
                "gender": "Female",
                "date_of_birth": "15-08-1995"
            }
        }
    }

class ProfileUpdateRequest(BaseModel):
    full_name: str = Field(..., description="User's full name (Cannot be empty)")
    email: EmailStr = Field(..., description="User's email address (Must be valid format)")
    gender: Optional[str] = Field(default=None, description="User's gender (Male, Female, Other, Prefer Not To Say)")
    date_of_birth: Optional[str] = Field(default=None, description="User's date of birth (Format: DD-MM-YYYY)")

    @field_validator("full_name")
    @classmethod
    def validate_full_name(cls, v: str) -> str:
        if v is None:
            raise ValueError("Full Name is required")
        stripped = v.strip()
        if not stripped:
            raise ValueError("Full Name cannot be empty or whitespace only")
        if len(stripped) < 2:
            raise ValueError("Full Name is too short (Minimum 2 characters)")
        if len(stripped) > 70:
            raise ValueError("Full Name is too long (Maximum 70 characters)")
        return stripped

    @field_validator("gender")
    @classmethod
    def validate_gender(cls, v: Optional[str]) -> Optional[str]:
        if not v:
            return None
        valid_genders = ["Male", "Female", "Other", "Prefer Not To Say"]
        if v not in valid_genders:
            raise ValueError("Gender must be one of: Male, Female, Other, Prefer Not To Say")
        return v

    @field_validator("date_of_birth")
    @classmethod
    def validate_date_of_birth(cls, v: Optional[str]) -> Optional[str]:
        if not v or not v.strip():
            return None
        
        stripped = v.strip()
        
        # 1. Check format DD-MM-YYYY
        try:
            dob_date = datetime.strptime(stripped, "%d-%m-%Y").date()
        except ValueError:
            raise ValueError("Date of Birth must be in format DD-MM-YYYY")
            
        # 2. Check no future date allowed
        today = datetime.utcnow().date()
        if dob_date > today:
            raise ValueError("Date of Birth cannot be in the future")
            
        return stripped
