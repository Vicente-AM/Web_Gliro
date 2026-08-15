from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Text, DateTime
from app.core.database import Base


class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(120), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    phone = Column(String(50), nullable=False)
    website = Column(String(255), nullable=True)
    goal = Column(String(100), nullable=False)
    budget = Column(String(100), nullable=False)
    status = Column(String(50), default="nuevo", nullable=False)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "website": self.website,
            "goal": self.goal,
            "budget": self.budget,
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
