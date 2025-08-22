import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    title: { type: String, required: true },
    description: String,
    assignedUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deadline: Date,
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    tags: [{ type: String }],
    order: { type: Number, default: 0 },
    attachments: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
