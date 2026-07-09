const rows = 20 , cols =20 ;
const cell =24;
const levels = [
    {eatToNext: 3 , delay : 170} ,
    {eatToNext: 5 , delay : 135} ,
    {eatToNext: 7 , delay : 110} ,
    {eatToNext: 9 , delay : 85} ,
    {eatToNext: 9 , delay : 70} ,
];
let snake, dir, nextDir, food, score, best, level, eatCount, gameLoop, paused, running;
const canvas = document.getElementById('c');
const context = canvas.getContext('2d');

function startGame(){
    snake =[{x:10, y:10},{x:9,y:10},{x:8,y:10}];
    dir = {x :1 , y:0};
    nextDir = {x :1 , y:0};
    score =0;
    level =1;
    eatCount = 0;
    paused =false ;
    running = true ;
    best = parseInt(localStorage.getItem('snakeBest')||'0' );

    spawnFood();
    updateHUD();
    hide('startOverlay'); hide('pauseOverlay'); hide('gameOverOverlay');
 clearInterval(gameLoop);
  gameLoop = setInterval(tick, levels[level-1].delay);
}

function tick(){
if (paused || !running) return;
if (!(nextDir.x === -dir.x && nextDir.y === -dir.y)) dir = {...nextDir};

const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) return gameOver();
if (snake.some(s => s.x === head.x && s.y === head.y)) return gameOver();

 snake.unshift(head); 
if (head.x === food.x && head.y === food.y) {
score += level * 10 ;
eatCount ++;
   spawnFood();
    checkLevelUp();
    updateHUD();
  } else {
    snake.pop(); 
}
 draw();
}

function checkLevelUp(){
    const Configuration = levels[level -1];
    if (eatCount>= Configuration.eatToNext && level < levels.length){
        level ++;
        eatCount =0;
        clearInterval(gameLoop);
        gameLoop = setInterval(tick, levels[level-1].delay);
        showLevelToast(level);
    }
      updateLevelBar();
}

function showLevelToast(lv) {
const toast = document.getElementById('lvlToast');
document.getElementById('lvlToastNum').textContent = lv
toast.className = 'lvlup-toast show';
setTimeout(() => {toast.className = 'lvlup-toast hide';
setTimeout(()=> toast.className = 'lvlup-toast',300); },1400);

}
function spawnFood(){
    let foodLoc;
    do{
      foodLoc  = {x: Math.floor(Math.random()*cols), y: Math.floor(Math.random()*rows)}; 
    }
    while( snake.some (s =>s.x === foodLoc.x && s.y===foodLoc.y));
    food = foodLoc;  
}
function draw(){
    context.fillStyle ='#07071a';
    context.fillRect(0,0, canvas.width , canvas.height);
    context.strokeStyle ='rgba(59,240,160,0.2)';
    context.lineWidth=0.5;
    for (let x = 0; x <= cols; x++) {
    context.beginPath(); 
    context.moveTo(x*cell,0);
    context.lineTo(x*cell,canvas.height); 
    context.stroke();
  }
  for (let y = 0; y <= rows; y++) {
    context.beginPath();
    context.moveTo(0,y*cell);
    context.lineTo(canvas.width,y*cell);
    context.stroke();
  }
  snake.forEach((seg, i) => {
    const x = seg.x * cell, y = seg.y * cell;
    const isHead = i === 0;
    const ratio  = i / snake.length; 

    if (isHead) {
      const g = context.createLinearGradient(x, y, x+cell, y+cell);
      g.addColorStop(0, '#3bf0a0');
      g.addColorStop(1, '#00d2ff');
      context.fillStyle = g;
      roundRect(context, x+1, y+1, cell-2, cell-2, 7);
      context.fill();

      const ex = dir.x, ey = dir.y;
      context.fillStyle = '#05050f';
      if (ex === 1) { 
        dot(x+cell-6, y+6, 2.5); dot(x+cell-6, y+cell-6, 2.5);
      } else if (ex === -1) { 
        dot(x+6, y+6, 2.5); dot(x+6, y+cell-6, 2.5);
      } else if (ey === -1) { 
        dot(x+6, y+6, 2.5); dot(x+cell-6, y+6, 2.5);
      } else { 
        dot(x+6, y+cell-6, 2.5); dot(x+cell-6, y+cell-6, 2.5);
      }
    } else {
      const alpha = 0.95 - ratio * 0.5;
      const g2 = context.createLinearGradient(x,y,x+cell,y+cell);
      g2.addColorStop(0, `rgba(59,240,160,${alpha})`);
      g2.addColorStop(1, `rgba(0,210,255,${alpha*0.6})`);
      context.fillStyle = g2;
      roundRect(context, x+2, y+2, cell-4, cell-4, 5);
      context.fill();
    }
  });
const fx =food.x * cell + cell/2 ;
const fy =food.y * cell + cell/2 ;

const gf= context.createRadialGradient(fx,fy,0, fx,fy,cell*0.8);
gf.addColorStop(0, 'rgba(255,60,172,0.3)');
gf.addColorStop(1, 'transparent');
context.fillStyle =gf;
context.beginPath();
context.arc(fx, fy, cell*0.8, 0, Math.PI*2);
context.fill();

const gf2 = context.createRadialGradient(fx-2,fy-2,0, fx,fy,cell*0.42);
gf2.addColorStop(0, '#ff8cd4');
gf2.addColorStop(1, '#ff3cac');
context.fillStyle = gf2;
context.beginPath(); context.arc(fx, fy, cell*0.38, 0, Math.PI*2); context.fill();


context.fillStyle = 'rgba(255,255,255,0.35)';
context.beginPath();
context.arc(fx-3, fy-3, cell*0.12, 0, Math.PI*2);
context.fill();

}

