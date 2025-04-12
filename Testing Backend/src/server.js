// server.js
const express = require('express');
const app = express();
const cron = require('node-cron');
app.use(express.json());

// Dummy user data
let followers = 1234;
let scheduledPosts = [];

// Mock Instagram API auth
app.post('/api/login', (req, res) => {
  const { username } = req.body;
  return res.json({ message: `Logged in as ${username}`, token: 'dummy_token' });
});

// Fetch followers
app.get('/api/followers', (req, res) => {
  return res.json({ followers });
});

// Upload post
app.post('/api/post', (req, res) => {
  const { caption, imageUrl } = req.body;
  return res.json({ message: 'Post uploaded to Instagram (simulated)', caption, imageUrl });
});

// Schedule post
app.post('/api/schedule', (req, res) => {
  const { caption, imageUrl, scheduleTime } = req.body;
  scheduledPosts.push({ caption, imageUrl, scheduleTime });
  return res.json({ message: 'Post scheduled' });
});

// Analytics (mock)
app.get('/api/analytics', (req, res) => {
  return res.json({
    likes: Math.floor(Math.random() * 100),
    reach: Math.floor(Math.random() * 500),
    comments: Math.floor(Math.random() * 20),
  });
});

// Cron job to simulate scheduled post publishing
cron.schedule('* * * * *', () => {
  const now = new Date().toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM
  scheduledPosts = scheduledPosts.filter(post => {
    if (post.scheduleTime.slice(0, 16) === now) {
      console.log('Publishing post:', post.caption);
      return false; // remove from list
    }
    return true;
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));
