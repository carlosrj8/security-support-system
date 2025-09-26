import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || (
  process.env.NODE_ENV === 'production' 
    ? '/api' 
    : 'http://localhost:3000'
);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth tokens (if needed)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Agent API
export const agentApi = {
  getAll: () => api.get('/agents'),
  getById: (id: string) => api.get(`/agents/${id}`),
  create: (data: any) => api.post('/agents', data),
  update: (id: string, data: any) => api.put(`/agents/${id}`, data),
  delete: (id: string) => api.delete(`/agents/${id}`),
  updateStatus: (id: string, status: string) => api.put(`/agents/${id}/status/${status}`),
};

// Case API
export const caseApi = {
  getAll: (params?: any) => api.get('/cases', { params }),
  getById: (id: string) => api.get(`/cases/${id}`),
  create: (data: any) => api.post('/cases', data),
  update: (id: string, data: any) => api.put(`/cases/${id}`, data),
  assign: (caseId: string, agentId: string, assignerType: string) => 
    api.post(`/cases/${caseId}/assign/${agentId}?assignerType=${assignerType}`),
  resolve: (caseId: string, resolvedBy: string, resolution: string) => 
    api.post(`/cases/${caseId}/resolve`, { resolvedBy, resolution }),
  generate: (type: string, clientId: string) => 
    api.post('/cases/generate', { type, clientId }),
};

// Client API
export const clientApi = {
  getAll: (params?: any) => api.get('/clients', { params }),
  getById: (id: string) => api.get(`/clients/${id}`),
  getByClientId: (clientId: string) => api.get(`/clients/by-client-id/${clientId}`),
  create: (data: any) => api.post('/clients', data),
  update: (id: string, data: any) => api.put(`/clients/${id}`, data),
  delete: (id: string) => api.delete(`/clients/${id}`),
  addEquipment: (id: string, equipment: any) => api.post(`/clients/${id}/equipment`, equipment),
  addTechnicalNote: (id: string, note: string) => api.post(`/clients/${id}/technical-note`, { note }),
  getHistory: (clientId: string) => api.get(`/clients/${clientId}/history`),
};

// HITL API
export const hitlApi = {
  getRequests: (params?: any) => api.get('/hitl/requests', { params }),
  getPendingRequests: () => api.get('/hitl/requests/pending'),
  getRequestById: (id: string) => api.get(`/hitl/requests/${id}`),
  createRequest: (data: any) => api.post('/hitl/requests', data),
  respondToRequest: (id: string, approved: boolean, feedback: string, decidedBy: string, modifications?: any) => 
    api.put(`/hitl/requests/${id}/respond`, { approved, feedback, decidedBy, modifications }),
  addMessage: (id: string, message: string, from: string, metadata?: any) => 
    api.post(`/hitl/requests/${id}/message`, { message, from, metadata }),
  getStatistics: () => api.get('/hitl/statistics'),
  expireOldRequests: () => api.post('/hitl/expire-old'),
};

// Dashboard API
export const dashboardApi = {
  getStats: () => api.get('/dashboard/stats'),
  getActivity: () => api.get('/dashboard/activity'),
  getSystemStatus: () => api.get('/dashboard/system-status'),
};

export default api;
