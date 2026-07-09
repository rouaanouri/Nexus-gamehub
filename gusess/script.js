   let secretNumber;
    let attempts = 0;
    let numgus = document.getElementById("guess");
    let checkBtn =document.getElementById("checkBtn");
    let attemptsCount = document.getElementById("attempts");
    let message = document.getElementById("message");
    let res = document.getElementById("resetBtn").style.display = "none";

    numgus.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    checkBtn.click();
  }
});

function startGame(){
  secretNumber = Math.floor(Math.random() * 100) + 1;
  console.log(secretNumber)
  numgus.value = "";
  attempts = 0
  attemptsCount.textContent = 0
  message.textContent = "تم اختيار رقم سري جديد! خمن الآن.";
  message.className = "msg-start";  document.getElementById("checkBtn").style.display = "block";
  document.getElementById("resetBtn").style.display = "none";


}
    
document.getElementById("checkBtn").addEventListener("click", function() {

  if (Number(numgus.value) < 1 || Number(numgus.value) > 100) {
    message.textContent = "❌ الرجاء إدخال رقم بين 1 و 100 فقط!";
    message.classList.remove("msg-start", "msg-high", "msg-low", "msg-win");
    void message.offsetWidth;
    message.classList.add("msg-high");
    numgus.value = "";
    numgus.focus();
    return; 
  }
    ++attempts;
  if (Number(numgus.value) > secretNumber){
    message.textContent = " Too high! 📈 (تخمينك أعلى من المطلوب)";
    numgus.value="";
    numgus.focus();
    message.classList.remove("msg-start", "msg-high", "msg-low", "msg-win");
    void message.offsetWidth;
    message.classList.add("msg-high");
  }

 else if (secretNumber> Number(numgus.value)) {
    message.textContent = "Too low! 📉 (تخمينك أقل من المطلوب)";
    numgus.value="";
    numgus.focus();
    message.classList.remove("msg-start", "msg-high", "msg-low", "msg-win");
    void message.offsetWidth;
    message.classList.add( "msg-low");
  }

else{
    message.textContent = `🎉 مبروك الفوز! الرقم هو ${secretNumber}. أحسنت صنعاً! `;
    message.classList.remove("msg-start", "msg-high", "msg-low", "msg-win");
    void message.offsetWidth;
    message.classList.add("msg-win");
    document.getElementById("checkBtn").style.display = "none";
    document.getElementById("resetBtn").style.display = "block";
  }

attemptsCount.textContent = attempts;
});

document.getElementById("resetBtn").addEventListener("click", startGame )
startGame();


function spawnRandomNumber() {
  const num = document.createElement("div");
  num.classList.add("random-number");

  num.textContent = Math.floor(Math.random() * 100);

  num.style.left = Math.random() * window.innerWidth + "px";
  num.style.top = Math.random() * window.innerHeight + "px";

  num.style.fontSize = (20 + Math.random() * 50) + "px";

  document.body.appendChild(num);

  setTimeout(() => num.remove(), 1500);
}

setInterval(spawnRandomNumber, 100);