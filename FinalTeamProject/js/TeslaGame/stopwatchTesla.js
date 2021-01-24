
function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");

    return `${formattedMM}:${formattedSS}:${formattedMS}`;
}

let startTime;
let elapsedTime = 0;
let timerInterval;


function print(txt) {
    document.getElementById("display").innerHTML = txt;
}

function start() {
    if(timerInterval)
        return ;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 10);
    document.getElementById("animate").disabled = true;
}

function pause() {
    clearInterval(timerInterval);

}

function reset() {
    clearInterval(timerInterval);
    print("00:00:00");
    elapsedTime = 0;
    location.reload();
}

// Create function to display buttons

// Create event listeners

var playButton = document.getElementById("buttonPlay");
var resetButton = document.getElementById("buttonReset");

playButton.addEventListener("click", start);
resetButton.addEventListener("click", reset);
