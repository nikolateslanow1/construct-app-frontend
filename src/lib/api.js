
import axios from 'axios';

// Centralized API host and base. Use Vite env variables when available.
// - VITE_API_HOST: host-only (e.g. https://construct-app-...herokuapp.com)
// - VITE_API_BASE_URL: full base (e.g. https://.../api) -- overrides constructed base
export const API_HOST = import.meta.env.VITE_API_HOST || 'https://www.citycodeexpeditor.com';
export const API_BASE = import.meta.env.VITE_API_BASE_URL || `${API_HOST}/api`;

const api = axios.create({
  baseURL: API_BASE
});

// Projects
export const fetchProjects = () => api.get('/projects').then(r => r.data || []);

export const createProject = (data) => api.post('/projects', data).then(r => r.data);

export const deleteProject = (id) => api.delete(`/projects/${id}`);

export const duplicateProject = (id) => api.post(`/projects/${id}/duplicate`);

export const deleteAllProjects = () => api.delete('/projects');

// Visits
export const fetchVisits = () =>
  api
    .get('/visits')
    .then(r => r.data)
    .catch(err => {
      console.error('Visit counter error:', err);
      return { visits: 0 }; // safe fallback
    });

// CSV export
export const downloadProjectsCsv = () =>
  api
    .get('/projects/csv', { responseType: 'blob' })
    .then(r => r.data)
    .catch(err => {
      console.error('CSV export error:', err);
      throw err;
    });

export default api;
