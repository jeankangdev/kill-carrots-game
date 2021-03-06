'use strict';

export const ItemType = Object.freeze({
  carrot: 'carrot',
  bug: 'bug',
});

export class Field {
  constructor(carrotCount, bugCount) {
    this.started;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.imageSize = 80;

    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();

    // when functions (inside class) are used as callback, the function itself can't deliver information of the class.
    // thus we need binding (bind the info of the class to the classes function)

    this.field.addEventListener('click', this.onClick);
    // option 1: doesn't work well
    // this.onClick = this.onClick.bind(this);

    // option 2: work
    // this.field.addEventListener('click', (event) => {
    //   this.onClick(event);
    // });

    // option 3: change the onClick function as shown below
    // onClick = (event) => {}
  }

  init() {
    this.field.innerHTML = '';
    this._addItem(ItemType.carrot, this.carrotCount, 'img/carrot.png');
    this._addItem(ItemType.bug, this.bugCount, 'img/bug.png');
  }

  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - this.imageSize;
    const y2 = this.fieldRect.height - this.imageSize;

    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  setStarted(started) {
    this.started = started;
  }

  onClick = (event) => {
    if (!this.started) {
      return;
    }
    if (event.target.matches('.carrot')) {
      event.target.remove();
      this.onItemClick && this.onItemClick( event, ItemType.carrot);
      } else if (event.target.matches('.bug')) {
      this.onItemClick && this.onItemClick( event, ItemType.bug);
    }
  }
}

// static function
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
