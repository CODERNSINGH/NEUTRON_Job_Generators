// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [followers, setFollowers] = useState(0);
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/followers').then(res => {
      setFollowers(res.data.followers);
    });
  }, []);

  const uploadPost = () => {
    axios.post('http://localhost:5000/api/post', { caption, imageUrl });
  };

  const schedulePost = () => {
    axios.post('http://localhost:5000/api/schedule', { caption, imageUrl, scheduleTime });
  };

  const fetchAnalytics = () => {
    axios.get('http://localhost:5000/api/analytics').then(res => {
      setAnalytics(res.data);
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Instagram Manager</h2>
      <p>Followers: {followers}</p>

      <input
        type="text"
        placeholder="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      /><br />
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      /><br />
      <button onClick={uploadPost}>Upload Post</button><br /><br />

      <input
        type="datetime-local"
        onChange={(e) => setScheduleTime(e.target.value)}
      /><br />
      <button onClick={schedulePost}>Schedule Post</button><br /><br />

      <button onClick={fetchAnalytics}>Fetch Analytics</button>
      <div>
        <p>Likes: {analytics.likes}</p>
        <p>Reach: {analytics.reach}</p>
        <p>Comments: {analytics.comments}</p>
      </div>
    </div>
  );
}

export default App;
