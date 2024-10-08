import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('注册请求:', { username, password: '***' });

    if (!username || !password) {
      return res.status(400).json({ message: '用户名和密码都是必填项' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log('用户名已存在:', username);
      return res.status(400).json({ message: '用户名已存在' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    console.log('用户注册成功:', username);
    res.status(201).json({ message: '注册成功' });
  } catch (error) {
    console.error('注册错误:', error);
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: '用户名或密码错误' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: '用户名或密码错误' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
});

router.post('/guest', async (req, res) => {
  try {
    const guestUser = new User({
      username: `guest_${Date.now()}`,
      password: await bcrypt.hash(Date.now().toString(), 10),
      isGuest: true,
    });
    await guestUser.save();
    const token = jwt.sign({ userId: guestUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, userId: guestUser._id });
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
});

export default router;