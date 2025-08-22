import Subtask from "../models/Subtask.js";

/**
 * @desc Create subtask
 */
export const createSubtask = async (req, res) => {
  try {
    const subtask = await Subtask.create(req.body);
    res.status(201).json(subtask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Get subtasks by task
 */
export const getSubtasks = async (req, res) => {
  try {
    const { taskId } = req.params;
    const subtasks = await Subtask.find({ taskId });
    res.json(subtasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Update subtask
 */
export const updateSubtask = async (req, res) => {
  try {
    const subtask = await Subtask.findById(req.params.id);
    if (!subtask) return res.status(404).json({ message: "Subtask not found" });

    Object.assign(subtask, req.body);
    await subtask.save();
    res.json(subtask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Delete subtask
 */
export const deleteSubtask = async (req, res) => {
  try {
    const subtask = await Subtask.findById(req.params.id);
    if (!subtask) return res.status(404).json({ message: "Subtask not found" });

    await subtask.deleteOne();
    res.json({ message: "Subtask deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
