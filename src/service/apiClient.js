import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://users-json-server-kz74.onrender.com/",
});

export default apiClient;
