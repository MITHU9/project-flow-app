import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    color: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdAt: { type: Date, default: Date.now },
    boards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Board" }],
    status: { type: String, enum: ["active", "archived"], default: "active" },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
