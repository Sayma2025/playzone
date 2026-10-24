/**
 * PlayZone Internal Games
 * Each exported function returns a self-contained HTML string
 * that renders a fully playable game inside an <iframe srcdoc>.
 */

// ─── NEON SNAKE ──────────────────────────────────────────────────────────────
export function getSnakeHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Neon Snake</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#0a1a2e;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;font-family:'Segoe UI',sans-serif;color:#fff;overflow:hidden}
  #ui{display:flex;gap:2rem;margin-bottom:1rem;font-size:1rem;color:#94a3b8}
  #ui span{color:#22d3ee;font-weight:700;font-size:1.1rem}
  canvas{border:2px solid #22d3ee;border-radius:8px;box-shadow:0 0 30px rgba(34,211,238,0.3)}
  #msg{position:absolute;text-align:center;background:rgba(10,26,46,0.93);padding:2rem 3rem;border-radius:16px;border:1px solid #22d3ee;box-shadow:0 0 40px rgba(34,211,238,0.3)}
  #msg h2{font-size:1.8rem;color:#22d3ee;margin-bottom:.5rem}
  #msg p{color:#94a3b8;margin-bottom:1.5rem}
  button{background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;border:none;padding:.7rem 2rem;border-radius:999px;font-size:1rem;cursor:pointer;font-weight:600;transition:.2s}
  button:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(79,70,229,.6)}
  #controls{margin-top:.75rem;font-size:.75rem;color:#64748b}
</style>
</head>
<body>
<div id="ui">Score: <span id="score">0</span>&nbsp;&nbsp;|&nbsp;&nbsp;High Score: <span id="hi">0</span></div>
<canvas id="c" width="420" height="420"></canvas>
<div id="controls">Arrow Keys / WASD to move</div>
<div id="msg">
  <h2>🐍 Neon Snake</h2>
  <p>Eat the glowing pellets, don't hit the walls!</p>
  <button id="startBtn">Start Game</button>
