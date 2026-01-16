import axios from "axios";

const api = axios.create({
  //   baseURL: "http://localhost:5001/api",
  baseURL: "https://server-ofzj.onrender.com/api",
  headers: {
    "x-platform": "web",
  },
  withCredentials: true,
});

export default api;
