import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    assignedUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    deadline: Date,
    order: { type: Number, default: 0 },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    tags: [String],
    status: {
      type: String,
      enum: ["todo", "progress", "done"],
      default: "todo",
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    attachments: [String],
    subTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subtask" }],
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
