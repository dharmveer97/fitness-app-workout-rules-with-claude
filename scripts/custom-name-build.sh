#!/bin/bash

# 🎨 Custom Name APK Builder - Quick version with custom naming
# Just drag this into terminal: ./custom-name-build.sh

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🎨 Custom APK Name Builder${NC}"
echo ""

# Get to project directory (parent of scripts folder)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR"

# Quick prompts - just the essentials
echo -e "${YELLOW}📱 What do you want to name your APK?${NC}"
read -p "APK Name (without .apk): " APK_NAME

if [ -z "$APK_NAME" ]; then
    APK_NAME="DailyFitnessApp-$(date +%Y%m%d-%H%M%S)"
    echo -e "${YELLOW}Using default: $APK_NAME${NC}"
fi

# Add .apk extension if not present
if [[ "$APK_NAME" != *.apk ]]; then
    APK_FILENAME="$APK_NAME.apk"
else
    APK_FILENAME="$APK_NAME"
fi

echo ""
echo -e "${BLUE}🚀 Building: $APK_FILENAME${NC}"
echo ""

# Set environment
if [ -d "/opt/homebrew/Cellar/openjdk@17/17.0.15/libexec/openjdk.jdk/Contents/Home" ]; then
    export JAVA_HOME="/opt/homebrew/Cellar/openjdk@17/17.0.15/libexec/openjdk.jdk/Contents/Home"
    echo -e "${GREEN}☕ Java 17${NC}"
else
    echo -e "${YELLOW}⚠️ Using system Java${NC}"
fi

if [ -d "$HOME/Library/Android/sdk" ]; then
    export ANDROID_HOME="$HOME/Library/Android/sdk"
    echo -e "${GREEN}📱 Android SDK${NC}"
else
    echo -e "${RED}❌ Android SDK not found${NC}"
    exit 1
fi

# Check dependencies
[ ! -d "node_modules" ] && npm install

# Check if APK exists
if [ -f "$APK_FILENAME" ]; then
    echo -e "${YELLOW}⚠️ $APK_FILENAME already exists${NC}"
    read -p "Overwrite? (y/n): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 0
    fi
fi

# Build process
echo -e "${BLUE}🔨 Building...${NC}"

# Prebuild if needed
if [ ! -d "android" ] || [ ! -f "android/gradlew" ]; then
    echo -e "${BLUE}🏗️ Prebuild...${NC}"
    npx expo prebuild --clean --platform android
fi

# Configure and build
echo "sdk.dir=$ANDROID_HOME" > android/local.properties
chmod +x android/gradlew

cd android
if JAVA_HOME="$JAVA_HOME" ANDROID_HOME="$ANDROID_HOME" ./gradlew assembleRelease --no-daemon --quiet; then
    cd ..
    echo -e "${GREEN}✅ Build successful${NC}"
else
    cd ..
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi

# Copy with custom name
if [ -f "android/app/build/outputs/apk/release/app-release.apk" ]; then
    cp android/app/build/outputs/apk/release/app-release.apk "$APK_FILENAME"
    APK_SIZE=$(ls -lh "$APK_FILENAME" | awk '{print $5}')

    echo ""
    echo -e "${GREEN}🎉 SUCCESS!${NC}"
    echo -e "${GREEN}📱 Created: $APK_FILENAME ($APK_SIZE)${NC}"
    echo ""

    # Show all APKs
    echo -e "${BLUE}📂 All your APKs:${NC}"
    ls -1 *.apk 2>/dev/null | while read apk; do
        size=$(ls -lh "$apk" | awk '{print $5}')
        echo "   $apk ($size)"
    done

    echo ""
    echo -e "${YELLOW}💡 Transfer $APK_FILENAME to your Android device and install!${NC}"
else
    echo -e "${RED}❌ APK not found after build${NC}"
    exit 1
fi