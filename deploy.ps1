# Script de Despliegue a Producción para Gliro (PowerShell)
$rootDir = $PSScriptRoot
Set-Location $rootDir

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "         Iniciando Despliegue a Producción          " -ForegroundColor Green
Write-Host "====================================================" -ForegroundColor Cyan

# Verifica si bash está disponible para ejecutar deploy.sh (con rsync)
if (Get-Command bash -ErrorAction SilentlyContinue) {
    bash -c "./deploy.sh"
} else {
    Write-Host "Error: Se requiere 'bash' (WSL o Git Bash) para ejecutar rsync." -ForegroundColor Red
}

