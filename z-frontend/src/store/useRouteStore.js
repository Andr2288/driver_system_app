import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useRouteStore = create((set) => ({
  routes: [],
  isLoading: false,
  isCreating: false,
  isDeleting: false,

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

  clearRoutes: () => set({ routes: [] }),
}));
