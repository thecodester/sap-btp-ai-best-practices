#!/bin/bash
set -euo pipefail

# Colors
info() { echo "[$(date +'%H:%M:%S')] $*"; }

# 0) Verify cf CLI is available
if ! command -v cf >/dev/null 2>&1; then
  echo "cf CLI not found. Please install/login to Cloud Foundry first."
  exit 1
fi

# 1) Build UI (uses .env/.env.production automatically by Vite)
info "📦 Installing UI deps..."
pushd ui >/dev/null
npm ci --prefer-offline --no-audit --progress=false

info "🏗️ Building UI for production..."
npm run build
popd >/dev/null

# 2) Push both apps with manifest
info "🚀 Deploying to Cloud Foundry..."
cf push

info "✅ Deployment finished."