function roundRect(context, x, y, w, h, r) {
  context.beginPath();
  context.moveTo(x+r, y);
  context.lineTo(x+w-r, y); context.quadraticCurveTo(x+w, y, x+w, y+r);
  context.lineTo(x+w, y+h-r); context.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
  context.lineTo(x+r, y+h); context.quadraticCurveTo(x, y+h, x, y+h-r);
  context.lineTo(x, y+r); context.quadraticCurveTo(x, y, x+r, y);
  context.closePath();
}

function dot(x, y, r) {
  context.beginPath(); 
  context.arc(x, y, r, 0, Math.PI*2);
  context.fill();
}

function gameOver() {
  running = false;
  clearInterval(gameLoop);
  if (score > best) { best = score; localStorage.setItem('snakeBest', best); }
  document.getElementById('finalScore').textContent = score;
  document.getElementById('finalBest').textContent = score >= best && score > 0 ? '🏆 رقم قياسي جديد!' : `أفضل نتيجة: ${best}`;
  show('gameOverOverlay');
}

function togglePause() {
  if (!running) return;
  paused = !paused;
  paused ? show('pauseOverlay') : hide('pauseOverlay');
}

function updateHUD() {
  document.getElementById('scoreDisplay').textContent = score;
  document.getElementById('bestDisplay').textContent  = Math.max(best, score);
  document.getElementById('levelDisplay').textContent = level;
  const speedStr = (170 / levels[level-1].delay).toFixed(1) + 'x';
  document.getElementById('speedDisplay').textContent = speedStr;
  updateLevelBar();
}

function updateLevelBar() {
   const Configuration = levels[level -1];
   const pct = Math.min(100, (eatCount / Configuration.eatToNext) * 100);
  document.getElementById('levelBar').style.width = pct + '%';
  if (level < levels.length) {
    document.getElementById('barLabel').textContent = `Level ${level} → ${level+1}`;
    document.getElementById('barGoal').textContent  = `Food ${eatCount}/${Configuration.eatToNext}`;
  } else {
    document.getElementById('barLabel').textContent = 'MAX LEVEL 🔥';
    document.getElementById('barGoal').textContent  = '';
    document.getElementById('levelBar').style.width = '100%';
  }
}
function setDir(x, y) {
    if (!running || paused) return;
    if (x === -dir.x && y === -dir.y) return; 
    nextDir = {x, y};
}

const dirs = {
    ArrowUp : {x:0,  y:-1},
    ArrowDown : {x:0,  y:1},
    ArrowLeft :{x:-1,  y:0},
    ArrowRight: {x:1,  y:0},
    w:{x:0,y:-1},
    s:{x:0,y:1},
    a:{x:-1,y:0}, 
    d:{x:1,y:0},
};
document.addEventListener('keydown', e => {
  if (e.code === 'Space') { e.preventDefault(); togglePause(); return; }
  const d = dirs[e.key];
  if (d) { e.preventDefault(); nextDir = d; }
});

function show(id){ 
    document.getElementById(id).classList.remove('hidden')
}
function hide(id){
     document.getElementById(id).classList.add('hidden') 
}

draw();