from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, EmailStr, Field


class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=120, description="Nombre completo")
    email: EmailStr = Field(..., description="Correo electrónico corporativo")
    phone: str = Field(..., min_length=6, max_length=50, description="Teléfono o WhatsApp")
    website: Optional[str] = Field(None, max_length=255, description="Sitio web actual (opcional)")
    goal: str = Field(..., min_length=2, max_length=100, description="Objetivo principal")
    budget: Optional[str] = Field(None, max_length=100, description="Rango de presupuesto (opcional)")
    contact_confirmation: Optional[str] = Field(None, description="Honeypot anti-spam field")


class ContactResponse(BaseModel):
    success: bool
    message: str
    lead_id: Optional[int] = None


class LeadOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    website: Optional[str] = None
    interest: Optional[str] = None
    goal: Optional[str] = None
    budget: Optional[str] = None
    status: str
    origin: str = "web"
    notes: Optional[str] = None
    created_at: datetime
