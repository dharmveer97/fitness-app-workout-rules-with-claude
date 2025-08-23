#!/bin/bash

# 🚀 Quick APK Builder - Minimal version
# Just drag this into terminal: ./quick-build.sh

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Quick APK Build Started...${NC}"

# Set Java 17 and Android SDK
export JAVA_HOME="/opt/homebrew/Cellar/openjdk@17/17.0.15/libexec/openjdk.jdk/Contents/Home"
export ANDROID_HOME="$HOME/Library/Android/sdk"

# Get to project directory
cd "$(dirname "${BASH_SOURCE[0]}")"

# Build only if APK doesn't exist
if [ ! -f "DailyFitnessApp-v1.0.0.apk" ]; then
    echo "Building APK..."
    
    # Prebuild if needed
    if [ ! -d "android" ]; then
        npx expo prebuild --clean --no-install
    fi
    
    # Configure SDK
    echo "sdk.dir=$ANDROID_HOME" > android/local.properties
    chmod +x android/gradlew
    
    # Build
    cd android && ./gradlew assembleRelease && cd ..
    
    # Copy APK
    cp android/app/build/outputs/apk/release/app-release.apk DailyFitnessApp-v1.0.0.apk
    
    echo -e "${GREEN}✅ APK created: DailyFitnessApp-v1.0.0.apk${NC}"
else
    echo -e "${GREEN}✅ APK already exists: DailyFitnessApp-v1.0.0.apk${NC}"
fi

echo -e "${GREEN}🎉 Done! Install the APK on your Android device.${NC}"