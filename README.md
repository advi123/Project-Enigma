# Project Enigma — Phase 1: Project Foundation

Welcome to **Project Enigma**, a high-performance, modular AI application foundation built with **FastAPI**, **React**, **Vite**, **TypeScript**, and **Tailwind CSS**.

Phase 1 establishes the foundational infrastructure required to build enterprise-ready AI services (including future state management, LLM orchestration, RAG, and planning agents).

---

## 🏗 System Architecture Overview

```
Project-Enigma/
├── .gitignore
├── README.md
├── backend/
│   ├── .env.example            # Environment variables template
│   ├── .env                    # Runtime environment configuration
│   ├── requirements.txt        # Python backend dependencies
│   └── app/
│       ├── __init__.py
│       ├── main.py             # FastAPI entry point & CORS configuration
│       ├── core/
│       │   ├── config.py       # Pydantic Settings management
│       │   └── logging.py      # Centralized logging setup
│       └── api/
│           └── v1/
│               ├── router.py   # API Router aggregator
│               └── endpoints/
│                   └── health.py # System Health API endpoint
└── frontend/
    ├── .env.example            # Frontend environment variable template
    ├── .env                    # Frontend runtime environment configuration
    ├── package.json            # Node.js dependencies and scripts
    ├── tsconfig.json           # TypeScript strict compiler configuration
    ├── vite.config.ts          # Vite bundler & API proxy setup
    ├── tailwind.config.js      # Tailwind CSS theme & aesthetic configuration
    ├── postcss.config.js
    ├── index.html              # Modern dark-mode HTML wrapper
    └── src/
        ├── main.tsx            # React application root mount
        ├── App.tsx             # Main dashboard container
        ├── index.css           # Global Tailwind directives & glassmorphic utilities
        ├── components/
        │   └── HealthStatus.tsx# Real-time backend connection & diagnostics widget
        ├── services/
        │   └── api.ts          # Type-safe API client service
        └── types/
            └── health.ts       # Health endpoint TypeScript declarations
```

---

## ⚙️ Requirements & Prerequisites

- **Python**: 3.10 or higher
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

---

## 🚀 Quickstart Guide

### 1. Backend Setup & Virtual Environment

Open a terminal in the project root:

```bash
# 1. Create a Python Virtual Environment
python -m venv .venv

# 2. Activate the Virtual Environment
# On Windows PowerShell:
.venv\Scripts\Activate.ps1
# On Linux/macOS:
# source .venv/bin/activate

# 3. Change directory to backend and install dependencies
cd backend
pip install -r requirements.txt

# 4. Copy environment configuration (if not already created)
cp .env.example .env

# 5. Start the FastAPI backend server
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

The backend server will run at `http://127.0.0.1:8000`.
- **Health Check Endpoint**: [http://127.0.0.1:8000/api/v1/health](http://127.0.0.1:8000/api/v1/health)
- **Interactive Swagger OpenAPI Docs**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **ReDoc API Documentation**: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

---

### 2. Frontend Setup

Open a new terminal window:

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install Node dependencies
npm install

# 3. Copy environment configuration (if not already created)
cp .env.example .env

# 4. Start Vite development server
npm run dev
```

The React frontend will start at `http://localhost:5173`. Open your browser to view the interactive Phase 1 status dashboard.

---

## 🔐 Environment Configuration

### Backend (`backend/.env`)

| Variable | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `PROJECT_NAME` | string | `"Project Enigma API"` | Display name of the backend service |
| `VERSION` | string | `"0.1.0"` | Backend release version |
| `DEBUG` | boolean | `True` | Debug mode toggle |
| `API_V1_STR` | string | `"/api/v1"` | API v1 URL path prefix |
| `CORS_ORIGINS` | JSON list | `["http://localhost:5173","http://127.0.0.1:5173"]` | Allowed origins for cross-origin requests |
| `HOST` | string | `"127.0.0.1"` | Bind host address |
| `PORT` | integer | `8000` | Server listening port |
| `LOG_LEVEL` | string | `"INFO"` | Standard logging severity level |

### Frontend (`frontend/.env`)

| Variable | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `VITE_APP_TITLE` | string | `"Project Enigma"` | Application brand title |
| `VITE_API_BASE_URL` | string | `"http://127.0.0.1:8000/api/v1"` | Base URL for FastAPI endpoints |

---

## 📡 API Specification

### Health Check

- **URL**: `/api/v1/health`
- **Method**: `GET`
- **Response Format**: `application/json`

**Sample Response**:
```json
{
  "status": "ok",
  "app_name": "Project Enigma API",
  "version": "0.1.0",
  "environment": "development",
  "timestamp": "2026-07-22T10:30:00+00:00",
  "cors_allowed_origins": [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
  ]
}
```

---

## 🧪 Verification & Health Checks

To run TypeScript type validation across the frontend:
```bash
cd frontend
npm run lint
```

To test backend endpoint functionality manually or programmatically:
```bash
curl http://127.0.0.1:8000/api/v1/health
```
