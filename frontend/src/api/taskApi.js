import { API } from "./authApi";

export const createTask = async (data) => {
  const res = await API.post("/tasks", data);
  return res.data;
};
