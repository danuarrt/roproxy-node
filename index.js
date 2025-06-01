const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/v1/users/:username', async (req, res) => {
  const username = req.params.username;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

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
      return res.json({
        id: user.id,
        username: user.name,
        displayName: user.displayName
      });
    } else {
      return res.status(404).json({ error: 'User not found' });
    }

  } catch (err) {
    console.error('Error fetching user:', err.message);
    return res.status(500).json({ error: 'Failed to fetch data from Roblox' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
});
