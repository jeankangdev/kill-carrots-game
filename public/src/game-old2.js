'use strict';

import Field from './field.js';
import * as sound from './sound.js';
import { started } from './main.js';
import { gameFinishBanner } from './main.js';

export default class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.started = started;

    this.timer = undefined;
    this.remainingCarrotCount;    

    this.gameTimer = document.querySelector('.game__timer');
    this.remainingCarrotCounter = document.querySelector('.game__score');
    this.gameBtn = document.querySelector('.game__button');
    this.gameBtn.addEventListener('click', () => {
      if(this.started) {
        this.stop("Replay?");
      } else {
        this.start();
      }
      this.started = !this.started;
    });    

    this.field = new Field(this.carrotCount, this.bugCount);
    this.field.setClickListener(this.onItemClick);
  }

  onItemClick = (event) => {
    if (event.target.matches('.carrot')) {
      console.log(event.target);
      event.target.remove();
      sound.playCarrot();
      this._updateRemainingCarrotCount();
      if (this.remainingCarrotCount <= 0) {
        sound.playWin();
        this.stop("You won!");
        this.started = !this.started;
      }
    } else if (event.target.matches('.bug')) {
      sound.playBug();
      sound.playAlert();
      this.stop("You failed!");
      this.started = !this.started; 
    }  
  };

  _updateRemainingCarrotCount() {
    this.remainingCarrotCounter.innerText = --this.remainingCarrotCount;
  }

  start() {
    sound.playBackground();
    this.initGame();
    this.field.init();
    gameFinishBanner.hide();
    this._showStopButton();
    this._showTimerAndScore();
    this._startGameTimer();
  }

  stop(message) {
    sound.stopBackground();
    this._hideGameButton();
    this._stopGameTimer();
    gameFinishBanner.showWithMessage(message);
  }

  initGame() {
    this.remainingCarrotCount = this.carrotCount;
    this.remainingCarrotCounter.innerText = this.remainingCarrotCount;  
  }

  _hideGameButton() {
  this.gameBtn.style.visibility = 'hidden';
  this.gameBtn.querySelector('.fa-stop').style.visibility = 'hidden';
}

  _stopGameTimer() {
  clearInterval(this.timer);
}

  _showStopButton() {
  this.gameBtn.style.visibility = 'visible';
  const stop = this.gameBtn.querySelector('.fa-stop')
  if (stop) {
    stop.style.visibility = 'visible';
  }
  const play = this.gameBtn.querySelector('.fa-play');
  if (play) {
    play.style.visibility = 'visible';
    play.classList.remove('fa-play');
    play.classList.add('fa-stop');    
  }
}

  _showTimerAndScore() {
  this.gameTimer.style.visibility = 'visible';
  this.remainingCarrotCounter.style.visibility = 'visible';
}

  _startGameTimer() {
  let remainingTimeSec = this.gameDuration;
  this._updateTimerText(remainingTimeSec);
  this.timer = setInterval(() => {
    if (remainingTimeSec == 0) {
      clearInterval(this.timer);
      this.stop("Game over!");
      sound.playAlert();
      this.started = !this.started;
      return;
    }
    this._updateTimerText(--remainingTimeSec);
  }, 1000);
}

  _updateTimerText(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  this.gameTimer.innerText = `${minutes}:${seconds}`;
}

}