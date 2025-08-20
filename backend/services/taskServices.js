import Task from "../models/Task.js";

/**
 * Move a task to another board with new order
 * @param {String} taskId
 * @param {String} newBoardId
 * @param {Number} newOrder
 * @returns {Object} updated task
 */
export const moveTaskService = async (taskId, newBoardId, newOrder) => {
  const task = await Task.findById(taskId);
  if (!task) throw new Error("Task not found");

  task.boardId = newBoardId;
  task.order = newOrder;

  await task.save();
  return task;
};
