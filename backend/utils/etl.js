import { sql } from "../config/dbSQL.js";

export const recalcUserPerformance = async () => {
  try {
    await sql.query(`
      INSERT INTO user_performance (user_id, completed_tasks, overdue_tasks, avg_completion_time)
      SELECT 
        assigned_user AS user_id,
        COUNT(*) FILTER (WHERE status = 'completed') AS completed_tasks,
        COUNT(*) FILTER (WHERE status != 'completed' AND deadline < NOW()) AS overdue_tasks,
        AVG(deadline - created_at) FILTER (WHERE status = 'completed') AS avg_completion_time
      FROM task_reports
      WHERE assigned_user IS NOT NULL
      GROUP BY assigned_user
      ON CONFLICT (user_id) DO UPDATE 
      SET 
        completed_tasks = EXCLUDED.completed_tasks,
        overdue_tasks = EXCLUDED.overdue_tasks,
        avg_completion_time = EXCLUDED.avg_completion_time;
    `);

    console.log("✅ User performance recalculated");
  } catch (err) {
    console.error("❌ ETL recalculation failed:", err.message);
  }
};
