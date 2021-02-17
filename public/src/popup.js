'use strict';

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector('.pop-up');
    this.popUpRefreshBtn = document.querySelector('.pop-up__refresh');
    this.popUpMessage = document.querySelector('.pop-up__message');

    this.popUpRefreshBtn.addEventListener('click', () => {
      this.onClick && this.onClick(); // if (this.onClick) { this.onClick(); }
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick; // PopUP.onClick = onClick callback function
  }

  showWithMessage(message) {
    this.popUpMessage.innerText = message;
    this.popUp.classList.remove('pop-up--hide');
  }

  hide() {
    this.PopUp.classList.add('pop-up--hide');
  }
}