# 🏋️ Fitness App Backend

Production-ready REST API with PostgreSQL, Prisma, and JWT authentication.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

```bash
cd backend
npm install
```

### Database Setup

1. **Install PostgreSQL** (if not installed):
   ```bash
   # macOS
   brew install postgresql@14
   brew services start postgresql@14
   
   # Ubuntu/Debian
   sudo apt install postgresql postgresql-contrib
   sudo systemctl start postgresql
   ```

2. **Create Database**:
   ```bash
   # Login to PostgreSQL
   psql postgres
   
   # Create database and user
   CREATE DATABASE fitness_app;
   CREATE USER fitness_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE fitness_app TO fitness_user;
   \q
   ```

3. **Configure Environment**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and update:
   ```env
   DATABASE_URL="postgresql://fitness_user:your_password@localhost:5432/fitness_app?schema=public"
   JWT_ACCESS_SECRET="generate-random-secret-here"
   JWT_REFRESH_SECRET="generate-another-random-secret"
   ```

4. **Run Migrations**:
   ```bash
   npm run db:push
   npm run db:generate
   ```

### Start Server

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

Server runs on `http://localhost:3000`

## 📚 API Documentation

### Authentication

#### Sign Up
```http
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepass123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "user": {
    "id": "clx...",
    "email": "user@example.com",
    "name": "John Doe",
    "avatar": null,
    "createdAt": "2026-02-07T..."
  },
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}
```

#### Sign In
```http
POST /api/auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepass123"
}
```

#### Refresh Token
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGc..."
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {accessToken}
```

#### Sign Out
```http
POST /api/auth/signout
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "refreshToken": "eyJhbGc..."
}
```

### Workouts

#### Get All Workouts
```http
GET /api/workouts?startDate=2026-02-01&endDate=2026-02-07&limit=50
Authorization: Bearer {accessToken}
```

#### Create Workout
```http
POST /api/workouts
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "name": "Morning Run",
  "type": "cardio",
  "duration": 30,
  "caloriesBurned": 250,
  "exercises": [
    {
      "name": "Running",
      "sets": 1,
      "duration": 30
    }
  ],
  "notes": "Felt great!",
  "date": "2026-02-07T06:00:00Z"
}
```

#### Get Workout by ID
```http
GET /api/workouts/:id
Authorization: Bearer {accessToken}
```

#### Update Workout
```http
PUT /api/workouts/:id
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "duration": 45,
  "caloriesBurned": 350
}
```

#### Delete Workout
```http
DELETE /api/workouts/:id
Authorization: Bearer {accessToken}
```

## 🗄️ Database Schema

### Users
- Authentication & profile data
- Fitness goals & preferences
- Relations to workouts, food, challenges

### Workouts
- Exercise tracking
- Duration, calories, exercises (JSON)
- User-specific data

### Food Entries
- Meal tracking
- Macronutrients (protein, carbs, fats)
- Calories per meal

### Challenges
- Community challenges
- Progress tracking
- User participation

### Journal Entries
- Daily reflections
- Mood, energy, sleep tracking

## 🔐 Security Features

- **JWT Authentication**: Access + refresh tokens
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: 100 requests per 15 minutes
- **CORS**: Configurable origins
- **Helmet**: Security headers
- **Input Validation**: Zod schemas

## 🛠️ Development

### Database Commands

```bash
# Generate Prisma Client
npm run db:generate

# Push schema changes
npm run db:push

# Create migration
npm run db:migrate

# Open Prisma Studio (GUI)
npm run db:studio

# Seed database
npm run db:seed
```

### Project Structure

```
backend/
├── prisma/
│   └── schema.prisma       # Database schema
├── src/
│   ├── routes/
│   │   ├── auth.ts         # Auth endpoints
│   │   └── workouts.ts     # Workout CRUD
│   ├── middleware/
│   │   ├── auth.ts         # JWT verification
│   │   └── errorHandler.ts # Error handling
│   └── index.ts            # Express app
├── .env                    # Environment variables
├── package.json
└── tsconfig.json
```

## 🚢 Deployment

### Environment Variables (Production)

```env
DATABASE_URL="postgresql://user:pass@host:5432/db"
JWT_ACCESS_SECRET="strong-random-secret-256-bits"
JWT_REFRESH_SECRET="another-strong-secret-256-bits"
JWT_ACCESS_EXPIRY="15m"
JWT_REFRESH_EXPIRY="7d"
PORT=3000
NODE_ENV="production"
ALLOWED_ORIGINS="https://yourapp.com"
```

### Deploy to Railway/Render/Heroku

1. Add PostgreSQL addon
2. Set environment variables
3. Deploy from Git
4. Run migrations: `npm run db:push`

## 📊 Monitoring

- Health check: `GET /health`
- Logs: Check console output
- Database: Use Prisma Studio

## 🔄 Next Steps

Add these routes (follow same pattern):
- `/api/food` - Food entry CRUD
- `/api/challenges` - Challenge management
- `/api/journal` - Journal entries
- `/api/profile` - User profile updates

## 🤝 Contributing

Follow existing patterns:
1. Add route in `src/routes/`
2. Use Zod for validation
3. Authenticate with middleware
4. Handle errors properly
5. Update this README

## 📝 License

MIT
