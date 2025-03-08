import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthStore } from "qnect-types";

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoading: false,
      isAuthenticated: false,
      token: null,
      user: null,

      setIsLoading: (value) => set({ isLoading: value }),
      setIsAuthenticated: (value) => set({ isAuthenticated: value }),
      setToken: (value) => set({ token: value }),
      login: (data) =>
        set({
          isAuthenticated: true,
          user: data.user,
          token: data.token,
        }),
      logout: () =>
        set({
          isAuthenticated: false,
          user: null,
          token: null,
        }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => {
        const { isLoading, ...rest } = state;
        return rest;
      },
    }
  )
);

export default useAuthStore;
