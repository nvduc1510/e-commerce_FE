import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { TokenUtils } from "./tokenUtils";

const API = axios.create({
    baseURL: "http://localhost:8080",
});

API.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = sessionStorage.getItem("access_token");

        config.headers = config.headers || {};

        if (token) {
        const payload = TokenUtils.parseJwt(token);
        if (!payload || Date.now() >= payload.exp * 1000) {
            sessionStorage.removeItem("access_token");
        } else {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        }

        config.headers["Content-Type"] = "application/json";

        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

API.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response) {
        const data = error.response.data as { message?: string };
        console.error("Server Error:", data?.message || "Unknown error");
        } else {
        console.error("Error:", error.message || "Unknown error");
        }
        return Promise.reject(error);
    }
);

export default API;
