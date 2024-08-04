let running = false;
let startTime;
let elapsedTime = 0;
let intervalId;
let lapCounter = 0;
const display = document.getElementById("display");
const laps = document.getElementById("laps");

function startStop() {
  if (running) {
    clearInterval(intervalId);
    elapsedTime += Date.now() - startTime;
    document.getElementById("startStopBtn").textContent = "Start";
  } else {
    startTime = Date.now();
    intervalId = setInterval(updateTime, 10);
    document.getElementById("startStopBtn").textContent = "Stop";
  }
  running = !running;
}

function updateTime() {
  const time = Date.now() - startTime + elapsedTime;
  const milliseconds = Math.floor((time % 1000) / 10);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hours = Math.floor(time / (1000 * 60 * 60));

  display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(
    seconds
  )}:${padMilliseconds(milliseconds)}`;
}

function pad(num) {
  return num.toString().padStart(2, "0");
}

function padMilliseconds(num) {
  return num.toString().padStart(2, "0");
}

function lap() {
  if (running) {
    lapCounter++;
    const lapTime = display.textContent;
    const li = document.createElement("li");
    li.textContent = `Lap ${lapCounter}: ${lapTime}`;
    laps.appendChild(li);
  }
}

function reset() {
  clearInterval(intervalId);
  running = false;
  startTime = null;
  elapsedTime = 0;
  lapCounter = 0;
  display.textContent = "00:00:00:00";
  document.getElementById("startStopBtn").textContent = "Start";
  while (laps.firstChild) {
    laps.removeChild(laps.firstChild);
  }
}

const backgroundImages = [
  'url("/build/assets/images/one.jpg")',
  'url("/build/assets/images/two.jpg")',
  'url("/build/assets/images/three.jpg")',
];

let currentImageIndex = 0;

function changeBackground() {
  currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
  document.body.style.backgroundImage = backgroundImages[currentImageIndex];
}
