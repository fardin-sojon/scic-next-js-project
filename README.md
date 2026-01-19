# 🛍️ NextShop

**NextShop is a modern e-commerce platform built with Next.js.**
It allows users to browse, add, and manage products with a responsive and clean interface. Users can also register, login, and manage their own products securely.

🌐 [Live Link](https://scic-next-js.vercel.app/)

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
