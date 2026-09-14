# MyBlog - Full Stack Blogging Platform

A full-stack blogging platform built with React, Node.js, Express, MongoDB, and JWT authentication.

Users can create an account, log in securely, publish blog posts, view posts, edit their own posts, and delete their own posts.

## Features

- User registration
- Secure password hashing with bcrypt
- User login with JWT authentication
- Logout functionality
- Protected frontend routes
- Protected backend routes
- Create blog posts
- View all public posts
- View individual blog posts
- Edit your own posts
- Delete your own posts
- My Posts dashboard
- Responsive and modern UI
- MongoDB database integration
- REST API with Express

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- CSS

### Backend

- Node.js
- Express.js
- Mongoose
- JWT
- bcryptjs
- dotenv
- CORS

### Database

- MongoDB

## Project Structure

```text
blogging-platform/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── CreatePost.jsx
│   │   │   ├── EditPost.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MyPosts.jsx
│   │   │   ├── PostDetails.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Post.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── postRoutes.js
│   │
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── .gitignore
└── README.md