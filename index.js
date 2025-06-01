const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/v1/users/:username', async (req, res) => {
  const username = req.params.username;

  try {
    const response = await axios.post(
      'https://users.roblox.com/v1/usernames/users',
      {
        usernames: [username],
        excludeBannedUsers: true
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const data = response.data;
    if (data.data && data.data.length > 0) {
      const user = data.data[0];
      res.json({
        id: user.id,
        username: user.name,
        displayName: user.displayName
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }

  } catch (err) {
    console.error('API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`RoProxy Node server running on port ${PORT}`);
});
