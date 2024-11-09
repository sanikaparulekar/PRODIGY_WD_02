let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById("display");
const lapList = document.getElementById("lapList");

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10);
        running = true;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    display.innerHTML = (hours < 10 ? "0" + hours : hours) + ":" +
                        (minutes < 10 ? "0" + minutes : minutes) + ":" +
                        (seconds < 10 ? "0" + seconds : seconds);
}

function pauseTimer() {
    clearInterval(tInterval);
    running = false;
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = "00:00:00";
    lapList.innerHTML = '';
    lapCount = 0;
}

function recordLap() {
    if (running) {
        lapCount++;
        const lapTime = new Date().getTime() - startTime;
        const hours = Math.floor((lapTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((lapTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((lapTime % (1000 * 60)) / 1000);
        const lapDisplay = (hours < 10 ? "0" + hours : hours) + ":" +
                           (minutes < 10 ? "0" + minutes : minutes) + ":" +
                           (seconds < 10 ? "0" + seconds : seconds);
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapCount}: ${lapDisplay}`;
        lapList.appendChild(lapItem);
    }
}

// Event Listeners for buttons
document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("pauseBtn").addEventListener("click", pauseTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);
document.getElementById("lapBtn").addEventListener("click", recordLap);
