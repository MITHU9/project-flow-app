import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ToastProvider from "./components/ToastProvider";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./layout/Layout";
import KanbanPage from "./pages/KanbanPage";
import Dashboard from "./pages/Dashboard";
import Team from "./pages/Team";
import ArchivePage from "./pages/Archive";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastProvider />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              {/* Optional project route */}
              <Route path="project/:id" element={<KanbanPage />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="team" element={<Team />} />
              <Route path="archive" element={<ArchivePage />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="settings" element={<Settings />} />

              <Route
                path="project"
                element={
                  <div className="flex items-center justify-center h-full text-gray-400 text-xl">
                    Please select a project or create a new one.
                  </div>
                }
              />
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
