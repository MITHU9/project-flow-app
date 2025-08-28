import React, { useState } from "react";
import {
  Users,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  MessageCircle,
  UserPlus,
  Settings,
  Star,
  Archive,
  Trash2,
  Edit3,
  Eye,
} from "lucide-react";
import { users, tasks } from "../data/dummyData";

const Team = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedUser, setSelectedUser] = useState(null);

  const getUserStats = (userId) => {
    const userTasks = tasks.filter((task) => task.assignedUser.id === userId);
    const completedTasks = userTasks.filter(
      (task) => task.status === "done"
    ).length;
    const inProgressTasks = userTasks.filter(
      (task) => task.status === "progress"
    ).length;

    return {
      totalTasks: userTasks.length,
      completedTasks,
      inProgressTasks,
      completionRate:
        userTasks.length > 0
          ? Math.round((completedTasks / userTasks.length) * 100)
          : 0,
    };
  };

  const handleUserAction = (action, userId) => {
    console.log(`${action} user:`, userId);
    // In a real app, these would perform actual operations
  };

  const handleInviteUser = () => {
    console.log("Opening invite user modal");
    // In a real app, this would open an invite modal
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedFilter === "active") {
      const stats = getUserStats(user.id);
      return matchesSearch && stats.inProgressTasks > 0;
    }
    if (selectedFilter === "inactive") {
      const stats = getUserStats(user.id);
      return matchesSearch && stats.inProgressTasks === 0;
    }
    return matchesSearch;
  });

  const totalCompletedTasks = users.reduce((acc, user) => {
    const stats = getUserStats(user.id);
    return acc + stats.completedTasks;
  }, 0);

  const avgCompletionRate = Math.round(
    users.reduce((acc, user) => {
      const stats = getUserStats(user.id);
      return acc + stats.completionRate;
    }, 0) / users.length
  );

  return (
    <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Team
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your team members and track their performance
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "list"
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                List
              </button>
            </div>

            <button
              onClick={handleInviteUser}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span>Invite Member</span>
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-3">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Members</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Total Members
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {users.length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-500">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Active Projects
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                3
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-500">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Avg. Completion
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {avgCompletionRate}%
              </p>
            </div>
            <div className="p-3 rounded-lg bg-purple-500">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Tasks Completed
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {totalCompletedTasks}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400">
                +12% from last month
              </p>
            </div>
            <div className="p-3 rounded-lg bg-orange-500">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Team Members */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => {
            const stats = getUserStats(user.id);

            return (
              <div
                key={user.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {user.initials}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {user.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="relative group">
                    <button className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-gray-500" />
                    </button>

                    <div className="absolute right-0 top-8 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                      <div className="py-1">
                        <button
                          onClick={() =>
                            handleUserAction("view-profile", user.id)
                          }
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center space-x-2"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View Profile</span>
                        </button>
                        <button
                          onClick={() =>
                            handleUserAction("send-message", user.id)
                          }
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center space-x-2"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Send Message</span>
                        </button>
                        <button
                          onClick={() =>
                            handleUserAction("assign-task", user.id)
                          }
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center space-x-2"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Assign Task</span>
                        </button>
                        <hr className="my-1 border-gray-200 dark:border-gray-600" />
                        <button
                          onClick={() => handleUserAction("edit", user.id)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center space-x-2"
                        >
                          <Edit3 className="w-4 h-4" />
                          <span>Edit User</span>
                        </button>
                        <button
                          onClick={() => handleUserAction("archive", user.id)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center space-x-2"
                        >
                          <Archive className="w-4 h-4" />
                          <span>Archive User</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Phone className="w-4 h-4" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>New York, NY</span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center space-x-2 mb-4">
                  <button
                    onClick={() => handleUserAction("message", user.id)}
                    className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors text-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Message</span>
                  </button>
                  <button
                    onClick={() => handleUserAction("assign", user.id)}
                    className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Assign</span>
                  </button>
                </div>

                {/* Stats */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="grid grid-cols-3 gap-4 text-center mb-3">
                    <div>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {stats.totalTasks}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Total Tasks
                      </p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">
                        {stats.completedTasks}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Completed
                      </p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {stats.completionRate}%
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Success Rate
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{stats.completionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${stats.completionRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 dark:bg-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600">
            <div className="col-span-4">Member</div>
            <div className="col-span-2">Tasks</div>
            <div className="col-span-2">Completed</div>
            <div className="col-span-2">Success Rate</div>
            <div className="col-span-2">Actions</div>
          </div>

          {filteredUsers.map((user) => {
            const stats = getUserStats(user.id);

            return (
              <div
                key={user.id}
                className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="col-span-4 flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {user.initials}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="col-span-2 flex items-center">
                  <span className="text-gray-900 dark:text-white font-medium">
                    {stats.totalTasks}
                  </span>
                </div>

                <div className="col-span-2 flex items-center">
                  <span className="text-green-600 dark:text-green-400 font-medium">
                    {stats.completedTasks}
                  </span>
                </div>

                <div className="col-span-2 flex items-center">
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                      {stats.completionRate}%
                    </span>
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                        style={{ width: `${stats.completionRate}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-2 flex items-center space-x-2">
                  <button
                    onClick={() => handleUserAction("view", user.id)}
                    className="p-1.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors"
                    title="View profile"
                  >
                    <Eye className="w-4 h-4 text-blue-500" />
                  </button>
                  <button
                    onClick={() => handleUserAction("message", user.id)}
                    className="p-1.5 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors"
                    title="Send message"
                  >
                    <MessageCircle className="w-4 h-4 text-green-500" />
                  </button>
                  <button
                    onClick={() => handleUserAction("edit", user.id)}
                    className="p-1.5 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors"
                    title="Edit user"
                  >
                    <Edit3 className="w-4 h-4 text-purple-500" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No team members found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchTerm
              ? "Try adjusting your search terms"
              : "Start by inviting your first team member"}
          </p>
          <button
            onClick={handleInviteUser}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mx-auto"
          >
            <UserPlus className="w-4 h-4" />
            <span>Invite Team Member</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Team;
