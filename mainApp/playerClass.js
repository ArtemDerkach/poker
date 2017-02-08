'use strict';

const Bot = require('../pokerBot/bot.js');
const bot = new Bot();

class Player {

  constructor(playerName, playerMoney, playerType, pot) {
    this.name = playerName;
    this.type = playerType;
    this.money = playerMoney || 100;
    this.hand = [];
    this.bet = 0;
    this.betInRound = 0;
    this.smallBlind = false;
    this.bigBlind = false;
    this.action = '';
    this.pot = pot;
  }

  getAction(socket, pot) {
    console.log(`getAction() :${this.name}`);
    if (this.type === 'human') {
      socket.emit('output', [{
        name: 'game',
        message: `${this.name} make your action please`
      }]);
    } else {
      bot.action(this, pot);
    }

  }

}

module.exports.Player = Player;
