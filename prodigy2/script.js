let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let lapCount = 0;

// Elements
const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsContainer = document.getElementById('laps');

// Create bubbles
function createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    const size = Math.random() * (80 - 20) + 20; // Random size between 20px and 80px
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 100}vw`; // Random horizontal position
    bubble.style.animationDuration = `${Math.random() * (15 - 8) + 8}s`; // Random duration between 8s and 15s
    document.querySelector('.bubble-container').appendChild(bubble);

    // Remove the bubble after the animation ends
    bubble.addEventListener('animationend', () => {
        bubble.remove();
    });
}

// Generate bubbles at intervals
setInterval(createBubble, 1000);

// Format the time in HH:MM:SS
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Start the stopwatch
function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(() => {
            updatedTime = new Date().getTime();
            difference = updatedTime - startTime;
            timeDisplay.textContent = formatTime(difference);
        }, 1000);
        running = true;
        toggleButtons(true);
    }
}

// Stop the stopwatch
function stopStopwatch() {
    clearInterval(timerInterval);
    running = false;
    toggleButtons(false);
}

// Reset the stopwatch
function resetStopwatch() {
    clearInterval(timerInterval);
    timeDisplay.textContent = '00:00:00';
    difference = 0;
    running = false;
    lapCount = 0;
    lapsContainer.innerHTML = '';
    toggleButtons(false, true);
}

// Record a lap
function recordLap() {
    if (running) {
        lapCount++;
        const lapTime = formatTime(difference);
        const lapElement = document.createElement('div');
        lapElement.classList.add('lap');
        lapElement.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
    }
}

// Toggle buttons based on stopwatch state
function toggleButtons(isRunning, isReset = false) {
    startBtn.disabled = isRunning;
    stopBtn.disabled = !isRunning;
    resetBtn.disabled = !isRunning && !isReset;
    lapBtn.disabled = !isRunning;
}

// Event Listeners
startBtn.addEventListener('click', startStopwatch);
stopBtn.addEventListener('click', stopStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);