import apiClient from "./apiClient";

export const UsersDbase = {
  async getUsers() {
    const response = await apiClient.get("users");
    return response.data;
  },

  async createUser(data) {
    const response = await apiClient.post("users", data);
    return response.data;
  },

  async validateToken(token) {
    const response = await apiClient.post("auth/validateToken", { token });
    return response.data;
  },

  async userDelete(userId) {
    const response = await apiClient.delete(`users/${userId}`);
    return response.data;
  },

  async updateUser(userId, userData) {
    const response = await apiClient.put(`users/${userId}`, userData);
    return response.data;
  },

  async updatePassword(userId, newPassword) {
    const response = await apiClient.patch(`users/${userId}`, {
      password: newPassword,
    });
    return response.data;
  },
};
