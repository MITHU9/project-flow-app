import Comment from "../models/Comment.js";
import Subtask from "../models/Subtask.js";
import Task from "../models/Task.js";
import Board from "../models/Board.js";
import Project from "../models/Project.js";

// ---------------- Create Task ----------------
export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      assignedUser,
      deadline,
      priority,
      tags,
      status,
      taskPoints,
      comments,
      projectId,
      boardId,
    } = req.body;

    // Validate project & board
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    project.members.addToSet(assignedUser);
    await project.save();

    const board = await Board.findById(boardId);
    if (!board) return res.status(404).json({ message: "Board not found" });

    // ✅ Convert tags to array (if string, split by comma)
    const formattedTags = Array.isArray(tags)
      ? tags
      : tags
          ?.split(",")
          .map((tag) => tag.trim())
          .filter(Boolean);

    // 1️⃣ Create taskPoints
    const points = taskPoints
      ? await Subtask.insertMany(
          JSON.parse(taskPoints).map((p) => ({
            text: p.text,
            completed: p.completed || false,
            completedAt: p.completedAt || null,
          }))
        )
      : [];

    // 2️⃣ Create comments
    const commentDocs = comments
      ? await Comment.insertMany(
          JSON.parse(comments).map((c) => ({
            text: c.text,
            author: c.author,
            createdAt: c.createdAt || new Date(),
          }))
        )
      : [];

    const imageUrl = req.file ? req.file.path : null;

    // 3️⃣ Create task
    const task = new Task({
      title,
      description,
      assignedUser,
      deadline,
      priority,
      status,
      tags: formattedTags, // ✅ store as array
      attachment: imageUrl,
      projectId,
      boardId,
      subTasks: points.map((p) => p._id),
      comments: commentDocs.map((c) => c._id),
    });

    await task.save();

    // 4️⃣ Add task to board
    board.tasks.push(task._id);
    await board.save();

    // 5️⃣ Populate nested fields
    const populatedTask = await Task.findById(task._id)
      .populate("assignedUser")
      .populate({ path: "comments", populate: { path: "author" } })
      .populate("subTasks");

    res.status(201).json(populatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create task" });
  }
};

// ---------------- Get All Tasks ----------------
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedUser")
      .populate({ path: "comments", populate: { path: "author" } })
      .populate("subTasks");

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

// ---------------- Get Task By ID ----------------
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedUser")
      .populate({ path: "comments", populate: { path: "author" } })
      .populate("subTasks");

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch task" });
  }
};

// ---------------- Update Task ----------------
export const updateTask = async (req, res) => {
  try {
    const {
      title,
      description,
      assignedUser,
      deadline,
      priority,
      tags,
      status,
      taskPoints,
      comments,
      boardId,
    } = req.body;

    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    // Update basic fields
    task.title = title || task.title;
    task.description = description || task.description;
    task.assignedUser = assignedUser || task.assignedUser;
    task.deadline = deadline || task.deadline;
    task.priority = priority || task.priority;
    task.status = status || task.status;
    task.attachments = attachments || task.attachments;
    task.tags = tags || task.tags;

    // Update board if changed
    if (boardId && boardId !== task.boardId.toString()) {
      // Remove task from old board
      const oldBoard = await Board.findById(task.boardId);
      if (oldBoard) {
        oldBoard.tasks = oldBoard.tasks.filter(
          (t) => t.toString() !== task._id.toString()
        );
        await oldBoard.save();
      }

      // Add task to new board
      const newBoard = await Board.findById(boardId);
      if (!newBoard)
        return res.status(404).json({ message: "New board not found" });
      newBoard.tasks.push(task._id);
      await newBoard.save();

      task.boardId = boardId;
    }

    // Update or create taskPoints
    if (taskPoints && taskPoints.length) {
      await Subtask.deleteMany({ _id: { $in: task.subTasks } });
      const points = await Subtask.insertMany(
        taskPoints.map((p) => ({
          text: p.text,
          completed: p.completed || false,
          completedAt: p.completedAt || null,
        }))
      );
      task.subTasks = points.map((p) => p._id);
    }

    // Update or create comments
    if (comments && comments.length) {
      await Comment.deleteMany({ _id: { $in: task.comments } });
      const commentDocs = await Comment.insertMany(
        comments.map((c) => ({
          text: c.text,
          author: c.author,
          createdAt: c.createdAt || new Date(),
        }))
      );
      task.comments = commentDocs.map((c) => c._id);
    }

    await task.save();

    const populatedTask = await Task.findById(task._id)
      .populate("assignedUser")
      .populate({ path: "comments", populate: { path: "author" } })
      .populate("subTasks");

    res.json(populatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update task" });
  }
};

// Toggle subtask completed status
export const toggleSubTask = async (req, res) => {
  try {
    const { subTaskId } = req.params;

    const subTask = await Subtask.findById(subTaskId);
    if (!subTask) return res.status(404).json({ message: "Subtask not found" });

    subTask.completed = !subTask.completed;
    subTask.completedAt = subTask.completed ? new Date() : null;
    await subTask.save();

    res.json(subTask);
  } catch (err) {
    console.error("Toggle subtask error:", err);
    res.status(500).json({ message: "Failed to update subtask" });
  }
};

// ---------------- Delete Task ----------------
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    // Delete associated comments and subtasks
    await Comment.deleteMany({ _id: { $in: task.comments } });
    await Subtask.deleteMany({ _id: { $in: task.subTasks } });

    // Remove task from board
    const board = await Board.findById(task.boardId);
    if (board) {
      board.tasks = board.tasks.filter(
        (t) => t.toString() !== task._id.toString()
      );
      await board.save();
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete task" });
  }
};
