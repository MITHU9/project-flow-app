import mongoose from "mongoose";

const boardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    color: { type: String, default: "#6B7280" },
  },
  { timestamps: true }
);

export default mongoose.model("Board", boardSchema);
