<div align="center">

# 🎓 Education App — LMS Platform

### A full-stack Learning Management System where instructors create courses and students learn, track progress, and pay securely.

**🔗 [Live Demo](https://education-app-bay.vercel.app/)**


<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&duration=3000&pause=1000&color=00C4CC&center=true&vCenter=true&width=560&lines=Course+Creation+%26+Video+Lectures;Student+Progress+Tracking;Secure+Payments+with+Stripe;AI-Assisted+Learning+Tools" alt="Typing SVG" />

<p>
  <a href="https://education-app-bay.vercel.app/">
    <img src="https://img.shields.io/badge/Live%20Demo-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo"/>
  </a>
</p>

<p>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white" />
</p>

<p>
  <img src="https://img.shields.io/github/last-commit/sahaj9897/education-app?style=flat-square" />
  <img src="https://img.shields.io/github/languages/top/sahaj9897/education-app?style=flat-square" />
  <img src="https://img.shields.io/github/stars/sahaj9897/education-app?style=flat-square" />
  <img src="https://img.shields.io/github/license/sahaj9897/education-app?style=flat-square" />
</p>

</div>

---

## 📖 About

**Education App** is a full-stack LMS (Learning Management System) that connects instructors and students. Instructors can create and publish courses with video lectures, while students can browse, purchase, and learn at their own pace — with progress tracking built in throughout.

---

## ✨ Features

- 🔐 **Authentication** — Secure signup/login with JWT & cookie-based sessions
- 👨‍🏫 **Admin/Instructor Dashboard** — Create, edit, and manage courses and lectures
- 👨‍🎓 **Student Dashboard** — Browse courses, enroll, and track learning progress
- 🎥 **Video Lectures** — Stream course content with an integrated video player
- 📊 **Progress Tracking** — Course progress persisted per student
- 💳 **Course Purchases** — Secure checkout and payments powered by **Stripe**
- ☁️ **Media Uploads** — Course thumbnails/videos handled via **Cloudinary**
- 🤖 **AI-Assisted Features** — Integrated with **Google Gemini (GenAI)** for smart content assistance
- 🎬➡️📝 **Video → Audio → Notes Pipeline** — Automatically extracts audio from lecture videos, transcribes it using **Gladia** (speech-to-text), and generates clean, structured study notes with **Google Gemini**
- 🌗 **Dark Mode** — Full light/dark theme support
- 📱 **Responsive UI** — Built with Tailwind CSS & Radix UI / shadcn-style components

---

## 🎬 Video → Audio → Notes Pipeline

One of the standout features: turning lecture videos into ready-to-study notes, automatically.

```
Lecture Video ──▶ Extract Audio ──▶ Gladia (Speech-to-Text) ──▶ Gemini (Summarize & Structure) ──▶ Study Notes
```

1. **Extract** — Audio is extracted from the uploaded lecture video
2. **Transcribe** — The audio is sent to **Gladia** for accurate speech-to-text transcription
3. **Summarize** — The raw transcript is passed to **Google Gemini**, which structures it into clean, readable notes (headings, key points, summaries)
4. **Deliver** — Notes are attached to the corresponding lecture for students to read alongside the video

---

## 🛠️ Tech Stack

<div align="center">

### Frontend (`/LMS`)
<img src="https://skillicons.dev/icons?i=react,vite,tailwind,redux,javascript" alt="frontend stack" />

`React 18` • `Vite` • `Redux Toolkit` • `React Router v7` • `Tailwind CSS v4` • `Radix UI` • `React Quill` • `React Player` • `Recharts` • `Axios`

### Backend (`/server`)
<img src="https://skillicons.dev/icons?i=nodejs,express,mongodb,javascript" alt="backend stack" />

`Node.js` • `Express` • `MongoDB + Mongoose` • `JWT` • `bcrypt.js` • `Multer` • `Cloudinary` • `Stripe` • `Google GenAI SDK` • `Gladia (Speech-to-Text)`

### AI / Notes Pipeline
![Gladia](https://img.shields.io/badge/Gladia-Speech--to--Text-FF5A5F?style=for-the-badge)
![Gemini](https://img.shields.io/badge/Google_Gemini-AI_Notes-8E75B2?style=for-the-badge&logo=google-gemini&logoColor=white)

</div>

---

## 📂 Project Structure

```
education-app/
├── LMS/                    # Frontend (React + Vite)
│   ├── src/
│   │   ├── app/            # Redux store setup
│   │   ├── components/     # Reusable UI components
│   │   ├── features/       # Feature-based slices/logic
│   │   ├── layout/         # App layout & navigation
│   │   ├── pages/
│   │   │   ├── admin/      # Instructor/admin views
│   │   │   ├── student/    # Student-facing views
│   │   │   └── Login.jsx
│   │   └── lib/
│   └── package.json
│
├── server/                 # Backend (Node.js + Express)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   │   ├── course.route.js
│   │   ├── courseProgress.route.js
│   │   ├── media.route.js
│   │   ├── purchaseCourse.route.js
│   │   └── user.routes.js
│   ├── middlewares/
│   ├── database/
│   ├── utils/
│   └── index.js
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Cloudinary account (media storage)
- Stripe account (payments)
- Google Gemini API key (AI features)

### 1. Clone the repository
```bash
git clone https://github.com/sahaj9897/education-app.git
cd education-app
```

### 2. Setup the backend
```bash
cd server
npm install
```

Create a `.env` file inside `server/`:
```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
GOOGLE_GENAI_API_KEY=your_gemini_api_key
GLADIA_API_KEY=your_gladia_api_key
```

Run the backend:
```bash
npm run dev
```

### 3. Setup the frontend
```bash
cd ../LMS
npm install
npm run dev
```

The app should now be running locally — frontend on Vite's dev server and backend on the port set in `.env`.

---

---

## 🌐 Deployment

The frontend is live and deployed on **Vercel**:

**🔗 [https://education-app-bay.vercel.app/](https://education-app-bay.vercel.app/)**

---

## 🗺️ Roadmap

- [ ] Course reviews & ratings
- [ ] Quizzes & assessments
- [ ] Certificate generation on course completion
- [ ] Discussion forums per course
- [ ] Notification system

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is currently unlicensed. Feel free to open an issue if you'd like a license added.

---

<div align="center">

 

</div>
