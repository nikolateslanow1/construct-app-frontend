
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api'
});

// Projects
export const fetchProjects = () =>  api.get('https://construct-app-414b8cde3eb0.herokuapp.com/api/projects')
     .then(r => r.data || []);

export const createProject = (data) =>  api.post('https://construct-app-414b8cde3eb0.herokuapp.com/api/projects', data)
     .then(r => r.data);

export const deleteProject = (id) =>  api.delete(`https://construct-app-414b8cde3eb0.herokuapp.com/api/projects/${id}`);

export const duplicateProject = (id) =>  api.post(`https://construct-app-414b8cde3eb0.herokuapp.com/api/projects/${id}/duplicate`);

export const deleteAllProjects = () =>  api.delete('https://construct-app-414b8cde3eb0.herokuapp.com/api/projects');

// 👇 Visits
export const fetchVisits = () =>
  api.get('https://construct-app-414b8cde3eb0.herokuapp.com/api/visits')
     .then(r => r.data)
     .catch(err => {
       console.error('Visit counter error:', err);
       return { visits: 0 }; // safe fallback
     });

export default api;
