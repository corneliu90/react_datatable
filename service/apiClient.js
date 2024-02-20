import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://https://users-json-server-kz74.onrender.com/",
});

export default apiClient;
