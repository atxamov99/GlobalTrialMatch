import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  google: (userInfo) => api.post('/auth/google', userInfo),
  me: () => api.get('/auth/me'),
}

export const trialsAPI = {
  search: (params) => api.get('/trials/search', { params }),
  match: (data) => api.post('/match', data),
}

export const profileAPI = {
  get: () => api.get('/profile'),
  save: (data) => api.post('/profile', data),
}

export const applicationsAPI = {
  getAll: () => api.get('/applications'),
  apply: (data) => api.post('/applications', data),
  cancel: (id) => api.delete(`/applications/${id}`),
}

export const savedAPI = {
  getAll: () => api.get('/saved'),
  save: (data) => api.post('/saved', data),
  remove: (trialId) => api.delete(`/saved/${trialId}`),
}

export const matchAPI = {
  match: (data) => api.post('/match', data),
}

export default api
