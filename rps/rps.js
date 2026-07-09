let scorePlayer = 0, scorePC = 0, scoreDraw = 0;

const images = {
  rock:     '<img src="image/rock.jpg" alt="rock">',
  paper:    '<img src="image/paper.jpg" alt="paper">',
  scissors: '<img src="image/scissor.jpg"  alt="scissors">',
};
const emojis = { rock: '❓', paper: '❓', scissors: '❓' };


function getPcChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  return choices[Math.floor(Math.random() * choices.length)];
}

function getResult(user, pc) {
  if (user === pc) return 'Draw';
  if (
    (user === 'rock'     && pc === 'scissors') ||
    (user === 'paper'    && pc === 'rock')     ||
    (user === 'scissors' && pc === 'paper')
  ) return 'You win';
  return 'You Lose';
}

document.querySelectorAll('.choice').forEach(btn => {
  btn.addEventListener('click', () => {
    const userChoice = btn.dataset.choice;
    const pcChoice   = getPcChoice();
    const result     = getResult(userChoice, pcChoice);

    document.getElementById('playerDisplay').innerHTML = images[userChoice];
    document.getElementById('pcDisplay').innerHTML     = images[pcChoice];

    const playerEl = document.getElementById('playerDisplay');
    const pcEl     = document.getElementById('pcDisplay');
    const banner   = document.getElementById('resultBanner');
    playerEl.className = 'arena-display';
    pcEl.className     = 'arena-display';
    banner.className   = 'result-banner';

    if (result === 'You win') {
      playerEl.classList.add('win');
      pcEl.classList.add('lose');
      banner.classList.add('win');
      banner.textContent = '🎉 فزت!';
      scorePlayer++;
      bumpScore('scorePlayer');
    } else if (result === 'You Lose') {
      playerEl.classList.add('lose', 'shake');
      pcEl.classList.add('win');
      banner.classList.add('lose');
      banner.textContent = '💀 خسرت!';
      scorePC++;
      bumpScore('scorePC');
    } else {
      playerEl.classList.add('draw');
      pcEl.classList.add('draw');
      banner.classList.add('draw');
      banner.textContent = '🤝 تعادل!';
      scoreDraw++;
      bumpScore('scoreDraw');
    }

    void banner.offsetWidth;
    banner.classList.add('pop');

    updateScores();
  });
});

function updateScores() {
  document.getElementById('scorePlayer').textContent = scorePlayer;
  document.getElementById('scorePC').textContent     = scorePC;
  document.getElementById('scoreDraw').textContent   = scoreDraw;
}

function bumpScore(id) {
  const el = document.getElementById(id);
  el.classList.remove('bump');
  void el.offsetWidth;
  el.classList.add('bump');
}

function resetGame() {
  scorePlayer = scorePC = scoreDraw = 0;
  updateScores();
  document.getElementById('playerDisplay').innerHTML = '❓';
  document.getElementById('pcDisplay').innerHTML     = '❓';
  document.getElementById('playerDisplay').className   = 'arena-display';
  document.getElementById('pcDisplay').className       = 'arena-display';
  const banner = document.getElementById('resultBanner');
  banner.className   = 'result-banner';
  banner.textContent = 'اختر حجرة أو ورقة أو مقص!';
}
