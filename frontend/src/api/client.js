import { getCookie } from "../utils/getCookie";
import { queryClient } from "./queryClient";

export const API_URL = "http://localhost:8000";
const AUTH_ENDPOINTS = ['/api/user/login', '/api/user/register'];

export class ApiError extends Error {
    constructor(status, data) {
        super(`Request failed with status ${status}`);
        this.status = status;
        this.data = data;
    }
}

const parseBody = async (res) => {
    const text = await res.text();
    if (!text) return null;
    try {
        return JSON.parse(text);
    } catch {
        return text;
    }
};

export const clearSession = () => queryClient.clear();

let redirecting = false;

const handleUnauthorized = () => {
    if (redirecting || window.location.pathname === '/login') return;
    redirecting = true;
    clearSession();
    window.location.assign('/login');
};


const buildOptions = (method, body) => {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            'X-CSRFToken': getCookie('csrftoken'),
        },
        credentials: 'include',
    };
    if (body !== undefined) options.body = JSON.stringify(body);
    return options;
};

export const apiFetch = async (path, { method = 'GET', body } = {}) => {
    const url = `${API_URL}${path}`;

    const res = await fetch(url, buildOptions(method, body));

    const isAuthEndpoint = AUTH_ENDPOINTS.includes(path);
    if (res.status === 401 && !isAuthEndpoint) {
        handleUnauthorized();
    }

    const data = await parseBody(res);
    if (!res.ok) throw new ApiError(res.status, data);
    return data;
};
