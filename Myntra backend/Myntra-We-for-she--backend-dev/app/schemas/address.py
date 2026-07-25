from pydantic import BaseModel, Field, field_validator
from typing import Optional, List
from datetime import datetime

class AddressRequest(BaseModel):
    fullName: str = Field(..., max_length=100, description="Full name of target receiver (Required)")
    phoneNumber: str = Field(..., max_length=20, description="Contact phone number (Required)")
    label: Optional[str] = Field(default="Home", description="Address label (e.g. Home, Work, Other)")
    isDefault: Optional[bool] = Field(default=False, description="Whether this address is the user default")
    
    houseNumber: str = Field(default="", max_length=50, description="Flat/house/building number or name")
    street: str = Field(default="", max_length=150, description="Street, lane, road, or area detail")
    landmark: str = Field(default="", max_length=150, description="Nearby landmark if any")
    city: str = Field(..., max_length=100, description="City or township name (Required)")
    state: str = Field(..., max_length=100, description="State or administrative region (Required)")
    pincode: str = Field(default="", max_length=10, description="ZIP/Postal pincode")
    country: str = Field(default="India", max_length=100, description="Country name")

    @field_validator("city", "state", "country")
    @classmethod
    def validate_required_strings(cls, v: str, info) -> str:
        if v is None:
            raise ValueError(f"{info.field_name} is required")
        stripped = v.strip()
        if not stripped:
            raise ValueError(f"{info.field_name} cannot be empty or whitespace only")
        return stripped

    @field_validator("fullName", "phoneNumber", "houseNumber", "street", "landmark", "pincode", "label")
    @classmethod
    def strip_and_validate_strings(cls, v: Optional[str], info) -> str:
        if v is None:
            return ""
        stripped = v.strip()
        return stripped

    @field_validator("pincode")
    @classmethod
    def validate_pincode_format(cls, v: str) -> str:
        stripped = v.strip()
        if stripped and not stripped.isalnum():
            raise ValueError("Pincode must contain only alphanumeric characters")
        return stripped

class AddressResponse(BaseModel):
    id: str = Field(..., description="External identifier (excludes _id)")
    userId: str = Field(..., description="Owner User ID")
    fullName: str = Field(default="", description="Full name of target receiver")
    phoneNumber: str = Field(default="", description="Contact phone number")
    label: str = Field(..., description="Address label")
    isDefault: bool = Field(..., description="Default status flag")
    
    houseNumber: Optional[str] = Field(default="")
    street: Optional[str] = Field(default="")
    landmark: Optional[str] = Field(default="")
    city: Optional[str] = Field(default="")
    state: Optional[str] = Field(default="")
    pincode: Optional[str] = Field(default="")
    country: Optional[str] = Field(default="India")
    
    formatted_address: str = Field(description="Complete reconstructed delivery address layout")
    latitude: float = Field(description="Resolved latitude coordinate")
    longitude: float = Field(description="Resolved longitude coordinate")
    display_name: str = Field(description="Description display name returned by geocoding service")
    cached: bool = Field(default=False, description="Flag indicating if cached coordinates were used")
    createdAt: datetime = Field(..., description="Timestamp of object insertion")
    updatedAt: datetime = Field(..., description="Timestamp of last modification")

    model_config = {
        "json_schema_extra": {
            "example": {
                "id": "60c72b2f9b1d8e1f5c6b4568",
                "userId": "60c72b2f9b1d8e1f5c6b4569",
                "fullName": "Abhinaya",
                "phoneNumber": "9346562486",
                "label": "Home",
                "isDefault": True,
                "houseNumber": "3-5-68/3",
                "street": "XYZ Colony",
                "landmark": "Near Bus Stand",
                "city": "Sangareddy",
                "state": "Telangana",
                "pincode": "502001",
                "country": "India",
                "formatted_address": "3-5-68/3, XYZ Colony, Near Bus Stand, Sangareddy, Telangana, 502001, India",
                "latitude": 17.6252,
                "longitude": 78.0934,
                "display_name": "Sangareddy, Telangana, India",
                "cached": False,
                "createdAt": "2026-07-22T12:00:00Z",
                "updatedAt": "2026-07-22T12:00:00Z"
            }
        }
    }

