import { getToken } from "@/atoms/auth/token";
import { getApiBaseUrl } from "@/env-config";
import axios from "axios";

// Callback registered by AuthProvider to trigger logout when refresh fails
let _onLogout: (() => Promise<void>) | null = null;

export function setLogoutCallback(cb: (() => Promise<void>) | null) {
    _onLogout = cb;
}

const api = axios.create({
    baseURL: getApiBaseUrl(),
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to include the token in the headers
api.interceptors.request.use(
    async (config) => {
        const token = await getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor — catch 401, try to refresh token once, then retry
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Only attempt refresh on 401, and avoid infinite loops
        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        if (__DEV__) {
            console.log("[axios] 401 received, attempting token refresh...");
        }


        /*  let result = null;
 
         try {
             result = await refreshToken(true);
         } catch (refreshError) {
             if (__DEV__) {
                 console.warn("[axios] Unexpected error while refreshing token:", refreshError);
             }
         }
 
         if (result?.access_token) {
             // Update the header with the new token and retry
             originalRequest.headers.Authorization = `Bearer ${result.access_token}`;
             return api(originalRequest);
         }
 
         // Refresh failed — force logout
         if (__DEV__) {
             console.warn("[axios] Token refresh failed after 401, logging out");
         } */

        try {
            await _onLogout?.();
        } catch (logoutError) {
            if (__DEV__) {
                console.warn("[axios] Logout callback failed after refresh error:", logoutError);
            }
        }

        return Promise.reject(error);
    }
);

export { api };
