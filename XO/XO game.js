let turn = 'x'
let squares = []
function end(num1, num2, num3) {
    let winnerLetter = squares[num1];
    let popup = document.getElementById('winner-popup');
    let popupText = document.getElementById('popup-text');
    let popupImg = document.getElementById('popup-img');
    popupText.innerHTML = `The Winner Is: Player ${winnerLetter} 🎉`;
    document.getElementById('item' + num1).style.borderColor = '#39FF14'
    document.getElementById('item' + num2).style.borderColor = '#39FF14'
    document.getElementById('item' + num3).style.borderColor = '#39FF14'
    document.getElementById('item' + num1).style.color = '#39FF14';
    document.getElementById('item' + num2).style.color = '#39FF14';
    document.getElementById('item' + num3).style.color = '#39FF14';
    document.getElementById('item' + num1).style.boxShadow = '0 0 20px #39FF14';
    document.getElementById('item' + num2).style.boxShadow = '0 0 20px #39FF14';
    document.getElementById('item' + num3).style.boxShadow = '0 0 20px #39FF14';
    document.getElementById('item' + num1).style.textShadow = '0 0 10px #39FF14';
    document.getElementById('item' + num2).style.textShadow = '0 0 10px #39FF14';
    document.getElementById('item' + num3).style.textShadow = '0 0 10px #39FF14';
    if (winnerLetter === 'X') {
        let xInput = document.getElementById('x-score');
        xInput.value = parseInt(xInput.value) + 1;
    }
    else if (winnerLetter === 'O') {
        let oInput = document.getElementById('o-score');
        oInput.value = parseInt(oInput.value) + 1;
    }
    setTimeout(function () {
        popup.style.display = 'flex';
    }, 1000);
    setTimeout(function () { resetBoard() }, 5000)
}
function winner() {
    for (let i = 1; i < 10; i++) {
        squares[i] = document.getElementById('item' + i).innerHTML
    }
    if (squares[1] == squares[2] && squares[2] == squares[3] && squares[1] != '') {
        end(1, 2, 3)
        return
    }
    else if (squares[4] == squares[5] && squares[5] == squares[6] && squares[4] != '') {
        end(4, 5, 6)
        return
    }
    else if (squares[7] == squares[8] && squares[8] == squares[9] && squares[7] != '') {
        end(7, 8, 9)
        return
    }
    else if (squares[1] == squares[4] && squares[4] == squares[7] && squares[1] != '') {
        end(1, 4, 7)
        return
    }
    else if (squares[2] == squares[5] && squares[5] == squares[8] && squares[2] != '') {
        end(2, 5, 8)
        return
    }
    else if (squares[3] == squares[6] && squares[6] == squares[9] && squares[3] != '') {
        end(3, 6, 9)
        return
    }
    else if (squares[1] == squares[5] && squares[5] == squares[9] && squares[1] != '') {
        end(1, 5, 9)
        return
    }
    else if (squares[3] == squares[5] && squares[5] == squares[7] && squares[3] != '') {
        end(3, 5, 7)
        return
    }
    let isDraw = true;
    for (let i = 1; i < 10; i++) {
        if (squares[i] == '') {
            isDraw = false;
        }
    }
    if (isDraw === true) {
        let popup = document.getElementById('winner-popup');
        let popupText = document.getElementById('popup-text');
        let popupImg = document.getElementById('popup-img');
        popupText.innerHTML = "It's a Draw! No Winner 🤝";
        document.querySelector('.popup-content').style.borderColor = '#94A3B8';
        popupImg.src = "assets/image/loser.gif";
        setTimeout(function () {
            popup.style.display = 'flex';
        }, 1000);
        setTimeout(function () {
            resetBoard();
        }, 5000)

    } else {
        // popupText.innerHTML = `The Winner Is: Player ${winnerLetter} 🎉`;
        // popupText.innerHTML = "It's a Draw! No Winner 🤝";
        // document.querySelector('.popup-content').style.borderColor = '#39FF14';
        // popupImg.src = "assets/image/done1.gif";

    }

}
let title = document.querySelector('.title')
function game(id) {
    let element = document.getElementById(id)
    if (turn === 'x' && element.innerHTML == '') {
        element.innerHTML = 'X';
        element.classList.add('x-active');
        turn = 'o'
        title.innerHTML = 'O'
    }
    else if (turn === 'o' && element.innerHTML == '') {
        element.innerHTML = 'O';
        element.classList.add('o-active');
        turn = 'x'
        title.innerHTML = 'X'
    }
    winner()
}
function resetBoard() {
    document.getElementById('winner-popup').style.display = 'none';
    squares = [];
    for (let i = 1; i < 10; i++) {
        let element = document.getElementById('item' + i);
        element.innerHTML = '';
        element.style.borderColor = '';
        element.style.boxShadow = '';
        element.style.color = '';
        element.style.textShadow = '';
        element.classList.remove('x-active', 'o-active');
    }

    turn = 'x';
    title.innerHTML = 'X';
}
let resetBtn = document.getElementById('reset-game')
resetBtn.onclick = function () {
    location.reload();
}