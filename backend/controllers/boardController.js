import Board from "../models/Board.js";

// @desc Create board
export const createBoard = async (req, res) => {
  const { projectId, title, order } = req.body;
  const board = await Board.create({ projectId, title, order });
  res.status(201).json(board);
};

// @desc Get boards by project
export const getBoards = async (req, res) => {
  const { projectId } = req.params;
  const boards = await Board.find({ projectId });
  res.json(boards);
};
