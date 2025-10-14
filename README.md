
#  Social Media Platform API 

##  Project Overview

This project is a simple and secure social media platform backend, built using **Node.js** and **Express.js**, with full support for user authentication and content management. The platform supports account creation, login/logout, post and comment management, and user profile operations.

Authentication is handled using **JWT** and **Argon2** for password encryption.

##  Models

The project includes three main models:

- **User**: Manages user data and authentication.
- **Post**: Handles user-generated posts.
- **Comment**: Stores comments associated with posts.

##  Authentication Endpoints

| Action         | URL              | Method |
|----------------|------------------|--------|
| Sign Up        | `/api/auth/signup` | POST   |
| Login          | `/api/auth/login`  | POST   |
| Logout         | `/api/auth/logout` | POST   |

##  User Endpoints

All endpoints below require authentication via a JWT token.

| Action                | URL              | Method |
|-----------------------|------------------|--------|
| View Profile          | `/api/users/me`  | GET    |
| Update Profile        | `/api/users/me`  | PUT    |
| Delete Account        | `/api/users/me`  | DELETE |

>  Deleting a user will also delete all their posts, comments, and comments on their posts.

##  Post Endpoints

| Action                     | URL                    | Method |
|----------------------------|------------------------|--------|
| Create Post                | `/api/posts`           | POST   |
| Edit Post                  | `/api/posts/:id`       | PUT    |
| Delete Post                | `/api/posts/:id`       | DELETE |
| View My Posts              | `/api/posts/me`        | GET    |
| View All Posts (Paginated) | `/api/posts`           | GET    |
| View Single Post           | `/api/posts/:id`       | GET    |

>  Deleting a post also deletes all its comments.

##  Comment Endpoints

| Action                  | URL                         | Method |
|-------------------------|-----------------------------|--------|
| Create Comment          | `/api/comments`             | POST   |
| View Comments on Post   | `/api/comments/:postId`     | GET    |
| Delete Comment          | `/api/comments/:id`         | DELETE |

>  Only the original author can edit or delete their post/comment.


