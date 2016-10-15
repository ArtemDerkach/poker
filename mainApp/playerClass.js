'use strict';

class Player {

  constructor(playerMoney) {
    this.hand = [];
    this.money = playerMoney || 100;
    this.betInRound = 0;
    this.smallBlind = false;
    this.bigBlind = false;
  }

  action(typeOfAction) {
    let action = new Action();
    return action[typeOfAction.name](typeOfAction.param);
  }

  sumTo(bank, sumToRaise) {
    bank.pot += sumToRaise;
    this.money -= sumToRaise;
  }

}

module.exports.Player = Player;
