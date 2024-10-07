import express from 'express';
import Game from '../models/Game.js';
import Score from '../models/Score.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all games
router.get('/', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
});

// Get game leaderboard
router.get('/:gameId/leaderboard', async (req, res) => {
  try {
    const { gameId } = req.params;
    const leaderboard = await Score.find({ game: gameId })
      .sort({ score: -1 })
      .limit(10)
      .populate('user', 'username');
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
});

// Submit a score
router.post('/:gameId/score', authenticateToken, async (req, res) => {
  try {
    const { gameId } = req.params;
    const { score } = req.body;
    const userId = req.user.userId;

    const newScore = new Score({
      user: userId,
      game: gameId,
      score,
    });
    await newScore.save();
    res.status(201).json({ message: '分数提交成功' });
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
});

export default router;