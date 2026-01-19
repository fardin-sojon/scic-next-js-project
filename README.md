# 🛍️ SCIC Next.js E-commerce Project

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb)
![Firebase](https://img.shields.io/badge/Firebase-Auth-orange?style=for-the-badge&logo=firebase)

A modern, full-stack e-commerce application built with **Next.js 15**, **MongoDB**, and **Firebase Authentication**. This project features a dynamic product catalog, user authentication, a protected admin dashboard, and a responsive UI designed with Tailwind CSS.

---

## 🔗 Quick Links

<div align="center">
  <a href="https://scic-next-js.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🚀_View_Live_Demo-000000?style=for-the-badge&logo=vercel" alt="Live Demo" />
  </a>
  <a href="https://github.com/fardin-sojon/scic-next-js-project.git" target="_blank">
    <img src="https://img.shields.io/badge/📂_GitHub_Repository-181717?style=for-the-badge&logo=github" alt="GitHub Repo" />
  </a>
</div>

---

## ✨ Key Features

- **🎨 Modern UI/UX**: Fully responsive design with Dark Mode support using Tailwind CSS.
- **🔐 Secure Authentication**: Firebase Authentication (Google Sign-In & Email/Password).
- **🛒 Product Management**:
    - Browse products with filtering and details view.
    - **Admin Dashboard**: Add, Edit, and Delete products (Protected Routes).
- **💾 Database Integration**: Persistent data storage using MongoDB and Mongoose.
- **⚡ Server-Side Rendering**: Optimized performance with Next.js App Router.
- **🔔 Real-time Notifications**: Toast notifications for user actions (Login, Add to Cart, etc.).

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React, Tailwind CSS
- **Backend**: Next.js API Routes (Serverless functions)
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: Firebase Auth
- **Utilities**: Axios, React Hot Toast, SweetAlert2, React Icons

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/fardin-sojon/scic-next-js-project.git
cd scic-next-js-project
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and add the following keys:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Firebase Config (Get these from your Firebase Console)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# App Config
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5000](http://localhost:5000) in your browser.

---

## 📂 Project Structure

```bash
├── 📁 src
│   ├── 📁 app          # Next.js App Router pages & API routes
│   ├── 📁 components   # Reusable React components (Navbar, Footer, etc.)
│   ├── 📁 lib          # Database & Firebase configuration
│   ├── 📁 models       # Mongoose Data Models (Item, User)
│   └── 📄 middleware.js # Route protection logic
├── 📄 next.config.mjs  # Next.js configuration
├── 📄 jsconfig.json    # Path aliases configuration
└── 📄 README.md        # Project documentation
```

---

## 🤝 Contact

**Fardin Sojon**  
📧 Email: [fardinsojon@gmail.com](mailto:fardinsojon@gmail.com)  

---

<div align="center">
  Made with ❤️ using Next.js
</div>
