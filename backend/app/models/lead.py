from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Text, DateTime
from app.core.database import Base


class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(120), nullable=False)
    email = Column(String(255), nullable=True, index=True)
    phone = Column(String(50), nullable=True)
    company = Column(String(160), nullable=True)
    website = Column(String(255), nullable=True)
    interest = Column(String(255), nullable=True)
    goal = Column(String(100), nullable=True)
    budget = Column(String(100), nullable=True)
    status = Column(String(50), default="nuevo", nullable=False)
    origin = Column(String(50), default="web", nullable=False)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email or "",
            "phone": self.phone or "",
            "company": self.company or "",
            "website": self.website,
            "interest": self.interest,
            "goal": self.goal or "No especificado",
            "budget": self.budget or "No especificado",
            "status": self.status,
            "origin": self.origin,
            "notes": self.notes,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
