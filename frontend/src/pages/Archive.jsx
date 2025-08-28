import React, { useState } from "react";
import {
  Archive,
  Search,
  Filter,
  RotateCcw,
  Trash2,
  Calendar,
  User,
  Tag,
  Clock,
  FolderOpen,
  CheckCircle,
} from "lucide-react";
import { tasks, projects } from "../data/dummyData";

const ArchivePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  // Mock archived data
  const archivedTasks = tasks
    .filter((task) => task.status === "done")
    .slice(0, 8);
  const archivedProjects = projects.slice(1);

  const handleRestore = (id) => {
    console.log(`Restoring item:`, id);
    // In a real app, this would restore the item
  };

  const handlePermanentDelete = (id) => {
    console.log(`Permanently deleting item:`, id);
    // In a real app, this would permanently delete the item
  };

  const filteredItems = () => {
    let items = [];

    if (filterType === "all" || filterType === "tasks") {
      items = [
        ...items,
        ...archivedTasks.map((task) => ({ ...task, type: "task" })),
      ];
    }

    if (filterType === "all" || filterType === "projects") {
      items = [
        ...items,
        ...archivedProjects.map((project) => ({ ...project, type: "project" })),
      ];
    }

    if (searchTerm) {
      items = items.filter((item) =>
        (item.title || item.name)
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    return items.sort((a, b) => {
      if (sortBy === "date") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (sortBy === "name") {
        return (a.title || a.name).localeCompare(b.title || b.name);
      } else {
        return a.type.localeCompare(b.type);
      }
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <Archive className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Archive
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your archived projects and completed tasks
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <FolderOpen className="w-4 h-4" />
              <span>Browse All</span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search archived items..."
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
              <option value="all">All Items</option>
              <option value="tasks">Tasks Only</option>
              <option value="projects">Projects Only</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="type">Sort by Type</option>
            </select>

            <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Archived Tasks
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {archivedTasks.length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Archived Projects
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {archivedProjects.length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-500">
                <FolderOpen className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Storage Used
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  2.4 GB
                </p>
              </div>
              <div className="p-3 rounded-lg bg-orange-500">
                <Archive className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Archive Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems().map((item) => (
          <div
            key={`${item.type}-${item.id}`}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-lg ${
                    item.type === "task"
                      ? "bg-blue-100 dark:bg-blue-900/20"
                      : "bg-purple-100 dark:bg-purple-900/20"
                  }`}
                >
                  {item.type === "task" ? (
                    <CheckCircle
                      className={`w-5 h-5 ${
                        item.type === "task"
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-purple-600 dark:text-purple-400"
                      }`}
                    />
                  ) : (
                    <FolderOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {item.title || item.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                    {item.type}
                  </p>
                </div>
              </div>

              <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full text-xs font-medium">
                Archived
              </span>
            </div>

            {item.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {item.description}
              </p>
            )}

            {item.type === "task" && (
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{item.assignedUser.name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(item.deadline)}</span>
                  </div>
                </div>

                {item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded text-xs">
                        +{item.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="w-3 h-3" />
                <span>Archived {formatDate(item.createdAt)}</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleRestore(item.id)}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/40 transition-colors text-sm"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restore</span>
                </button>
                <button
                  onClick={() => handlePermanentDelete(item.id)}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors text-sm"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems().length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Archive className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No archived items
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Completed tasks and archived projects will appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default ArchivePage;
