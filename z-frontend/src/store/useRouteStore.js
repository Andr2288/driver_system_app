import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useRouteStore = create((set) => ({
  routes: [],
  isLoading: false,
  isCreating: false,
  isDeleting: false,

  // Отримати мої маршрути
  fetchMyRoutes: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/routes/my");
      set({ routes: res.data });
    } catch (error) {
      console.error("Error fetching routes:", error);
      toast.error("Помилка завантаження маршрутів");
    } finally {
      set({ isLoading: false });
    }
  },

  // Створити маршрут
  createRoute: async (data) => {
    set({ isCreating: true });
    try {
      const res = await axiosInstance.post("/routes", data);
      set((state) => ({ routes: [...state.routes, res.data] }));
      toast.success("Маршрут створено!");
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Помилка створення маршруту";
      toast.error(errorMessage);
      throw error;
    } finally {
      set({ isCreating: false });
    }
  },

  // Видалити маршрут
  deleteRoute: async (id) => {
    set({ isDeleting: true });
    try {
      await axiosInstance.delete(`/routes/${id}`);
      set((state) => ({
        routes: state.routes.filter((route) => route.id !== id),
      }));
      toast.success("Маршрут видалено!");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Помилка видалення маршруту";
      toast.error(errorMessage);
      throw error;
    } finally {
      set({ isDeleting: false });
    }
  },

  // Очистити store
  clearRoutes: () => set({ routes: [] }),
}));