</div>
<script>
const canvas=document.getElementById('c'),ctx=canvas.getContext('2d');
const W=420,H=420,CELL=20,COLS=W/CELL,ROWS=H/CELL;
let snake,dir,next,food,score,hi=0,running=false,gameOver=false,raf;
const $ = id=>document.getElementById(id);
function init(){
  snake=[{x:10,y:10},{x:9,y:10},{x:8,y:10}];
  dir={x:1,y:0};next={x:1,y:0};
  score=0;$('score').textContent=0;
  food=randomFood();gameOver=false;
}
function randomFood(){
  let f;
  do{f={x:Math.floor(Math.random()*COLS),y:Math.floor(Math.random()*ROWS)};}
  while(snake.some(s=>s.x===f.x&&s.y===f.y));
  return f;
}
function draw(){
  ctx.fillStyle='#0a1a2e';ctx.fillRect(0,0,W,H);
  // Grid dots
  for(let x=0;x<COLS;x++)for(let y=0;y<ROWS;y++){
    ctx.fillStyle='rgba(34,211,238,0.04)';
    ctx.fillRect(x*CELL+CELL/2-1,y*CELL+CELL/2-1,2,2);
  }
  // Food
  const fx=food.x*CELL,fy=food.y*CELL;
  ctx.shadowBlur=15;ctx.shadowColor='#22c55e';
  ctx.fillStyle='#22c55e';
  ctx.beginPath();ctx.arc(fx+CELL/2,fy+CELL/2,CELL/2-2,0,Math.PI*2);ctx.fill();
  ctx.shadowBlur=0;
  // Snake
  snake.forEach((s,i)=>{
    const pct=i/snake.length;
    const r=14-Math.floor(pct*4);
    ctx.shadowBlur=i===0?20:0;
    ctx.shadowColor='#22d3ee';
    ctx.fillStyle=i===0?'#22d3ee':(\`hsl(\${185+pct*30},90%,\${55-pct*15}%)\`);
    ctx.beginPath();
    ctx.roundRect(s.x*CELL+2,s.y*CELL+2,CELL-4,CELL-4,i===0?6:4);
    ctx.fill();
    if(i===0){ctx.shadowBlur=0;}
  });
}
function move(){
  dir=next;
  const head={x:snake[0].x+dir.x,y:snake[0].y+dir.y};
  if(head.x<0||head.x>=COLS||head.y<0||head.y>=ROWS||snake.some(s=>s.x===head.x&&s.y===head.y)){
    endGame();return;
  }
  snake.unshift(head);
  if(head.x===food.x&&head.y===food.y){
    score+=10;$('score').textContent=score;
    if(score>hi){hi=score;$('hi').textContent=hi;}
    food=randomFood();
  } else {snake.pop();}
}
let last=0,speed=150;
function loop(ts){
  if(!running)return;
  if(ts-last>speed){last=ts;move();draw();speed=Math.max(80,150-Math.floor(snake.length/5)*10);}
  raf=requestAnimationFrame(loop);
}
function endGame(){
  running=false;gameOver=true;
  $('msg').style.display='flex';$('msg').style.flexDirection='column';$('msg').style.alignItems='center';
  $('msg').innerHTML=\`<h2>💀 Game Over</h2><p>Score: <strong style="color:#22d3ee">\${score}</strong></p><button id="startBtn">Play Again</button>\`;
  $('startBtn').onclick=startGame;
}
function startGame(){
  $('msg').style.display='none';init();running=true;last=0;speed=150;
  cancelAnimationFrame(raf);raf=requestAnimationFrame(loop);
}
$('startBtn').onclick=startGame;
document.addEventListener('keydown',e=>{
  if(!running)return;
  const k=e.key;
  if((k==='ArrowUp'||k==='w'||k==='W')&&dir.y!==1)next={x:0,y:-1};
  if((k==='ArrowDown'||k==='s'||k==='S')&&dir.y!==-1)next={x:0,y:1};
  if((k==='ArrowLeft'||k==='a'||k==='A')&&dir.x!==1)next={x:-1,y:0};
  if((k==='ArrowRight'||k==='d'||k==='D')&&dir.x!==-1)next={x:1,y:0};
  e.preventDefault();
});
// Touch support
let tx=0,ty=0;
canvas.addEventListener('touchstart',e=>{tx=e.touches[0].clientX;ty=e.touches[0].clientY;},{passive:true});
canvas.addEventListener('touchend',e=>{
  const dx=e.changedTouches[0].clientX-tx,dy=e.changedTouches[0].clientY-ty;
  if(Math.abs(dx)>Math.abs(dy)){if(dx>0&&dir.x!==−1)next={x:1,y:0};else if(dx<0&&dir.x!==1)next={x:-1,y:0};}
  else{if(dy>0&&dir.y!==−1)next={x:0,y:1};else if(dy<0&&dir.y!==1)next={x:0,y:-1};}
},{passive:true});
draw();
</script>
</body></html>`;
}

// ─── CYBER BREAKOUT ──────────────────────────────────────────────────────────
export function getBreakoutHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Cyber Breakout</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#120824;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;font-family:'Segoe UI',sans-serif;color:#fff;overflow:hidden}
  #ui{display:flex;gap:2rem;margin-bottom:.75rem;font-size:.95rem;color:#94a3b8}
  #ui span{color:#a855f7;font-weight:700}
  canvas{border:2px solid #a855f7;border-radius:8px;box-shadow:0 0 30px rgba(168,85,247,0.3)}
  #msg{position:absolute;text-align:center;background:rgba(18,8,36,0.95);padding:2rem 3rem;border-radius:16px;border:1px solid #a855f7;box-shadow:0 0 40px rgba(168,85,247,0.3);display:flex;flex-direction:column;align-items:center}
  #msg h2{font-size:1.8rem;color:#a855f7;margin-bottom:.5rem}
  #msg p{color:#94a3b8;margin-bottom:1.5rem}
  button{background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;border:none;padding:.7rem 2rem;border-radius:999px;font-size:1rem;cursor:pointer;font-weight:600;transition:.2s}
  button:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(168,85,247,.6)}
  #controls{margin-top:.5rem;font-size:.75rem;color:#64748b}
</style>
</head>
<body>
<div id="ui">Score:<span id="sc">0</span> Lives:<span id="lv">3</span> Level:<span id="lv2">1</span></div>
<canvas id="c" width="480" height="380"></canvas>
<div id="controls">Mouse to move paddle · Click to launch</div>
<div id="msg" id="msg">
  <h2>🎯 Cyber Breakout</h2>
  <p>Break all the bricks. Don't let the ball drop!</p>
  <button id="btn">Start Game</button>
</div>
<script>
const canvas=document.getElementById('c'),ctx=canvas.getContext('2d');
const W=480,H=380;
let ball,paddle,bricks,sc=0,lives=3,level=1,running=false,launched=false,raf;
const PCOLS=8,PROWS=5,BW=48,BH=16,BGAP=4,BOFF_X=20,BOFF_Y=50;
const COLORS=['#ef4444','#f97316','#eab308','#22c55e','#3b82f6'];
const $=id=>document.getElementById(id);
function initBricks(){
  bricks=[];
  for(let r=0;r<PROWS;r++)for(let c=0;c<PCOLS;c++){
    bricks.push({x:BOFF_X+c*(BW+BGAP),y:BOFF_Y+r*(BH+BGAP),alive:true,color:COLORS[r%COLORS.length],hits:r<2?2:1});
  }
}
function initGame(){
  paddle={x:W/2-40,y:H-30,w:80,h=12,speed:0};
  ball={x:W/2,y:H-50,r:7,dx:3+level*0.3,dy:-(3+level*0.3)};
  initBricks();launched=false;
}
function drawRoundRect(x,y,w,h,r,fill){
  ctx.fillStyle=fill;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();
}
function draw(){
  ctx.fillStyle='#120824';ctx.fillRect(0,0,W,H);
  // Grid
  for(let x=0;x<W;x+=30)for(let y=0;y<H;y+=30){
    ctx.fillStyle='rgba(168,85,247,0.03)';ctx.fillRect(x,y,1,1);
  }
  // Bricks
  bricks.forEach(b=>{
    if(!b.alive)return;
    ctx.shadowBlur=8;ctx.shadowColor=b.color;
    drawRoundRect(b.x,b.y,BW,BH,4,b.hits>1?'#fff':b.color);
    ctx.shadowBlur=0;
    if(b.hits>1){ctx.fillStyle=b.color;ctx.font='bold 10px sans-serif';ctx.textAlign='center';ctx.fillText(b.hits,b.x+BW/2,b.y+BH/2+4);}
  });
  // Paddle
  const pg=ctx.createLinearGradient(paddle.x,0,paddle.x+paddle.w,0);
  pg.addColorStop(0,'#7c3aed');pg.addColorStop(1,'#a855f7');
  ctx.shadowBlur=12;ctx.shadowColor='#a855f7';
  drawRoundRect(paddle.x,paddle.y,paddle.w,paddle.h,6,pg);
  ctx.shadowBlur=0;
  // Ball
  ctx.shadowBlur=15;ctx.shadowColor='#fff';
  ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(ball.x,ball.y,ball.r,0,Math.PI*2);ctx.fill();
  ctx.shadowBlur=0;
  if(!launched){
    ctx.fillStyle='rgba(168,85,247,0.7)';ctx.font='13px sans-serif';
    ctx.textAlign='center';ctx.fillText('Click to launch',W/2,H/2+80);
  }
}
function update(){
  if(!launched){ball.x=paddle.x+paddle.w/2;return;}
  ball.x+=ball.dx;ball.y+=ball.dy;
  if(ball.x-ball.r<=0||ball.x+ball.r>=W)ball.dx*=-1;
  if(ball.y-ball.r<=0)ball.dy*=-1;
  if(ball.y+ball.r>=H){
    lives--;$('lv').textContent=lives;
    if(lives<=0){endGame(false);return;}
    initGame();return;
  }
  // Paddle collision
  if(ball.y+ball.r>=paddle.y&&ball.y-ball.r<=paddle.y+paddle.h&&ball.x>=paddle.x&&ball.x<=paddle.x+paddle.w){
    ball.dy=Math.abs(ball.dy)*-1;
    ball.dx+=((ball.x-(paddle.x+paddle.w/2))/paddle.w)*3;
  }
  // Brick collision
  let allDead=true;
  bricks.forEach(b=>{
    if(!b.alive)return;
    allDead=false;
    if(ball.x+ball.r>b.x&&ball.x-ball.r<b.x+BW&&ball.y+ball.r>b.y&&ball.y-ball.r<b.y+BH){
      b.hits--;if(b.hits<=0){b.alive=true;b.alive=false;sc+=10*level;$('sc').textContent=sc;}
      ball.dy*=-1;
    }
  });
  if(allDead){level++;$('lv2').textContent=level;initGame();launched=true;ball.dx*=1.1;ball.dy*=1.1;}
}
function endGame(win){
  running=false;cancelAnimationFrame(raf);
  $('msg').style.display='flex';
  $('msg').innerHTML=\`<h2>\${win?'🎉 You Win!':'💀 Game Over'}</h2><p>Score: <strong style="color:#a855f7">\${sc}</strong></p><button id="btn">Play Again</button>\`;
  $('btn').onclick=startGame;
}
function loop(){if(!running)return;update();draw();raf=requestAnimationFrame(loop);}
function startGame(){
  sc=0;lives=3;level=1;$('sc').textContent=0;$('lv').textContent=3;$('lv2').textContent=1;
  $('msg').style.display='none';initGame();running=true;raf=requestAnimationFrame(loop);
}
$('btn').onclick=startGame;
canvas.addEventListener('mousemove',e=>{
  const rect=canvas.getBoundingClientRect();
  const mx=(e.clientX-rect.left)*(W/rect.width);
  paddle.x=Math.max(0,Math.min(W-paddle.w,mx-paddle.w/2));
});
canvas.addEventListener('click',()=>{if(!launched&&running)launched=true;});
draw();
</script>
</body></html>`;
}

// ─── FLAPPY ROCKET ────────────────────────────────────────────────────────────
export function getFlappyHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Flappy Rocket</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#0a1a0d;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;font-family:'Segoe UI',sans-serif;overflow:hidden;color:#fff}
  canvas{border:2px solid #22c55e;border-radius:8px;box-shadow:0 0 30px rgba(34,197,94,.35)}
  #msg{position:absolute;text-align:center;background:rgba(10,26,13,.95);padding:2rem 2.5rem;border-radius:16px;border:1px solid #22c55e;display:flex;flex-direction:column;align-items:center;box-shadow:0 0 40px rgba(34,197,94,.3)}
  #msg h2{font-size:1.8rem;color:#22c55e;margin-bottom:.5rem}
  #msg p{color:#94a3b8;margin-bottom:1.5rem}
  button{background:linear-gradient(135deg,#16a34a,#22c55e);color:#fff;border:none;padding:.7rem 2rem;border-radius:999px;font-size:1rem;cursor:pointer;font-weight:600;transition:.2s}
  button:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(34,197,94,.6)}
</style>
</head>
<body>
<canvas id="c" width="360" height="560"></canvas>
<div id="msg">
  <h2>🚀 Flappy Rocket</h2>
  <p>Tap, click, or press Space to fly through the pipes!</p>
  <button id="btn">Start</button>
</div>
<script>
const canvas=document.getElementById('c'),ctx=canvas.getContext('2d');
const W=360,H=560,G=0.45,JUMP=-8,PIPE_W=52,GAP=140,PIPE_SPEED=2.5;
let bird,pipes,sc,hi=0,running=false,raf,$=id=>document.getElementById(id);
function init(){bird={x:80,y:H/2,vy:0,r:14};pipes=[];sc=0;addPipe();}
function addPipe(){
  const top=80+Math.random()*(H-GAP-160);
  pipes.push({x:W,top,bottom:top+GAP,scored:false});
}
function drawBG(){
  ctx.fillStyle='#0a1a0d';ctx.fillRect(0,0,W,H);
  for(let i=0;i<60;i++){
    ctx.fillStyle=\`rgba(34,197,94,\${Math.random()*.08+.02})\`;
    const sx=Math.random()*W,sy=Math.random()*H;
    ctx.fillRect(sx,sy,1,1);
  }
}
function drawPipe(p){
  const g=ctx.createLinearGradient(p.x,0,p.x+PIPE_W,0);
  g.addColorStop(0,'#166534');g.addColorStop(.5,'#22c55e');g.addColorStop(1,'#166534');
  ctx.fillStyle=g;ctx.shadowBlur=8;ctx.shadowColor='#22c55e';
  // Top pipe
  ctx.fillRect(p.x,0,PIPE_W,p.top);
  ctx.fillRect(p.x-4,p.top-20,PIPE_W+8,20);
  // Bottom pipe
  ctx.fillRect(p.x,p.bottom,PIPE_W,H-p.bottom);
  ctx.fillRect(p.x-4,p.bottom,PIPE_W+8,20);
  ctx.shadowBlur=0;
}
function drawBird(){
  const{x,y,vy}=bird;
  const angle=Math.max(-0.4,Math.min(0.6,vy*0.07));
  ctx.save();ctx.translate(x,y);ctx.rotate(angle);
  ctx.shadowBlur=20;ctx.shadowColor='#4ade80';
  // Body
  ctx.fillStyle='#a3e635';
  ctx.beginPath();ctx.ellipse(0,0,16,11,0,0,Math.PI*2);ctx.fill();
  // Flame
  const flame=ctx.createLinearGradient(-18,0,0,0);
  flame.addColorStop(0,'transparent');flame.addColorStop(.5,'#f97316');flame.addColorStop(1,'#ef4444');
  ctx.fillStyle=flame;
  ctx.beginPath();ctx.ellipse(-14,0,10,5,0,0,Math.PI*2);ctx.fill();
  // Window
  ctx.fillStyle='#0ea5e9';ctx.beginPath();ctx.arc(4,0,5,0,Math.PI*2);ctx.fill();
  ctx.restore();ctx.shadowBlur=0;
}
function update(){
  bird.vy+=G;bird.y+=bird.vy;
  if(bird.y+bird.r>H||bird.y-bird.r<0){endGame();return;}
  for(let i=pipes.length-1;i>=0;i--){
    pipes[i].x-=PIPE_SPEED;
    const p=pipes[i];
    if(bird.x+bird.r>p.x&&bird.x-bird.r<p.x+PIPE_W&&(bird.y-bird.r<p.top||bird.y+bird.r>p.bottom)){endGame();return;}
    if(!p.scored&&bird.x>p.x+PIPE_W){p.scored=true;sc++;$('scoreDisp').textContent=sc;}
    if(p.x+PIPE_W<0)pipes.splice(i,1);
  }
  if(pipes.length===0||pipes[pipes.length-1].x<W-230)addPipe();
}
function drawScore(){
  ctx.fillStyle='#fff';ctx.font='bold 28px Segoe UI';ctx.textAlign='center';
  ctx.shadowBlur=10;ctx.shadowColor='#22c55e';
  ctx.fillText(sc,W/2,50);ctx.shadowBlur=0;
  if(hi>0){ctx.font='14px Segoe UI';ctx.fillStyle='#86efac';ctx.fillText('Best: '+hi,W/2,72);}
}
function endGame(){running=false;cancelAnimationFrame(raf);if(sc>hi)hi=sc;
  $('msg').style.display='flex';
  $('msg').innerHTML=\`<h2>💥 Crashed!</h2><p>Score: <strong style="color:#22c55e">\${sc}</strong> · Best: <strong>\${hi}</strong></p><button id="btn">Try Again</button>\`;
  $('btn').onclick=startGame;
}
function loop(){if(!running)return;update();drawBG();pipes.forEach(drawPipe);drawBird();drawScore();raf=requestAnimationFrame(loop);}
function startGame(){$('msg').style.display='none';init();running=true;raf=requestAnimationFrame(loop);}
$('btn').onclick=startGame;
function flap(){if(running)bird.vy=JUMP;}
document.addEventListener('keydown',e=>{if(e.code==='Space'||e.key==='ArrowUp'){flap();e.preventDefault();}});
canvas.addEventListener('click',flap);canvas.addEventListener('touchstart',e=>{flap();e.preventDefault();},{passive:false});
// Add score display element
const sd=document.createElement('div');sd.id='scoreDisp';sd.style.cssText='position:absolute;top:10px;right:10px;color:#22c55e;font-weight:700;font-size:1.1rem';document.body.appendChild(sd);
drawBG();
</script>
</body></html>`;
}

// ─── MEMORY MATRIX ───────────────────────────────────────────────────────────
export function getMemoryHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Memory Matrix</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#120824;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:'Segoe UI',sans-serif;color:#fff;padding:1rem}
  h1{font-size:1.4rem;color:#a855f7;margin-bottom:.5rem}
  #info{color:#94a3b8;font-size:.85rem;margin-bottom:1rem;text-align:center}
  #grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;max-width:400px;width:100%}
  .card{aspect-ratio:1;background:rgba(168,85,247,.1);border:2px solid rgba(168,85,247,.2);border-radius:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:2rem;transition:.25s;user-select:none}
  .card.flipped,.card.matched{background:rgba(168,85,247,.25);border-color:#a855f7;box-shadow:0 0 15px rgba(168,85,247,.4)}
  .card.matched{background:rgba(34,197,94,.2);border-color:#22c55e;box-shadow:0 0 15px rgba(34,197,94,.4);cursor:default}
  .card.hide{font-size:0}
  #winMsg{display:none;text-align:center;margin-top:1.5rem}
  #winMsg h2{color:#22c55e;font-size:1.6rem}
  #winMsg p{color:#94a3b8;margin:.5rem 0 1rem}
  button{background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;border:none;padding:.6rem 1.8rem;border-radius:999px;font-size:.95rem;cursor:pointer;font-weight:600;transition:.2s}
  button:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(168,85,247,.5)}
</style>
</head>
<body>
<h1>🧩 Memory Matrix</h1>
<div id="info">Moves: <strong id="moves">0</strong> &nbsp;|&nbsp; Pairs: <strong id="pairs">0</strong>/8</div>
<div id="grid"></div>
<div id="winMsg">
  <h2>🎉 Solved!</h2>
  <p>You found all pairs in <strong id="finalMoves">0</strong> moves!</p>
  <button onclick="newGame()">Play Again</button>
</div>
<script>
const EMOJIS=['🎮','🚀','🌟','🎯','⚡','🔮','🏆','🎲'];
let cards=[],flipped=[],matched=0,moves=0,lock=false;
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function newGame(){
  moves=0;matched=0;flipped=[];lock=false;
  document.getElementById('moves').textContent=0;
  document.getElementById('pairs').textContent=0;
  document.getElementById('winMsg').style.display='none';
  const items=shuffle([...EMOJIS,...EMOJIS]);
  const grid=document.getElementById('grid');grid.innerHTML='';cards=[];
  items.forEach((emoji,i)=>{
    const el=document.createElement('div');el.className='card hide';el.dataset.emoji=emoji;el.dataset.idx=i;
    el.addEventListener('click',()=>flipCard(el));
    grid.appendChild(el);cards.push(el);
  });
}
function flipCard(el){
  if(lock||el.classList.contains('matched')||el.classList.contains('flipped'))return;
  el.classList.remove('hide');el.classList.add('flipped');el.textContent=el.dataset.emoji;
  flipped.push(el);
  if(flipped.length===2){
    lock=true;moves++;document.getElementById('moves').textContent=moves;
    const[a,b]=flipped;
    if(a.dataset.emoji===b.dataset.emoji){
      a.classList.add('matched');b.classList.add('matched');
      a.classList.remove('flipped');b.classList.remove('flipped');
      matched++;document.getElementById('pairs').textContent=matched;
      flipped=[];lock=false;
      if(matched===8){setTimeout(()=>{document.getElementById('finalMoves').textContent=moves;document.getElementById('winMsg').style.display='block';},300);}
    } else {
      setTimeout(()=>{
        a.classList.remove('flipped');b.classList.remove('flipped');
        a.classList.add('hide');b.classList.add('hide');
        a.textContent='';b.textContent='';
        flipped=[];lock=false;
      },900);
    }
  }
}
newGame();
</script>
</body></html>`;
}

// ─── SLIDING PUZZLE ──────────────────────────────────────────────────────────
export function getSlidingHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Slide Puzzle</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#0d1a1a;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:'Segoe UI',sans-serif;color:#fff;gap:1rem;padding:1rem}
  h1{color:#22d3ee;font-size:1.4rem}
  #info{color:#94a3b8;font-size:.85rem}
  #grid{display:grid;grid-template-columns:repeat(4,1fr);gap:5px;max-width:340px;width:100%}
  .tile{aspect-ratio:1;background:linear-gradient(135deg,#164e63,#0e7490);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;font-weight:700;color:#e0f2fe;cursor:pointer;transition:.15s;border:2px solid rgba(34,211,238,.2);user-select:none}
  .tile:hover:not(.empty){background:linear-gradient(135deg,#0e7490,#22d3ee);box-shadow:0 0 15px rgba(34,211,238,.35)}
  .empty{background:rgba(0,0,0,.3);border:2px dashed rgba(34,211,238,.15);cursor:default}
  button{background:linear-gradient(135deg,#0e7490,#22d3ee);color:#fff;border:none;padding:.6rem 1.8rem;border-radius:999px;font-size:.9rem;cursor:pointer;font-weight:600;transition:.2s}
  button:hover{transform:translateY(-2px)}
  #winMsg{display:none;text-align:center}
  #winMsg h2{color:#22c55e;font-size:1.5rem}
  #winMsg p{color:#94a3b8;margin:.4rem 0 1rem}
</style>
</head>
<body>
<h1>🔢 Slide Puzzle</h1>
<div id="info">Moves: <strong id="moves">0</strong></div>
<div id="grid"></div>
<div id="winMsg"><h2>✅ Solved!</h2><p>Completed in <strong id="fm">0</strong> moves!</p><button onclick="newGame()">New Game</button></div>
<button onclick="newGame()" style="margin-top:.5rem">Shuffle</button>
<script>
const N=4,SIZE=N*N;
let tiles=[],empty=SIZE-1,moves=0;
function isSolvable(arr){
  let inv=0;
  for(let i=0;i<SIZE-1;i++)for(let j=i+1;j<SIZE;j++)if(arr[i]&&arr[j]&&arr[i]>arr[j])inv++;
  const row=Math.floor(arr.indexOf(0)/N);
  return (N%2===1)?(inv%2===0):((Math.floor(empty/N)%2===0)!==(inv%2===0));
}
function shuffle(){
  let arr=Array.from({length:SIZE},(_,i)=>i);
  do{arr.sort(()=>Math.random()-.5);}while(!isSolvable(arr)||isSolved(arr));
  return arr;
}
function isSolved(arr){return arr.every((v,i)=>v===(i===SIZE-1?0:i+1));}
function render(){
  const grid=document.getElementById('grid');grid.innerHTML='';
  tiles.forEach((val,idx)=>{
    const el=document.createElement('div');
    el.className='tile'+(val===0?' empty':'');
    el.textContent=val===0?'':val;
    if(val!==0)el.addEventListener('click',()=>tryMove(idx));
    grid.appendChild(el);
  });
}
function tryMove(idx){
  const row=Math.floor(idx/N),col=idx%N,er=Math.floor(empty/N),ec=empty%N;
  if(!((row===er&&Math.abs(col-ec)===1)||(col===ec&&Math.abs(row-er)===1)))return;
  [tiles[idx],tiles[empty]]=[tiles[empty],tiles[idx]];
  empty=idx;moves++;document.getElementById('moves').textContent=moves;
  render();
  if(isSolved(tiles)){setTimeout(()=>{document.getElementById('fm').textContent=moves;document.getElementById('winMsg').style.display='block';},100);}
}
function newGame(){moves=0;document.getElementById('moves').textContent=0;document.getElementById('winMsg').style.display='none';tiles=shuffle();empty=tiles.indexOf(0);render();}
newGame();
</script>
</body></html>`;
}

// ─── SPEED MATH ──────────────────────────────────────────────────────────────
export function getMathQuizHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Speed Math</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#1a1a0d;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:'Segoe UI',sans-serif;color:#fff;padding:1.5rem;text-align:center}
  h1{color:#f59e0b;font-size:1.6rem;margin-bottom:.3rem}
  #desc{color:#94a3b8;font-size:.85rem;margin-bottom:1.5rem}
  #timer-bar{width:100%;max-width:380px;height:10px;background:rgba(245,158,11,.15);border-radius:999px;overflow:hidden;margin-bottom:1.5rem}
  #timer-fill{height:100%;background:linear-gradient(90deg,#f59e0b,#ef4444);border-radius:999px;transition:width .1s linear}
  #question{font-size:3rem;font-weight:800;color:#fbbf24;margin-bottom:1.5rem;min-height:3.5rem}
  #ansInput{width:180px;padding:.75rem 1.25rem;font-size:1.6rem;text-align:center;background:rgba(245,158,11,.1);border:2px solid rgba(245,158,11,.3);border-radius:12px;color:#fff;outline:none;margin-bottom:1rem}
  #ansInput:focus{border-color:#f59e0b;box-shadow:0 0 15px rgba(245,158,11,.3)}
  button{background:linear-gradient(135deg,#d97706,#f59e0b);color:#fff;border:none;padding:.7rem 2rem;border-radius:999px;font-size:1rem;cursor:pointer;font-weight:600;transition:.2s;margin:.3rem}
  button:hover{transform:translateY(-2px)}
  #stats{display:flex;gap:2rem;margin-bottom:1.5rem;color:#94a3b8;font-size:.95rem}
  #stats span{color:#f59e0b;font-weight:700;font-size:1.1rem}
  #feedback{height:1.8rem;font-size:1rem;font-weight:600;transition:.2s}
  .correct{color:#22c55e}
  .wrong{color:#ef4444}
  #gameOver{display:none;flex-direction:column;align-items:center;gap:.6rem;padding:2rem;background:rgba(26,26,13,.97);border:1px solid #f59e0b;border-radius:16px;box-shadow:0 0 40px rgba(245,158,11,.25)}
  #gameOver h2{color:#f59e0b;font-size:1.8rem}
</style>
</head>
<body>
<h1>⚡ Speed Math</h1>
<div id="desc">Solve as many equations as you can in 60 seconds!</div>
<div id="stats">Score: <span id="sc">0</span> &nbsp; Streak: <span id="str">0</span> &nbsp; Time: <span id="tm">60</span>s</div>
<div id="timer-bar"><div id="timer-fill" style="width:100%"></div></div>
<div id="question">Ready?</div>
<input id="ansInput" type="number" placeholder="?" autocomplete="off"/>
<div><button id="subBtn">Submit</button></div>
<div id="feedback"></div>
<div id="gameOver">
  <h2>⏱️ Time's Up!</h2>
  <p>Final Score: <strong id="fs" style="color:#f59e0b;font-size:1.3rem"></strong></p>
  <p style="color:#94a3b8">Correct: <strong id="fc"></strong> · Wrong: <strong id="fw"></strong></p>
  <button onclick="startGame()">Play Again</button>
</div>
<script>
let sc=0,streak=0,correct=0,wrong=0,timeLeft=60,q,ans,timer,running=false;
const $=id=>document.getElementById(id);
function genQuestion(){
  const ops=['+','-','×','÷'];
  let op=ops[Math.floor(Math.random()*ops.length)];
  let a,b;
  if(op==='+'||op==='-'){a=Math.floor(Math.random()*50)+1;b=Math.floor(Math.random()*50)+1;}
  else if(op==='×'){a=Math.floor(Math.random()*12)+1;b=Math.floor(Math.random()*12)+1;}
  else{b=Math.floor(Math.random()*10)+2;a=b*(Math.floor(Math.random()*10)+1);}
  let result;
  if(op==='+')result=a+b;else if(op==='-'){if(a<b)[a,b]=[b,a];result=a-b;}
  else if(op==='×')result=a*b;else result=a/b;
  ans=result;$('question').textContent=a+' '+op+' '+b+' = ?';
}
function submit(){
  if(!running)return;
  const val=parseInt($('ansInput').value);
  if(isNaN(val))return;
  if(val===ans){
    streak++;correct++;sc+=10*(streak>=3?2:1);
    $('feedback').className='correct';
    $('feedback').textContent=streak>=3?('\u2705 Correct! \uD83D\uDD25 x'+streak+' combo!'):'\u2705 Correct! +10';
  } else {
    streak=0;wrong++;
    $('feedback').className='wrong';
    $('feedback').textContent='❌ Wrong! Answer: '+ans;
  }
  $('sc').textContent=sc;$('str').textContent=streak;$('ansInput').value='';$('ansInput').focus();
  genQuestion();
  setTimeout(()=>$('feedback').textContent='',1200);
}
function startGame(){
  sc=0;streak=0;correct=0;wrong=0;timeLeft=60;running=true;
  $('sc').textContent=0;$('str').textContent=0;$('tm').textContent=60;
  $('gameOver').style.display='none';$('ansInput').value='';$('ansInput').focus();
  $('timer-fill').style.width='100%';
  genQuestion();clearInterval(timer);
  timer=setInterval(()=>{
    timeLeft--;$('tm').textContent=timeLeft;
    $('timer-fill').style.width=(timeLeft/60*100)+'%';
    if(timeLeft<=0){clearInterval(timer);running=false;$('question').textContent='⏱️';
      $('fs').textContent=sc;$('fc').textContent=correct;$('fw').textContent=wrong;
      $('gameOver').style.display='flex';}
  },1000);
}
$('subBtn').onclick=submit;
$('ansInput').addEventListener('keydown',e=>{if(e.key==='Enter')submit();});
genQuestion();
</script>
</body></html>`;
}

// ─── COLOUR SENSE ────────────────────────────────────────────────────────────
export function getColorGuessHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Colour Sense</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#1a0d1a;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:'Segoe UI',sans-serif;color:#fff;padding:1.5rem;text-align:center}
  h1{color:#ec4899;font-size:1.5rem;margin-bottom:.3rem}
  #desc{color:#94a3b8;font-size:.85rem;margin-bottom:1.5rem}
  #swatch{width:140px;height:140px;border-radius:20px;margin:0 auto 1.5rem;border:3px solid rgba(236,72,153,.4);box-shadow:0 0 30px rgba(236,72,153,.3);transition:.3s}
  #level{color:#94a3b8;margin-bottom:.3rem;font-size:.85rem}
  #score{color:#f0abfc;font-size:1.1rem;font-weight:700;margin-bottom:1.2rem}
  #opts{display:grid;grid-template-columns:1fr 1fr;gap:10px;max-width:340px;width:100%;margin:0 auto}
  .opt{padding:1rem;border-radius:12px;cursor:pointer;font-weight:600;transition:.2s;border:2px solid transparent;color:#fff;font-size:.85rem}
  .opt:hover{transform:scale(1.04)}
  #feedback{height:1.5rem;margin:1rem 0;font-size:1rem;font-weight:600}
  .correct{color:#22c55e}.wrong{color:#ef4444}
  #gameOver{display:none;flex-direction:column;align-items:center;gap:.6rem;padding:2rem;background:rgba(26,13,26,.97);border:1px solid #ec4899;border-radius:16px;box-shadow:0 0 40px rgba(236,72,153,.25)}
  #gameOver h2{color:#ec4899;font-size:1.8rem}
  button{background:linear-gradient(135deg,#9d174d,#ec4899);color:#fff;border:none;padding:.65rem 1.8rem;border-radius:999px;font-size:.95rem;cursor:pointer;font-weight:600;margin-top:.5rem;transition:.2s}
  button:hover{transform:translateY(-2px)}
</style>
</head>
<body>
<h1>🎨 Colour Sense</h1>
<div id="desc">Which option matches the swatch colour?</div>
<div id="swatch"></div>
<div id="level">Level 1</div>
<div id="score">Score: 0</div>
<div id="opts"></div>
<div id="feedback"></div>
<div id="gameOver">
  <h2>Game Over!</h2>
  <p>Final Score: <strong id="fs" style="color:#ec4899;font-size:1.3rem">0</strong></p>
  <button onclick="startGame()">Try Again</button>
</div>
<script>
let sc=0,level=1,lives=3,targetColor,running=false,$=id=>document.getElementById(id);
function randHex(){return'#'+[0,0,0].map(()=>Math.floor(Math.random()*256).toString(16).padStart(2,'0')).join('');}
function hexToRgb(h){const r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16);return{r,g,b};}
function nearColor(h,spread){
  const{r,g,b}=hexToRgb(h);
  const nr=Math.min(255,Math.max(0,r+(Math.random()*spread*2-spread)|0));
  const ng=Math.min(255,Math.max(0,g+(Math.random()*spread*2-spread)|0));
  const nb=Math.min(255,Math.max(0,b+(Math.random()*spread*2-spread)|0));
  return'#'+[nr,ng,nb].map(v=>v.toString(16).padStart(2,'0')).join('');
}
function nextRound(){
  targetColor=randHex();$('swatch').style.background=targetColor;
  const spread=Math.max(20,80-level*8);
  const opts=[targetColor,...Array.from({length:3},()=>nearColor(targetColor,spread))];
  opts.sort(()=>Math.random()-.5);
  const container=$('opts');container.innerHTML='';
  opts.forEach(c=>{
    const el=document.createElement('div');el.className='opt';el.style.background=c;
    el.style.border='2px solid rgba(255,255,255,0.2)';
    el.addEventListener('click',()=>pick(c,el));
    container.appendChild(el);
  });
  $('level').textContent='Level '+level;$('score').textContent='Score: '+sc;
}
function pick(chosen,el){
  if(!running)return;
  if(chosen===targetColor){
    sc+=level*10;level++;$('feedback').className='correct';$('feedback').textContent='✅ Correct!';
    el.style.border='3px solid #22c55e';el.style.boxShadow='0 0 15px #22c55e';
    setTimeout(()=>{$('feedback').textContent='';nextRound();},700);
  } else {
    lives--;$('feedback').className='wrong';$('feedback').textContent='❌ Wrong!';
    el.style.border='3px solid #ef4444';
    if(lives<=0){setTimeout(()=>{running=false;$('fs').textContent=sc;$('gameOver').style.display='flex';},500);}
    else setTimeout(()=>{$('feedback').textContent='';nextRound();},700);
  }
}
function startGame(){sc=0;level=1;lives=3;running=true;$('gameOver').style.display='none';$('feedback').textContent='';nextRound();}
startGame();
</script>
</body></html>`;
}

// ─── VOID SHOOTER (Asteroids) ─────────────────────────────────────────────────
export function getAsteroidsHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Void Shooter</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;font-family:'Segoe UI',sans-serif;overflow:hidden}
  canvas{border:2px solid #4f9eff;border-radius:8px;box-shadow:0 0 30px rgba(79,158,255,.4)}
  #msg{position:absolute;text-align:center;background:rgba(0,0,16,.95);padding:2rem 3rem;border-radius:16px;border:1px solid #4f9eff;display:flex;flex-direction:column;align-items:center;box-shadow:0 0 40px rgba(79,158,255,.3)}
  #msg h2{font-size:1.8rem;color:#4f9eff;margin-bottom:.5rem}
  #msg p{color:#94a3b8;margin-bottom:1.5rem}
  button{background:linear-gradient(135deg,#4f46e5,#4f9eff);color:#fff;border:none;padding:.7rem 2rem;border-radius:999px;font-size:1rem;cursor:pointer;font-weight:600;transition:.2s}
  button:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(79,158,255,.5)}
  #controls{color:#64748b;font-size:.75rem;margin-top:.5rem}
</style>
</head>
<body>
<canvas id="c" width="520" height="420"></canvas>
<div id="msg">
  <h2>🚀 Void Shooter</h2>
  <p>Destroy all asteroids to survive!</p>
  <button id="btn">Start Game</button>
  <div id="controls">↑ Thrust · ← → Rotate · Space Shoot</div>
</div>
<script>
const canvas=document.getElementById('c'),ctx=canvas.getContext('2d');
const W=520,H=420,DEG=Math.PI/180;
let ship,bullets,asteroids,sc,hi=0,lives,running=false,raf,keys={};
const $=id=>document.getElementById(id);
function mkShip(){return{x:W/2,y:H/2,angle:0,vx:0,vy:0,r:12,invincible:0};}
function mkAsteroid(x,y,size){
  let angle=Math.random()*360;let speed=(4-size)*0.4+0.5;
  const verts=Math.floor(7+Math.random()*4);
  const shape=Array.from({length:verts},(_,i)=>{
    const a=i*(360/verts)*DEG;const d=(size*12)+(Math.random()*size*6);
    return{x:Math.cos(a)*d,y:Math.sin(a)*d};
  });
  return{x,y,vx:Math.cos(angle*DEG)*speed,vy:Math.sin(angle*DEG)*speed,size,shape,r:size*14};
}
function safeAsteroid(){
  let x,y;
  do{x=Math.random()*W;y=Math.random()*H;}
  while(Math.hypot(x-ship.x,y-ship.y)<120);
  return mkAsteroid(x,y,3);
}
function initGame(){
  ship=mkShip();bullets=[];sc=0;lives=3;
  asteroids=Array.from({length:4},safeAsteroid);
}
function drawShip(){
  if(ship.invincible>0&&Math.floor(ship.invincible/5)%2)return;
  ctx.save();ctx.translate(ship.x,ship.y);ctx.rotate(ship.angle*DEG);
  ctx.shadowBlur=15;ctx.shadowColor='#4f9eff';
  ctx.strokeStyle='#4f9eff';ctx.lineWidth=2;ctx.beginPath();
  ctx.moveTo(20,0);ctx.lineTo(-14,12);ctx.lineTo(-8,0);ctx.lineTo(-14,-12);ctx.closePath();
  ctx.stroke();
  if(keys['ArrowUp']||keys['w']){
    ctx.strokeStyle='#f97316';ctx.lineWidth=1.5;ctx.beginPath();
    ctx.moveTo(-8,0);ctx.lineTo(-18+(Math.random()*8),0);ctx.stroke();
  }
  ctx.restore();ctx.shadowBlur=0;
}
function drawBullet(b){
  ctx.shadowBlur=8;ctx.shadowColor='#22d3ee';ctx.fillStyle='#22d3ee';
  ctx.beginPath();ctx.arc(b.x,b.y,3,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
}
function drawAsteroid(a){
  ctx.save();ctx.translate(a.x,a.y);ctx.strokeStyle=\`hsl(\${200+a.size*20},80%,65%)\`;
  ctx.lineWidth=1.5;ctx.shadowBlur=6;ctx.shadowColor=ctx.strokeStyle;
  ctx.beginPath();a.shape.forEach((p,i)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y));
  ctx.closePath();ctx.stroke();ctx.restore();ctx.shadowBlur=0;
}
function shoot(){
  const angle=(ship.angle-90)*DEG;
  bullets.push({x:ship.x+Math.cos(angle)*20,y:ship.y+Math.sin(angle)*20,
    vx:Math.cos(angle)*10,vy:Math.sin(angle)*10,life:55});
}
function update(){
  if(keys['ArrowLeft']||keys['a'])ship.angle-=4;
  if(keys['ArrowRight']||keys['d'])ship.angle+=4;
  if(keys['ArrowUp']||keys['w']){
    const a=(ship.angle-90)*DEG;ship.vx+=Math.cos(a)*0.25;ship.vy+=Math.sin(a)*0.25;
  }
  ship.vx*=0.98;ship.vy*=0.98;
  ship.x=(ship.x+ship.vx+W)%W;ship.y=(ship.y+ship.vy+H)%H;
  if(ship.invincible>0)ship.invincible--;
  bullets=bullets.filter(b=>{b.x+=b.vx;b.y+=b.vy;b.life--;return b.life>0&&b.x>0&&b.x<W&&b.y>0&&b.y<H;});
  // Asteroid vs bullet
  for(let bi=bullets.length-1;bi>=0;bi--){
    for(let ai=asteroids.length-1;ai>=0;ai--){
      const b=bullets[bi],a=asteroids[ai];
      if(Math.hypot(b.x-a.x,b.y-a.y)<a.r){
        bullets.splice(bi,1);
        sc+=a.size*10;
        if(a.size>1){
          asteroids.push(mkAsteroid(a.x,a.y,a.size-1));
          asteroids.push(mkAsteroid(a.x,a.y,a.size-1));
        }
        asteroids.splice(ai,1);break;
      }
    }
  }
  // Asteroid vs ship
  if(ship.invincible===0){
    for(const a of asteroids){
      if(Math.hypot(ship.x-a.x,ship.y-a.y)<a.r+ship.r){
        lives--;if(lives<=0){endGame();return;}
        ship=mkShip();ship.invincible=120;break;
      }
    }
  }
  asteroids.forEach(a=>{a.x=(a.x+a.vx+W)%W;a.y=(a.y+a.vy+H)%H;});
  if(asteroids.length===0)asteroids.push(...Array.from({length:4+Math.floor(sc/200)},safeAsteroid));
}
function drawHUD(){
  ctx.fillStyle='#4f9eff';ctx.font='bold 16px Segoe UI';ctx.textAlign='left';
  ctx.fillText('Score: '+sc,12,24);ctx.fillText('Lives: '+'💙'.repeat(lives),12,46);
  if(hi>0){ctx.textAlign='right';ctx.fillStyle='#94a3b8';ctx.font='13px Segoe UI';ctx.fillText('Best: '+hi,W-12,24);}
}
function loop(){if(!running)return;
  ctx.fillStyle='rgba(0,0,8,.8)';ctx.fillRect(0,0,W,H);
  asteroids.forEach(drawAsteroid);bullets.forEach(drawBullet);drawShip();drawHUD();update();
  raf=requestAnimationFrame(loop);
}
let shootCooldown=0;
document.addEventListener('keydown',e=>{keys[e.key]=true;
  if(e.key===' '&&running&&shootCooldown<=0){shoot();shootCooldown=12;e.preventDefault();}
});
document.addEventListener('keyup',e=>{keys[e.key]=false;});
setInterval(()=>{if(shootCooldown>0)shootCooldown--;},16);
function endGame(){running=false;cancelAnimationFrame(raf);if(sc>hi)hi=sc;
  $('msg').style.display='flex';
  $('msg').innerHTML=\`<h2>💥 Game Over</h2><p>Score: <strong style="color:#4f9eff">\${sc}</strong></p><button id="btn">Play Again</button>\`;
  $('btn').onclick=startGame;
}
function startGame(){$('msg').style.display='none';initGame();running=true;raf=requestAnimationFrame(loop);}
$('btn').onclick=startGame;
// Star field
const stars=Array.from({length:80},()=>({x:Math.random()*W,y:Math.random()*H,s:Math.random()*1.5+.5}));
</script>
</body></html>`;
}

// ─── PIXEL RUN (Platformer) ──────────────────────────────────────────────────
export function getPlatformerHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Pixel Run</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#0d1a0d;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;font-family:'Segoe UI',sans-serif;overflow:hidden;color:#fff}
  canvas{border:2px solid #22c55e;border-radius:8px;box-shadow:0 0 30px rgba(34,197,94,.35)}
  #msg{position:absolute;text-align:center;background:rgba(13,26,13,.97);padding:2rem 3rem;border-radius:16px;border:1px solid #22c55e;display:flex;flex-direction:column;align-items:center}
  h2{color:#22c55e;font-size:1.8rem;margin-bottom:.5rem}
  #msg p{color:#94a3b8;margin-bottom:1.5rem}
  button{background:linear-gradient(135deg,#166534,#22c55e);color:#fff;border:none;padding:.7rem 2rem;border-radius:999px;font-size:1rem;cursor:pointer;font-weight:600;transition:.2s}
  button:hover{transform:translateY(-2px)}
  #controls{color:#64748b;font-size:.75rem;margin-top:.5rem}
</style>
</head>
<body>
<canvas id="c" width="540" height="340"></canvas>
<div id="msg">
  <h2>🏃 Pixel Run</h2>
  <p>Jump over obstacles, collect gems!</p>
  <button id="btn">Start</button>
  <div id="controls">Space / Click / Tap to jump · Double-jump available!</div>
</div>
<script>
const canvas=document.getElementById('c'),ctx=canvas.getContext('2d');
const W=540,H=340,GROUND=H-50,G=0.6,JUMP=-13;
let player,obstacles,gems,sc,hi=0,dist,speed,running=false,raf,gameOver=false;
const $=id=>document.getElementById(id);
function init(){
  player={x:80,y:GROUND,w:28,h:36,vy:0,jumps:0,color:'#22c55e'};
  obstacles=[];gems=[];sc=0;dist=0;speed=4;
  spawnTimer=0;gemTimer=0;gameOver=false;
}
let spawnTimer=0,gemTimer=0;
function spawnObstacle(){
  const h=30+Math.random()*50;const w=22+Math.random()*20;
  obstacles.push({x:W,y:GROUND-h+player.h,w,h,color:'#ef4444'});
}
function spawnGem(){gems.push({x:W,y:GROUND-60-Math.random()*80,r:8,color:'#fbbf24',taken:false});}
function drawBG(){
  const grad=ctx.createLinearGradient(0,0,0,H);
  grad.addColorStop(0,'#0a1a0d');grad.addColorStop(1,'#0d2014');
  ctx.fillStyle=grad;ctx.fillRect(0,0,W,H);
  // Ground
  ctx.fillStyle='#166534';ctx.fillRect(0,GROUND+player.h,W,H-GROUND-player.h);
  ctx.fillStyle='#22c55e';ctx.fillRect(0,GROUND+player.h,W,3);
  // Stars
  for(let i=0;i<25;i++){ctx.fillStyle='rgba(255,255,255,0.4)';ctx.fillRect((i*73+dist*0.1)%W,10+i*5%60,1.5,1.5);}
}
function drawPlayer(){
  const p=player;ctx.shadowBlur=12;ctx.shadowColor='#22c55e';
  ctx.fillStyle=p.color;ctx.beginPath();ctx.roundRect(p.x,p.y,p.w,p.h,6);ctx.fill();
  // Eyes
  ctx.shadowBlur=0;ctx.fillStyle='#0d2014';
  ctx.fillRect(p.x+6,p.y+8,6,6);ctx.fillRect(p.x+16,p.y+8,6,6);
  // Legs (running animation)
  const legOff=Math.sin(dist*0.2)*8;
  ctx.fillStyle='#166534';ctx.fillRect(p.x+4,p.y+p.h,8,8+legOff);ctx.fillRect(p.x+p.w-12,p.y+p.h,8,8-legOff);
}
function drawObstacle(o){
  ctx.shadowBlur=8;ctx.shadowColor='#ef4444';
  ctx.fillStyle='#b91c1c';ctx.beginPath();ctx.roundRect(o.x,o.y,o.w,o.h,4);ctx.fill();
  ctx.fillStyle='#ef4444';ctx.fillRect(o.x+2,o.y+2,o.w-4,4);ctx.shadowBlur=0;
}
function drawGem(g){
  if(g.taken)return;ctx.shadowBlur=10;ctx.shadowColor=g.color;ctx.fillStyle=g.color;
  ctx.beginPath();ctx.arc(g.x,g.y,g.r,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
}
function drawHUD(){
  ctx.fillStyle='#22c55e';ctx.font='bold 16px Segoe UI';ctx.textAlign='left';
  ctx.fillText('Score: '+sc,12,24);
  if(hi>0){ctx.textAlign='right';ctx.fillStyle='#86efac';ctx.font='13px Segoe UI';ctx.fillText('Best: '+hi,W-12,24);}
}
function update(){
  dist++;speed=4+dist/500;
  spawnTimer++;if(spawnTimer>(80-Math.min(dist/300,40))){spawnTimer=0;spawnObstacle();}
  gemTimer++;if(gemTimer>120){gemTimer=0;spawnGem();}
  player.vy+=G;player.y+=player.vy;
  if(player.y>=GROUND){player.y=GROUND;player.vy=0;player.jumps=0;}
  obstacles.forEach(o=>o.x-=speed);
  gems.forEach(g=>g.x-=speed);
  // Collisions
  obstacles=obstacles.filter(o=>{
    if(player.x+player.w-4>o.x&&player.x+4<o.x+o.w&&player.y+player.h-4>o.y&&player.y+4<o.y+o.h){
      endGame();return false;}
    return o.x+o.w>0;
  });
  gems.forEach(g=>{
    if(!g.taken&&player.x+player.w>g.x-g.r&&player.x<g.x+g.r&&player.y+player.h>g.y-g.r&&player.y<g.y+g.r){
      g.taken=true;sc+=5;}
  });
  gems=gems.filter(g=>g.x>-10&&!g.taken);
  sc=Math.max(sc,Math.floor(dist/10));
}
function loop(){if(!running)return;drawBG();obstacles.forEach(drawObstacle);gems.forEach(drawGem);drawPlayer();drawHUD();update();raf=requestAnimationFrame(loop);}
function jump(){if(!running)return;if(player.jumps<2){player.vy=JUMP;player.jumps++;}}
function endGame(){running=false;cancelAnimationFrame(raf);if(sc>hi)hi=sc;
  $('msg').style.display='flex';
  $('msg').innerHTML=\`<h2>💥 Crashed!</h2><p>Score: <strong style="color:#22c55e">\${sc}</strong> · Best: \${hi}</p><button id="btn">Try Again</button>\`;
  $('btn').onclick=startGame;
}
function startGame(){$('msg').style.display='none';init();running=true;raf=requestAnimationFrame(loop);}
$('btn').onclick=startGame;
document.addEventListener('keydown',e=>{if(e.key===' '||e.key==='ArrowUp'||e.key==='w'){jump();e.preventDefault();}});
canvas.addEventListener('click',jump);canvas.addEventListener('touchstart',e=>{jump();e.preventDefault();},{passive:false});
drawBG();
</script>
</body></html>`;
}

// ─── NEON RACER ──────────────────────────────────────────────────────────────
export function getRacerHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Neon Racer</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#1a0a0a;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;font-family:'Segoe UI',sans-serif;overflow:hidden;color:#fff}
  canvas{border:2px solid #ef4444;border-radius:8px;box-shadow:0 0 30px rgba(239,68,68,.35)}
  #msg{position:absolute;text-align:center;background:rgba(26,10,10,.97);padding:2rem 3rem;border-radius:16px;border:1px solid #ef4444;display:flex;flex-direction:column;align-items:center}
  h2{color:#ef4444;font-size:1.8rem;margin-bottom:.5rem}
  #msg p{color:#94a3b8;margin-bottom:1.5rem}
  button{background:linear-gradient(135deg,#991b1b,#ef4444);color:#fff;border:none;padding:.7rem 2rem;border-radius:999px;font-size:1rem;cursor:pointer;font-weight:600;transition:.2s}
  button:hover{transform:translateY(-2px)}
  #controls{color:#64748b;font-size:.75rem;margin-top:.5rem}
</style>
</head>
<body>
<canvas id="c" width="380" height="520"></canvas>
<div id="msg">
  <h2>🏎️ Neon Racer</h2>
  <p>Dodge traffic and survive as long as you can!</p>
  <button id="btn">Start Race</button>
  <div id="controls">← → Arrow Keys / A D to move</div>
</div>
<script>
const canvas=document.getElementById('c'),ctx=canvas.getContext('2d');
const W=380,H=520,ROAD_W=260,ROAD_X=(W-ROAD_W)/2;
const LANE_W=ROAD_W/3,LANES=[ROAD_X+LANE_W/2,ROAD_X+LANE_W*1.5,ROAD_X+LANE_W*2.5];
let player,traffic,sc,hi=0,speed,running=false,raf,keys={};
const $=id=>document.getElementById(id);
const CAR_COLORS=['#ef4444','#f59e0b','#3b82f6','#a855f7','#22c55e'];
function mkTraffic(){
  const lane=Math.floor(Math.random()*3);
  return{x:LANES[lane]-18,y:-80,w:36,h:64,lane,color:CAR_COLORS[Math.floor(Math.random()*5)]};
}
function init(){
  player={x:LANES[1]-18,y:H-100,w:36,h:64,lane:1,moving:false};
  traffic=[];sc=0;speed=3;
}
let roadOffset=0,spawnTimer=0;
function drawRoad(){
  ctx.fillStyle='#0a0a0a';ctx.fillRect(0,0,W,H);
  // Grass
  ctx.fillStyle='#0d1a0d';ctx.fillRect(0,0,ROAD_X,H);ctx.fillRect(ROAD_X+ROAD_W,0,ROAD_X,H);
  // Road
  const grad=ctx.createLinearGradient(ROAD_X,0,ROAD_X+ROAD_W,0);
  grad.addColorStop(0,'#1a1a1a');grad.addColorStop(.5,'#222');grad.addColorStop(1,'#1a1a1a');
  ctx.fillStyle=grad;ctx.fillRect(ROAD_X,0,ROAD_W,H);
  // Lane markers
  ctx.strokeStyle='rgba(239,68,68,.3)';ctx.lineWidth=1;
  [1,2].forEach(l=>{
    const lx=ROAD_X+LANE_W*l;
    ctx.setLineDash([30,20]);ctx.beginPath();
    for(let y=(roadOffset%50)-50;y<H;y+=50){ctx.moveTo(lx,y);ctx.lineTo(lx,y+30);}
    ctx.stroke();
  });
  ctx.setLineDash([]);
  // Edges
  ctx.strokeStyle='#ef4444';ctx.lineWidth=2;ctx.shadowBlur=6;ctx.shadowColor='#ef4444';
  ctx.beginPath();ctx.moveTo(ROAD_X,0);ctx.lineTo(ROAD_X,H);ctx.stroke();
  ctx.beginPath();ctx.moveTo(ROAD_X+ROAD_W,0);ctx.lineTo(ROAD_X+ROAD_W,H);ctx.stroke();
  ctx.shadowBlur=0;
}
function drawCar(c,isPlayer=false){
  ctx.shadowBlur=isPlayer?15:8;ctx.shadowColor=isPlayer?'#fbbf24':c.color;
  // Body
  ctx.fillStyle=isPlayer?'#fbbf24':c.color;ctx.beginPath();ctx.roundRect(c.x,c.y,c.w,c.h,6);ctx.fill();
  // Windscreen
  ctx.fillStyle=isPlayer?'rgba(0,0,0,.6)':'rgba(0,0,0,.5)';
  ctx.fillRect(c.x+4,c.y+(isPlayer?38:6),c.w-8,16);
  // Wheels
  ctx.fillStyle='#111';
  [[0,8],[c.w-8,8],[0,c.h-14],[c.w-8,c.h-14]].forEach(([wx,wy])=>{
    ctx.fillRect(c.x+wx-3,c.y+wy,7,12);
  });
  ctx.shadowBlur=0;
}
function drawHUD(){
  ctx.fillStyle='#fbbf24';ctx.font='bold 16px Segoe UI';ctx.textAlign='left';
  ctx.fillText('Score: '+Math.floor(sc),12,24);
  ctx.textAlign='right';ctx.fillStyle='#94a3b8';ctx.font='13px Segoe UI';
  if(hi>0)ctx.fillText('Best: '+Math.floor(hi),W-12,24);
  ctx.textAlign='left';ctx.fillStyle='#ef4444';ctx.font='12px Segoe UI';
  ctx.fillText('Speed: '+(Math.floor(speed*10))+'km/h',12,44);
}
function update(){
  roadOffset+=speed;speed=Math.min(3+sc/500,8);
  spawnTimer++;if(spawnTimer>(50-Math.min(sc/200,30))){spawnTimer=0;traffic.push(mkTraffic());}
  traffic.forEach(t=>t.y+=speed+1);
  traffic=traffic.filter(t=>t.y<H+100);
  // Controls
  const targetX=LANES[player.lane]-18;
  if((keys['ArrowLeft']||keys['a'])&&player.lane>0)player.lane=Math.max(0,player.lane);
  if((keys['ArrowRight']||keys['d'])&&player.lane<2)player.lane=Math.min(2,player.lane);
  player.x+=(targetX-player.x)*0.15;
  // Collisions
  for(const t of traffic){
    if(player.x+player.w-4>t.x&&player.x+4<t.x+t.w&&player.y+player.h-4>t.y&&player.y+4<t.y+t.h){
      endGame();return;
    }
  }
  sc+=speed*0.1;
}
function loop(){if(!running)return;drawRoad();traffic.forEach(t=>drawCar(t));drawCar(player,true);drawHUD();update();raf=requestAnimationFrame(loop);}
document.addEventListener('keydown',e=>{
  keys[e.key]=true;
  if(running){if((e.key==='ArrowLeft'||e.key==='a')&&player.lane>0){player.lane--;e.preventDefault();}
    if((e.key==='ArrowRight'||e.key==='d')&&player.lane<2){player.lane++;e.preventDefault();}}
});
document.addEventListener('keyup',e=>keys[e.key]=false);
function endGame(){running=false;cancelAnimationFrame(raf);if(sc>hi)hi=sc;
  $('msg').style.display='flex';
  $('msg').innerHTML=\`<h2>💥 Crashed!</h2><p>Score: <strong style="color:#ef4444">\${Math.floor(sc)}</strong> · Best: \${Math.floor(hi)}</p><button id="btn">Try Again</button>\`;
  $('btn').onclick=startGame;
}
function startGame(){$('msg').style.display='none';init();running=true;raf=requestAnimationFrame(loop);}
$('btn').onclick=startGame;
drawRoad();
</script>
</body></html>`;
}

// ─── Game Registry ──────────────────────────────────────────────────────────
export const GAME_ENGINES = {
  snake:      getSnakeHTML,
  breakout:   getBreakoutHTML,
  flappy:     getFlappyHTML,
  memory:     getMemoryHTML,
  sliding:    getSlidingHTML,
  mathquiz:   getMathQuizHTML,
  colorguess: getColorGuessHTML,
  asteroids:  getAsteroidsHTML,
  platformer: getPlatformerHTML,
  racer:      getRacerHTML,
};
