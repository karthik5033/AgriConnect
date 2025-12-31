<<<<<<< HEAD
# AgriConnect - Full-Stack Social Media Application

This is a complete, production-structured MERN stack social media application focused on agricultural content.

## Tech Stack

**Backend:**
*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Database:** MongoDB (via Mongoose)
*   **Image Storage:** Cloudinary (via `multer-storage-cloudinary`)
*   **Other:** `dotenv`, `cors`

**Frontend:**
*   **Framework:** React (Vite)
*   **Routing:** React Router
*   **Styling:** Tailwind CSS
*   **API:** Plain `fetch` API

## Folder Structure

\`\`\`
.
├── backend/
│   ├── config/
│   │   ├── cloudinary.js
│   │   ├── db.js
│   │   └── multer.js
│   ├── models/
│   │   └── Post.js
│   ├── routes/
│   │   ├── posts.js
│   │   └── upload.js
│   ├── frontend/
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── PostCard.jsx
│   │   │   ├── pages/
│   │   │   │   ├── CreatePost.jsx
│   │   │   │   └── Home.jsx
│   │   │   ├── App.jsx
│   │   │   ├── index.css
│   │   │   └── main.jsx
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── postcss.config.js
│   │   └── tailwind.config.js
│   ├── index.js
│   ├── package.json
│   └── .env.example
└── README.md
\`\`\`

## Setup and Running the Application

### 1. Environment Variables

Create a file named `.env` inside the `backend` folder based on the provided `.env.example`.

**\`backend/.env\`**
\`\`\`
# MongoDB Connection
MONGO_URI=your_mongodb_connection_string

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server Port
PORT=5000
\`\`\`

*   **MongoDB:** Replace `your_mongodb_connection_string` with your actual MongoDB URI.
*   **Cloudinary:** Sign up for a free Cloudinary account and get your `CLOUD_NAME`, `API_KEY`, and `API_SECRET`.

### 2. Run the Backend

1.  Navigate to the `backend` directory:
    \`\`\`bash
    cd backend
    \`\`\`
2.  Install dependencies:
    \`\`\`bash
    npm install
    \`\`\`
3.  Start the server in development mode (using `nodemon`):
    \`\`\`bash
    npm run dev
    \`\`\`
    The backend will run on `http://localhost:5000`.

### 3. Run the Frontend

1.  Navigate to the `frontend` directory:
    \`\`\`bash
    cd ../frontend
    \`\`\`
2.  Install dependencies (already done during scaffolding, but good practice):
    \`\`\`bash
    npm install
    \`\`\`
3.  Start the development server:
    \`\`\`bash
    npm run dev
    \`\`\`
    The frontend will typically run on `http://localhost:5173` (or another available port).

## Backend API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/upload` | Uploads an image to Cloudinary and saves the post to MongoDB. Requires `multipart/form-data` with fields `text` and `image`. |
| `GET` | `/api/posts` | Retrieves all posts, sorted by newest first. |

## Frontend Features

*   **Home Page (`/`):** Displays a clean, LinkedIn-style feed of all posts fetched from the backend. Includes post text, image, and a "time ago" indicator.
*   **Create Post Page (`/create`):** A form to submit a new post, including text and an image file. Uses `FormData` and plain `fetch` to communicate with the `/api/upload` endpoint. Redirects to the Home page on success.
*   **Navigation:** A simple `Navbar` with the app name "AgriConnect" and a link to the "Create Post" page.

