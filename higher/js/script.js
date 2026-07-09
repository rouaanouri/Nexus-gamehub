let maxNum = 100;
let minNum = 1;

let point = 0;
let highPoint = localStorage.getItem('higherLowerHighPoint') || 0;
let currentNumber = 0;
let lives = 6;

let pointDisplay = document.getElementById("point");
let highPointDisplay = document.getElementById("high-point");
let digitalBox = document.getElementById("digital-box");
let msgDisplay = document.getElementById("msg");
let livesBox = document.getElementById("lives-box");
let subMsgBox = document.getElementById("sub-msg");
let higherBtn = document.getElementById("higherBtn");
let lowerBtn = document.getElementById("lowerBtn");


function generateRandomNumber() {
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

function initGame() {
    point = 0;
    lives = 6;
    pointDisplay.innerText = point;
    highPointDisplay.innerText = highPoint
    currentNumber = generateRandomNumber();
    digitalBox.innerText = currentNumber;
    updateLivesDisplay();
    msgDisplay.innerText = ""
    subMsgBox.innerText = "استعد وابدأ التخمين..."

    higherBtn.disabled=false;
    lowerBtn.disabled=false;
}
function playTurn(playerGuess) {
    if (lives <= 0) {
        return;
    }
    let nextNumber = generateRandomNumber();
    while (nextNumber === currentNumber) {
        nextNumber = generateRandomNumber();
    }

    higherBtn.disabled = true;
    lowerBtn.disabled = true;
    msgDisplay.innerText = "جاري سحب الرقم الجديد...";
    msgDisplay.style.color = "#a0a0c0";

    let startSpeed = 60;
    let maxDelay = 400;
    let stepIncrement = 45;

    function runSlowCounter() {
        if (startSpeed < maxDelay) {
            digitalBox.innerText = generateRandomNumber();
            startSpeed += stepIncrement;
            setTimeout(runSlowCounter, startSpeed);
        } else {
            checkingWinLoos(nextNumber, playerGuess);
        }
    }
    runSlowCounter();
}

function checkingWinLoos(nextNumber, playerGuess) {
    digitalBox.innerText = nextNumber;
    higherBtn.disabled = false;
    lowerBtn.disabled = false;

    let isCorrect = false;
    if (playerGuess === 'higher' && nextNumber > currentNumber) isCorrect = true;
    if (playerGuess === 'lower' && nextNumber < currentNumber) isCorrect = true;
    if (isCorrect) {
        point++;
        pointDisplay.innerText = point;
        msgDisplay.innerText = `أحسنت الرقم هو ${nextNumber} لقد ربحت نقطة.`
        msgDisplay.style.color = "#2ecc71";
        if (point > highPoint) {
            highPoint = point;
            highPointDisplay.innerText = highPoint;
            localStorage.setItem('higherLowerHighPoint', highPoint);
        }
        currentNumber = nextNumber;
        subMsgBox.innerText = "توقع الرقم القادم الآن:";
    } else {
        lives--;
        updateLivesDisplay();
        msgDisplay.innerText = `لقد خسرت الرقم هو ${nextNumber}`;
        msgDisplay.style.color = "#e74c3c"
        if (lives <= 0) {
            msgDisplay.innerText = `للأسف نفذت الأرواح 💀انتهت اللعبة.`
            higherBtn.disabled = true;
            lowerBtn.disabled = true;
        } else {
            currentNumber = nextNumber;
            subMsgBox.innerText = "توقع الرقم القادم الآن"
        }
    }
}
function updateLivesDisplay() {
    let hearts = "";
    for (i = 0; i < lives; i++) {
        hearts += "❤️";
    }
    for (i = 0; i < (6 - lives); i++) {
        hearts += "🖤";
    }
    livesBox.textContent = hearts;
}
function refreshGame() {
    initGame();
}
function startBackgroundNumbers() {
    let colors = ["#2ecc71", "#e74c3c", "#3498db", "#f1c40f", "#9b59b6", "#00fff5"];

    setInterval(function () {
        let num = document.createElement("span");
        num.innerText = Math.floor(Math.random() * 100) + 1;
        num.classList.add("number-float");

        let randomX;
        if (Math.random() < 0.5) {
            randomX = Math.random() * 21 + 1;
        } else {
            randomX = Math.random() * 20 + 75;
        }
        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        let randomSize = Math.floor(Math.random() * 14) + 18;

        num.style.left = `${randomX}%`;
        num.style.bottom = "-50px";
        num.style.color = randomColor;
        num.style.fontSize = `${randomSize}px`;
        document.body.appendChild(num);

        setTimeout(function () {
            num.remove();
        }, 4000);

    }, 450);
}

initGame();
startBackgroundNumbers();