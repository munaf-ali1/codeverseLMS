# 🚀 CodeVerse – Full Stack Learning Management System (LMS)

CodeVerse is a **modern, full-stack Learning Management System** inspired by real-world platforms like **Coursera, LeetCode, and HackerRank**.
It provides **course learning, MCQ-based testing, and DSA practice with a C++ code judge**, all in one unified platform.

Built with **MERN Stack + AI-ready architecture**, CodeVerse focuses on **scalability, performance tracking, and real user learning workflows**.

---

## 🌟 Key Highlights

* 🔐 Role-based authentication (Student / Admin)
* 🎓 Course learning with lesson progress tracking
* 🧪 MCQ Test Engine with timer & analytics
* 💻 LeetCode-style DSA Practice (C++ Judge)
* 📊 Student Dashboard with performance insights
* 🧑‍💻 Admin Panel for full content management
* 🎨 Modern UI with Tailwind CSS & Framer Motion
* ⚡ Secure backend APIs with MongoDB & JWT

---

## 🏗️ Tech Stack

### Frontend

* **React.js (Vite)**
* **Tailwind CSS**
* **Framer Motion**
* **Redux Toolkit**
* **Axios**
* **Monaco Code Editor**

### Backend

* **Node.js**
* **Express.js**
* **MongoDB + Mongoose**
* **JWT Authentication**
* **Cookie-based sessions**
* **C++ Code Execution (Judge System)**

---

## 👥 User Roles & Features

### 👨‍🎓 Student Features

* Register / Login
* Enroll in courses
* Watch lessons & track completion
* Attempt MCQ tests with:

  * Timer
  * Auto-submit
  * Score & accuracy
* View:

  * Test history
  * Course progress
  * DSA solved / attempted stats
* Practice DSA problems with:

  * Topic-wise filtering
  * Search functionality
  * Sample & hidden test cases
  * Verdicts (Accepted / Wrong Answer)

---

### 👨‍💼 Admin Features

* Add & manage courses
* Add lessons with YouTube links
* Create MCQ questions by topic
* Configure tests
* Add DSA problems with:

  * Difficulty
  * Constraints
  * Starter C++ code
  * Multiple sample test cases
  * Hidden judge test cases
* Full content control

---

## 🧠 Core Modules

### 📚 Course Module

* Course enrollment
* Lesson-based learning
* Completion tracking
* Progress bar per course

---

### 🧪 Test Engine (MCQ)

* Topic-based tests
* Configurable:

  * Number of questions
  * Time duration
* Auto-submit on timeout
* Result evaluation
* Accuracy calculation
* Test history storage

---

### 💻 DSA Practice (LeetCode Style)

* Topic cards (Array, DP, Graph, etc.)
* Search problems by name
* Problem list with status:

  * Solved
  * Attempted
  * Unsolved
* Dedicated problem page:

  * Problem statement
  * Constraints
  * Sample input/output
  * C++ code editor
* Run code on sample test cases
* Submit code against hidden test cases
* Verdict system:

  * Accepted
  * Wrong Answer
  * Compilation Error (future-ready)

---

## 📊 Student Dashboard

* Enrolled courses count
* Lessons completed vs total
* Tests attempted
* Average accuracy
* Recent test results
* DSA progress summary

---

## 🔐 Authentication & Security

* JWT-based authentication
* HTTP-only cookies
* Protected routes (frontend & backend)
* Role-based access control
* Hidden test cases never exposed to frontend



## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/codeverse.git
cd codeverse
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create `.env`:

```env
PORT=8000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🚀 Future Enhancements

* 🔥 Multi-language judge (Java, Python)
* 📈 Leaderboards
* 🎯 Daily challenges
* 🤖 AI-powered hints & feedback
* 🧾 Certificates on course completion
* ☁️ Docker sandboxed code execution

---

## 🏆 Learning Outcomes

This project demonstrates:

* Real-world MERN architecture
* Complex backend logic
* Secure authentication systems
* Code execution engines
* Scalable data modeling
* Production-grade UI/UX

---

## 🙌 Acknowledgements

Inspired by platforms like:

* LeetCode
* Coursera
* HackerRank

---

## 📬 Contact

**Developer:** Munaf Ali
**Project:** CodeVerse – LMS
**Status:** Production-ready 🚀


