#!/bin/bash

# 🚀 Quick APK Builder - Minimal version
# Just drag this into terminal: ./quick-build.sh

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 Quick APK Build Started...${NC}"

# Get to project directory (parent of scripts folder)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR"

echo -e "${BLUE}📁 Working in: $PROJECT_DIR${NC}"

# Set Java 17 and Android SDK with fallbacks
if [ -d "/opt/homebrew/Cellar/openjdk@17/17.0.15/libexec/openjdk.jdk/Contents/Home" ]; then
    export JAVA_HOME="/opt/homebrew/Cellar/openjdk@17/17.0.15/libexec/openjdk.jdk/Contents/Home"
    echo -e "${GREEN}☕ Using Java 17${NC}"
elif [ -d "/usr/local/lib/jvm/openjdk@17" ]; then
    export JAVA_HOME="/usr/local/lib/jvm/openjdk@17"
    echo -e "${GREEN}☕ Using Java 17 (alternative path)${NC}"
else
    echo -e "${RED}❌ Java 17 not found. Using system Java.${NC}"
fi

# Set Android SDK
if [ -d "$HOME/Library/Android/sdk" ]; then
    export ANDROID_HOME="$HOME/Library/Android/sdk"
    echo -e "${GREEN}📱 Android SDK found${NC}"
else
    echo -e "${RED}❌ Android SDK not found at $HOME/Library/Android/sdk${NC}"
    exit 1
fi

# Check dependencies
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}📦 Installing dependencies...${NC}"
    npm install
fi

# Build only if APK doesn't exist
if [ ! -f "DailyFitnessApp-v1.0.0.apk" ]; then
    echo -e "${BLUE}🔨 Building APK...${NC}"
    
    # Prebuild if needed
    if [ ! -d "android" ] || [ ! -f "android/gradlew" ]; then
        echo -e "${BLUE}🏗️ Running expo prebuild...${NC}"
        if npx expo prebuild --clean --platform android; then
            echo -e "${GREEN}✅ Prebuild successful${NC}"
        else
            echo -e "${RED}❌ Prebuild failed${NC}"
            exit 1
        fi
    else
        echo -e "${GREEN}📁 Android project exists${NC}"
    fi
    
    # Configure SDK
    echo "sdk.dir=$ANDROID_HOME" > android/local.properties
    chmod +x android/gradlew
    
    # Build with better error handling
    echo -e "${BLUE}🔨 Building APK (this may take a few minutes)...${NC}"
    cd android
    if JAVA_HOME="$JAVA_HOME" ANDROID_HOME="$ANDROID_HOME" ./gradlew assembleRelease --no-daemon; then
        cd ..
        echo -e "${GREEN}✅ Build successful${NC}"
    else
        cd ..
        echo -e "${RED}❌ Build failed${NC}"
        exit 1
    fi
    
    # Copy APK
    if [ -f "android/app/build/outputs/apk/release/app-release.apk" ]; then
        cp android/app/build/outputs/apk/release/app-release.apk DailyFitnessApp-v1.0.0.apk
        APK_SIZE=$(ls -lh DailyFitnessApp-v1.0.0.apk | awk '{print $5}')
        echo -e "${GREEN}✅ APK created: DailyFitnessApp-v1.0.0.apk ($APK_SIZE)${NC}"
    else
        echo -e "${RED}❌ APK not found after build${NC}"
        exit 1
    fi
else
    APK_SIZE=$(ls -lh DailyFitnessApp-v1.0.0.apk | awk '{print $5}')
    echo -e "${GREEN}✅ APK already exists: DailyFitnessApp-v1.0.0.apk ($APK_SIZE)${NC}"
fi

echo -e "${GREEN}🎉 Done! Install the APK on your Android device.${NC}"