'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
let time_seconds = 10;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

let started = false;
let timer = undefined;
let score = 0;

gameBtn.addEventListener('click', () => {
  if(started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started;
})

function startGame() {
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
}

function stopGame() {
  // can't click carrots or bugs anymore
  showPlayButton();
  hideTimerAndScore();
  stopTimerAndScore();
}

function startGameTimer() {
  gameTimer.innerText = time_seconds;
  let timer = setInterval(() => {
    gameTimer.innerText = --time_seconds;
    if (time_seconds == 0) {
      clearInterval(timer);
      return;
    }
  }, 1000);
}

function stopGameTimer() {
  
}

function showPlayButton() {
  const icon = gameBtn.querySelector('.fa-stop');
  icon.classList.remove('fa-stop');
  icon.classList.add('fa-play');
}

function showStopButton() {
  const icon = gameBtn.querySelector('.fa-play');
  icon.classList.remove('fa-play');
  icon.classList.add('fa-stop');
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameTimer.style.visibility = 'visible';
}

function hideTimerAndScore() {
  // stop timer and score

  // hide timer and score
  gameTimer.style.visibility = 'hidden';
  gameTimer.style.visibility = 'hidden';
}

function initGame() {
  field.innerHTML = '';
  addItem('carrot', CARROT_COUNT, 'img/carrot.png');
  addItem('bug', BUG_COUNT, 'img/bug.png');

  gameScore.innerText = CARROT_COUNT;
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;

  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
