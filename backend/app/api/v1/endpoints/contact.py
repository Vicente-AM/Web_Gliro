from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.lead import Lead
from app.schemas.contact import ContactCreate, ContactResponse, LeadOut

router = APIRouter()


@router.post("/contact", response_model=ContactResponse, status_code=status.HTTP_201_CREATED, tags=["Contact"])
def submit_contact_form(payload: ContactCreate, db: Session = Depends(get_db)):
    """Receives contact/quote submissions from the website, validates honeypot, and saves to SQLite3."""
    # Anti-spam honeypot verification
    if payload.contact_confirmation:
        # Silently reject bots without raising alarm
        return ContactResponse(
            success=True,
            message="Solicitud procesada.",
            lead_id=None,
        )

    try:
        new_lead = Lead(
            name=payload.name.strip(),
            email=payload.email.strip().lower(),
            phone=payload.phone.strip(),
            website=payload.website.strip() if payload.website else None,
            goal=payload.goal.strip(),
            budget=payload.budget.strip(),
            status="nuevo",
        )
        db.add(new_lead)
        db.commit()
        db.refresh(new_lead)

        return ContactResponse(
            success=True,
            message="¡Gracias por contactar a Gliro! Nos comunicaremos contigo en menos de 24 horas hábiles.",
            lead_id=new_lead.id,
        )
    except Exception as exc:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al registrar la solicitud: {str(exc)}",
        )


@router.get("/leads", response_model=List[LeadOut], tags=["Leads"])
def list_leads(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    """Retrieve captured leads for administration."""
    leads = db.query(Lead).order_by(Lead.created_at.desc()).offset(skip).limit(limit).all()
    return leads
