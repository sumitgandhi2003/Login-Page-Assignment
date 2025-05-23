# 🔐 Login Assignment – Full Stack Auth App

A simple full stack authentication app with:

- **Frontend:** React + Tailwind CSS
- **Backend:** Node.js + Express.js + Prisma ORM
- **Database:** SQLite
- **Validation:** Zod

---

## Setup Instructions

### 1. Initial Command

```bash
git clone https://github.com/sumitgandhi2003/Login-Page-Assignment.git
cd login-page-assignment
cd frontend
npm install
npm run dev
cd ../backend
npm install
```

### 2. Create a `.env` file in `backend/`

```env
DATABASE_URL="file:./dev.db"
PORT=4000
```

### 3. Create a `.env` file in `frontend/`

```env
VITE_SERVER_URL="http://localhost:4000"
```

### 4. Prisma Setup

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Start the Backend Server

```bash
npm run dev
```

### 6. Start the Frontend Server

```bash
npm run dev
```

---

## 📌 API Routes

### ✅ Auth Routes (`/api/auth`)

| Method | Endpoint    | Description         |
| ------ | ----------- | ------------------- |
| POST   | `/register` | Register new user   |
| POST   | `/login`    | Login existing user |

---

## 🙌 Tech Stack

- React + Tailwind
- Node.js + Express
- Prisma + SQLite
- Zod for validation

---
