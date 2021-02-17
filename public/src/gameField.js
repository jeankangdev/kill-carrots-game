'use strict';

export default class GameField {
  constructor() {
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();
    
    this.field.addEventListener('click', (event) => {
      this.onClick && this.onClick(event);
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }
}