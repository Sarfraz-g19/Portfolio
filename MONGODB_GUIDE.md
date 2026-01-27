# Portfolio MongoDB Integration Guide

This project has been professionally integrated with MongoDB using a dedicated Node.js/Express backend and a dynamic Next.js frontend.

## 1. Database Security & User Creation

To follow security best practices, do not use your primary Atlas admin user for the application.

### Recommended: Create a Dedicated User
1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/).
2. Go to **Database Access** (under Security).
3. Click **Add New Database User**.
4. **Authentication Method**: Password.
5. **Username**: `portfolio_manager`.
6. **Password**: (Generate a secure one).
7. **Database User Privileges**:
   - Built-in Role: `readWrite`.
   - Database: `sarfraj_portfolio` (or your preferred name).
8. Click **Add User**.
9. Update your `.env.local` with the new credentials.

### Network Access (CRITICAL)
If you see `ECONNREFUSED` or `timeout` errors:
1. Go to **Network Access** in Atlas.
2. Ensure your current IP is whitelisted.
3. For deployment (e.g., Vercel/Render), you may need to **Allow Access from Anywhere (0.0.0.0/0)** temporarily or use a specific IP range if your hosting provides one.

## 2. Managing Data

All portfolio data is now stored in MongoDB.

### Initial Seeding
To populate your portfolio with your existing data, run:
```bash
node seed.js
```
*Note: This will clear current data in the collections and replace it with the data defined in `seed.js`.*

### Updating Data via API
The backend includes a secure REST API. Write operations (POST, PUT, DELETE) require an `x-api-key` header.
- **Header Key**: `x-api-key`
- **Header Value**: (Set in `.env.local` as `ADMIN_API_KEY`)

#### Endpoints:
- `GET /api/projects`: Fetch all projects
- `POST /api/projects`: Add a project (Requires API Key)
- `PATCH /api/projects/:id`: Update a project (Requires API Key)
- `GET /api/profile`: Fetch hero/about details
- `PATCH /api/profile`: Update profile (Requires API Key)

## 3. Deployment

### Frontend (Next.js)
Deploy as a standard Next.js app. Ensure `NEXT_PUBLIC_API_URL` is set to your deployed backend URL.

### Backend (Express)
1. Deploy to a platform like **Render**, **Railway**, or **Heroku**.
2. Set all Environment Variables from `.env.local` in your hosting dashboard.
3. Ensure the `PORT` is handled by the platform.

## 4. Environment Variables Reference
```env
MONGODB_URI=mongodb+srv://user:pass@cluster...
ADMIN_API_KEY=your_secure_random_key
NEXT_PUBLIC_API_URL=http://your-backend-url/api
```
