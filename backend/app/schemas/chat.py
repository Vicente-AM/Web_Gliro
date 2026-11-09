from typing import List, Optional, Literal
from pydantic import BaseModel, Field, model_validator


class ChatRegisterRequest(BaseModel):
    nombre: str = Field(..., min_length=1, max_length=120, description="Nombre del visitante")
    email: Optional[str] = Field(None, max_length=160, description="Correo electrónico del visitante")
    telefono: Optional[str] = Field(None, max_length=50, description="Teléfono o WhatsApp del visitante")
    empresa: Optional[str] = Field(None, max_length=160, description="Empresa u organización (opcional)")

    @model_validator(mode="after")
    def check_at_least_one_contact(self):
        email_clean = (self.email or "").strip()
        tel_clean = (self.telefono or "").strip()
        nombre_clean = (self.nombre or "").strip()

        if not nombre_clean:
            raise ValueError("Falta tu nombre.")
        if not email_clean and not tel_clean:
            raise ValueError("Déjanos al menos un email o un teléfono para poder contactarte.")
        return self


class ChatRegisterResponse(BaseModel):
    ok: bool = True
    lead_id: int
    nombre: str


class ChatMessageItem(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(..., max_length=1000)


class ChatMessageRequest(BaseModel):
    lead_id: int
    messages: List[ChatMessageItem] = Field(..., min_length=1, max_length=30)


class ChatMessageResponse(BaseModel):
    reply: str
    leadUpdated: bool = False
