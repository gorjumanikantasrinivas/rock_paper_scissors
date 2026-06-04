const emojis = { rock: '🪨', paper: '📄', scissors: '✂️' };
const beats  = { rock: 'scissors', paper: 'rock', scissors: 'paper' };
const scores = { you: 0, cpu: 0, tie: 0 };
let history  = [];

function cpuPick() {
  const moves = ['rock', 'paper', 'scissors'];
  return moves[Math.floor(Math.random() * 3)];
}

function cap(s) {
  return s[0].toUpperCase() + s.slice(1);
}

function play(userMove) {
  const cpu = cpuPick();
  let outcome, label, cls;

  if (userMove === cpu) {
    outcome = 'T'; label = 'Tie!'; cls = 'tie'; scores.tie++;
  } else if (beats[userMove] === cpu) {
    outcome = 'W'; label = 'You Win! 🎉'; cls = 'win'; scores.you++;
  } else {
    outcome = 'L'; label = 'You Lose!'; cls = 'lose'; scores.cpu++;
  }

  document.getElementById('sc-you').textContent = scores.you;
  document.getElementById('sc-cpu').textContent = scores.cpu;
  document.getElementById('sc-tie').textContent = scores.tie;

  document.getElementById('arena').innerHTML = `
    <div class="versus-row">
      <div class="fighter">
        <div class="fighter-emoji shake">${emojis[userMove]}</div>
        <div class="fighter-label">You</div>
      </div>
      <div class="vs-badge">VS</div>
      <div class="fighter">
        <div class="fighter-emoji shake">${emojis[cpu]}</div>
        <div class="fighter-label">CPU</div>
      </div>
    </div>
    <div class="result-pill ${cls}">${label}</div>
    <div class="result-detail">${cap(userMove)} vs ${cap(cpu)}</div>
  `;

  history.unshift(outcome);
  if (history.length > 15) history.pop();

  document.getElementById('history').innerHTML = history
    .map(h => `<span class="hist-chip ${h}">${h === 'W' ? 'Win' : h === 'L' ? 'Loss' : 'Tie'}</span>`)
    .join('');
}

function resetGame() {
  scores.you = scores.cpu = scores.tie = 0;
  history = [];
  ['sc-you', 'sc-cpu', 'sc-tie'].forEach(id => {
    document.getElementById(id).textContent = 0;
  });
  document.getElementById('history').innerHTML = '';
  document.getElementById('arena').innerHTML = '<p class="idle-msg">Choose a move to start ↑</p>';
}