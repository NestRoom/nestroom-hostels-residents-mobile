import * as SecureStore from 'expo-secure-store';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

/**
 * Custom wrapper for fetch that automatically adds Authorization header
 * and handles common error scenarios.
 */
export const secureFetch = async (endpoint, options = {}) => {
  try {
    const token = await SecureStore.getItemAsync('userToken');

    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle unauthorized or other errors
      const error = new Error(data.message || 'API Request Failed');
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`[API Error] ${endpoint}:`, error);
    throw error;
  }
};
