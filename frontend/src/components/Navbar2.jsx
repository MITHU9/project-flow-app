import { useEffect, useState } from "react";
import { Moon, Sun, Search, Bell, Settings, X } from "lucide-react";
import { useLogout } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTaskSocket } from "../hooks/useTaskSocket";

const Navbar2 = () => {
  const { isDark, toggleTheme, user } = useAuthContext();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const logout = useLogout();
  const navigate = useNavigate();

  // Load notifications from localStorage initially
  const storedNotifications =
    JSON.parse(localStorage.getItem("notifications")) || [];
  const [notifications, setNotifications] = useState(storedNotifications);
  const [unreadCount, setUnreadCount] = useState(
    storedNotifications.filter((n) => !n.read).length
  );

  // Setup socket to listen for assigned tasks
  useTaskSocket(user?._id, setNotifications, setUnreadCount);

  const handleLogout = () => {
    logout.mutate(null, {
      onSuccess: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      alert(`Searching for: "${searchTerm}"`);
    }
  };

  // Update localStorage whenever notifications change
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  const handleBellClick = () => {
    setIsNotificationOpen(!isNotificationOpen);

    // Mark all as read when bell is opened
    const updatedNotifications = notifications.map((n) => ({
      ...n,
      read: true,
    }));
    setNotifications(updatedNotifications);
    setUnreadCount(0);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  // console.log("Notifications:", notifications, setNotifications);
  // console.log("Unread Count:", unreadCount);
  // console.log("User:", user);

  return (
    <nav className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 flex items-center justify-between">
      {/* Left: Search */}
      <div className="flex items-center space-x-4">
        <form onSubmit={handleSearch} className="relative">
          <Search className="h-5 w-5 text-gray-300 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tasks, projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border text-gray-200 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-64"
          />
        </form>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center space-x-4 relative">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? (
            <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          )}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={handleBellClick}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
          >
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
              {notifications.length === 0 && (
                <p className="p-4 text-gray-500 dark:text-gray-300 text-sm">
                  No notifications
                </p>
              )}
              {notifications.map((n, index) => (
                <div
                  key={index}
                  className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 flex justify-between items-start cursor-pointer"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {n.message}
                    </p>
                    <p className="text-gray-500 dark:text-gray-300 text-sm">
                      Task: {n.task.title}
                    </p>
                    <p className="text-gray-400 dark:text-gray-400 text-xs">
                      Deadline:{new Date(n.task.deadline).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent marking as read when clicking X
                      const updatedNotifications = notifications.filter(
                        (_, i) => i !== index
                      );
                      setNotifications(updatedNotifications);
                      setUnreadCount(
                        updatedNotifications.filter((n) => !n.read).length
                      );
                      localStorage.setItem(
                        "notifications",
                        JSON.stringify(updatedNotifications)
                      );
                    }}
                    className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <X className="h-4 w-4 text-gray-500 dark:text-gray-300 cursor-pointer" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Settings */}
        <button
          onClick={() => navigate("/settings")}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Settings className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            {user ? user.name[0] : "GU"}
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <p className="font-medium text-gray-900 dark:text-white">
                  {user ? user.name : "Guest User"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user ? user.email : "guest@example.com"}
                </p>
              </div>
              <div className="py-1">
                <button
                  onClick={() => alert("View Profile")}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  View Profile
                </button>
                <button
                  onClick={() => navigate("/settings")}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Account Settings
                </button>
                <hr className="my-1 border-gray-200 dark:border-gray-700" />
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;
