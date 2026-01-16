import { create } from "zustand";

const useUiStore = create((set, get) => ({
  showHeader: false,
  setShowHeader: (val) => {
    set({ showHeader: val });
  },
}));

export default useUiStore;
