# Android APK Build Configuration Guide

## 🎯 Successfully Built APK Location
**APK File:** `/android/app/build/outputs/apk/release/app-release.apk`
**Size:** 84.3 MB
**Build Date:** September 17, 2025

## 📋 Complete Environment Configuration

### System Information
- **Platform:** macOS (Darwin 24.6.0)
- **Working Directory:** `/Users/dharamveerbangar/Projects/fitness-app-workout-rules-with-claude`

### Required Software Versions
```bash
# Node.js and npm
Node.js: v24.7.0
npm: 11.5.1

# Java (IMPORTANT: Use Java 17, not Java 24)
Java Version: 17 (OpenJDK)
JAVA_HOME: /opt/homebrew/Cellar/openjdk@17/17.0.15/libexec/openjdk.jdk/Contents/Home

# Expo CLI
Expo CLI (local): 0.24.21
Expo CLI (global): 6.3.12 (legacy - shows warning)

# Android SDK
ANDROID_HOME: /Users/dharamveerbangar/Library/Android/sdk
```

### Project Configuration
```json
// package.json key details
{
  "name": "fitness-app",
  "version": "1.0.0",
  "scripts": {
    "prebuild": "expo prebuild --clean",
    "build:apk": "cd android && ./gradlew assembleRelease"
  }
}
```

```json
// app.json key details
{
  "expo": {
    "name": "fitness",
    "slug": "fitness-app",
    "version": "1.0.0",
    "newArchEnabled": true,
    "android": {
      "package": "com.dharamveer.dailyfitnessapp",
      "versionCode": 1
    }
  }
}
```

## 🔧 Step-by-Step Build Instructions

### 1. Environment Setup
```bash
# Install Node.js 24.x
# Install Java 17 (NOT Java 24)
# Install Android SDK via Android Studio

# Set environment variables
export ANDROID_HOME="/Users/dharamveerbangar/Library/Android/sdk"
export JAVA_HOME="/opt/homebrew/Cellar/openjdk@17/17.0.15/libexec/openjdk.jdk/Contents/Home"
```

### 2. Android SDK Setup
Create `android/local.properties` file:
```properties
sdk.dir=/Users/dharamveerbangar/Library/Android/sdk
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Generate Android Project
```bash
npx expo prebuild --clean
```

### 5. Build Release APK
```bash
cd android
ANDROID_HOME="/Users/dharamveerbangar/Library/Android/sdk" \
JAVA_HOME="/opt/homebrew/Cellar/openjdk@17/17.0.15/libexec/openjdk.jdk/Contents/Home" \
./gradlew app:assembleRelease
```

## ⚠️ Common Issues and Solutions

### Issue 1: Java Version Compatibility
**Problem:** Build fails with restricted method warnings
**Solution:** Use Java 17 instead of Java 24:
```bash
JAVA_HOME=/opt/homebrew/Cellar/openjdk@17/17.0.15/libexec/openjdk.jdk/Contents/Home
```

### Issue 2: SDK Location Not Found
**Problem:** `SDK location not found` error
**Solution:** Create `android/local.properties` with correct SDK path

### Issue 3: CMake Configuration Errors
**Problem:** Native libraries build failures
**Solution:** Ensure NDK is installed via Android SDK Manager

## 📱 App Configuration
- **Package Name:** com.dharamveer.dailyfitnessapp
- **Min SDK:** 24
- **Target SDK:** 35
- **Compile SDK:** 35
- **Build Tools:** 35.0.0
- **NDK:** 27.1.12297006
- **Kotlin:** 2.0.21

## 🏗️ Build Tools Used
- **Gradle:** 8.13
- **Android Gradle Plugin:** 8.8.2
- **Expo SDK:** 53.0.22
- **React Native:** 0.79.5

## 📦 Key Dependencies
- **UI Framework:** GlueStack UI v3.0.0-alpha.5
- **Navigation:** React Navigation 7.x
- **State Management:** Zustand 5.x
- **Styling:** NativeWind 4.x + Tailwind CSS
- **Forms:** Formik + Zod validation
- **Storage:** MMKV + Expo Secure Store

## 🔄 For Another Laptop Setup

### 1. Install Required Software
```bash
# Install Node.js 24.x from nodejs.org
# Install Java 17 (OpenJDK)
# Install Android Studio and SDK

# On macOS with Homebrew:
brew install node@24
brew install openjdk@17
```

### 2. Configure Environment Variables
Add to your shell profile (`.bashrc`, `.zshrc`, etc.):
```bash
export ANDROID_HOME="$HOME/Library/Android/sdk"
export JAVA_HOME="/opt/homebrew/Cellar/openjdk@17/17.0.15/libexec/openjdk.jdk/Contents/Home"
export PATH="$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$PATH"
```

### 3. Clone and Setup Project
```bash
git clone <repository-url>
cd fitness-app-workout-rules-with-claude
npm install
```

### 4. Create local.properties
```bash
echo "sdk.dir=$ANDROID_HOME" > android/local.properties
```

### 5. Build APK
```bash
npx expo prebuild --clean
cd android && ./gradlew app:assembleRelease
```

## 📍 Final APK Location
The built APK will be located at:
`android/app/build/outputs/apk/release/app-release.apk`

## 🔒 Security Note
This build uses a debug keystore. For production releases, generate and use a proper signing key.