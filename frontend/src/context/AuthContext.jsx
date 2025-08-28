import { createContext } from "react";
import { useMe } from "../hooks/useAuth";
import { useState } from "react";
import { useEffect } from "react";

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

  const toggleTheme = () => setIsDark(!isDark);

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
