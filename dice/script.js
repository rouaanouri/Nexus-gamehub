    const playerDice = document.getElementById("playerDice");
    const computerDice = document.getElementById("computerDice");
    let playerScore = document.getElementById("playerScore");
    let computerScore = document.getElementById("computerScore");
    let result = document.getElementById("result");
    let playerCounter = 0;
    let computerCounter = 0;


   function rollDice() {
    let counter = 0;
    const animation = setInterval(function()
    {
        let tempPlayer = Math.floor(Math.random() * 6) + 1;
        let tempComputer = Math.floor(Math.random() * 6) + 1;
        playerDice.src = `assets/images/dice${tempPlayer}.svg`;
        computerDice.src = `assets/images/dice${tempComputer}.svg`;
        counter++;

        if (counter >= 15) {

            clearInterval(animation);

            
            let finalPlayer = Math.floor(Math.random() * 6) + 1;
            let finalComputer = Math.floor(Math.random() * 6) + 1;

            playerDice.src = `assets/images/dice${finalPlayer}.svg`;
            computerDice.src = `assets/images/dice${finalComputer}.svg`;

            playerScore.textContent = finalPlayer;
            computerScore.textContent = finalComputer;
        


          if(finalPlayer > finalComputer){

    playerCounter++;

    document.getElementById("playerCounter").textContent = playerCounter;

    result.textContent = "Player Wins! 👤";

    if(playerCounter === 2){
        showWinner(" Player Wins The Game!");
    }

}
else if(finalPlayer < finalComputer){

    computerCounter++;

    document.getElementById("computerCounter").textContent = computerCounter;

    result.textContent = "Computer Wins! 💻";

    if(computerCounter === 2){
        showWinner(" Computer Wins The Game!");
    }

}
else{

    result.textContent = "It's A Draw! 🔥";

}
        }

    }, 100);

    

   }

   function showWinner(message){

    document.getElementById("winnerText").textContent = message;

    document.getElementById("winnerPopup").style.display = "flex";
}


