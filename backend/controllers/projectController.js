import Project from "../models/Project.js";
import Board from "../models/Board.js";
import Task from "../models/Task.js";

// Create new project
export const createProject = async (req, res) => {
  try {
    const { name, description, color } = req.body;

    // Create default boards
    const boards = await Board.insertMany([
      { title: "To Do", tasks: [] },
      { title: "In Progress", tasks: [] },
      { title: "Done", tasks: [] },
    ]);

    const project = new Project({
      name,
      description,
      color,
      boards: boards.map((b) => b._id),
    });

    await project.save();

    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create project" });
  }
};

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate({
      path: "boards",
      populate: {
        path: "tasks",
        populate: ["assignedUser", { path: "comments", populate: "author" }],
      },
    });

    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

// Get single project
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate({
      path: "boards",
      populate: {
        path: "tasks",
        populate: ["assignedUser", { path: "comments", populate: "author" }],
      },
    });

    if (!project) return res.status(404).json({ message: "Project not found" });

    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch project" });
  }
};

// Update project
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update project" });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // Optionally delete associated boards and tasks
    await Board.deleteMany({ _id: { $in: project.boards } });
    await Task.deleteMany({ board: { $in: project.boards } });

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete project" });
  }
};
