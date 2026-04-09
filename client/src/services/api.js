import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers['x-auth-token'] = localStorage.getItem('token');
  }
  return req;
});

export const authAPI = {
  login: (data) => API.post('/auth/login', data),
  register: (data) => API.post('/auth/register', data),
  getProfile: () => API.get('/users/profile')
};

export const requestAPI = {
  create: (data) => API.post('/requests', data),
  getAll: (params) => API.get('/requests', { params }),
  getById: (id) => API.get(`/requests/${id}`),
  update: (id, data) => API.put(`/requests/${id}`, data),
  delete: (id) => API.delete(`/requests/${id}`),
  accept: (id) => API.put(`/requests/${id}/accept`),
  updateStatus: (id, status) => API.put(`/requests/${id}/status`, { status })
};

export const userAPI = {
  getUsers: () => API.get('/users'),
  deleteUser: (id) => API.delete(`/users/${id}`)
};

export const resourceAPI = {
  add: (data) => API.post('/resources', data),
  getAll: () => API.get('/resources'),
  update: (id, data) => API.put(`/resources/${id}`, data),
  delete: (id) => API.delete(`/resources/${id}`)
};

export default API;
