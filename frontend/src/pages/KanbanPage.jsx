import { Filter, Plus, Search, Users } from "lucide-react";
import KanbanBoard from "../components/KanbanBoard";
import { useProject } from "../hooks/useProjectById";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const KanbanPage = () => {
  const { id } = useParams();
  const { data: project, isLoading, isError } = useProject(id);
  const { user } = useAuthContext();

  if (!id) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-xl">
        Please select a project
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-xl">
        Loading project...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-xl">
        Error loading project.
      </div>
    );
  }

  //console.log(user);

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200">
      {/* Header */}
      <div className="mb-6 p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-200">
              {project?.name || "Project Name"}
            </h1>
            <p className="text-gray-400 mt-1">
              {project?.description || "Project Description"}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </button>

            <button className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
              <Users className="w-4 h-4 mr-2" />
              Invite Team
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button className="relative flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filter
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"></span>
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <KanbanBoard
        boards={project?.boards || []}
        id={id}
        currentUserId={user?._id}
      />
    </div>
  );
};

export default KanbanPage;
