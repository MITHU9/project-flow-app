import { API } from "./authApi";

export const getProjects = async (id) => {
  const res = await API.get(`/projects?userId=${id}`);
  return res.data;
};

export const getProject = async (id) => {
  const res = await API.get(`/projects/${id}`);
  return res.data;
};

export const createProject = async (data) => {
  const res = await API.post("/projects", data);
  return res.data;
};

export const updateProject = async (id, data) => {
  const res = await API.put(`/projects/${id}`, data);
  return res.data;
};

export const deleteProject = async (id) => {
  const res = await API.delete(`/projects/${id}`);
  return res.data;
};
