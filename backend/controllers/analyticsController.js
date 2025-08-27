import { sql } from "../config/dbSQL.js";

// 📊 Get task counts by status
export const getTaskStats = async (req, res) => {
  try {
    const result = await sql.query(
      `SELECT status, COUNT(*) as count 
       FROM task_reports 
       GROUP BY status`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Analytics error:", err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};

// 📊 Get user performance
export const getUserPerformance = async (req, res) => {
  try {
    const result = await sql.query(
      `SELECT assigned_user, 
              COUNT(*) FILTER (WHERE status='completed') as completed_tasks,
              COUNT(*) FILTER (WHERE deadline < NOW() AND status!='completed') as overdue_tasks
       FROM task_reports
       GROUP BY assigned_user`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("User performance error:", err);
    res.status(500).json({ message: "Failed to fetch performance" });
  }
};
