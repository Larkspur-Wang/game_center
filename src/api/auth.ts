import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const register = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/register`, { username, password });
  return response.data;
};

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, { username, password });
  return response.data;
};

export const guestLogin = async () => {
  const response = await axios.post(`${API_URL}/auth/guest`);
  return response.data;
};