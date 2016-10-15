'use strict';

const Player = require('./playerClass.js').Player;
const Dealer = require('./dealerClass.js').Dealer;
const Bank = require('./bankClass.js').Bank;
const Table = require('./tableClass.js').Table;

class Round {

  constructor(players, dealer, bank) {
    this.players = players || {};
    this.playersInRound = players ? Object.keys(players) : [];
    this.dealer = dealer;
    this.bank = bank;
    this.gameStage = ['preflop', 'flop', 'tern', 'reaver'];
    this.playersAction;
  }

  stages() {
    this.itaratePlayersInRound();
    this.itaratePlayersInRound();
    this.dealer.dealCardsToPlayers(this.players);
    for (let i = 0; i < this.gameStage.length; i += 1) {
      this.start();
    }
  }

  start() {
    for (let j = 0; j < this.playersInRound.length; j += 1) {
      this.playersAction = this.players[this.playersInRound[j]].action();
      switch (this.playersAction.type) {
      case 'fold':
        this.this.removePlayerFromRound(this.playersInRound[j]);
        j -= 1;
        break;
      case 'call':
        this.players[this.playersInRound[j]].onCall(this.bank);
        break;
      case 'check':
        break;
      case 'raise':
        this.players[this.playersInRound[j]].raise(this.bank, this.playersAction.sumToRaise);
        this.iteratePlayersInRound(j);
        j = 1;
        break;
      default:
      }
    }
  }

  iteratePlayersInRound(playerNum) {
    this.playersInRound = this.playersInRound.slice(playerNum, this.playersInRound.length).concat(this.playersInRound.slice(0, playerNum));
  }

  removePlayerFromRound(playerToRemove) {
    for (let i = 0; i < this.playersInRound.length; i += 1) {
      if (this.playersInRound[i] === playerToRemove) {
        this.players[this.playersInRound[i]].betInRound = 0;
        this.playersInRound = this.playersInRound.slice(0, i).concat(this.playersInRound.slice(i + 1, this.playersInRound.length));
      }
    }
  }

}


class Game {

  constructor() {
    this.table = new Table();
    this.bank = new Bank();
    this.dealer = new Dealer();
    this.round = new Round();
    this.players = {};
    this.playersInGame = [];
  }

  addPlayer(playerName, playerMoney) {
    if (this.players[playerName]) {
      return false;
    }
    Object.defineProperty(this.players, playerName, {
      value: new Player(playerMoney),
      writable: true,
      enumerable: true,
      configurable: true
    });
    this.playersInGame = Object.keys(this.players);
    return true;
  }

  removePlayer(playerToRemove) {
    for (let i = 0; i < this.playersInGame.length; i += 1) {
      if (this.playersInGame[i] === playerToRemove) {
        this.playersInGame = this.playersInGame.slice(0, i).concat(this.playersInGame.slice(i + 1, this.playersInGame.length));
        delete this.players[playerToRemove];
        return true;
      }
    }
    return false;
  }

  takeBlindsFromPlayers() {
    if (this.playersInGame.length < 2) {
      return false;
    }
    if (this.players[this.playersInGame[0]].smallBlind) {
      this.players[this.playersInGame[0]].smallBlind = false;
      this.playersInGame = this.playersInGame.slice(1, this.playersInGame.length).concat(this.playersInGame.slice(0, 1));
    }
    this.players[this.playersInGame[0]].money -= 1;
    this.players[this.playersInGame[0]].smallBlind = true;
    this.players[this.playersInGame[1]].money -= 2;
    this.players[this.playersInGame[1]].bigBlind = true;
    this.bank.pot += 3;
    return true;
  }

  startGame() {
    do {
      this.takeBlindsFromPlayers();
      this.round = new Round(this.players, this.dealer);
      this.round.start();

      this.playersInGame = Object.keys(this.players);
    } while (Object.keys(this.players).length > 1);
  }

  endGame() {

  }

}


module.exports.Game = Game;
module.exports.Round = Round;
