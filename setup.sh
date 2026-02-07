#!/bin/bash

# Fitness App - Quick Start Script
# This script helps you get started quickly

set -e

echo "🏋️ Fitness App - Quick Start"
echo "=============================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if PostgreSQL is installed
echo "📊 Checking PostgreSQL..."
if ! command -v psql &> /dev/null; then
    echo -e "${RED}❌ PostgreSQL not found${NC}"
    echo "Please install PostgreSQL first:"
    echo "  macOS: brew install postgresql@14"
    echo "  Ubuntu: sudo apt install postgresql"
    exit 1
fi
echo -e "${GREEN}✅ PostgreSQL found${NC}"

# Check if Node.js is installed
echo "📦 Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found${NC}"
    echo "Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi
echo -e "${GREEN}✅ Node.js $(node -v) found${NC}"

# Setup backend
echo ""
echo "🔧 Setting up backend..."
cd backend

if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  Creating .env file...${NC}"
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please edit backend/.env with your database credentials${NC}"
    echo "Press Enter when ready..."
    read
fi

echo "📦 Installing backend dependencies..."
npm install

echo "🗄️  Setting up database..."
npm run db:generate
npm run db:push

echo -e "${GREEN}✅ Backend setup complete!${NC}"

# Setup frontend
cd ..
echo ""
echo "📱 Setting up React Native app..."

if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  Creating .env file...${NC}"
    cp .env.example .env
fi

echo "📦 Installing app dependencies..."
npm install

echo -e "${GREEN}✅ App setup complete!${NC}"

# Instructions
echo ""
echo "=============================="
echo "🎉 Setup Complete!"
echo "=============================="
echo ""
echo "To start the app:"
echo ""
echo "1. Start backend (in one terminal):"
echo "   ${GREEN}cd backend && npm run dev${NC}"
echo ""
echo "2. Start app (in another terminal):"
echo "   ${GREEN}npm start${NC}"
echo ""
echo "3. Run on device:"
echo "   ${GREEN}npm run ios${NC}     (iOS Simulator)"
echo "   ${GREEN}npm run android${NC} (Android Emulator)"
echo ""
echo "📚 See SETUP_GUIDE.md for detailed instructions"
echo ""
