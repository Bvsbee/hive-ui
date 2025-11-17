// services/authService.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserModel } from "../models/UserModel";
import hiveAPI from "./hiveAPI";
import useAuthStore from "../components/stores/useAuthStore";

const createUser = async (newUser: UserModel): Promise<UserModel> => {
  const { data } = await hiveAPI.post("/user", newUser);
  return data;
};

export const useCreateUser = () => {
  return useMutation<UserModel, Error, UserModel>({
    mutationFn: createUser,
  });
};

const loginUser = async (email: string, password?: string) => {
  const payload = { email, password };
  if (email && password) {
    const { data } = await hiveAPI.post("auth/login", payload);

    // localStorage.setItem("token", data.access_token);

    return data;
  }
  return "Must complete all fields";
};

export const useLoginUser = () => {
  const signIn = useAuthStore((state) => state.signIn);

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),
    onSuccess: (data) => {
      signIn(data.user);
    },
    onError: (error: any) => {
      console.error("Login failed:", error.response?.data || error.message);
    },
  });
};

export const logoutUser = async () => {
  await hiveAPI.post("/logout");
  return true;
};
