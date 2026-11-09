from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.lead import Lead
from app.schemas.chat import (
    ChatRegisterRequest,
    ChatRegisterResponse,
    ChatMessageRequest,
    ChatMessageResponse,
)
from app.services.deepseek import call_deepseek_chat
from app.core.email import send_chat_lead_notification_email

router = APIRouter(prefix="/chat", tags=["Chatbot"])


@router.post("/register", response_model=ChatRegisterResponse, status_code=status.HTTP_201_CREATED)
def register_chat_lead(
    payload: ChatRegisterRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    """
    Registers the visitor in SQLite as a Lead before opening the interactive AI chat,
    and sends an immediate notification email to the Gliro team.
    """
    try:
        new_lead = Lead(
            name=payload.nombre.strip(),
            email=payload.email.strip().lower() if payload.email and payload.email.strip() else None,
            phone=payload.telefono.strip() if payload.telefono and payload.telefono.strip() else None,
            company=payload.empresa.strip() if payload.empresa and payload.empresa.strip() else None,
            website=None,
            interest=None,
            goal="Conversación en Chatbot",
            budget="No especificado",
            status="chat_iniciado",
            origin="chat",
            notes="Lead registrado en widget de chat",
        )
        db.add(new_lead)
        db.commit()
        db.refresh(new_lead)

        # Dispatch background notification email
        lead_dict = {
            "name": new_lead.name,
            "email": new_lead.email,
            "phone": new_lead.phone,
            "company": new_lead.company,
            "interest": new_lead.interest,
            "notes": new_lead.notes,
        }
        background_tasks.add_task(send_chat_lead_notification_email, lead_dict, False)

        return ChatRegisterResponse(
            ok=True,
            lead_id=new_lead.id,
            nombre=new_lead.name,
        )
    except Exception as exc:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"No se pudo guardar el registro: {str(exc)}",
        )


@router.post("/message", response_model=ChatMessageResponse)
async def handle_chat_message(
    payload: ChatMessageRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    """
    Processes chat messages with DeepSeek AI assistant.
    If the assistant identifies customer interest, it calls 'actualizar_lead'
    to update the lead profile in SQLite and trigger an email update.
    """
    lead = db.query(Lead).filter(Lead.id == payload.lead_id).first()
    if not lead:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Primero completa tus datos de contacto para poder chatear.",
        )

    lead_info = {
        "id": lead.id,
        "name": lead.name,
        "email": lead.email,
        "phone": lead.phone,
        "company": lead.company,
    }

    conversation_history = [
        {"role": msg.role, "content": msg.content}
        for msg in payload.messages
    ]

    reply_text, lead_updated, update_data = await call_deepseek_chat(lead_info, conversation_history)

    if lead_updated and update_data:
        try:
            if update_data.get("interes"):
                lead.interest = update_data["interes"].strip()
            if update_data.get("notas"):
                lead.notes = update_data["notas"].strip()
            if update_data.get("empresa") and not lead.company:
                lead.company = update_data["empresa"].strip()

            lead.status = "calificado_por_ia"
            db.commit()
            db.refresh(lead)

            # Dispatch notification update email
            lead_dict = {
                "name": lead.name,
                "email": lead.email,
                "phone": lead.phone,
                "company": lead.company,
                "interest": lead.interest,
                "notes": lead.notes,
            }
            background_tasks.add_task(send_chat_lead_notification_email, lead_dict, True)
        except Exception as exc:
            db.rollback()
            print(f"[DB ERROR] Error updating lead {lead.id} with AI tool: {exc}")

    return ChatMessageResponse(
        reply=reply_text,
        leadUpdated=lead_updated,
    )
