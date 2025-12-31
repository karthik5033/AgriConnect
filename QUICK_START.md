# 🚀 Quick Start: PostgreSQL + Prisma Setup

## ⚡ 5-Minute Setup

### 1️⃣ Install PostgreSQL with Docker (Fastest)

```powershell
# Open PowerShell and run:
docker run --name agriconnect-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=agriconnect -p 5432:5432 -d postgres:15
```

✅ Database is running at `localhost:5432`

---

### 2️⃣ Update .env.local (Already Created)

Your `.env.local` file is already set up. Just verify it has:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/agriconnect"
NEXTAUTH_SECRET="change-me-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

---

### 3️⃣ Run Prisma Migrations

```bash
cd c:\Nirmith\my-app

# Generate Prisma client
npx prisma generate

# Create all database tables
npx prisma migrate dev --name init
```

This will:
- ✅ Create all tables (User, Profile, Post, Connection, etc.)
- ✅ Seed initial data (if you add seed.ts)

---

### 4️⃣ Start Your App

```bash
npm run dev
```

✅ Visit `http://localhost:3000`

---

## 🎯 What You Can Do Now

### Create a Profile
```typescript
import { createProfile } from '@/actions/profile.actions';

await createProfile({
  userId: 'user_123',
  bio: 'I grow wheat in Punjab',
  location: 'Amritsar, Punjab',
  crops: ['Wheat', 'Rice'],
  website: 'myform.com'
});
```

### Create a Post
```typescript
import { createPost } from '@/actions/post.actions';

await createPost({
  authorId: 'user_123',
  content: 'Just harvested 10 acres!',
  cropName: 'Wheat',
  location: 'Amritsar',
  images: ['url1', 'url2']
});
```

### Send Connection Request (LinkedIn-style)
```typescript
import { sendConnectionRequest } from '@/actions/connection.actions';

await sendConnectionRequest('user_1', 'user_2');
// status: "pending"

// Other user accepts:
await acceptConnection('user_1', 'user_2');
// status: "connected"
```

### View All Connections
```typescript
import { getConnections } from '@/actions/connection.actions';

const { connections } = await getConnections('user_1');
// Shows all connected users with their profiles
```

---

## 🗄️ View Your Database

```bash
# Open Prisma Studio - GUI to view/edit data
npx prisma studio
```

This opens browser at `http://localhost:5555` where you can:
- ✅ View all users, profiles, posts, connections
- ✅ Edit data directly
- ✅ Test relationships

---

## 🔥 Switching to PostgreSQL Later (For Production)

When ready for production, just change `DATABASE_URL`:

**Supabase (Free):**
```env
DATABASE_URL="postgresql://postgres.xxx:password@db.xxx.supabase.co:5432/postgres"
```

**Railway (Easy deploy):**
```env
DATABASE_URL="postgresql://user:pass@railway.app:5432/db"
```

Then run:
```bash
npx prisma migrate deploy
```

---

## 📚 API Endpoints Ready to Use

All these work immediately:

```
POST /api/profiles/[userId]              → Update profile
GET  /api/posts                           → Get all posts
POST /api/posts                           → Create post
GET  /api/posts/[postId]                  → Get single post
POST /api/connections/[userId]            → Send request
POST /api/connections/accept              → Accept request
```

---

## ⚠️ If You Get Errors

### "Docker not found"
Install Docker Desktop: https://www.docker.com/products/docker-desktop

### "Port 5432 in use"
```bash
# Use different port
docker run -p 5433:5432 -d postgres:15
# Update DATABASE_URL to port 5433
```

### "Migration failed"
```bash
npx prisma migrate reset
npx prisma migrate dev
```

### "Prisma types error"
```bash
npm install
npx prisma generate
```

---

## ✨ What Was Set Up

✅ **Database:**
- PostgreSQL with 10+ tables
- User, Profile, Post, Comment, Like, Connection models

✅ **Server Actions:**
- Profile management (create, read, update)
- Posts with likes & comments
- LinkedIn-style connections

✅ **API Routes:**
- RESTful endpoints for all operations
- Ready for frontend consumption

✅ **Environment:**
- .env.local with PostgreSQL config
- Prisma client configured

---

## 🎉 You're Ready!

1. Set up PostgreSQL (Docker command above)
2. Run `npx prisma migrate dev --name init`
3. Run `npm run dev`
4. Start building your UI!

**Next Step:** I can help you create:
- Profile creation form component
- Connection request UI button
- Post creation modal
- Feed with profiles

Just ask! 💪
