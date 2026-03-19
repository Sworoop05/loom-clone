# 🎥 Loom Clone

> A full-stack screen recording and video sharing application — built as a feature clone of Loom, using Next.js, Prisma, and TypeScript.

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

---

## 📌 Overview

**Loom Clone** is a full-stack web application inspired by Loom — the async video messaging platform. It allows users to record, share, and manage short video messages directly from their browser. Built with **Next.js App Router**, **Prisma ORM**, and **TypeScript**, it demonstrates real-world full-stack architecture patterns including media handling, auth flows, and persistent video storage.

---

## ✨ Features

- 🎬 **Screen / Camera Recording** — In-browser video recording via browser MediaRecorder API
- 📤 **Video Upload & Storage** — Upload and persist recorded videos
- 🔗 **Shareable Video Links** — Generate unique links to share recordings
- 👤 **User Authentication** — Secure sign-in and session management
- 🗂️ **Video Dashboard** — View, manage, and delete your recordings
- 🗃️ **Database-backed** — Persistent data with Prisma and a relational database
- 🎨 **Clean UI** — Built with Tailwind CSS and shadcn/UI components

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| ORM | Prisma |
| Styling | Tailwind CSS, shadcn/UI |
| Package Manager | Bun |
| Linting | ESLint |

---

## 📁 Project Structure

```
loom-clone/
├── prisma/
│   └── schema.prisma     # Database schema
├── src/
│   ├── app/              # Next.js App Router pages & layouts
│   ├── components/       # Reusable UI components
│   └── lib/              # Utilities, Prisma client, helpers
├── public/               # Static assets
├── tailwind.config.ts
└── next.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A PostgreSQL (or compatible) database

### Installation

```bash
# Clone the repository
git clone https://github.com/Sworoop05/loom-clone.git
cd loom-clone

# Install dependencies
bun install
# or
npm install

# Set up environment variables
cp .env.example .env
# Add your DATABASE_URL and any auth secrets

# Push the Prisma schema to your database
bunx prisma db push

# Start the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🔑 Environment Variables

```env
DATABASE_URL="postgresql://user:password@localhost:5432/loom_clone"
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

---

## 📜 Scripts

| Command | Description |
|---|---|
| `bun dev` | Start development server |
| `bun build` | Build for production |
| `bunx prisma studio` | Open Prisma Studio |
| `bunx prisma db push` | Sync schema to database |

---

## 👤 Author

**Sworoop Bhandari**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sworoop-bhandari-942444316/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Sworoop05)
