import Board from "../models/Board.js";

/**
 * @desc Create board
 */
export const createBoard = async (req, res) => {
  try {
    const board = await Board.create(req.body);
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Get boards by project
 */
export const getBoards = async (req, res) => {
  try {
    const { projectId } = req.params;
    const boards = await Board.find({ projectId }).sort("order");
    res.json(boards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Update board
 */
export const updateBoard = async (req, res) => {
  try {
    const board = await Board.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!board) return res.status(404).json({ message: "Board not found" });
    res.json(board);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Delete board
 */
export const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) return res.status(404).json({ message: "Board not found" });

    await board.deleteOne();
    res.json({ message: "Board deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
