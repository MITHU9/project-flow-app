import Comment from "../models/Comment.js";

/**
 * @desc Create comment
 */
export const createComment = async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Get comments by task
 */
export const getComments = async (req, res) => {
  try {
    const { taskId } = req.params;
    const comments = await Comment.find({ taskId }).populate(
      "userId",
      "name email"
    );
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Delete comment
 */
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    await comment.deleteOne();
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
