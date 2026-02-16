
# File: src/lib/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api'
});

export const fetchProjects = () => api.get('/projects').then(r => r.data || []);
export const createProject = (data) => api.post('/projects', data).then(r => r.data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);
export const duplicateProject = (id) => api.post(`/projects/${id}/duplicate`);
export const deleteAllProjects = () => api.delete('/projects');

export default api;
