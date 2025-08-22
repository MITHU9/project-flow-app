import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { X } from "lucide-react";
import { taskSchema } from "../validation/taskSchema";

const demoUsers = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Charlie Brown" },
  { id: 4, name: "Diana Prince" },
];

const TaskForm = ({ isModalOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(taskSchema),
  });

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-gray-300 rounded-2xl w-full max-w-4xl p-8 shadow-xl relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-semibold mb-6">Add Task</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-6 grid-cols-1 md:grid-cols-2"
        >
          {/* Title */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Title</label>
            <input
              {...register("title")}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm mt-1">{errors.title?.message}</p>
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Description</label>
            <textarea
              {...register("description")}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Assigned User */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Assigned User</label>
            <select
              {...register("assignedUser")}
              className="w-full p-3 bg-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a user</option>
              {demoUsers.map((user) => (
                <option key={user.id} value={user.name}>
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
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.deadline?.message}
            </p>
          </div>

          {/* Priority */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Priority</label>
            <select
              {...register("priority")}
              className="w-full p-3 bg-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full p-3 bg-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="todo">To Do</option>
              <option value="progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          {/* Tags */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">
              Tags (comma separated)
            </label>
            <input
              {...register("tags")}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Task Points */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Task Points</label>
            <input
              type="number"
              {...register("taskPoints")}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Attachments */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Attachments</label>
            <input
              type="file"
              {...register("attachments")}
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Comments */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium mb-1">
              Comments (optional)
            </label>
            <textarea
              {...register("comments")}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <div className="col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
