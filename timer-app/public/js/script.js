const timerElement = document.getElementById('timer');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

async function fetchTimer() {
  const response = await fetch('/api/timer');
  const data = await response.json();
  updateTimerDisplay(data.elapsedTime);
}

async function startTimer() {
  await fetch('/api/start', { method: 'POST' });
  fetchTimer();
}

async function stopTimer() {
  await fetch('/api/stop', { method: 'POST' });
  fetchTimer();
}

async function resetTimer() {
  await fetch('/api/reset', { method: 'POST' });
  fetchTimer();
}

function updateTimerDisplay(elapsedTime) {
  let hours = Math.floor(elapsedTime / 3600);
  let minutes = Math.floor((elapsedTime % 3600) / 60);
  let seconds = elapsedTime % 60;
  timerElement.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
  return number < 10 ? '0' + number : number;
}

setInterval(fetchTimer, 1000);
