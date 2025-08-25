import { API } from "./authApi";

export const createTask = async (taskData) => {
  const formData = new FormData();

  // Append all fields to FormData
  for (const key in taskData) {
    if (key === "attachment" && taskData[key]) {
      formData.append("attachment", taskData[key]);
    } else if (Array.isArray(taskData[key])) {
      formData.append(key, JSON.stringify(taskData[key]));
    } else {
      formData.append(key, taskData[key]);
    }
  }

  const res = await API.post("/tasks", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const getTaskById = async (taskId) => {
  const res = await API.get(`/tasks/${taskId}`);
  return res.data;
};

export const toggleSubTask = async (subTaskId) => {
  const { data } = await API.patch(`/tasks/subtask/${subTaskId}/toggle`);
  return data;
};
