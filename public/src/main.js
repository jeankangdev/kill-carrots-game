'use strict';

import PopUp from './popup.js';
import Field from './field.js';
// import Game from './game.js';
import * as sound from './sound.js';

const IMAGE_SIZE = 80;
export { CARROT_COUNT };
const CARROT_COUNT = 10;
const BUG_COUNT = 7;
export { GAME_DURATION_SEC };
const GAME_DURATION_SEC = 10;
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const remainingCarrotCounter = document.querySelector('.game__score');

export { started };
let started = false;
let timer = undefined;
let remainingCarrotCount;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  startGame();
  started = !started;
});

const field = new Field(CARROT_COUNT, BUG_COUNT);
field.setClickListener(onItemClick);
function onItemClick(item) {
  if (item === 'carrot') {
    event.target.remove();
    sound.playCarrot();
    updateRemainingCarrotCount();
    if (remainingCarrotCount <= 0) {
      sound.playWin();
      stopGame("You won!");
      started = !started;
    }
  } else if (item === 'bug') {
    sound.playBug();
    sound.playAlert();
    stopGame("You failed!");
    started = !started; 
  }  
};

// const game = new Game();
// game.setClickListener(() => {
gameBtn.addEventListener('click', () => {
  if(started) {
    stopGame("Replay?");
  } else {
    startGame();
  }
  started = !started;
});

function startGame() {
  sound.playBackground();
  // game.initGame();
  initGame();
  field.init();
  gameFinishBanner.hide();
  showStopButton();
  showTimerAndScore();
  // this.showStopButton();
  // this.showTimerAndScore();
  startGameTimer();
}

function stopGame(message) {
  sound.stopBackground();
  hideGameButton();
  // game.hideGameButton();
  stopGameTimer();
  gameFinishBanner.showWithMessage(message);
}

function initGame() {
  remainingCarrotCount = CARROT_COUNT;
  remainingCarrotCounter.innerText = remainingCarrotCount;  
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
  remainingCarrotCounter.style.visibility = 'visible';
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec == 0) {
      clearInterval(timer);
      stopGame("Game over!");
      sound.playAlert();
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
  // const timer = game.gameTimer;
  // timer.innerText = `${minutes}:${seconds}`;
}

function updateRemainingCarrotCount() {
  remainingCarrotCounter.innerText = --remainingCarrotCount;
}