// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/", // <--- PUT YOUR API BASE URL HERE
  withCredentials: true, // if you use cookies
  timeout: 10000, // optional: timeout
});

export default axiosInstance;
