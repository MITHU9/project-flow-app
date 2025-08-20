import Task from "../models/Task.js";

// @desc Create Task
export const createTask = async (req, res) => {
  const { projectId, boardId, title, description, assignedTo, deadline } =
    req.body;
  const task = await Task.create({
    projectId,
    boardId,
    title,
    description,
    assignedTo,
    deadline,
  });
  res.status(201).json(task);
};

// @desc Get tasks by board
export const getTasks = async (req, res) => {
  const { boardId } = req.params;
  const tasks = await Task.find({ boardId }).populate(
    "assignedTo",
    "name email"
  );
  res.json(tasks);
};

// @desc Update task
export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  Object.assign(task, req.body);
  await task.save();
  res.json(task);
};

// @desc Delete task
export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  await task.deleteOne();
  res.json({ message: "Task deleted" });
};
