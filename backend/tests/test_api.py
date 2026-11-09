import pytest
from fastapi.testclient import TestClient
from sqlalchemy import text, inspect
from app.main import app
from app.core.database import Base, engine

client = TestClient(app)


@pytest.fixture(autouse=True)
def setup_db():
    Base.metadata.create_all(bind=engine)
    with engine.connect() as conn:
        inspector = inspect(conn)
        if "leads" in inspector.get_table_names():
            existing_columns = [col["name"] for col in inspector.get_columns("leads")]
            if "company" not in existing_columns:
                conn.execute(text("ALTER TABLE leads ADD COLUMN company VARCHAR(160)"))
            if "interest" not in existing_columns:
                conn.execute(text("ALTER TABLE leads ADD COLUMN interest VARCHAR(255)"))
            if "origin" not in existing_columns:
                conn.execute(text("ALTER TABLE leads ADD COLUMN origin VARCHAR(50) DEFAULT 'web'"))
            conn.commit()
    yield


def test_health_endpoint():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "Gliro API"


def test_content_endpoint():
    response = client.get("/api/v1/content")
    assert response.status_code == 200
    data = response.json()
    assert data["brand"]["name"] == "Gliro"
    assert len(data["solutions"]) > 0
    assert len(data["portfolio"]) > 0
    assert len(data["testimonials"]) > 0


def test_submit_contact_form():
    payload = {
        "name": "Carlos Gomez",
        "email": "carlos@empresa.cl",
        "phone": "+56 9 1234 5678",
        "website": "empresa.cl",
        "goal": "ecommerce",
        "budget": "from_500k_to_1500k",
    }
    response = client.post("/api/v1/contact", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["success"] is True
    assert data["lead_id"] is not None

    # Check leads endpoint
    leads_response = client.get("/api/v1/leads")
    assert leads_response.status_code == 200
    leads = leads_response.json()
    assert any(lead["email"] == "carlos@empresa.cl" for lead in leads)


def test_submit_contact_honeypot_spam():
    payload = {
        "name": "Bot Spammer",
        "email": "bot@spam.com",
        "phone": "+1234567890",
        "goal": "leads",
        "budget": "under_500k",
        "contact_confirmation": "I am a bot",
    }
    response = client.post("/api/v1/contact", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["lead_id"] is None


def test_chat_register_and_message():
    # 1. Register a new chat lead
    reg_payload = {
        "nombre": "Ana Silva",
        "email": "ana.silva@empresa.cl",
        "telefono": "+56 9 8765 4321",
        "empresa": "TecnoCorp",
    }
    reg_res = client.post("/api/v1/chat/register", json=reg_payload)
    assert reg_res.status_code == 201
    reg_data = reg_res.json()
    assert reg_data["ok"] is True
    assert reg_data["nombre"] == "Ana Silva"
    lead_id = reg_data["lead_id"]

    # 2. Send a message to chat
    msg_payload = {
        "lead_id": lead_id,
        "messages": [
            {"role": "user", "content": "Hola, me interesa saber más sobre Licitracker y sus planes."}
        ],
    }
    msg_res = client.post("/api/v1/chat/message", json=msg_payload)
    assert msg_res.status_code == 200
    msg_data = msg_res.json()
    assert "reply" in msg_data
    assert len(msg_data["reply"]) > 0
