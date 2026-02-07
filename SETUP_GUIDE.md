# 🚀 Complete Setup Guide - Fitness App with Backend

This guide will help you set up the complete fitness app with PostgreSQL backend.

## 📋 Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **PostgreSQL** 14+ ([Download](https://www.postgresql.org/download/))
- **Expo CLI** (will be installed)
- **iOS Simulator** (macOS) or **Android Studio** (for emulators)

## 🎯 Step-by-Step Setup

### 1️⃣ Install PostgreSQL

#### macOS (using Homebrew):
```bash
brew install postgresql@14
brew services start postgresql@14
```

#### Ubuntu/Debian:
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### Windows:
Download and install from [postgresql.org](https://www.postgresql.org/download/windows/)

### 2️⃣ Create Database

```bash
# Login to PostgreSQL
psql postgres

# In PostgreSQL shell:
CREATE DATABASE fitness_app;
CREATE USER fitness_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE fitness_app TO fitness_user;
\q
```

### 3️⃣ Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Edit `backend/.env`:**
```env
DATABASE_URL="postgresql://fitness_user:your_secure_password@localhost:5432/fitness_app?schema=public"

# Generate random secrets (use: openssl rand -base64 32)
JWT_ACCESS_SECRET="your-random-secret-here"
JWT_REFRESH_SECRET="another-random-secret-here"

JWT_ACCESS_EXPIRY="15m"
JWT_REFRESH_EXPIRY="7d"

PORT=3000
NODE_ENV="development"

# Update with your machine's IP for mobile testing
ALLOWED_ORIGINS="http://localhost:8081,exp://192.168.1.100:8081"
```

**Initialize Database:**
```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Open Prisma Studio to view database
npm run db:studio
```

**Start Backend Server:**
```bash
npm run dev
```

✅ Backend should be running on `http://localhost:3000`

### 4️⃣ Setup React Native App

Open a **new terminal** (keep backend running):

```bash
# Navigate to project root
cd ..

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Edit `.env`:**

For **iOS Simulator**:
```env
EXPO_PUBLIC_API_URL=http://localhost:3000/api
```

For **Android Emulator**:
```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:3000/api
```

For **Physical Device** (find your IP with `ipconfig` or `ifconfig`):
```env
EXPO_PUBLIC_API_URL=http://192.168.1.100:3000/api
```

**Start Expo:**
```bash
npm start
```

### 5️⃣ Run on Device/Simulator

#### iOS Simulator (macOS only):
```bash
npm run ios
```

#### Android Emulator:
```bash
npm run android
```

#### Physical Device:
1. Install **Expo Go** app from App Store/Play Store
2. Scan QR code from terminal
3. Make sure device is on same WiFi network

## 🧪 Test the Setup

### 1. Test Backend Health
```bash
curl http://localhost:3000/health
```

Should return: `{"status":"ok","timestamp":"..."}`

### 2. Test Sign Up
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

### 3. Test in App
1. Open app on simulator/device
2. Go to Sign Up screen
3. Create account with email/password
4. Should redirect to home screen

## 🔧 Troubleshooting

### Backend Issues

**"Connection refused" error:**
- Check PostgreSQL is running: `brew services list` (macOS) or `sudo systemctl status postgresql` (Linux)
- Verify DATABASE_URL in `.env`

**"JWT_ACCESS_SECRET is not defined":**
- Make sure `.env` file exists in `backend/` directory
- Restart backend server after creating `.env`

**Port 3000 already in use:**
- Change PORT in `backend/.env` to 3001
- Update `EXPO_PUBLIC_API_URL` in root `.env`

### React Native Issues

**"Network request failed":**
- Backend server must be running
- Check `EXPO_PUBLIC_API_URL` matches your setup
- For Android emulator, use `10.0.2.2` instead of `localhost`
- For physical device, use your computer's IP address

**"Unable to resolve module":**
```bash
# Clear caches
npm start -- --clear
# or
rm -rf node_modules .expo
npm install
```

**iOS build fails:**
```bash
cd ios
pod install
cd ..
npm run ios
```

## 📱 App Features Now Working

✅ **Real Authentication**
- Sign up with email/password
- Sign in with JWT tokens
- Secure token storage
- Auto-refresh tokens

✅ **Backend Integration**
- PostgreSQL database
- RESTful API
- Prisma ORM
- Type-safe queries

✅ **Security**
- Password hashing (bcrypt)
- JWT access + refresh tokens
- Rate limiting
- CORS protection

## 🎯 Next Steps

### Add More Features

The backend structure is ready. Add these endpoints following the same pattern:

1. **Food Tracking** (`backend/src/routes/food.ts`)
2. **Challenges** (`backend/src/routes/challenges.ts`)
3. **Journal** (`backend/src/routes/journal.ts`)
4. **Profile Updates** (`backend/src/routes/profile.ts`)

### Deploy to Production

**Backend:**
- Deploy to Railway, Render, or Heroku
- Add PostgreSQL addon
- Set environment variables
- Run migrations

**Frontend:**
- Build with EAS: `eas build`
- Submit to App Store/Play Store
- Update API_URL to production

## 📚 Documentation

- **Backend API**: See `backend/README.md`
- **Database Schema**: See `backend/prisma/schema.prisma`
- **API Client**: See `lib/api.ts`

## 🆘 Need Help?

1. Check backend logs in terminal
2. Check React Native logs: `npx react-native log-ios` or `log-android`
3. Use Prisma Studio to inspect database: `npm run db:studio` (in backend/)
4. Check network requests in React Native Debugger

## ✅ Verification Checklist

- [ ] PostgreSQL installed and running
- [ ] Database created
- [ ] Backend dependencies installed
- [ ] Backend `.env` configured
- [ ] Database schema pushed
- [ ] Backend server running on port 3000
- [ ] React Native dependencies installed
- [ ] React Native `.env` configured
- [ ] App running on simulator/device
- [ ] Can create account
- [ ] Can sign in
- [ ] Tokens stored securely

---

**🎉 Congratulations!** Your fitness app now has a production-ready backend with PostgreSQL!
