// Start

1. create a folder

2. npm init

3. node express install --save

4. git remote add origin [git repo HTTPS url]

   git add . > discard all changes

5. git commit --allow-empty -m "initial commit"

6. git push origin master --force

// Problem solving

1. clear web cash  
   => Ctrl + F5

2. Cannot GET /favicon.ico error  
   no matter if you declared it or not, your browser will try to fetch favicon.ico at the root of your site to display it in your tab. You can add the code below to prevent auto-fetch.  
   => <link rel="shortcut icon" href="#">

3. let iconStart = document.querySelector('.fas fa-play'); // null  
   => let iconStart = document.querySelector('.fa-play'); // work

4. why does it work only at times?????

5. function die() has an issue...

6. field.onItemClick doesn't work!  
   => click event binding issue

7. game.js doesn't work!  
   => when running it, the console on developer tools doesn't show any error and I can't even find the js file on source tap.

8. how to share a variable 'started' that changes consistently between multiple .js files  
   8-1. declare the variable 'started' (in class)  
   8-2. declare a function (in class) that changes the variable 'started'  
    and call other .js file's (class) functions that set the changed variable 'started'  
   8-3. in other .js files, declare an empty variable 'started' and make a function that sets its value  
   8-4. now you can use the 'started' variable in multiple files and set its value whenever it changes by calling each file's (class's) setStarted function

// .game.js

    import Field from './field.js';

    export default class Game {
    constructor() {
    this.started = false;

    this.field = new Field();
    this.field.setClickListener(onItemClick);
    }

    onItemClick(item) {
      if (item === 'carrot') {
        updateCount();
      } else if (item === 'bug') {
        stopGame();
      }
    }

    StartGame() {
      changeStarted();
    }

    changeStarted() {
      this.started = !this.started;
      Field.this.setStarted(this.started);
    }

}

// .field.js

    export default class Field {
    constructor() {
    this.started;
    this.field = document.querySelector('.field');
    this.field.addEventListener('click', this.onClick);

    this.carrot = document.querySelector('.carrot');
    this.bug = document.querySelector('.bug');
    }

    setStared(started) {
      this.started = started;
    }

    setClickListener(onItemClick) {
      this.onItemClick = onItemClick;
    }

    onClick(event) => {
      if (!started) {
        return;
      }
      if (event.target.matches('.carrot')) {
          event.target.remove();
          this.onItemClick && this.onItemClick('carrot');
      } else if (event.target.matches('.bug')) {
        this.onItemClick && this.onItemClick('bug');
        }
      }
    }

// What I have learned from this project

1. background: url(img/background.png) center/cover;

2. transition: all 300ms ease-in;

3. pop-up position: transform: translateY(-150%);

4. background-color: #00000090; => black with 90% opacity  
   make only the background-color has the opacity (not its children)

5. make a random number between 2 numbers  
   function randomNumber(min, max) {  
    return Math.random() \* (max - min) + min;  
   }

   const x1 = 0;  
    const y1 = 0;  
    const x2 = fieldRect.width - CARROT_SIZE;  
    const y2 = fieldRect.height - CARROT_SIZE;  
    const x = randomNumber(x1, x2);  
    const y = randomNumber(y1, y2);  
    item.style.left = `${x}px`;  
    item.style.top = `${y}px`;

6. setInterval for a specific time  
   let timer;

7. event.target.className('carrot');  
   => event.target.matches('.carrot');
