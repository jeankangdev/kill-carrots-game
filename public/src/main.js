'use strict';

import GameBuilder from './game.js';

const game = new GameBuilder()
  .gameDuration(10)
  .carrotCount(10)
  .bugCount(6)
  .build();
