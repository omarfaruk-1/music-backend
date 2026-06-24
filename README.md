# Music Streaming Backend API

A backend application for a music streaming platform built with Node.js, Express.js, and MongoDB.

The platform supports two types of users: regular users and artists. Users can create accounts, authenticate securely, and access music content, while artists can upload tracks and manage their music library.

The project focuses on secure authentication, session management, role-based access control, and cloud-based media storage.

---

## Features

### Authentication & Security

- User Registration
- User Login
- JWT Authentication
- Access Token & Refresh Token Flow
- Refresh Token Rotation
- Session Management
- Logout from Current Device
- Logout from All Devices
- Password Hashing with bcrypt
- Refresh Token Hashing using SHA-256
- Protected Routes

### Authorization

Role-Based Access Control (RBAC)

#### User
- Create an account
- Login securely
- Access platform content

#### Artist
- Upload music
- Create albums
- Manage uploaded content

### Music Management

- Audio file upload
- Music metadata storage
- Artist ownership validation

### Album Management

- Create albums
- Organize tracks under albums

### File Storage

- Multer for file handling
- ImageKit integration for cloud storage

---

## Tech Stack

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication & Security
- JWT
- bcrypt
- crypto
- cookie-parser

### File Upload & Storage
- Multer
- ImageKit

---

## Project Structure

```bash
src/
├── configs/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── db/
└── app.js
```

---

## Environment Variables

Create a `.env` file and configure the following variables:

```env
PORT=

DB_URI=

JWT_ACCESS_TOKEN=
JWT_REFRESH_TOKEN=

IMAGE_KIT_PUBLIC_KEY=
IMAGE_KIT_PRIVATE_KEY=
IMAGE_KIT_ENDPOINT=
```

You can use the provided `.env.example` file as a reference.

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user |
| POST | /api/auth/refresh-token | Generate new access token |
| POST | /api/auth/logout | Logout current session |
| POST | /api/auth/logout-all | Logout from all devices |

### Music

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | /api/music | Upload a music file |
| GET | /api/music | Get all music |
| GET | /api/music/my-music | Artist own music |
| GET | /api/music/:musicId | Specif music |

### Album

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | /api/album/create | Create a new album |

---

## Uploading Music

To upload a music file:

- Login as an artist
- Include a valid access token in the Authorization header
- Send the request using `multipart/form-data`

Example fields:

```txt
title: My Song
music: audio_file.mp3
```

---

## Authentication Flow

1. User logs in successfully.
2. Server generates an access token and refresh token.
3. Refresh token is stored in an HTTP-only cookie.
4. Access token is used to access protected routes.
5. When the access token expires, a new one can be generated using the refresh token.
6. Sessions can be revoked through logout operations.

---

## Current Progress

### Implemented

- Authentication System
- Session Management
- Refresh Token Rotation
- Role-Based Authorization
- Music Upload
- Album Creation
- ImageKit Integration
- Protected Routes

### Planned Improvements

- Music CRUD Operations
- Album CRUD Operations
- Playlist Management
- Favorite Songs
- Search & Filtering
- Redis Caching
- Docker Support
- API Documentation (Swagger)

---

## Getting Started

```bash
git clone <repository-url>

cd project-name

npm install

npm run dev
```

---

## Author

**MD Omar Faruk**

Backend Developer focused on building secure APIs, authentication systems, and scalable backend applications.