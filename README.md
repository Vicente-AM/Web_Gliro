# Gliro - Plataforma Web Oficial

Plataforma web de alto rendimiento para **Gliro**, construida con **Python (FastAPI + SQLite3)** en el backend y **React 19 + Vite + Tailwind CSS v4** en el frontend.

---

## 🏗️ Estructura del Proyecto

```
Web_Gliro/
├── backend/                  # API REST en FastAPI
│   ├── app/
│   │   ├── api/v1/          # Endpoints (/health, /contact, /content, /leads)
│   │   ├── core/            # Configuración, CORS y conexión SQLite
│   │   ├── models/          # Modelos SQLAlchemy (Lead)
│   │   └── schemas/         # Schemas Pydantic con validación y honeypot
│   ├── tests/               # Tests unitarios con pytest
│   ├── pytest.ini
│   ├── requirements.txt
│   └── run.py
│
├── frontend/                 # Aplicación SPA en React + Vite + Tailwind
│   ├── src/
│   │   ├── components/      # Componentes UI (Navbar, Hero, Products, Services, etc.)
│   │   ├── data/            # Contenido oficial y estructura de datos
│   │   ├── services/        # Cliente API para backend
│   │   ├── types/           # Interfaces TypeScript
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
├── .gitignore                # Reglas para ignorar .Agents, venv, node_modules, etc.
└── README.md
```

---

## 🚀 Puesta en Marcha Local

### 1. Backend (FastAPI)

```bash
cd backend
python -m venv venv

# En Windows (PowerShell):
.\venv\Scripts\activate

# Instalar dependencias:
pip install -r requirements.txt

# Ejecutar el servidor:
python run.py
```
- API Docs (Swagger): `http://127.0.0.1:8001/api/v1/docs`
- Health check: `http://127.0.0.1:8001/api/v1/health`

### 2. Frontend (Vite + React + Tailwind CSS)

```bash
cd frontend

# Instalar dependencias:
npm install

# Iniciar servidor de desarrollo:
npm run dev
```
- Aplicación web: `http://127.0.0.1:5173/`

### 3. Tests

```bash
cd backend
pytest
```
