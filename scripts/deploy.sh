#!/bin/bash

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔧 VERSION DEMO - Démarrage environnement de développement local${NC}"

# Fonction pour déplacer les logs
move_logs() {
    echo -e "${BLUE}📁 Déplacement des logs dans le dossier logs/...${NC}"
    mkdir -p logs
    mv *-debug.log logs/ 2>/dev/null || true
    echo -e "${GREEN}✅ Logs organisés${NC}"
}

# Déplacer les logs existants
move_logs

# S'assurer d'être dans le bon dossier
if [ -d "server" ]; then
    echo -e "${BLUE}📂 Navigation vers le dossier server...${NC}"
    cd server
elif [ -f "package.json" ] && [ -f "tsconfig.json" ]; then
    echo -e "${GREEN}✅ Déjà dans le dossier server${NC}"
else
    echo -e "${RED}❌ Ce script doit être exécuté depuis le dossier server ou son parent${NC}"
    exit 1
fi

# Configuration de l'environnement (toujours local)
export FASTAPI_ENV="local"
export NODE_ENV=development

echo -e "${BLUE}🔨 Installation des dépendances...${NC}"
npm install

echo -e "${BLUE}🔨 Build du projet (mode simplifié)...${NC}"

# Build simplifié sans erreurs
if npm run build 2>/dev/null; then
    echo -e "${GREEN}✅ Build réussi${NC}"
else
    echo -e "${YELLOW}⚠️ Build échoué, mais on continue (mode demo)${NC}"
fi

# Aller dans le dossier parent pour les émulateurs
cd ..

echo -e "${GREEN}🚀 Démarrage des émulateurs Firebase...${NC}"
echo -e "${YELLOW}📡 FastAPI configuré en mode local (http://127.0.0.1:8080)${NC}"

# Démarrer les émulateurs
firebase emulators:start --import=./emulator-data --export-on-exit=./emulator-data

# Déplacer les logs à la fin
move_logs