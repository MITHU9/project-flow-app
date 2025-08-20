import Task from "../models/Task.js";
import { moveTaskService } from "../services/taskServices.js";

/**
 * @desc Create Task
 */
export const createTask = async (req, res) => {
  try {
    const {
      projectId,
      boardId,
      title,
      description,
      assignedTo,
      deadline,
      order,
    } = req.body;

    const task = await Task.create({
      projectId,
      boardId,
      title,
      description,
      assignedTo,
      deadline,
      order,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Get tasks by board (sorted by order)
 */
export const getTasks = async (req, res) => {
  try {
    const { boardId } = req.params;
    const tasks = await Task.find({ boardId })
      .populate("assignedTo", "name email")
      .sort({ order: 1 }); // ensures drag order
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Update task (general edit)
 */
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Delete task
 */
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Move task (drag-and-drop between boards)
 */
export const moveTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { newBoardId, newOrder } = req.body;

    const task = await moveTaskService(taskId, newBoardId, newOrder);

    res.json({ message: "Task moved successfully", task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
