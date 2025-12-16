import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useTripStore = create((set) => ({
  trips: [],
  myTrips: [],
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,

  fetchMyTrips: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/trips/my");
      set({ myTrips: res.data });
    } catch (error) {
      console.error("Error fetching my trips:", error);
      toast.error("Помилка завантаження рейсів");
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAvailableTrips: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/trips");
      set({ trips: res.data });
    } catch (error) {
      console.error("Error fetching trips:", error);
      toast.error("Помилка завантаження рейсів");
    } finally {
      set({ isLoading: false });
    }
  },

  searchTrips: async (startPoint, endPoint) => {
    set({ isLoading: true });
    try {
      const params = new URLSearchParams();
      if (startPoint) params.append("startPoint", startPoint);
      if (endPoint) params.append("endPoint", endPoint);
      
      const res = await axiosInstance.get(`/trips/search?${params.toString()}`);
      set({ trips: res.data });
    } catch (error) {
      console.error("Error searching trips:", error);
      toast.error("Помилка пошуку рейсів");
    } finally {
      set({ isLoading: false });
    }
  },

  createTrip: async (data) => {
    set({ isCreating: true });
    try {
      const res = await axiosInstance.post("/trips", data);
      set((state) => ({ myTrips: [...state.myTrips, res.data] }));
      toast.success("Рейс створено!");
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Помилка створення рейсу";
      toast.error(errorMessage);
      throw error;
    } finally {
      set({ isCreating: false });
    }
  },

  updateTrip: async (id, data) => {
    set({ isUpdating: true });
    try {
      const res = await axiosInstance.put(`/trips/${id}`, data);
      set((state) => ({
        myTrips: state.myTrips.map((trip) =>
          trip.id === id ? res.data : trip
        ),
      }));
      toast.success("Рейс оновлено!");
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Помилка оновлення рейсу";
      toast.error(errorMessage);
      throw error;
    } finally {
      set({ isUpdating: false });
    }
  },

  deleteTrip: async (id) => {
    set({ isDeleting: true });
    try {
      await axiosInstance.delete(`/trips/${id}`);
      set((state) => ({
        myTrips: state.myTrips.filter((trip) => trip.id !== id),
      }));
      toast.success("Рейс видалено!");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Помилка видалення рейсу";
      toast.error(errorMessage);
      throw error;
    } finally {
      set({ isDeleting: false });
    }
  },

  clearTrips: () => set({ trips: [], myTrips: [] }),
}));
