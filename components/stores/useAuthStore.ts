import { UserModel } from "../../models/UserModel";
import { create } from "zustand";

type AuthState = {
  user: UserModel | null;
  signIn: (user: UserModel) => void;
  signOut: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  signIn: (user) => set({ user }),
  signOut: () => set({ user: null }),
}));

export default useAuthStore;
