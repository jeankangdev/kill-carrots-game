// 'use strict';

// import { CARROT_COUNT } from './main';

// export default class Game {
//   constructor() {
//     this.gameBtn = document.querySelector('.game__button');
//     this.gameTimer = document.querySelector('.game__timer');
//     this.remainingCarrotCounter = document.querySelector('.game__score');
//     this.remainingCarrotCount;

//     this.gameBtn.addEventListener('click', this.onClick);
//   }

//   setClickListener(onClick) {
//     this.onClick = onClick;
//   }
  
//   initGame() {
//     this.remainingCarrotCount = CARROT_COUNT;
//     this.remainingCarrotCounter.innerText = this.remainingCarrotCount;  
//   }

//   showStopButton() {
//     this.gameBtn.style.visibility = 'visible';
//     const stop = this.gameBtn.querySelector('.fa-stop')
//     if (stop) {
//       stop.style.visibility = 'visible';
//     }
//     const play = this.gameBtn.querySelector('.fa-play');
//     if (play) {
//       play.style.visibility = 'visible';
//       play.classList.remove('fa-play');
//       play.classList.add('fa-stop');    
//     }
//   }
  
//   showTimerAndScore() {
//     this.gameTimer.style.visibility = 'visible';
//     this.remainingCarrotCounter.style.visibility = 'visible';
//   }
  
//   hideGameButton() {
//     this.gameBtn.style.visibility = 'hidden';
//     this.gameBtn.querySelector('.fa-stop').style.visibility = 'hidden';
//   }
// }