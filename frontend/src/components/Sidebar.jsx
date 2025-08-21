import { NavLink } from "react-router-dom";
import {
  FolderOpen,
  BarChart3,
  ChevronLeft,
  Plus,
  Calendar,
  Users,
  Settings,
  Bell,
  Archive,
} from "lucide-react";
import { projects } from "../data/dummyData";

const Sidebar = ({ isCollapsed, onToggle }) => {
  return (
    <div
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col fixed left-0 top-0 z-40 lg:relative lg:z-auto`}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            ProjectFlow
          </h1>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ChevronLeft
            className={`h-5 w-5 text-gray-600 dark:text-gray-400 transition-transform ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          <NavLink
            to="/board"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`
            }
          >
            <FolderOpen className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium">Board</span>}
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`
            }
          >
            <BarChart3 className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium">Dashboard</span>}
          </NavLink>

          <NavLink
            to="/calendar"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`
            }
          >
            <Calendar className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium">Calendar</span>}
          </NavLink>

          <NavLink
            to="/team"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`
            }
          >
            <Users className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium">Team</span>}
          </NavLink>

          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`
            }
          >
            <Bell className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium">Notifications</span>}
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`
            }
          >
            <Settings className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium">Settings</span>}
          </NavLink>
        </div>

        {/* Projects Section */}
        {!isCollapsed && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Projects
              </h3>
              <button
                onClick={() =>
                  alert(
                    "Create new project functionality would open project creation modal"
                  )
                }
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Plus className="h-4 w-4 text-gray-400" />
              </button>
            </div>
            <div className="space-y-1">
              {projects.map((project) => (
                <NavLink
                  to={`/project/${project.id}`}
                  key={project.id}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                      isActive
                        ? "bg-gray-100 dark:bg-gray-800"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`
                  }
                >
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: project.color }}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                    {project.name}
                  </span>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
