import { queryClient } from "../utils/queryClient";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { useTask, useToggleSubTask } from "../hooks/useTask";

const TaskDetailsModal = ({ isOpen, onClose, taskId }) => {
  const { data: task, isLoading } = useTask(taskId);
  const toggleMutation = useToggleSubTask();

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
      <DialogContent className="min-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{task?.title}</DialogTitle>
        </DialogHeader>

        {/* Description */}
        <p className="mb-3 text-gray-300">{task?.description}</p>

        {/* Task meta */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
          <p>
            <strong>Status:</strong> {task?.status}
          </p>
          <p>
            <strong>Priority:</strong> {task?.priority}
          </p>
          <p>
            <strong>Deadline:</strong>{" "}
            {new Date(task?.deadline).toLocaleDateString()}
          </p>
          <p>
            <strong>Created:</strong>{" "}
            {new Date(task?.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Tags */}
        {task?.tags?.length > 0 && (
          <div className="mt-3">
            <strong className="text-white">Tags:</strong>
            <div className="flex gap-2 mt-1 flex-wrap">
              {task.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-xs bg-gray-700 rounded-full text-white"
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
            <strong className="text-white">Attachment:</strong>
            <a
              href={task.attachment}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-1 text-blue-400 underline"
            >
              View File
            </a>
          </div>
        )}

        {/* Assigned User */}
        {task?.assignedUser && (
          <div className="mt-3">
            <strong className="text-white">Assigned To:</strong>
            <p className="mt-1 text-gray-300">
              {task.assignedUser.name} ({task.assignedUser.email})
            </p>
          </div>
        )}

        {/* Subtasks */}
        <div className="mt-4">
          <h3 className="font-semibold text-white">Subtasks</h3>
          <ul className="space-y-2 mt-2">
            {task?.subTasks?.map((sub) => (
              <li
                key={sub._id}
                className="flex items-center justify-between bg-gray-700 p-2 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={sub.completed}
                    onChange={() =>
                      toggleMutation.mutate({ subTaskId: sub._id })
                    }
                    className="h-4 w-4"
                  />
                  <span
                    className={`${
                      sub.completed
                        ? "line-through text-gray-400"
                        : "text-white"
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
            <h3 className="font-semibold text-white">Comments</h3>
            <ul className="space-y-2 mt-2">
              {task.comments.map((comment) => (
                <li
                  key={comment._id}
                  className="p-2 rounded bg-gray-800 text-gray-300"
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
