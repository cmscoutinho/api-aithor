const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let elapsedTime = 0;
let isRunning = false;
let timer;

app.get('/api/timer', (req, res) => {
  res.json({ elapsedTime, isRunning });
});

app.post('/api/start', (req, res) => {
  if (!isRunning) {
    timer = setInterval(() => {
      elapsedTime++;
    }, 1000);
    isRunning = true;
  }
  res.json({ message: 'Timer started' });
});

app.post('/api/stop', (req, res) => {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
  }
  res.json({ message: 'Timer stopped' });
});

app.post('/api/reset', (req, res) => {
  clearInterval(timer);
  elapsedTime = 0;
  isRunning = false;
  res.json({ message: 'Timer reset' });
});

module.exports = app;
