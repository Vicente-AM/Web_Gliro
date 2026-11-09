@echo off
title Gliro Development Launcher
echo ========================================================
echo          Iniciando Gliro Plataforma Web Local           
echo ========================================================
echo.
echo Levantando Backend (FastAPI :8001)...
start "Gliro Backend [Port 8001]" cmd /k "cd /d "%~dp0backend" && .\venv\Scripts\activate && python run.py"

echo Levantando Frontend (Vite :5173)...
start "Gliro Frontend [Port 5173]" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo Todo en marcha:
echo   - Frontend: http://localhost:5173
echo   - Backend:  http://127.0.0.1:8001/api/v1/docs
echo ========================================================

