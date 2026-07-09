  const player1Dice = document.getElementById("player1Dice");
    const player2Dice = document.getElementById("player2Dice");
    let player1Score = document.getElementById("player1Score");
    let player2Score = document.getElementById("player2Score");
    let rollButton1 = document.getElementById("rollButton1");
    let rollButton2 = document.getElementById("rollButton2");
    let result = document.getElementById("result");
    let player1Counter = 0;
    let player2Counter = 0;
    let player1Roll;
    let player2Roll;
    function roll1Dice(){
        rollButton2.disabled = true;
         let counter = 0;
    const animation = setInterval(function()
    {
       
        let temp1Player = Math.floor(Math.random() * 6) + 1;
        
        player1Dice.src = `assets/images/dice${temp1Player}.svg`;
       
        counter++;

        if (counter >= 15) {

            clearInterval(animation);
            let finalPlayer1 = Math.floor(Math.random() * 6) + 1;
            player1Dice.src = `assets/images/dice${finalPlayer1}.svg`;
                        player1Roll = finalPlayer1;

            player1Score.textContent = finalPlayer1;
            rollButton2.disabled = false;
        }},100)
       
    }
    
    function roll2Dice(){
        
         let counter = 0;
    const animation = setInterval(function()
    {
      
      rollButton1.disabled = true;
        rollButton2.disabled = false;
        let temp2Player = Math.floor(Math.random() * 6) + 1;
        
        player2Dice.src = `assets/images/dice${temp2Player}.svg`;
       
        counter++;

        if (counter >= 15) {

            clearInterval(animation);
             let finalPlayer2 = Math.floor(Math.random() * 6) + 1;
            player2Dice.src = `assets/images/dice${finalPlayer2}.svg`;
            player2Roll = finalPlayer2;
            player2Score.textContent = finalPlayer2;
            rollButton1.disabled = false;
             if(player1Roll > player2Roll){
        player1Counter++;
        document.getElementById("player1Counter").textContent = player1Counter;
        result.textContent = "Player1 Wins! 👤";
        if(player1Counter === 2){
    showWinner(" Player 1 Wins The Game!");
}
    }else if(player1Roll < player2Roll){
       player2Counter++;
        document.getElementById("player2Counter").textContent = player2Counter;
        if(player2Counter === 2){
    showWinner(" Player 2 Wins The Game!");
}
        result.textContent = "player2 Wins! 👤";
    }
else{
    result.textContent = "It's A Draw! 🔥";
}
        }},100)

              

    
    }
   
     function showWinner(message){

    document.getElementById("winnerText").textContent = message;

    document.getElementById("winnerPopup").style.display = "flex";
} 

