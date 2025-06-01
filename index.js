const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/v1/users/:username', async (req, res) => {
  const username = req.params.username;

  try {
    const response = await axios.get(`https://api.roblox.com/users/get-by-username?username=${username}`);
    if (response.data && response.data.Id) {
      res.json({
        id: response.data.Id,
        username: response.data.Username,
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`RoProxy Node server running on port ${PORT}`);
});
