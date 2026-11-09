# Script de Despliegue a Producción para Gliro (PowerShell)
$rootDir = $PSScriptRoot
Set-Location $rootDir

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "         Iniciando Despliegue a Producción          " -ForegroundColor Green
Write-Host "====================================================" -ForegroundColor Cyan

# Asegurar saltos de línea LF para bash (evita el error 'required file not found' causado por CRLF de Windows)
$deployShPath = Join-Path $rootDir "deploy.sh"
if (Test-Path $deployShPath) {
    $content = [System.IO.File]::ReadAllText($deployShPath)
    $content = $content.Replace("`r`n", "`n")
    [System.IO.File]::WriteAllText($deployShPath, $content, (New-Object System.Text.UTF8Encoding($false)))
}

# Ejecutar deploy.sh pasando el archivo directamente a bash
if (Get-Command bash -ErrorAction SilentlyContinue) {
    bash deploy.sh
} else {
    Write-Host "Error: Se requiere 'bash' (WSL o Git Bash) para ejecutar rsync." -ForegroundColor Red
}
