# PostgreSQL + Prisma Integration Guide

## ✅ What Was Implemented

Your AgriConnect app is now set up for **production-ready database** using **PostgreSQL + Prisma** with full support for:

- ✅ User Profiles (Bio, Location, Crops, Website)
- ✅ Posts (Create, Read, Update, Delete)
- ✅ Comments & Likes
- ✅ LinkedIn-Style Connections (Send, Accept, Reject)
- ✅ RESTful API Routes
- ✅ Server Actions for mutations

---

## 🚀 Quick Setup Instructions

### Step 1: Install PostgreSQL Locally (Choose One)

**Option A: Using Docker (Easiest)**
```bash
docker run --name agriconnect-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=agriconnect \
  -p 5432:5432 \
  -d postgres:15
```

**Option B: Direct Installation**
- Download PostgreSQL: https://www.postgresql.org/download/
- During installation, remember your password
- Create new database called `agriconnect`

### Step 2: Update .env.local

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/agriconnect"
NEXTAUTH_SECRET="change-me-to-random-string"
NEXTAUTH_URL="http://localhost:3000"
```

### Step 3: Run Prisma Migrations

```bash
# Generate Prisma client
npx prisma generate

# Create database tables
npx prisma migrate dev --name init

# Open Prisma Studio to view data
npx prisma studio
```

### Step 4: Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` 🎉

---

## 📁 File Structure

### Created/Updated Files

```
lib/
  └── db.ts                          # Prisma client singleton

actions/
  ├── profile.actions.ts             # Profile server actions
  ├── connection.actions.ts           # Connection management
  └── post.actions.ts                # Updated to Prisma

app/api/
  ├── profiles/[userId]/route.ts     # Profile CRUD
  ├── posts/route.ts                 # Create/list posts
  ├── posts/[postId]/route.ts        # Single post operations
  └── connections/[userId]/route.ts  # Connection endpoints

prisma/
  └── schema.prisma                  # Updated with Connection model
```

---

## 🔑 Key Features

### 1. Profile Management

**Create Profile:**
```typescript
import { createProfile } from '@/actions/profile.actions';

const result = await createProfile({
  userId: 'user_123',
  bio: 'Sustainable farmer',
  location: 'Punjab, India',
  website: 'example.com',
  crops: ['Wheat', 'Rice']
});
```

**Get Profile:**
```typescript
const result = await getProfileByUsername('rajesh_kumar');
```

### 2. Posts (Linked to Profiles)

**Create Post:**
```typescript
import { createPost } from '@/actions/post.actions';

const result = await createPost({
  authorId: 'user_123',
  content: 'Just harvested wheat!',
  cropName: 'Wheat',
  location: 'Amritsar',
  images: ['url1', 'url2']
});
```

**Get All Posts:**
```typescript
const { posts, total } = await getPosts(20, 0); // limit, offset
```

**Like/Comment:**
```typescript
await likePost(postId, userId);
await addComment(postId, userId, 'Nice post!');
```

### 3. LinkedIn-Style Connections

**Send Connection Request:**
```typescript
import { sendConnectionRequest } from '@/actions/connection.actions';

await sendConnectionRequest('user_1', 'user_2'); // status: "pending"
```

**Accept Connection:**
```typescript
await acceptConnection('user_1', 'user_2'); // status: "connected"
```

**Get All Connections:**
```typescript
const { connections } = await getConnections('user_1');
```

**Check Connection Status:**
```typescript
const { status } = await getConnectionStatus('user_1', 'user_2');
// Returns: "pending", "connected", or "none"
```

---

## 🌐 API Endpoints

### Profiles
```
GET    /api/profiles/[userId]              # Get profile
PUT    /api/profiles/[userId]              # Update profile
DELETE /api/profiles/[userId]              # Delete profile
```

### Posts
```
GET    /api/posts                          # List all posts
POST   /api/posts                          # Create post
GET    /api/posts/[postId]                 # Get single post
PUT    /api/posts/[postId]                 # Update post
DELETE /api/posts/[postId]                 # Delete post
```

### Connections
```
GET    /api/connections/[userId]           # Get user's connections
POST   /api/connections/[userId]           # Send connection request
POST   /api/connections/accept             # Accept request
```

---

## 📊 Database Schema

