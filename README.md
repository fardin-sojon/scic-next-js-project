# Simple Next.js + Express Application

A full-stack application with a **Next.js 15** frontend and **integrated API Routes** (Express-like logic) connecting to MongoDB.

## Features

- **Public Landing Page**: 7 sections including Hero, Features, About, etc.
- **Product Listing**: Fetch and display items from the backend.
- **Product Details**: Dynamic routing for individual item details.
- **Authentication (Mock)**: Simple login system using cookies.
- **Protected Route**: Add Item page is secured for authenticated users.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), Tailwind CSS, TypeScript
- **Backend / API**: Next.js API Routes, MongoDB (Mongoose)
- **Database**: MongoDB

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running locally on port 27017 (or update `.env`)

### 1. Installation
```bash
npm install
```

### 2. Run Locally
```bash
npm run dev
# The app and API run on http://localhost:3000
```

## Mock Login Credentials

- **Email**: `admin@example.com`
- **Password**: `password123`

## Route Summary

- `/`: Home (Landing Page)
- `/items`: All Items
- `/items/[id]`: Single Item Details
- `/login`: Login Page
- `/dashboard/add-item`: Protected Add Item Page

## API Endpoints

- `GET /api/items`: Get all items
- `GET /api/items/:id`: Get item by ID
- `POST /api/items`: Create new item
