// services/authService.ts
import axios from "axios";
import { UserModel } from "../models/user/UserModel";

export const createUser = async (newUser: UserModel) => {
  const response = await axios.post("http://localhost:3000/user", newUser);
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post("http://localhost:3000/auth/login", {
    email,
    password,
  });

  return response.data;
};
