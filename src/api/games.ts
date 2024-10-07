import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getGames = async () => {
  const response = await axios.get(`${API_URL}/games`);
  return response.data;
};

export const getLeaderboard = async (gameId: string) => {
  const response = await axios.get(`${API_URL}/games/${gameId}/leaderboard`);
  return response.data;
};

export const submitScore = async (gameId: string, score: number, token: string) => {
  const response = await axios.post(
    `${API_URL}/games/${gameId}/score`,
    { score },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};