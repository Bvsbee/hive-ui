// services/authService.ts
import axios from "axios";
import { UserModel } from "../models/user/UserModel";

export const createUser = async (newUser: UserModel) => {
  const response = await axios.post("http://localhost:3000/user", newUser);
  return response.data;
};
