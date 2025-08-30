import React from "react";
import { Calendar, MessageCircle, Paperclip } from "lucide-react";
import { useAuthContext } from "../hooks/useAuthContext";

const TaskCard = ({ task }) => {
  const { user } = useAuthContext();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  const isOverdue =
    new Date(task.deadline) < new Date() && task.status !== "done";
  const completedPoints = task.subTasks.filter((t) => t.completed).length;
  const totalPoints = task.subTasks.length;

  //console.log(totalPoints, completedPoints, task);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 cursor-pointer">
      <div className="space-y-3">
        {/* Title & Priority */}
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-gray-900 dark:text-white text-sm leading-5">
            {task.title}
          </h3>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
              task.priority
            )}`}
          >
            {task.priority}
          </span>
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Subtasks / Progress */}
        {totalPoints > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Progress ({completedPoints}/{totalPoints})
              </span>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {Math.round((completedPoints / totalPoints) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedPoints / totalPoints) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Tags */}
        {task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {task.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded text-xs"
              >
                {tag}
              </span>
            ))}
            {task.tags.length > 2 && (
              <span className="px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded text-xs">
                +{task.tags.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Comments & Attachments */}
        {(task.comments.length > 0 || task.attachment) && (
          <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
            {task.comments.length > 0 && (
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-3 h-3" />
                <span>{task.comments.length}</span>
              </div>
            )}
            {task.attachment && (
              <div className="flex items-center space-x-1">
                <Paperclip className="w-3 h-3" />
                <span>1</span>
              </div>
            )}
          </div>
        )}

        {/* Footer: Assigned user & Deadline */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center relative">
              <span className="text-white text-xs font-medium">
                {task.assignedUser.name[0].toUpperCase()}
              </span>

              {/* ✅ Small indicator dot if assigned to current user */}
              {task.assignedUser.email === user.email && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
              )}
            </div>

            <span className="text-xs text-gray-500 dark:text-gray-400">
              {task?.assignedUser?.name.split(" ")[0]}
            </span>

            {/* ✅ Text badge if assigned to current user */}
            {task.assignedUser.email === user.email && (
              <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400 rounded-full">
                You
              </span>
            )}
          </div>

          <div
            className={`flex items-center space-x-1 text-xs ${
              isOverdue ? "text-red-500" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <Calendar className="w-3 h-3" />
            <span>{formatDate(task.deadline)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
