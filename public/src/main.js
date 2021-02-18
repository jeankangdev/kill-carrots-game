'use strict';

import PopUp from './popup.js';
import Field from './field.js';
import * as sound from './sound.js';

const IMAGE_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_COUNT = 7;
const GAME_DURATION_SEC = 10;

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const remainingCarrotCounter = document.querySelector('.game__score');

// const backgroundSound = new Audio('./sound/bg.mp3');
// const carrotSound = new Audio('./sound/carrot_pull.mp3');
// const bugSound = new Audio('./sound/bug_pull.mp3');
// const alertSound = new Audio('./sound/alert.wav');
// const winSound = new Audio('./sound/game_win.mp3');

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
  if(!started) {
    return;
  }
  if (item === 'carrot') {
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
  initGame();
  field.init();
  gameFinishBanner.hide();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
}

function stopGame(message) {
  stopSound(backgroundSound);
  hideGameButton();
  stopGameTimer();
  gameFinishBanner.showWithMessage(message);
}

function initGame() {
  remainingCarrotCount = CARROT_COUNT;
  remainingCarrotCounter.innerText = remainingCarrotCount;  
}

// function randomNumber(min, max) {
//   return Math.random() * (max - min) + min;
// }

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
}

function updateRemainingCarrotCount() {
  remainingCarrotCounter.innerText = --remainingCarrotCount;
}