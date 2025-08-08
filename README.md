# User Engine - MERN Stack Application

This is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for user management.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas connection)
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Environment Setup

Create a `.env` file in the `server` directory with the following content:

```
MONGO_URL=mongodb://localhost:27017/user_engine_db
PORT=8000
```

**Note:** If you're using MongoDB Atlas, replace the MONGO_URL with your Atlas connection string.

### 3. Start the Application

#### Option 1: Start Server and Client Separately

```bash
# Terminal 1 - Start the server
cd server
npm start

# Terminal 2 - Start the client
cd client
npm start
```

#### Option 2: Use the provided scripts

```bash
# Start server only
npm run server

# Start client only
npm run client

# Start both (if you have concurrently installed)
npm run dev
```

## Application Structure

- **Client**: React.js frontend running on `http://localhost:3000`
- **Server**: Express.js backend running on `http://localhost:8000`
- **Database**: MongoDB

## Features

- User registration and login
- User management (CRUD operations)
- Form validation
- Toast notifications
- Responsive design

## API Endpoints

- `POST /api/users/createUsr` - Create a new user
- `POST /api/users/login` - User login
- `GET /api/users/getAllUsrs` - Get all users
- `GET /api/users/getUsrById/:id` - Get user by ID
- `PUT /api/users/updateUsr/:id` - Update user
- `DELETE /api/users/deleteUsr/:id` - Delete user

## Troubleshooting

1. **Server won't start**: Make sure MongoDB is running and the MONGO_URL is correct
2. **Login not working**: Verify that the server is running on port 8000
3. **CORS errors**: The server is configured to accept requests from `http://localhost:3000`

## Recent Improvements

- Enhanced form validation with specific error messages
- Better error handling for network issues
- Improved user feedback with toast notifications
- Email format validation
- Password field is now required in the user model
