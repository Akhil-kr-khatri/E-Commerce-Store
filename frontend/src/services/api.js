import axios from "axios";

const api = axios.create({
  baseURL: "http://20.51.148.118:5000/api",
});

export default api;