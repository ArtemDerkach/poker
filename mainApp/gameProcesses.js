'use strict';

const Player = require('./playerClass.js').Player;
const Dealer = require('./dealerClass.js').Dealer;

class Game {

  constructor(socket) {
    this.gameStarted = false;
    this.socket = socket;
    this.players = {};
    this.cardsOnTable = [];
    this.dealer = new Dealer();
    this.isRoundEnd = true;
    this.isCircleEnd = true;
    this.gameStages = ['preflop', 'flop', 'tern', 'reaver'];
    this.playerInGame = [];
    this.playersInRound = [];
    this.gameStage = '';
    this.circleQueue = [];
    this.playerToStopOn;
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
    this.removePlayerFromArray(playerToRemove, this.playersInGame);
    this.removePlayerFromArray(playerToRemove, this.playersInRound);
    this.removePlayerFromArray(playerToRemove, this.circleQueue);
    delete this.players[playerToRemove];
  }

  removePlayerFromArray(name, arrayToFindIn) {
    for (let i = 0; i < arrayToFindIn.length; i += 1) {
      if (arrayToFindIn[i] === name) {
        arrayToFindIn.splice(i, 1);
        break;
      }
    }
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
    this.dealer.pot += 3;
    return true;
  }

  go() {
    if (this.gameStarted) {
      this.round();
    }
  }

  round() {
    if (this.gamestage === 'ended') {
      this.gameStage = '';
      this.playersInRound = [];
      for (let i = 0; i < this.playersInGame.length; i += 1) {
        this.playersInRound.push(this.playersInGame[i]);
      }
    } else {
      this.stage();
    }
  }

  stage() {
    if (this.isCircleEnd === 'false') {
      this.circle();
    } else {
      switch (this.gameStage) {
      case '':
        this.gameStage = 'preflop';
        this.takeBlindsFromPlayers();
        this.dealer.dealCardsToPlayers(this.players);
        break;
      case 'preflop':
        this.gameStage = 'flop';
        this.dealer.dealCardOnTable(this.cardsOnTable);
        break;
      case 'flop':
        this.gameStage = 'tern';
        this.dealer.dealCardOnTable(this.cardsOnTable);
        break;
      case 'tern':
        this.gameStage = 'reaver';
        this.dealer.dealCardOnTable(this.cardsOnTable);
        this.dealer.dealCardOnTable(this.cardsOnTable);
        this.dealer.dealCardOnTable(this.cardsOnTable);
        break;
      case 'reaver':
        this.gameStage = 'ended';
        break;
      default:
        break;
      }
      this.circleQueue = [];
      for (let i = 0; i < this.playersInRound.length; i += 1) {
        this.circleQueue.push(this.playersInRound[i]);
      }
    }
  }

  circle() {
    if (this.players[this.circleQueue[0]].type === 'human' && this.players[this.circleQueue[0]].action === '') {
      this.socket.emit('message', {
        player: this.players[this.circleQueue[0]].name,
        status: 'need action'
      });
    } else {
      this.playerAction(this.players[this.circleQueue[0]].action);
    }
  }

  playerAction(action) {
    switch (action.type) {
    case 'fold':
      this.removePlayerFromArray(this.circleQueue[0], this.playersInRound);
      this.removePlayerFromArray(this.circleQueue[0], this.circleQueue);
      break;
    case 'check':
      this.iteratePlayersInCircle();
      break;
    case 'call':
      this.dealer.callBet(this.players[this.circleQueue[0]]);
      this.iteratePlayersInCircle();
      break;
    case 'raise':
      this.dealer.raiseBet(this.players);
      this.playerToStopOn = this.circleQueue[0];
      this.iteratePlayersInCircle();
      break;
    default:
      break;
    }
  }

  iteratePlayersInCircle() {
    this.playersInCircle = this.playersInCircle.slice(1, this.playersInCircle.length).concat(this.playersInCircle.slice(0, 1));
    if (this.playerToStopOn === '') {
      this.playerToStopOn = this.circleQueue[this.circleQueue.length - 1];
    } else if (this.playerToStopOn === this.players[this.circleQueue[0]]) {
      this.isCircleEnd = true;
    }
  }

  startGame() {
    this.gameStarted = true;
  }

  endGame() {
    this.gameStarted = false;
  }

}

module.exports.Game = Game;
