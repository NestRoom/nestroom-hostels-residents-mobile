import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'userToken';
const USER_KEY = 'userData';

export const tokenService = {
  /**
   * Save the JWT token securely
   */
  async saveToken(token) {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  },

  /**
   * Retrieve the JWT token
   */
  async getToken() {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  },

  /**
   * Remove the JWT token (Logout)
   */
  async removeToken() {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  },

  /**
   * Save user data securely
   */
  async saveUser(user) {
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
  },

  /**
   * Retrieve user data
   */
  async getUser() {
    const user = await SecureStore.getItemAsync(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  /**
   * Clear all auth data
   */
  async clearAuth() {
    await Promise.all([
      SecureStore.deleteItemAsync(TOKEN_KEY),
      SecureStore.deleteItemAsync(USER_KEY),
    ]);
  },
};
