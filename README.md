<h1 align="center">🚀 TaskFlow – Project Management Tool</h1>

<p align="center">
  <b>A full-stack Project Management Application</b> with Kanban boards, real-time collaboration, analytics, and hybrid database support (MongoDB + PostgreSQL).  
  Built with <b>React + Tailwind + TanStack Query (frontend)</b> and <b>Node.js + Express + MongoDB + PostgreSQL (backend)</b>.
</p>

---

<h2>✨ Features</h2>

<ul>
  <li>🔑 Authentication & Authorization (JWT, bcrypt)</li>
  <li>📁 Project & Boards (To Do, In Progress, Done)</li>
  <li>📌 Task Management (CRUD, assign users, deadlines, comments)</li>
  <li>🎯 Kanban Drag-and-Drop with Socket.IO</li>
  <li>📊 Analytics Dashboard (Tasks per user, completion rate, overdue tasks)</li>
  <li>📩 Notifications (Email reminders with NodeMailer)</li>
  <li>🎨 Modern UI (Tailwind, Shadcn, Dark/Light Mode)</li>
</ul>

---

<h2>🛠️ Tech Stack</h2>

<h3>Frontend</h3>
<ul>
  <li>⚛️ React 19 + Vite</li>
  <li>🎨 TailwindCSS + Shadcn UI</li>
  <li>📦 TanStack Query (data fetching)</li>
  <li>📝 React Hook Form + Yup validation</li>
  <li>🔥 React Hot Toast (notifications)</li>
  <li>📊 Recharts & Chart.js</li>
  <li>🧩 Socket.io-client</li>
  <li>🌍 React Router DOM</li>
</ul>

<h3>Backend</h3>
<ul>
  <li>🚀 Node.js + Express</li>
  <li>🍃 MongoDB (Mongoose ORM)</li>
  <li>🐘 PostgreSQL (pg)</li>
  <li>🔑 JWT Authentication</li>
  <li>🔄 Socket.IO</li>
  <li>📩 Nodemailer</li>
  <li>☁️ Cloudinary </li>
</ul>

---

<h2>📂 Project Structure</h2>

<pre>
taskflow/
├── backend/         # Node.js + Express + MongoDB + PostgreSQL
│   ├── config/      # DB connections, socket.io
│   ├── models/      # Mongoose schemas
│   ├── controllers/ # API logic
│   ├── routes/      # Express routes
│   ├── middleware/  # Auth middleware
│   ├── sql/         # PostgreSQL ETL + analytics
│   ├── utils/       # Helpers (email, uploads)
│   └── server.js
│
├── frontend/        # React + Tailwind + TanStack Query
│   ├── src/
│   │   ├── api/         # Axios + query hooks
│   │   ├── components/  # Reusable UI
│   │   ├── pages/       # Page views
│   │   ├── context/     # Auth & socket context
│   │   └── styles/      # Tailwind global styles
│   └── vite.config.js
│
└── README.md
</pre>

---

<h2>⚙️ Installation & Setup</h2>

<h3>1️⃣ Clone the repository</h3>

git https://github.com/MITHU9/project-flow-app.git
cd taskflow

<h2>📌 Backend Setup</h2> <h3>Step 1 – Install dependencies</h3>
cd backend
npm install
<h3>Step 3 – Run the backend</h3>
npm run backend
👉 Backend runs on: <code>http://localhost:3000
</code>
<h2>📌 Frontend Setup</h2> <h3>Step 1 – Install dependencies</h3>
cd frontend
npm install
<h3>Step 3 – Run the frontend</h3>
npm run dev

<h2>📸 Screenshots</h2> <ul> <li>🔐 Authentication Pages (Login/Register)</li> <li>📝 Kanban Board with drag & drop</li> <li>📊 Analytics Dashboard (charts & reports)</li> </ul>

<h2>🚀 Deployment</h2> <ul> <li><b>Frontend</b> → Vercel / Netlify</li> <li><b>Backend</b> → Render / Railway / AWS</li> <li><b>MongoDB</b> → MongoDB Atlas</li> <li><b>PostgreSQL</b> → Neon</li> </ul>
<h2>👨‍💻 Author</h2> <p> <b>Shahariar Mithu</b><br/> <a href="https://github.com/MITHU9">GitHub</a> | <a href="https://www.linkedin.com/in/shahariar-mithu/">LinkedIn</a> </p>
