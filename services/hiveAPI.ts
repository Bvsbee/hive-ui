import axios from "axios";

const hiveAPI = axios.create({
  baseURL: process.env.API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});
export default hiveAPI;
