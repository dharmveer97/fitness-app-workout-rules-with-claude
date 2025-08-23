#!/bin/bash

# 🚀 Daily Deposits Fitness App - Automated APK Builder
# Drag this file into terminal to run: ./build-apk.sh
# Or make executable and run: chmod +x build-apk.sh && ./build-apk.sh

set -e  # Exit on any error

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored output
print_step() {
    echo -e "${BLUE}🔹 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_header() {
    echo -e "${BLUE}"
    echo "=================================="
    echo "🚀 DAILY FITNESS APP APK BUILDER"
    echo "=================================="
    echo -e "${NC}"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if directory exists
dir_exists() {
    [ -d "$1" ]
}

# Check if file exists
file_exists() {
    [ -f "$1" ]
}

# Get project directory (where this script is located)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

print_header

# ================================
# STEP 1: ENVIRONMENT CHECKS
# ================================

print_step "Checking build environment..."

# Check Node.js
if ! command_exists node; then
    print_error "Node.js not found. Please install Node.js first."
    exit 1
fi
NODE_VERSION=$(node --version)
print_success "Node.js: $NODE_VERSION"

# Check npm
if ! command_exists npm; then
    print_error "npm not found. Please install npm first."
    exit 1
fi
NPM_VERSION=$(npm --version)
print_success "npm: $NPM_VERSION"

# Check Java version
if ! command_exists java; then
    print_error "Java not found. Please install Java 17."
    exit 1
fi

JAVA_VERSION=$(java -version 2>&1 | head -n 1)
print_success "Java: $JAVA_VERSION"

# Set Java 17 path if available
JAVA_17_PATH="/opt/homebrew/Cellar/openjdk@17/17.0.15/libexec/openjdk.jdk/Contents/Home"
if [ -d "$JAVA_17_PATH" ]; then
    export JAVA_HOME="$JAVA_17_PATH"
    print_success "Using Java 17: $JAVA_HOME"
else
    print_warning "Java 17 not found at expected location. Using system Java."
fi

# Check Android SDK
ANDROID_SDK_PATH="$HOME/Library/Android/sdk"
if [ -d "$ANDROID_SDK_PATH" ]; then
    export ANDROID_HOME="$ANDROID_SDK_PATH"
    print_success "Android SDK found: $ANDROID_HOME"
else
    print_error "Android SDK not found at $ANDROID_SDK_PATH"
    print_error "Please install Android Studio and SDK first."
    exit 1
fi

# Check ADB
if ! command_exists adb; then
    print_error "ADB not found. Please install Android SDK tools."
    exit 1
fi
print_success "ADB available"

# ================================
# STEP 2: PROJECT SETUP
# ================================

print_step "Setting up project configuration..."

# Check if package.json exists
if ! file_exists "package.json"; then
    print_error "package.json not found. Make sure you're in the project directory."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if ! dir_exists "node_modules"; then
    print_step "Installing dependencies..."
    npm install
    print_success "Dependencies installed"
else
    print_success "Dependencies already installed (skipping npm install)"
fi

# Check app.json configuration
if ! file_exists "app.json"; then
    print_error "app.json not found."
    exit 1
fi

# Verify Android package configuration
if ! grep -q "com.dharamveer.dailyfitnessapp" app.json; then
    print_warning "Android package not configured properly in app.json"
    print_step "Updating app.json configuration..."
    
    # Backup original app.json
    cp app.json app.json.backup
    
    # Update app.json (simplified version)
    node -e "
    const fs = require('fs');
    const config = JSON.parse(fs.readFileSync('app.json', 'utf8'));
    config.expo.android = {
        ...config.expo.android,
        package: 'com.dharamveer.dailyfitnessapp',
        versionCode: 1,
        permissions: ['INTERNET', 'SYSTEM_ALERT_WINDOW', 'VIBRATE'],
        edgeToEdgeEnabled: true
    };
    fs.writeFileSync('app.json', JSON.stringify(config, null, 2));
    "
    print_success "app.json updated"
else
    print_success "app.json already configured (skipping configuration)"
fi

# ================================
# STEP 3: BUILD CHECKS
# ================================

print_step "Checking build requirements..."

# Check if android directory exists (from previous build)
if dir_exists "android"; then
    print_success "Android project exists (skipping prebuild)"
    SKIP_PREBUILD=true
else
    print_step "Android project not found, will run prebuild"
    SKIP_PREBUILD=false
fi

# Check if APK already exists
APK_PATH="./DailyFitnessApp-v1.0.0.apk"
if file_exists "$APK_PATH"; then
    APK_SIZE=$(ls -lh "$APK_PATH" | awk '{print $5}')
    print_warning "APK already exists: $APK_PATH ($APK_SIZE)"
    echo -n "Do you want to rebuild? (y/n): "
    read -r REBUILD_CHOICE
    if [[ $REBUILD_CHOICE != "y" && $REBUILD_CHOICE != "Y" ]]; then
        print_success "Using existing APK. Build completed!"
        echo ""
        echo "📱 Your APK is ready at: $APK_PATH"
        echo "📏 Size: $APK_SIZE"
        echo ""
        echo "To install on Android:"
        echo "1. Transfer APK to your device"
        echo "2. Enable 'Unknown Sources' in Settings"
        echo "3. Tap the APK to install"
        exit 0
    fi
fi

# ================================
# STEP 4: PREBUILD (IF NEEDED)
# ================================

if [ "$SKIP_PREBUILD" = false ]; then
    print_step "Running expo prebuild..."
    
    # Clean previous build if exists
    if dir_exists "android" || dir_exists "ios"; then
        rm -rf android ios
        print_success "Cleaned previous native builds"
    fi
    
    # Run prebuild
    npx expo prebuild --clean --no-install
    print_success "Prebuild completed"
else
    print_success "Skipping prebuild (android directory exists)"
fi

# ================================
# STEP 5: ANDROID SDK CONFIGURATION
# ================================

print_step "Configuring Android build..."

# Create local.properties if it doesn't exist
LOCAL_PROPS="android/local.properties"
if ! file_exists "$LOCAL_PROPS"; then
    echo "sdk.dir=$ANDROID_HOME" > "$LOCAL_PROPS"
    print_success "Created android/local.properties"
else
    print_success "local.properties already exists (skipping)"
fi

# Make gradlew executable
if file_exists "android/gradlew"; then
    chmod +x android/gradlew
    print_success "Made gradlew executable"
fi

# ================================
# STEP 6: BUILD APK
# ================================

print_step "Building release APK..."
echo "This may take 5-10 minutes on first build..."

cd android

# Build the APK
if ./gradlew assembleRelease; then
    print_success "APK build completed successfully!"
else
    print_error "APK build failed!"
    exit 1
fi

cd ..

# ================================
# STEP 7: COPY AND VERIFY APK
# ================================

print_step "Finalizing APK..."

# Find the built APK
BUILT_APK="android/app/build/outputs/apk/release/app-release.apk"
if file_exists "$BUILT_APK"; then
    # Copy to project root with descriptive name
    cp "$BUILT_APK" "$APK_PATH"
    print_success "APK copied to: $APK_PATH"
    
    # Get APK info
    APK_SIZE=$(ls -lh "$APK_PATH" | awk '{print $5}')
    APK_TYPE=$(file "$APK_PATH" | cut -d: -f2)
    
    print_success "APK verified: $APK_TYPE"
    
    # ================================
    # SUCCESS SUMMARY
    # ================================
    
    echo ""
    echo -e "${GREEN}🎉 BUILD COMPLETED SUCCESSFULLY! 🎉${NC}"
    echo "=================================="
    echo "📱 APK Location: $APK_PATH"
    echo "📏 APK Size: $APK_SIZE"
    echo "📦 Package: com.dharamveer.dailyfitnessapp"
    echo "🔢 Version: 1.0.0"
    echo ""
    echo -e "${BLUE}📱 INSTALLATION INSTRUCTIONS:${NC}"
    echo "1. Transfer APK to your Android device"
    echo "2. Enable 'Unknown Sources' in device Settings → Security"
    echo "3. Open file manager and tap the APK file"
    echo "4. Follow installation prompts"
    echo "5. Launch 'fitness' app from app drawer"
    echo ""
    echo -e "${GREEN}✅ Your Daily Deposits Fitness App is ready!${NC}"
    
else
    print_error "Built APK not found at expected location: $BUILT_APK"
    exit 1
fi

# ================================
# CLEANUP OPTION
# ================================

echo ""
echo -n "Do you want to clean up build files to save space? (y/n): "
read -r CLEANUP_CHOICE

if [[ $CLEANUP_CHOICE == "y" || $CLEANUP_CHOICE == "Y" ]]; then
    print_step "Cleaning up build files..."
    
    # Clean gradle build cache
    if dir_exists "android/app/build"; then
        rm -rf android/app/build/intermediates
        rm -rf android/app/build/tmp
        print_success "Cleaned gradle cache"
    fi
    
    # Clean node modules if desired (optional)
    echo -n "Also clean node_modules? (saves ~500MB but requires reinstall) (y/n): "
    read -r CLEAN_MODULES
    if [[ $CLEAN_MODULES == "y" || $CLEAN_MODULES == "Y" ]]; then
        rm -rf node_modules
        print_success "Cleaned node_modules (run 'npm install' to reinstall)"
    fi
    
    print_success "Cleanup completed"
fi

echo ""
echo -e "${GREEN}🚀 Script completed successfully!${NC}"
echo "You can run this script again anytime to rebuild the APK."