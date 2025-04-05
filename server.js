const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

// API endpoint для получения списка приложений
app.get('/api/apps', (req, res) => {
  const appsPath = path.join(__dirname, 'public', 'data', 'apps.json');
  fs.readFile(appsPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading apps.json:', err);
      return res.status(500).json({ error: 'Error reading apps data' });
    }
    res.json(JSON.parse(data));
  });
});

// API endpoint для сохранения списка приложений
app.post('/api/apps', (req, res) => {
  const appsPath = path.join(__dirname, 'public', 'data', 'apps.json');
  fs.writeFile(appsPath, JSON.stringify(req.body, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Error writing apps.json:', err);
      return res.status(500).json({ error: 'Error saving apps data' });
    }
    res.json({ success: true });
  });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 