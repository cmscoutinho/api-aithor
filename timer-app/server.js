const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Adiciona o middleware para servir arquivos estáticos

let elapsedTime = 0;
let isRunning = false;
let timer;

app.get('/timer', (req, res) => {
  res.json({ elapsedTime, isRunning });
});

app.post('/start', (req, res) => {
  if (!isRunning) {
    timer = setInterval(() => {
      elapsedTime++;
    }, 1000);
    isRunning = true;
  }
  res.json({ message: 'Timer started' });
});

app.post('/stop', (req, res) => {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
  }
  res.json({ message: 'Timer stopped' });
});

app.post('/reset', (req, res) => {
  clearInterval(timer);
  elapsedTime = 0;
  isRunning = false;
  res.json({ message: 'Timer reset' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
