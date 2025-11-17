import axios from "axios";

const hiveAPI = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export default hiveAPI;
