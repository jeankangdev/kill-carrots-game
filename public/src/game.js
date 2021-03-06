import Field from './field.js';
import * as sound from './sound.js';
import PopUp from './popup.js';

// Builder Pattern
export default class GameBuilder {
  withGameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }  

  withCarrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  withBugCount(num) {
    this.bugCount = num;
    return this;
  }

  build() {
    return new Game(
      this.gameDuration,
      this.carrotCount,
      this.bugCount
    );
  }
}

class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.gameTimer = document.querySelector('.game__timer');
    this.remainingCarrotCounter = document.querySelector('.game__score');
    this.gameBtn = document.querySelector('.game__button');
    this.gameBtn.addEventListener('click', () => {
      if(this.started) {
        this.stopGame("Replay?");
      } else {
        this.startGame();
      }
      this.changeStarted();
    });

    this.field = new Field(carrotCount, bugCount);
    this.field.setClickListener(this.onItemClick);

    this.gameFinishBanner = new PopUp();
    this.gameFinishBanner.setClickListener(() => {
      this.startGame();
      this.changeStarted();
    })

    this.started = false;
    this.timer = undefined;
    this.remainingCarrotCount;
  }

  onItemClick = (event, item) => {
    if (item === 'carrot') {
      sound.playCarrot();
      this.updateRemainingCarrotCount();
      if (this.remainingCarrotCount <= 0) {
        sound.playWin();
        this.stopGame("You won!");
        this.changeStarted();
      }
    } else if (item === 'bug') {
      sound.playBug();
      sound.playAlert();
      this.stopGame("You failed!");
      this.changeStarted();
    }  
  } 

  hideGameButton() {
    this.gameBtn.style.visibility = 'hidden';
    this.gameBtn.querySelector('.fa-stop').style.visibility = 'hidden';
  }  
  
  stopGameTimer() {
    clearInterval(this.timer);
  }

  updateRemainingCarrotCount() {
    this.remainingCarrotCounter.innerText = --this.remainingCarrotCount;
  }

  startGame() {
    sound.playBackground();
    this.initGame();
    this.field.init();
    this.gameFinishBanner.hide();
    this.showStopButton();
    this.showTimerAndScore();
    this.startGameTimer();
  }

  stopGame(message) {
    sound.stopBackground();
    this.hideGameButton();
    this.stopGameTimer();
    this.gameFinishBanner.showWithMessage(message);
  }
 
  initGame() {
    this.remainingCarrotCount = this.carrotCount;
    this.remainingCarrotCounter.innerText = this.remainingCarrotCount;  
  }

  showStopButton() {
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

  showTimerAndScore() {
    this.gameTimer.style.visibility = 'visible';
    this.remainingCarrotCounter.style.visibility = 'visible';
  }

  startGameTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec == 0) {
        clearInterval(this.timer);
        this.stopGame("Game over!");
        sound.playAlert();
        this.changeStarted();
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }  

  updateTimerText(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    this.gameTimer.innerText = `${minutes}:${seconds}`;
  }  

  changeStarted() {
    this.started = !this.started;
    this.field.setStarted(this.started);
  }
}