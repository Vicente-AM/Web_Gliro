import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.core.database import Base, engine

client = TestClient(app)


@pytest.fixture(autouse=True)
def setup_db():
    Base.metadata.create_all(bind=engine)
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
