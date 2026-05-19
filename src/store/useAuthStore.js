import { create } from "zustand";
import { toast } from "react-hot-toast";
import api from "../config/api";

const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  isChecking: false,

  register: async (data) => {
    try {
      set({ loading: true });
      const res = await api.post("/auth/register", data);
      toast.success(res.data.message || "Registeration Successful");
      console.log(res.data);
      set({ user: res.data, loading: false });
      return true;
    } catch (err) {
      console.log("Error in signup: ", err);
      toast.error(err?.response?.data?.message || "Unknown Error");
      set({ loading: false });
      return false;
    }
  },

  login: async (data) => {
    try {
      set({ loading: true });
      const res = await api.post("/auth/login", data);
      set({ user: res.data, loading: false });
      toast.success("Login Successfully");
      return true;
    } catch (err) {
      console.log("Error in login: ", err);
      toast.error(err?.response?.data?.message || "Unknown Error");
      set({ loading: false });
      return false;
    }
  },

  logout: async () => {
    try {
      set({ loading: true });
      const res = await api.post("/auth/logout");
      toast.success("Logout Successfully");
      set({ user: null });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown Error");
    } finally {
      set({ loading: false });
    }
  },

  checkAuth: async () => {
    try {
      set({ isChecking: true });
      const res = await api.get("/auth/check");
      set({ user: res.data });
    } catch (error) {
      console.log("Error in Checking auth: ", error);
    } finally {
      set({ isChecking: false });
    }
  },
}));

export default useAuthStore;
