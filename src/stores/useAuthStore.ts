import { UserModel } from "../models/UserModel";
import { create } from "zustand";

type AuthState = {
  user: UserModel;
  signIn: (user: UserModel) => void;
  signOut: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  },
  signIn: (user) => set({ user }),
  signOut: () => set({ user: undefined }),
}));

export default useAuthStore;
