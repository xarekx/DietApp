import { getCookie } from "../utils/getCookie";
import { queryClient } from "./queryClient";

export const API_URL = "http://127.0.0.1:8000";

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

// Shared promise so that parallel 401s trigger only one refresh request
let refreshPromise = null;

const refreshAccessToken = () => {
    if (!refreshPromise) {
        const refresh = localStorage.getItem('refresh');
        refreshPromise = (refresh
            ? fetch(`${API_URL}/api/token/refresh/`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refresh }),
              })
            : Promise.reject(new Error('No refresh token'))
        )
            .then(res => {
                if (!res.ok) throw new Error('Refresh failed');
                return res.json();
            })
            .then(data => {
                localStorage.setItem('access', data.access);
                // Only returned when ROTATE_REFRESH_TOKENS=True
                if (data.refresh) localStorage.setItem('refresh', data.refresh);
                return data.access;
            })
            .finally(() => { refreshPromise = null; });
    }
    return refreshPromise;
};

export const clearSession = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    // Drop cached data so the next user doesn't see the previous user's diets
    queryClient.clear();
};

const forceLogout = () => {
    clearSession();
    window.location.assign('/login');
};

const buildOptions = (method, body) => {
    const token = localStorage.getItem('access');
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            'X-CSRFToken': getCookie('csrftoken'),
            ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        credentials: 'include',
    };
    if (body !== undefined) options.body = JSON.stringify(body);
    return options;
};

// Plain JS request helper: attaches the JWT, refreshes it once on 401,
// returns parsed JSON and throws ApiError on non-2xx responses.
export const apiFetch = async (path, { method = 'GET', body } = {}) => {
    const url = `${API_URL}${path}`;
    // A 401 from the token endpoints means bad credentials, not an expired token
    const isTokenEndpoint = path.startsWith('/api/token/');

    let res = await fetch(url, buildOptions(method, body));

    if (res.status === 401 && !isTokenEndpoint) {
        try {
            await refreshAccessToken();
        } catch (err) {
            forceLogout();
            throw err;
        }
        res = await fetch(url, buildOptions(method, body));
    }

    const data = await parseBody(res);
    if (!res.ok) throw new ApiError(res.status, data);
    return data;
};