### User
```
id (cuid) - Primary key
name, email, image, password
role: FARMER | STUDENT | RESEARCHER | COMPANY | ENTHUSIAST
createdAt, updatedAt
```

### Profile (One-to-One with User)
```
id, userId (unique)
bio, location, website, bannerImage
crops[] (array)
followersCount, followingCount
```

### Post (Many-to-One with User)
```
id, authorId
content, type, cropName, location, areaSize, growthStage
images[]
createdAt, updatedAt
```

### Connection (LinkedIn-style)
```
id, fromUserId, toUserId
status: "pending" | "connected" | "blocked"
createdAt, updatedAt
```

---

## 🔄 Relationships

```
User
  ├─ Profile (1:1) - User details, bio, crops
  ├─ Posts (1:N) - User's posts
  ├─ Comments (1:N) - User's comments
  ├─ Likes (1:N) - User's likes
  ├─ sentConnections (1:N) - Connection requests sent
  ├─ receivedConnections (1:N) - Connection requests received
  ├─ Messages (1:N) - Messages sent
  └─ Notifications (1:N) - User notifications

Post
  ├─ Author (N:1) - User who created post
  ├─ Comments (1:N) - Post comments
  └─ Likes (1:N) - Post likes
```

---

## 🚀 Deployment (Production)

### Using Supabase (Free PostgreSQL)

1. Go to https://supabase.com
2. Create new project
3. Get connection string
4. Update `.env.production`:
```
DATABASE_URL="postgresql://user:password@host:5432/db"
```
5. Run migrations on production:
```bash
npx prisma migrate deploy
```

### Using Railway

1. Sign up at https://railway.app
2. Deploy with GitHub
3. Connect PostgreSQL add-on
4. Set DATABASE_URL in environment

### Using Render

1. Sign up at https://render.com
2. Create PostgreSQL database
3. Deploy Next.js app with DATABASE_URL

---

## 🐛 Troubleshooting

### "prisma not found"
```bash
npm install prisma @prisma/client
```

### "DATABASE_URL is required"
Make sure `.env.local` exists and has DATABASE_URL set

### "Migration pending"
```bash
npx prisma migrate deploy
```

### "Port 5432 already in use"
```bash
# Change port in DATABASE_URL
postgresql://user:pass@localhost:5433/db
```

### "Connection refused"
- Check PostgreSQL is running
- Verify credentials in DATABASE_URL
- Check firewall settings

---

## 📝 Next Steps

1. ✅ Database is set up
2. ✅ Server actions ready
3. ✅ API routes ready
4. ⏭️ **Next:** Create UI components for:
   - Profile creation form
   - Connection request button
   - Like/comment interactions
   - Feed display with profiles

5. ⏭️ **Then:** Add more features:
   - Notifications system
   - Messaging/Chat
   - Search functionality
   - Equipment rental

---

## 🎯 Usage Example: Full Flow

```typescript
// 1. User signs up (auth.ts creates User)
// 2. User creates profile
const profileResult = await createProfile({
  userId: 'u1',
  bio: 'Wheat farmer from Punjab',
  location: 'Amritsar',
  crops: ['Wheat', 'Rice']
});

// 3. User creates a post
const postResult = await createPost({
  authorId: 'u1',
  content: 'Harvesting wheat today!',
  cropName: 'Wheat'
});

// 4. Another user sends connection request
await sendConnectionRequest('u2', 'u1');

// 5. First user accepts
await acceptConnection('u2', 'u1');

// 6. Now they're connected
const { connections } = await getConnections('u1');
// Shows user u2 in connections list
```

---

## 📚 Useful Prisma Commands

```bash
# Open database GUI
npx prisma studio

# Create new migration
npx prisma migrate dev --name add_field

# View migration history
npx prisma migrate status

# Reset database (⚠️ CAREFUL - deletes all data)
npx prisma migrate reset

# Generate types
npx prisma generate

# Format schema
npx prisma format
```

---

## 🔐 Security Notes

1. **Never commit .env files** - Add to .gitignore
2. **Use environment variables** for all secrets
3. **Validate input** on server side
4. **Hash passwords** with bcrypt (when implementing auth)
5. **Check permissions** before operations
6. **Use HTTPS** in production

---

## 📞 Support

For Prisma documentation: https://www.prisma.io/docs/
For PostgreSQL help: https://www.postgresql.org/docs/

Your database is now **production-ready**! 🎉
