import React, { useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Filter,
  Search,
  Calendar,
  User,
  MessageCircle,
  AlertTriangle,
  Info,
  CheckCircle,
  Clock,
  Settings,
} from "lucide-react";

const Notifications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "task_assigned",
      title: "New Task Assigned",
      message: 'You have been assigned to "Design new user interface"',
      timestamp: "2025-01-15T10:30:00Z",
      isRead: false,
      priority: "high",
      relatedUser: { name: "Sarah Wilson", initials: "SW" },
    },
    {
      id: "2",
      type: "deadline_approaching",
      title: "Deadline Approaching",
      message: 'Task "Implement authentication" is due in 2 days',
      timestamp: "2025-01-15T09:15:00Z",
      isRead: false,
      priority: "medium",
    },
    {
      id: "3",
      type: "comment_added",
      title: "New Comment",
      message: 'Mike Chen commented on "Write unit tests"',
      timestamp: "2025-01-15T08:45:00Z",
      isRead: true,
      priority: "low",
      relatedUser: { name: "Mike Chen", initials: "MC" },
    },
    {
      id: "4",
      type: "task_completed",
      title: "Task Completed",
      message: 'Emma Davis completed "Set up CI/CD pipeline"',
      timestamp: "2025-01-14T16:20:00Z",
      isRead: true,
      priority: "low",
      relatedUser: { name: "Emma Davis", initials: "ED" },
    },
    {
      id: "5",
      type: "project_update",
      title: "Project Update",
      message: "Web Application Redesign project has been updated",
      timestamp: "2025-01-14T14:10:00Z",
      isRead: false,
      priority: "medium",
    },
    {
      id: "6",
      type: "system",
      title: "System Maintenance",
      message: "Scheduled maintenance will occur tonight from 2-4 AM EST",
      timestamp: "2025-01-14T12:00:00Z",
      isRead: true,
      priority: "low",
    },
  ]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "task_assigned":
        return <User className="w-5 h-5 text-blue-500" />;
      case "task_completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "deadline_approaching":
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case "comment_added":
        return <MessageCircle className="w-5 h-5 text-purple-500" />;
      case "project_update":
        return <Info className="w-5 h-5 text-indigo-500" />;
      case "system":
        return <Settings className="w-5 h-5 text-gray-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-orange-500";
      case "low":
        return "border-l-green-500";
      default:
        return "border-l-gray-500";
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor(
      (now.getTime() - time.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return time.toLocaleDateString();
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const filteredNotifications = notifications.filter((notif) => {
    const matchesSearch =
      notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterType === "unread") return !notif.isRead && matchesSearch;
    if (filterType === "read") return notif.isRead && matchesSearch;
    return matchesSearch;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Notifications
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Stay updated with your project activities
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={markAllAsRead}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <CheckCheck className="w-4 h-4" />
              <span>Mark All Read</span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Notifications</option>
              <option value="unread">Unread ({unreadCount})</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white dark:bg-gray-800 rounded-xl p-6 border-l-4 ${getPriorityColor(
              notification.priority
            )} border-r border-t border-b border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 ${
              !notification.isRead ? "bg-blue-50 dark:bg-blue-900/10" : ""
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3
                      className={`font-semibold ${
                        !notification.isRead
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {notification.title}
                    </h3>
                    {!notification.isRead && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    )}
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                    {notification.message}
                  </p>

                  <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatTimeAgo(notification.timestamp)}</span>
                    </div>

                    {notification.relatedUser && (
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-medium">
                            {notification.relatedUser.initials}
                          </span>
                        </div>
                        <span>{notification.relatedUser.name}</span>
                      </div>
                    )}

                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        notification.priority === "high"
                          ? "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                          : notification.priority === "medium"
                          ? "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400"
                          : "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                      }`}
                    >
                      {notification.priority}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                {!notification.isRead && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="Mark as read"
                  >
                    <Check className="w-4 h-4 text-gray-500" />
                  </button>
                )}

                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                  title="Delete notification"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {searchTerm ? "No matching notifications" : "All caught up!"}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchTerm
              ? "Try adjusting your search terms"
              : "You have no new notifications at this time"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Notifications;
