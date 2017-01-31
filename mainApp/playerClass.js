'use strict';

class Player {

  constructor(name, type, playerMoney) {
    this.name = name;
    this.type = type;
    this.money = playerMoney || 100;
    this.hand = [];
    this.bet = 0;
    this.betInRound = 0;
    this.smallBlind = false;
    this.bigBlind = false;
    this.action;
  }

  makeAction() {
    let action = new Action();
    return action[typeOfAction.name](typeOfAction.param);
  }

  sumTo(bank, sumToRaise) {
    bank.pot += sumToRaise;
    this.money -= sumToRaise;
  }

}

module.exports.Player = Player;
