# NOMVIA Backend

Production-grade Node.js/Express backend for the NOMVIA application.

## 🚀 Setup Instructions

### 1. Install Dependencies
Navigate to the `backend` directory and install the required packages:

```bash
cd backend
npm install
```

### 2. Configure Environment Variables
The project includes a `.env` file. Ensure it has the correct values:

- **MONGO_URI**: Connection string for your MongoDB instance.
- **FIREBASE_PROJECT_ID**: Your Firebase Project ID.
- **PORT**: Port to run the server on (default: 5000).

### 3. Firebase Admin Setup
You must download your Firebase Service Account JSON key:

1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Select your project -> Project Settings -> Service accounts.
3. Click "Generate new private key".
4. Save the file as `serviceAccountKey.json`.
5. Place it in: `backend/src/config/serviceAccountKey.json`.

**⚠️ IMPORTANT**: Do NOT commit `serviceAccountKey.json` to public version control.

### 4. Run the Server
Start the development server with hot-reloading:

```bash
npm run dev
```

The server will start at `http://localhost:5000`.

## 🔐 Authentication Flow

1. **Frontend (Flutter)**: User signs in using Firebase Auth (Google/Phone).
2. **Frontend**: Retrieves the `idToken` from `currentUser`.
3. **Frontend**: Sends POST request to `http://localhost:5000/api/auth/verify` with body `{ idToken: "..." }`.
4. **Backend**:
   - Verifies token using Firebase Admin SDK.
   - Checks if user exists in MongoDB.
   - If new, creates a user document.
   - Returns the user profile.
5. **Frontend**: Stores the user data and uses the `idToken` in the `Authorization: Bearer <token>` header for subsequent requests.

## 📡 API Endpoints

### Auth
- `POST /api/auth/verify`: Verify Firebase Token and Sync User.

### User
- `GET /api/users/me`: Get current user profile (Requires Auth Header).
- `PUT /api/users/update-profile`: Update user details (Requires Auth Header).

## 🛠️ Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Auth**: Firebase Admin SDK
