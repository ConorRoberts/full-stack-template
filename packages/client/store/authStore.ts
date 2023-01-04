import create from "zustand";

type AuthStore = {
  token: string | null;
  actions: AuthStoreActions;
};

type AuthStoreActions = {
  setToken: (token: string) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  actions: {
    setToken: (token) => {
      set({ token });
    },
  },
}));

export const useAuthStoreToken = ()=>useAuthStore((state) => state.token);
export const useAuthStoreActions = ()=>useAuthStore((state) => state.actions);
