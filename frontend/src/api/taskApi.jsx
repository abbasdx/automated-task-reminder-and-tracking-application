import axios from "axios";

const API_BASE = import.meta.env.VITE_SERVER_URL;

// 1. Create a dedicated instance to avoid polluting global axios
const api = axios.create({ baseURL: API_BASE });

/* ── Token helpers ─────────────────────────────────────── */
export const getToken = () => localStorage.getItem("token");
export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null; // Prevent app crash on malformed JSON
  }
};
export const saveAuth = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify({ email: data.email, name: data.name }));
};
export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
export const isLoggedIn = () => !!getToken();

/* ── Axios interceptor ─────────────────────────────────── */
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      clearAuth();
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

/* ── API Methods (Use the 'api' instance) ──────────────── */
export const login    = (data) => api.post(`/auth/login`, data);
export const register = (data) => api.post(`/auth/signup`, data);

export const addTask      = (task) => api.post(`/tasks/add`, task);
export const deleteTask   = (id)   => api.delete(`/tasks/delete/${id}`);
export const getTasks     = ()     => api.get(`/tasks/list`);
export const completeTask = (id)   => api.put(`/completion/mark/${id}`);
export const sendTestMail = ()     => api.get(`/tasks/test-mail`);

export const getOverview  = () => api.get(`/reports/overview`);
export const addAiTask    = (prompt) => api.post(`/tasks/gemini/add`, { prompt });

export const exportCsv = () => {
  // If you can't change the server to read headers for this endpoint:
  const token = getToken();
  window.open(`${API_BASE}/reports/export?token=${token}`, "_blank");
};