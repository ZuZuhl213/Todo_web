# Todo App (React + Laravel + PostgreSQL)

A full-stack Todo application built with **Laravel (API)**, **React (Vite)**, and **PostgreSQL**.
The project demonstrates authentication using **Laravel Sanctum tokens** and a RESTful API consumed by a React frontend.

---

# Tech Stack

### Backend

* Laravel 12
* Laravel Sanctum (Token Authentication)
* PostgreSQL
* REST API

### Frontend

* React (Vite)
* React Router
* Axios

---

# Features

## Authentication

* User registration
* User login
* Token-based authentication (Sanctum)
* Logout

## Todo Management

* Create todo
* View todo list
* Update todo
* Delete todo
* Change todo status

  * pending
  * in_progress
  * done

---

# Project Structure

```
todo-api/       -> Laravel backend
todo-web/       -> React frontend
```

### Backend Structure

```
app/
 ├ Controllers
 ├ Models
 └ Http
routes/
 └ api.php
database/
 └ migrations
```

### Frontend Structure

```
src/
 ├ pages/
 │   ├ LoginPage.jsx
 │   ├ RegisterPage.jsx
 │   └ TodoPage.jsx
 │
 ├ services/
 │   ├ api.js
 │   ├ auth.js
 │   └ todo.js
 │
 ├ App.jsx
 └ main.jsx
```

---

# Installation Guide

## 1. Clone repository

```
git clone <repository-url>
cd project-folder
```

---

# Backend Setup (Laravel)

## Install dependencies

```
composer install
```

## Copy environment file

```
cp .env.example .env
```

## Configure database

Edit `.env`

```
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=todo_app
DB_USERNAME=postgres
DB_PASSWORD=your_password
```

## Generate app key

```
php artisan key:generate
```

## Run migrations

```
php artisan migrate
```

## Install Sanctum

```
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

## Start backend server

```
php artisan serve
```

Backend will run at:

```
http://127.0.0.1:8000
```

---

# Frontend Setup (React)

Navigate to frontend folder

```
cd todo-web
```

Install dependencies

```
npm install
```

Run development server

```
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

# API Endpoints

## Authentication

| Method | Endpoint      | Description            |
| ------ | ------------- | ---------------------- |
| POST   | /api/register | Register new user      |
| POST   | /api/login    | Login                  |
| GET    | /api/me       | Get authenticated user |
| POST   | /api/logout   | Logout                 |

## Todos

| Method | Endpoint        | Description |
| ------ | --------------- | ----------- |
| GET    | /api/todos      | Get todos   |
| POST   | /api/todos      | Create todo |
| PATCH  | /api/todos/{id} | Update todo |
| DELETE | /api/todos/{id} | Delete todo |

All todo routes require:

```
Authorization: Bearer TOKEN
```

---

# Authentication Flow

```
React Login
      │
      ▼
POST /api/login
      │
      ▼
Receive TOKEN
      │
      ▼
Save token (localStorage)
      │
      ▼
Send token in Authorization header
```

Example:

```
Authorization: Bearer TOKEN
```

---

# Example Request

Create Todo

```
POST /api/todos
Authorization: Bearer TOKEN
```

Body

```
{
  "title": "Learn Laravel"
}
```

---

# Future Improvements

* UI styling (Tailwind / Material UI)
* Pagination
* Todo filtering
* Drag & drop tasks
* Unit tests
* Docker setup

---
