# 🧠 Brainly Frontend (`brainly-fe`)

> A modern, sleek Second Brain application to store, organize, and share your favorite links, tweets, videos, and notes in one intuitive dashboard.

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-v7-CA4245?logo=react-router&logoColor=white)](https://reactrouter.com/)

---

## 🌟 Overview

**Brainly** is a personal knowledge management platform (Second Brain) inspired by modern bookmarking and knowledge curation tools. It allows users to collect digital content from various platforms—including **Twitter/X**, **YouTube**, **Instagram**, and **Facebook**—organize them with custom tags, and share entire collections through public shareable links.

This repository contains the **Frontend** client built with **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS v4**.

- 🔗 **Backend Repository**: [Mohammed-Taha-Zubair/Brainly](https://github.com/Mohammed-Taha-Zubair/Brainly)

---

## ✨ Features

- 🧠 **Second Brain Dashboard**: Clean, responsive multi-column board displaying all your saved resources.
- 📺 **Rich Media Embeds**: Interactive previews and native embeds for:
  - 🐦 **Twitter / X**: Tweets, threads, and media cards
  - 🎥 **YouTube**: Embedded responsive video player
  - 📸 **Instagram**: Post cards and links
  - 📘 **Facebook**: Interactive post and video cards
- 🏷️ **Categorization & Filtering**: Filter saved content by type (`Tweets`, `Videos`, `Documents`, `Links`) directly from the sidebar.
- ➕ **Add Content Modal**: Easy-to-use modal to quickly submit new links with title, platform type, tags, and thumbnails.
- 🔗 **Share Brain**: Generate a unique public link to share your curated knowledge base with anyone.
- 🔐 **Authentication**: Token-based authentication for user signup and signin.
- ⚡ **Optimized Performance**: Leverages React 19 with the experimental React Compiler and Vite for blazing-fast HMR and minimal bundle footprint.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 8](https://vitejs.dev/) + React Compiler |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Routing** | [React Router DOM v7](https://reactrouter.com/) |
| **HTTP Client** | [Axios](https://axios-http.com/) |
| **Icons** | Custom SVG Icons & [Lucide React](https://lucide.dev/) |

---

## 📁 Project Structure

```text
brainly-fe/
├── public/                 # Static assets and icons
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Button.tsx             # Customized button with variants and sizes
│   │   ├── Card.tsx               # Content card with multi-platform embed rendering
│   │   ├── CreateContentModal.tsx # Modal form for adding new links & tags
│   │   ├── Input.tsx              # Styled text input component
│   │   ├── ShareBrainModal.tsx    # Modal to generate & copy public share links
│   │   ├── Sidebar.tsx            # Left navigation bar with category filters
│   │   └── SidebarItem.tsx        # Individual sidebar item with icons & states
│   ├── icons/              # SVG icon components (Twitter, YouTube, Brain, etc.)
│   ├── pages/              # Application views
│   │   ├── Dashboard.tsx          # Main dashboard view
│   │   ├── Signin.tsx             # User login page
│   │   └── Signup.tsx             # User registration page
│   ├── App.tsx             # Route definitions
│   ├── config.tsx          # API endpoint configurations
│   ├── main.tsx            # Application entry point
│   └── App.css             # Global styling
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration with React Compiler plugin
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** or **yarn** / **pnpm**
- **Brainly Backend**: Running instance of the [Brainly Backend Server](https://github.com/Mohammed-Taha-Zubair/Brainly) (default: `http://localhost:3000`)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Mohammed-Taha-Zubair/brainly-fe.git
   cd brainly-fe
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Backend URL**:
   Ensure `src/config.tsx` points to your backend instance:
   ```typescript
   export const BACKEND_URL = "http://localhost:3000";
   ```

### Running Locally

Start the Vite development server:
```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

Compile TypeScript and build the optimized production bundle:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

---

## 📡 API Endpoints Used

The frontend connects with the backend via the following REST endpoints:

| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `POST` | `/api/v1/signup` | Register a new user | ❌ |
| `POST` | `/api/v1/signin` | Sign in user & receive JWT token | ❌ |
| `GET` | `/api/v1/content` | Fetch user's saved items | ✅ |
| `POST` | `/api/v1/content` | Save a new content item | ✅ |
| `DELETE` | `/api/v1/content` | Delete a content item | ✅ |
| `POST` | `/api/v1/brain/share` | Generate or toggle public shareable link | ✅ |
| `GET` | `/api/v1/brain/:shareLink` | View shared brain content publicly | ❌ |

---

## 🤝 Related Repository

- **Backend (Node.js / Express / MongoDB)**: [Mohammed-Taha-Zubair/Brainly](https://github.com/Mohammed-Taha-Zubair/Brainly)

---

## 👤 Author

**Mohammed Taha Zubair**
- GitHub: [@Mohammed-Taha-Zubair](https://github.com/Mohammed-Taha-Zubair)

---

## 📄 License

This project is licensed under the MIT License.
