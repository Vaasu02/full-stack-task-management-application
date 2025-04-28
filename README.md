# Task Management Application

A full-stack task management application built with Node.js, Express, MongoDB, and React. This application allows users to create, manage, and track their tasks with features like priority levels, status tracking, and filtering.

## Features

- User Authentication (Register/Login)
- Task Management (CRUD operations)
- Task Filtering by Status and Priority
- Responsive Design
- Real-time Updates
- Form Validation
- Error Handling
- Loading States
- Mobile-friendly Interface

## Technical Stack

### Backend
- **Node.js & Express**: Server runtime and web framework
- **MongoDB & Mongoose**: Database and ODM
- **JWT**: Authentication
- **bcryptjs**: Password hashing
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variables management

### Frontend
- **React**: UI library
- **Vite**: Build tool and development server
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **React Hook Form**: Form handling
- **Yup**: Form validation
- **Tailwind CSS**: Styling
- **React Hot Toast**: Notifications

## Architecture

### Backend Architecture
```
backend/
├── src/
│         
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   └── app.js          # Entry point
```

### Frontend Architecture
```
frontend/
├── src/
│   ├── components/     # Reusable components
│   │   ├── auth/      # Authentication components
│   │   ├── layout/    # Layout components
│   │   └── ui/        # UI components
│   ├── context/       # React Context
│   ├── pages/         # Page components
│   ├── utils/         # Utility functions
│   └── App.jsx        # Root component
```

## Database Schema

### User Model
```javascript
{
  name: String,
  email: String,
  password: String,
  createdAt: Date
}
```

### Task Model
```javascript
{
  title: String,
  description: String,
  status: {
    type: String,
    enum: ['active', 'completed'],
    default: 'active'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: Date
}
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/task-management
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory:
   ```
   VITE_API_URL=http://localhost:5000
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Running the Application

1. Start MongoDB service on your machine
2. Start the backend server (from backend directory)
3. Start the frontend development server (from frontend directory)
4. Access the application at `http://localhost:5173`

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Tasks
- GET `/api/tasks` - Get all tasks
- POST `/api/tasks` - Create a new task
- PUT `/api/tasks/:id` - Update a task
- DELETE `/api/tasks/:id` - Delete a task

## Technical Choices Explanation

1. **MongoDB & Mongoose**
   - Chosen for its flexibility with document-based storage
   - Mongoose provides schema validation and middleware support
   - Easy to scale and maintain

2. **React with Vite**
   - Vite offers faster development experience
   - React's component-based architecture for reusable UI
   - Context API for state management instead of Redux for simplicity

3. **Tailwind CSS**
   - Utility-first CSS framework for rapid development
   - Responsive design out of the box
   - Customizable and maintainable

4. **JWT Authentication**
   - Stateless authentication
   - Secure token-based approach
   - Easy to implement and scale

5. **React Hook Form with Yup**
   - Efficient form handling
   - Built-in validation
   - Better performance than controlled components