class AddressUpdatePayload(BaseModel):
    fullName: Optional[str] = Field(default=None, max_length=100, description="Full name of target receiver")
    phoneNumber: Optional[str] = Field(default=None, max_length=20, description="Contact phone number")
    label: Optional[str] = Field(default=None, max_length=20, description="Address label (e.g. Home, Work, Other)")
    isDefault: Optional[bool] = Field(default=None, description="Set this address as default")
    
    houseNumber: Optional[str] = Field(default=None, max_length=50, description="Flat/house/building number or name")
    street: Optional[str] = Field(default=None, max_length=150, description="Street, lane, road, or area detail")
    landmark: Optional[str] = Field(default=None, max_length=150, description="Nearby landmark if any")
    city: Optional[str] = Field(default=None, max_length=100, description="City or township name")
    state: Optional[str] = Field(default=None, max_length=100, description="State or administrative region")
    pincode: Optional[str] = Field(default=None, max_length=10, description="ZIP/Postal pincode")
    country: Optional[str] = Field(default=None, max_length=100, description="Country name")

    @field_validator("city", "state", "country")
    @classmethod
    def validate_non_empty_strings(cls, v: Optional[str], info) -> Optional[str]:
        if v is None:
            return None
        stripped = v.strip()
        if not stripped:
            raise ValueError(f"{info.field_name} cannot be empty or whitespace only")
        return stripped

    @field_validator("fullName", "phoneNumber", "houseNumber", "street", "landmark", "pincode", "label")
    @classmethod
    def strip_optional_fields(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return None
        return v.strip()

    @field_validator("pincode")
    @classmethod
    def validate_pincode(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return None
        stripped = v.strip()
        if stripped and not stripped.isalnum():
            raise ValueError("Pincode must contain only alphanumeric characters")
        return stripped

class ReverseGeocodeRequest(BaseModel):
    latitude: float = Field(..., description="Latitude coordinate (Required)")
    longitude: float = Field(..., description="Longitude coordinate (Required)")

    @field_validator("latitude")
    @classmethod
    def validate_latitude_range(cls, v: float) -> float:
        if not -90.0 <= v <= 90.0:
            raise ValueError("Latitude must be between -90.0 and 90.0 degrees")
        return v

    @field_validator("longitude")
    @classmethod
    def validate_longitude_range(cls, v: float) -> float:
        if not -180.0 <= v <= 180.0:
            raise ValueError("Longitude must be between -180.0 and 180.0 degrees")
        return v

    model_config = {
        "json_schema_extra": {
            "example": {
                "latitude": 17.615515,
                "longitude": 78.081722
            }
        }
    }

class ReverseGeocodeResponse(BaseModel):
    houseNumber: str = Field(default="", description="Flat/house/building number or name")
    street: str = Field(default="", description="Street, lane, road, or area detail")
    landmark: str = Field(default="", description="Nearby landmark if any")
    city: str = Field(default="", description="City or township name")
    state: str = Field(default="", description="State or administrative region")
    pincode: str = Field(default="", description="ZIP/Postal pincode")
    country: str = Field(default="India", description="Country name")
    formatted_address: str = Field(description="Complete reconstructed delivery address layout")
    display_name: str = Field(description="Description display name returned by the geocoding service")
    latitude: float = Field(description="Resolved latitude coordinate")
    longitude: float = Field(description="Resolved longitude coordinate")
    cached: bool = Field(default=False, description="Flag indicating if cached coordinates were used")

    model_config = {
        "json_schema_extra": {
            "example": {
                "houseNumber": "3-5-68/3",
                "street": "XYZ Colony",
                "landmark": "Near Bus Stand",
                "city": "Sangareddy",
                "state": "Telangana",
                "pincode": "502001",
                "country": "India",
                "formatted_address": "3-5-68/3, XYZ Colony, Near Bus Stand, Sangareddy, Telangana, 502001, India",
                "display_name": "Sangareddy, Sangareddy District, Telangana, 502001, India",
                "latitude": 17.615515,
                "longitude": 78.081722,
                "cached": False
            }
        }
    }
