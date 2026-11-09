#!/bin/bash
set -e

# Asegurar que el script se ejecute desde la raíz del proyecto
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
cd "$DIR"

echo "===================================================="
echo "         Iniciando Despliegue a Producción         "
echo "===================================================="

# 1. Compilar Frontend localmente
echo ""
echo "[1/3] Compilando Frontend (React/Vite)..."
cd frontend
npm run build
cd ..

# 2. Sincronizar archivos por Rsync (con exclusiones de seguridad)
echo ""
echo "[2/3] Sincronizando archivos con el servidor..."
rsync -ravz -e 'ssh -p 8024' --progress ./ \
  --exclude 'node_modules' \
  --exclude 'frontend/node_modules' \
  --exclude 'venv' \
  --exclude 'backend/venv' \
  --exclude 'lenv' \
  --exclude 'backend/lenv' \
  --exclude '__pycache__' \
  --exclude 'backend/**/__pycache__' \
  --exclude '*.db' \
  --exclude '*.sqlite3' \
  --exclude 'backend/*.db' \
  --exclude 'backend/*.sqlite3' \
  --exclude '.git' \
  --exclude '.Agents' \
  --exclude 'Context.md' \
  --exclude '.pytest_cache' \
  --exclude '*.bat' \
  --exclude '*.ps1' \
  --exclude 'deploy.sh' \
  --exclude 'deploy.ps1' \
  --exclude 'frontend/.env' \
  --exclude 'backend/.env' \
  root@gliro002.ratzzo.net:/opt/shared/Web_Gliro/

# 3. Reiniciar el Backend en el servidor de forma segura
echo ""
echo "[3/3] Reiniciando Backend en producción..."
ssh -T -p 8024 root@gliro002.ratzzo.net "/bin/bash -c '
  echo \"Cerrando instancia anterior de Gliro...\"
  pkill -f \"/opt/shared/Web_Gliro/backend/lenv\" 2>/dev/null || true
  sleep 1

  echo \"Iniciando FastAPI con lenv...\"
  cd /opt/shared/Web_Gliro/backend
  source lenv/bin/activate
  nohup python run.py > /tmp/gliro_backend.log 2>&1 & disown

  sleep 2
  echo \"--- Estado del log de Gliro ---\"
  tail -n 15 /tmp/gliro_backend.log
'"

echo ""
echo "===================================================="
echo "      ¡Despliegue de Gliro completado con éxito!    "
echo "===================================================="

