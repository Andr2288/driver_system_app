import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/register", data);
            set({ authUser: res.data });
            toast.success("Реєстрація успішна!");

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Помилка реєстрації";
            toast.error(errorMessage);
            throw error;
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Вхід успішний!");

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Невірний email або пароль";
            toast.error(errorMessage);
            throw error;
        } finally {
            set({ isLoggingIn: false });
        }
    },

    // Вихід
    logout: () => {
        localStorage.removeItem("token");
        delete axiosInstance.defaults.headers.common["Authorization"];
        set({ authUser: null });
        toast.success("Ви вийшли з системи");
    },
}));