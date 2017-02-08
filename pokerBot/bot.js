'use strict';

class Bot {

  constructor() {

  }

  action(player, pot) {

    if (pot.bot < pot.human) {
      player.action = 'call';
    } else {
      player.action = 'check';
    }

  }

}

module.exports = Bot;
