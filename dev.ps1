# Script para levantar entorno local Gliro (Backend + Frontend)
$rootDir = $PSScriptRoot

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "         Iniciando Gliro Plataforma Web Local           " -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Levantando Backend (FastAPI :8001)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$rootDir\backend'; .\venv\Scripts\activate; python run.py"

Write-Host "Levantando Frontend (Vite :5173)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$rootDir\frontend'; npm run dev"

Write-Host ""
Write-Host "Todo en marcha en ventanas independientes:" -ForegroundColor Green
Write-Host "  -> Frontend:        http://localhost:5173" -ForegroundColor White
Write-Host "  -> Backend Swagger: http://127.0.0.1:8001/api/v1/docs" -ForegroundColor White
Write-Host "========================================================" -ForegroundColor Cyan

