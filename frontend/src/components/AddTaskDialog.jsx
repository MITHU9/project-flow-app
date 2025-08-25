import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { X } from "lucide-react";
import { taskSchema } from "../validation/taskSchema";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { useGetAllUsers } from "../hooks/useAuth";

const TaskForm = ({ isModalOpen, onClose, onTaskAdd, isLoading }) => {
  const { user } = useAuthContext();
  const { data: allUsers } = useGetAllUsers();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      taskPoints: [],
      comments: [],
    },
    shouldFocusError: false,
  });

  const {
    fields: taskPointFields,
    append: addTaskPoint,
    remove: removeTaskPoint,
    update: updateTaskPoint,
  } = useFieldArray({ control, name: "taskPoints" });

  const {
    fields: commentFields,
    append: addComment,
    remove: removeComment,
  } = useFieldArray({ control, name: "comments" });

  const [subtaskInput, setSubtaskInput] = useState("");
  const [commentInput, setCommentInput] = useState("");

  const handleAddTaskPoint = () => {
    if (!subtaskInput.trim()) return;
    addTaskPoint({ text: subtaskInput, completed: false });
    setSubtaskInput("");
  };

  const handleAddComment = () => {
    if (!commentInput.trim()) return;
    addComment({ text: commentInput, author: user?.name || "Anonymous" });
    setCommentInput("");
  };

  const toggleTaskPointComplete = (index, field) => {
    updateTaskPoint(index, { ...field, completed: !field.completed });
  };

  const onSubmit = (data) => {
    try {
      const payload = {
        ...data,
        taskPoints: data.taskPoints.map((s) => ({
          text: s.text,
          completed: s.completed || false,
        })),
        comments: data.comments.map((c) => ({
          text: c.text,
          author: user?._id,
        })),
        attachment: data.attachment?.[0] || null,
      };

      if (onTaskAdd) onTaskAdd(payload);
    } catch (err) {
      console.error("Failed to create task", err);
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-gray-300 rounded-2xl w-full max-w-4xl max-h-[90vh] p-8 shadow-xl relative overflow-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-200 cursor-pointer"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-semibold mb-6">Add Task</h2>

        {/* Debug errors */}
        {Object.keys(errors).length > 0 && (
          <div className="text-red-400 text-sm mb-4">
            {Object.entries(errors).map(([field, err]) => (
              <div key={field}>
                {field}: {err?.message}
              </div>
            ))}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-6 grid-cols-1 md:grid-cols-2"
        >
          {/* Title */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Title</label>
            <input
              {...register("title")}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm mt-1">{errors.title?.message}</p>
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Description</label>
            <textarea
              {...register("description")}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Assigned User */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Assigned User</label>
            <select
              {...register("assignedUser")}
              className="w-full p-3 bg-gray-700 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a user</option>
              {allUsers?.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
            <p className="text-red-500 text-sm mt-1">
              {errors.assignedUser?.message}
            </p>
          </div>

          {/* Deadline */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Deadline</label>
            <input
              type="date"
              {...register("deadline")}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Priority */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Priority</label>
            <select
              {...register("priority")}
              className="w-full p-3 bg-gray-800 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Status</label>
            <select
              {...register("status")}
              className="w-full p-3 bg-gray-800 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            >
              <option value="todo">To Do</option>
              <option value="progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          {/* Tags */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium mb-1">
              Tags (comma separated)
            </label>
            <input
              {...register("tags")}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Subtasks */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium mb-2">Subtasks</label>
            <div className="flex gap-2 mb-2">
              <input
                value={subtaskInput}
                onChange={(e) => setSubtaskInput(e.target.value)}
                placeholder="New subtask"
                className="flex-1 p-2 rounded-lg border border-gray-300"
              />
              <button
                type="button"
                onClick={handleAddTaskPoint}
                className="px-4 bg-blue-600 text-white rounded-lg"
              >
                + Add
              </button>
            </div>
            <ul className="space-y-2">
              {taskPointFields.map((field, index) => (
                <li
                  key={field.id}
                  className="flex items-center justify-between bg-gray-700 p-2 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={field.completed}
                      onChange={() => toggleTaskPointComplete(index, field)}
                    />
                    <span
                      className={`${
                        field.completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {field.text}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeTaskPoint(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded-lg"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Comments */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium mb-2">Comments</label>
            <div className="flex gap-2 mb-2">
              <input
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 p-2 rounded-lg border border-gray-300"
              />
              <button
                type="button"
                onClick={handleAddComment}
                className="px-4 bg-blue-600 text-white rounded-lg"
              >
                + Add
              </button>
            </div>

            <ul className="space-y-3">
              {commentFields.map((field, index) => (
                <li
                  key={field.id}
                  className="bg-gray-700 p-3 rounded-lg flex flex-col"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-semibold">{field.author}</span>{" "}
                      <span className="text-xs text-gray-400">
                        {new Date().toLocaleString()}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeComment(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded-lg"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="mt-2">{field.text}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Attachment */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium mb-1">Attachment</label>
            <input
              type="file"
              {...register("attachment")}
              className="w-full p-2 rounded-lg border border-gray-300"
            />
          </div>

          {/* Submit */}
          <div className="col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
              {isLoading ? "Creating..." : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
