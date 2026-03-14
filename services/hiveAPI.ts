import { API_URL } from "./../config/api";
import axios from "axios";

console.log("API_URL:", API_URL);

const hiveAPI = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export default hiveAPI;
