# Skeet's Texas Grill 🍖🤠

A modern, full-stack web application designed for **Skeet's Texas Grill**, an authentic Texas-style restaurant. This project features a responsive, aesthetically pleasing frontend built with React and a robust backend API powered by Node.js and Express.

![Project Banner](https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000)

## 🚀 Features

-   **Dynamic Menu System**: Categorized menu browsing (Appetizers, Burgers, Chicken, Heart of Texas, Coast, etc.) with detailed descriptions and pricing.
-   **Interactive Reviews**:
    -   Auto-rotating review carousel on the homepage and reviews page.
    -   User submission form that persists new reviews to the backend (`reviews.json`).
    -   Live rating integration.
-   **Responsive Design**: Fully mobile-optimized layout using **Tailwind CSS**.
-   **Animations**: Smooth page transitions and element animations using **Framer Motion**.
-   **SEO Optimized**: Comprehensive meta tags and JSON-LD structured data for better search engine visibility.
-   **Contact & Location**: Integrated Google Maps, hours of operation, and contact form handling.

---

## 🛠️ Tech Stack

### **Frontend (`/client`)**
-   **Framework**: React (Vite)
-   **Styling**: Tailwind CSS (Custom "Texas Rustic" theme)
-   **Animations**: Framer Motion
-   **Icons**: Lucide React
-   **Routing**: React Router DOM

### **Backend (`/server`)**
-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Data Storage**: JSON file storage (`reviews.json`) for persistence without a database.
-   **Utilities**: CORS, Dotenv

---

## 📂 Project Structure

The project is divided into two distinct folders for clear separation of concerns:

```
Resturent/
├── client/           # React Frontend
│   ├── public/       # Static assets (images, icons)
│   ├── src/          # Source code (Components, Pages)
│   └── package.json  # Frontend dependencies
│
└── server/           # Express Backend
    ├── reviews.json  # Data file for storing reviews
    ├── server.js     # Main server entry point
    └── package.json  # Backend dependencies
```

---

## ⚡ Getting Started

Since the client and server are separated, you will need to run them in **two separate terminal windows**.

### Prerequisites
-   [Node.js](https://nodejs.org/) (v14 or higher)
-   NPM (comes with Node.js)

### 1. Backend Setup (Terminal 1)
Start the backend server first to ensure the API is ready.

```bash
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Start the server (runs on port 5000)
npm run dev
```
*You should see: `🔥 Skeet's Texas Grill server running on port 5000`*

### 2. Frontend Setup (Terminal 2)
Open a new terminal window/tab and start the React application.

```bash
# Navigate to the client directory
cd client

# Install dependencies
npm install

# Start the development server (runs on port 3000)
npm run dev
```
*You should see a local URL (e.g., `http://localhost:3000`) where you can view the app.*

---

## 🔌 API Endpoints

The backend provides the following RESTful endpoints:

| Method | Endpoint        | Description                                      |
| :----- | :-------------- | :----------------------------------------------- |
| `GET`  | `/api/menu`     | Returns the full menu data categorized by type.  |
| `GET`  | `/api/reviews`  | Returns a list of customer reviews.              |
| `POST` | `/api/reviews`  | Submits a new review (saves to `reviews.json`).  |
| `GET`  | `/api/info`     | Returns restaurant details (hours, phone, etc.). |
| `POST` | `/api/contact`  | Handles contact form submissions.                |

---

## 🎨 Design System

The application uses a custom color palette defined in `tailwind.config.js`:
-   **Texas Red** (`#8B2635`): Primary brand color.
-   **Texas Orange** (`#E07A5F`): Accents and highlights.
-   **Texas Cream** (`#F4F1DE`): Warm background color.
-   **Texas Slate** (`#3D405B`): Text and dark backgrounds.

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
