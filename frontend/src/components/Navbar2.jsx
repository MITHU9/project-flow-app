import { useState } from "react";
import { Moon, Sun, Search, Bell, Settings } from "lucide-react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar2 = () => {
  const { isDark, toggleTheme, user } = useAuthContext();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const logout = useLogout();

  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      title: "Task assigned",
      message: "You have been assigned to a new task",
      time: "5m ago",
      unread: true,
    },
    {
      id: 2,
      title: "Deadline approaching",
      message: "Task due in 2 hours",
      time: "1h ago",
      unread: true,
    },
    {
      id: 3,
      title: "Comment added",
      message: "New comment on your task",
      time: "2h ago",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleLogout = () => {
    logout.mutate(null, {
      onSuccess: () => {
        toast.success("Logged out!");
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

  //console.log(user);

  return (
    <nav className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 flex items-center justify-between">
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

      <div className="flex items-center space-x-4">
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

        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
          <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        <button
          onClick={() => (window.location.href = "/settings")}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Settings className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>

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
                  onClick={() =>
                    alert("View Profile functionality would show user profile")
                  }
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700"
                >
                  View Profile
                </button>
                <button
                  onClick={() => (window.location.href = "/settings")}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700"
                >
                  Account Settings
                </button>
                <hr className="my-1 border-gray-200 dark:border-gray-700" />
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700"
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
