import { createContext } from "react";
import { useMe } from "../hooks/useAuth";
import { useState } from "react";
import { useEffect } from "react";
import socket from "../utils/socket";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data: user, isLoading } = useMe();

  // Load notifications from localStorage initially
  const storedNotifications =
    JSON.parse(localStorage.getItem("notifications")) || [];
  const [notifications, setNotifications] = useState(storedNotifications);
  const [unreadCount, setUnreadCount] = useState(
    storedNotifications.filter((n) => !n.read).length
  );

  // Theme state
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // 🔹 Listen for notifications
  useEffect(() => {
    if (!user) return;

    socket.emit("joinRoom", user._id);

    socket.on("notification:new", (notification) => {
      setNotifications((prev) => {
        const updated = [notification, ...prev];
        localStorage.setItem("notifications", JSON.stringify(updated));
        return updated;
      });
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      socket.off("notification:new");
    };
  }, [user]);

  const toggleTheme = () => setIsDark(!isDark);

  console.log("Notifications:", notifications);
  console.log("Unread Count:", unreadCount);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isDark,
        toggleTheme,
        notifications,
        setNotifications,
        unreadCount,
        setUnreadCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
