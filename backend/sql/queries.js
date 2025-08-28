export const createTaskReportsTable = `
CREATE TABLE IF NOT EXISTS task_reports (
  id SERIAL PRIMARY KEY,
  task_id VARCHAR(255) NOT NULL,
  project_id VARCHAR(255),
  board_id VARCHAR(255),
  assigned_user VARCHAR(255),
  status VARCHAR(50),
  priority VARCHAR(50),
  deadline TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
`;

export const createUserPerformanceTable = `
CREATE TABLE IF NOT EXISTS user_performance (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255),
  completed_tasks INT DEFAULT 0,
  overdue_tasks INT DEFAULT 0,
  avg_completion_time INTERVAL
);
`;
