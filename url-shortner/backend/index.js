import express from 'express';
import Redis from 'ioredis';
import { nanoid } from 'nanoid';
import cors from 'cors';
import 'dotenv/config';

const app = express();

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

app.use(cors());
app.use(express.json());

// Create short URL
app.post('/api/shorten', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const shortId = nanoid(8);
  await redis.set(shortId, url);
  
  const shortUrl = `${process.env.FRONTEND_URL}/r/${shortId}`;
  res.json({ shortUrl });
});

// Redirect to original URL
app.get('/r/:id', async (req, res) => {
  const { id } = req.params;
  const url = await redis.get(id);
  
  if (url) {
    res.redirect(url);
  } else {
    res.status(404).send('URL not found');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

redis.on('connect', () => {
  console.log('Successfully connected to Redis');
});