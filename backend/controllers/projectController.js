import Project from "../models/Project.js";

// @desc Create Project
export const createProject = async (req, res) => {
  const { name, description } = req.body;
  const project = await Project.create({
    name,
    description,
    createdBy: req.user._id,
    members: [req.user._id],
  });
  res.status(201).json(project);
};

// @desc Get all projects for user
export const getProjects = async (req, res) => {
  const projects = await Project.find({ members: req.user._id });
  res.json(projects);
};

// @desc Add member to project
export const addMember = async (req, res) => {
  const { projectId, memberId } = req.body;
  const project = await Project.findById(projectId);
  if (!project) return res.status(404).json({ message: "Project not found" });

  if (!project.members.includes(memberId)) {
    project.members.push(memberId);
    await project.save();
  }

  res.json(project);
};
