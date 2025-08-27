import { queryClient } from "../utils/queryClient";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { useTask, useToggleSubTask } from "../hooks/useTask";
import { useEffect, useState } from "react";
import { useTaskRealtime } from "../hooks/useTaskRealtime";

const TaskDetailsModal = ({ isOpen, onClose, taskId }) => {
  const [subTasks, setSubTasks] = useState([]);

  const { data: task, isLoading } = useTask(taskId);
  const toggleMutation = useToggleSubTask();

  // Load subtasks into state when task changes
  useEffect(() => {
    if (task?.subTasks) setSubTasks(task.subTasks);
  }, [task]);

  // 👇 Realtime updates update local state
  useTaskRealtime(taskId, (updatedSubTask) => {
    setSubTasks((prev) =>
      prev.map((s) => (s._id === updatedSubTask._id ? updatedSubTask : s))
    );
  });

  if (isLoading) return null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          queryClient.invalidateQueries({ queryKey: ["project"] });
          onClose();
        }
      }}
    >
      <DialogContent className="min-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 text-gray-200">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            {task?.title}
          </DialogTitle>
        </DialogHeader>

        {/* Description */}
        <p className="mb-3 text-gray-300">{task?.description}</p>

        {/* Task meta */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
          <p>
            <span className="font-semibold text-gray-300">Status:</span>{" "}
            {task?.status}
          </p>
          <p>
            <span className="font-semibold text-gray-300">Priority:</span>{" "}
            {task?.priority}
          </p>
          <p>
            <span className="font-semibold text-gray-300">Deadline:</span>{" "}
            {task?.deadline && new Date(task.deadline).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold text-gray-300">Created:</span>{" "}
            {task?.createdAt && new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Tags */}
        {task?.tags?.length > 0 && (
          <div className="mt-3">
            <span className="font-semibold text-gray-300">Tags:</span>
            <div className="flex gap-2 mt-2 flex-wrap">
              {task.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-xs bg-gray-800 rounded-full text-gray-200 border border-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Attachment */}
        {task?.attachment && (
          <div className="mt-3">
            <span className="font-semibold text-gray-300">Attachment:</span>
            <a
              href={task.attachment}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-1 text-blue-400 hover:text-blue-300 underline"
            >
              View File
            </a>
          </div>
        )}

        {/* Assigned User */}
        {task?.assignedUser && (
          <div className="mt-3">
            <span className="font-semibold text-gray-300">Assigned To:</span>
            <p className="mt-1 text-gray-200">
              {task.assignedUser.name} ({task.assignedUser.email})
            </p>
          </div>
        )}

        {/* Subtasks */}
        <div className="mt-4">
          <h3 className="font-semibold text-gray-300">Subtasks</h3>
          <ul className="space-y-2 mt-2">
            {subTasks.map((sub) => (
              <li
                key={sub._id}
                className="flex items-center justify-between bg-gray-800 p-2 rounded-lg border border-gray-700"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={sub.completed}
                    onChange={() =>
                      toggleMutation.mutate({ subTaskId: sub._id })
                    }
                    className="h-4 w-4 accent-blue-600"
                  />
                  <span
                    className={`${
                      sub.completed
                        ? "line-through text-gray-500"
                        : "text-gray-200"
                    }`}
                  >
                    {sub.text}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Comments */}
        {task?.comments?.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold text-gray-300">Comments</h3>
            <ul className="space-y-2 mt-2">
              {task.comments.map((comment) => (
                <li
                  key={comment._id}
                  className="p-2 rounded bg-gray-800 text-gray-200 border border-gray-700"
                >
                  <p>{comment.text}</p>
                  {comment.author && (
                    <small className="text-gray-500">
                      – {comment.author.name}
                    </small>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailsModal;
