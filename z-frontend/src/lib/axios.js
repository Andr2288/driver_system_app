import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true,
});

// Автоматично додаємо токен до кожного запиту
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Обробка 401 помилок (невалідний токен)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);