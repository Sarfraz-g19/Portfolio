# Antigravity Portfolio

## 🛠 Project Setup & Initialization

First, install the necessary dependencies:

```bash
npm install
```

## 🚀 Running the Project

To start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🏗 Building for Production

To create a production build (useful before deploying):

```bash
npm run build
```

Then start the production server:

```bash
npm run start
```

## 🗄 Database Seeding

To populate the database with initial data (Projects, Skills, Experience, etc.):
1. Ensure the development server is running (`npm run dev`).

## ☁️ Deployment on Vercel

1.  **Push to GitHub**:
    *   Initialize git: `git init`
    *   Add files: `git add .`
    *   Commit: `git commit -m "Initial commit"`
    *   Push to a new repository on GitHub.

2.  **Deploy to Vercel**:
    *   Go to [Vercel](https://vercel.com) and sign up/login.
    *   Click **"Add New..."** -> **"Project"**.
    *   Import your GitHub repository.

3.  **Configure Environment Variables**:
    *   In the Vercel project setup, find the **"Environment Variables"** section.
    *   Add these keys (copy values from your local `.env.local`):
        *   `MONGODB_URI`
        *   `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
        *   `CLERK_SECRET_KEY`
        *   `NEXT_PUBLIC_API_URL` -> Set this to `/api` (Do not use localhost).

4.  **Finalize**:
    *   Click **"Deploy"**.
    *   Once deployed, visit `https://your-project.vercel.app/api/seed` **once** to populate your live database.

