import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  X,
  User,
  Flag,
  Calendar,
  Tag,
  Check,
  Plus,
  Trash2,
  Paperclip,
  Upload,
  MessageCircle,
} from "lucide-react";
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
    defaultValues: { taskPoints: [], comments: [] },
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
  const [attachment, setAttachment] = useState(null);

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

  const handleFileUpload = (e) => {
    const file = e.target.files[0]; // single file
    if (file) {
      setAttachment({
        id: file.name,
        name: file.name,
        size: file.size,
        file,
      });
    }
  };

  const removeAttachment = () => {
    setAttachment(null);
  };

  const formatFileSize = (size) => {
    if (size < 1024) return size + " B";
    if (size < 1024 * 1024) return (size / 1024).toFixed(1) + " KB";
    return (size / (1024 * 1024)).toFixed(1) + " MB";
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
        attachment: attachment?.file || null,
      };
      if (onTaskAdd) onTaskAdd(payload);
    } catch (err) {
      console.error("Failed to create task", err);
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Create New Task
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {Object.keys(errors).length > 0 && (
          <div className="text-red-500 text-sm p-4">
            {Object.entries(errors).map(([field, err]) => (
              <div key={field}>
                {field}: {err?.message}
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <span className="flex items-center space-x-2">
                    <span>Task Title</span>
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  {...register("title")}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter task title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Enter task description..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Assigned User</span>
                  </label>
                  <select
                    {...register("assignedUser")}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a user</option>
                    {allUsers?.map((u) => (
                      <option key={u._id} value={u._id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center space-x-2">
                    <Flag className="w-4 h-4" />
                    <span>Priority</span>
                  </label>
                  <select
                    {...register("priority")}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  {...register("status")}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="todo">To Do</option>
                  <option value="progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>

              <div>
                <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Deadline</span>
                </label>
                <input
                  type="date"
                  {...register("deadline")}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center space-x-2">
                  <Tag className="w-4 h-4" />
                  <span>Tags (comma separated)</span>
                </label>
                <input
                  {...register("tags")}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. frontend, urgent, client"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center space-x-2">
                  <Check className="w-4 h-4" />
                  <span>Subtasks</span>
                </label>
                <div className="flex space-x-2 mb-3">
                  <input
                    value={subtaskInput}
                    onChange={(e) => setSubtaskInput(e.target.value)}
                    placeholder="New subtask"
                    className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleAddTaskPoint}
                    className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {taskPointFields.map((field, index) => (
                    <div
                      key={field.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg border ${
                        field.completed
                          ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                          : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleTaskPointComplete(index, field)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          field.completed
                            ? "bg-green-500 border-green-500 text-white"
                            : "border-gray-300 dark:border-gray-600 hover:border-green-500"
                        }`}
                      >
                        {field.completed && <Check className="w-3 h-3" />}
                      </button>
                      <span
                        className={`flex-1 text-sm ${
                          field.completed
                            ? "text-green-700 dark:text-green-300 line-through"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {field.text}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeTaskPoint(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center space-x-2">
                  <Paperclip className="w-4 h-4" />
                  <span>Attachment</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center space-y-2"
                  >
                    <Upload className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Click to upload a file
                    </span>
                  </label>
                </div>

                {attachment && (
                  <div className="mt-3 flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Paperclip className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {attachment.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(attachment.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeAttachment}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Comments</span>
                </label>
                <div className="flex space-x-2 mb-3">
                  <input
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleAddComment}
                    className="px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {commentFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-medium">
                              {field.author?.[0]}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {field.author}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date().toLocaleString()}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeComment(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {field.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 font-medium"
            >
              {isLoading ? "Saving..." : "Save Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
