import { NavLink } from "react-router-dom";
import {
  FolderOpen,
  BarChart3,
  ChevronLeft,
  Plus,
  Users,
  Settings,
  Bell,
  Archive,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import CreateProjectModal from "./CreateProjectModal";
import { useCreateProject } from "../hooks/useCreateProject";
import toast from "react-hot-toast";
import { useProjects } from "../hooks/useProjects";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDeleteProject } from "../hooks/useDeleteProject";
import { queryClient } from "../utils/queryClient";

const Sidebar = ({ isCollapsed, onToggle }) => {
  const [open, setOpen] = useState(false);
  const createProject = useCreateProject();
  const deleteProject = useDeleteProject();
  const { user, notifications } = useAuthContext();
  const { data: projects = [], isLoading, isError } = useProjects(user._id);

  const handleCreateProject = (projectData) => {
    createProject.mutate(projectData, {
      onSuccess: () => {
        setOpen(false);
        toast.success("Project created successfully!");
      },
      onError: (err) => {
        console.error(
          "Error creating project:",
          err.response?.data || err.message
        );
      },
    });
  };

  if (isLoading) {
    return (
      <div
        className={`${
          isCollapsed ? "w-16" : "w-64"
        } h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col fixed left-0 top-0 z-40 lg:relative lg:z-auto`}
      >
        <div className="h-16 flex items-center justify-center px-4 border-b border-gray-200 dark:border-gray-700">
          <span className="text-gray-500">Loading...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className={`${
          isCollapsed ? "w-16" : "w-64"
        } h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col fixed left-0 top-0 z-40 lg:relative lg:z-auto`}
      >
        <div className="h-16 flex items-center justify-center px-4 border-b border-gray-200 dark:border-gray-700">
          <span className="text-red-500">Error loading projects</span>
        </div>
      </div>
    );
  }

  //console.log(projects);

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
            to="/project"
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
            to="/archive"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`
            }
          >
            <Archive className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium">Archive</span>}
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
                onClick={() => setOpen(true)}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Plus className="h-4 w-4 text-gray-400" />
              </button>
            </div>
            <div className="space-y-1">
              {[
                ...projects,
                ...notifications
                  .filter((n) => n.projectName && n.task?.projectId)
                  .map((n) => ({
                    _id: n.task.projectId,
                    name: n.projectName,
                    color: "#3B82F6",
                    fromNotification: true,
                  })),
              ]
                // remove duplicate projects by _id
                .filter(
                  (proj, index, self) =>
                    index === self.findIndex((p) => p._id === proj._id)
                )
                .map((project) => (
                  <div key={project._id}>
                    <NavLink
                      to={`/project/${project._id}`}
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
                        style={{ backgroundColor: project.color || "#3B82F6" }}
                      />
                      <div className="flex justify-between items-center w-full">
                        <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
                          {project.name}
                          {project.fromNotification && (
                            <span className="ml-2 text-xs text-blue-500">
                              (new)
                            </span>
                          )}
                        </p>
                        {!project.fromNotification &&
                          project.createdBy?.toString() ===
                            user._id.toString() && (
                            <button
                              onClick={() =>
                                deleteProject.mutate(project._id, {
                                  onSuccess: () => {
                                    toast.success(
                                      "Project deleted successfully!"
                                    );
                                    queryClient.invalidateQueries({
                                      queryKey: ["projects", project._id],
                                    });
                                  },
                                  onError: (err) => {
                                    toast.error("Failed to delete project");
                                    console.error(err);
                                  },
                                })
                              }
                              className="p-1 rounded cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </button>
                          )}
                      </div>
                    </NavLink>
                  </div>
                ))}
            </div>
          </div>
        )}
      </nav>
      {/* Modal */}
      <CreateProjectModal
        open={open}
        onClose={() => setOpen(false)}
        onCreate={handleCreateProject}
      />
    </div>
  );
};

export default Sidebar;
