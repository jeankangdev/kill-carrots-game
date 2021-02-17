'use strict';

const IMAGE_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const popUp = document.querySelector('.pop-up');
const popUpRefreshBtn = document.querySelector('.pop-up__refresh');
const popUpMessage = document.querySelector('.pop-up__message');

let started = false;
let timer = undefined;
let remainingCarrotCount = CARROT_COUNT;

gameBtn.addEventListener('click', () => {
  if(started) {
    stopGame("Replay?");
  } else {
    startGame();
  }
  started = !started;
});

field.addEventListener('click', (event) => {
  if(!started) {
    return;
  } else {
    if (event.target.className === 'carrot') {
      removeCarrot(event.target);
      updateGameScore();
      if (remainingCarrotCount <= 0) {
        stopGame("You won!");
        started = !started;
      }
    } else {
      stopGame("You failed!");
      started = !started; 
    }  
  }
});

popUpRefreshBtn.addEventListener('click', () => {
  startGame();
  started = !started;
});

function startGame() {
  initGame();
  hidePopUp();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
}

function stopGame(message) {
  hideGameButton();
  stopGameTimer();
  showPopUp(message);
}

function initGame() {
  field.innerHTML = '';
  addItem('carrot', CARROT_COUNT, 'img/carrot.png');
  addItem('bug', BUG_COUNT, 'img/bug.png');

  remainingCarrotCount = CARROT_COUNT;
  gameScore.innerText = remainingCarrotCount;  
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - IMAGE_SIZE;
  const y2 = fieldRect.height - IMAGE_SIZE;

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


function showStopButton() {
  gameBtn.style.visibility = 'visible';
  const stop = gameBtn.querySelector('.fa-stop')
  if (stop) {
    stop.style.visibility = 'visible';
  }
  const play = gameBtn.querySelector('.fa-play');
  if (play) {
    play.style.visibility = 'visible';
    play.classList.remove('fa-play');
    play.classList.add('fa-stop');    
  }
}

function hideGameButton() {
  gameBtn.style.visibility = 'hidden';
  gameBtn.querySelector('.fa-stop').style.visibility = 'hidden';
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec == 0) {
      clearInterval(timer);
      stopGame("Game over!");
      started = !started;
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
}

function updateGameScore() {
  gameScore.innerText = --remainingCarrotCount;
}

function removeCarrot(carrot) {
  carrot.remove();
}

function showPopUp(message) {
  popUpMessage.innerText = message;
  popUp.classList.remove('pop-up--hide');
}

function hidePopUp() {
  popUp.classList.add('pop-up--hide');
}