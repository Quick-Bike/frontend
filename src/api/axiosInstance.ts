// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://rental-backend-mocha.vercel.app/", // <--- PUT YOUR API BASE URL HERE
  withCredentials: true, // if you use cookies
  timeout: 10000, // optional: timeout
});

export default axiosInstance;
