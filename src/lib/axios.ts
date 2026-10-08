import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const api = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

api.defaults.withCredentials = true;
api.defaults.withXSRFToken = true;

export const getCsrf = async () => {
    await api.get('/csrf-cookie');
}

export default api;
