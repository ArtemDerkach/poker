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
    this.isCircleEnd = true;
    this.playerInGame = [];
    this.playersInRound = [];
    this.gameStage = 'ended';
    this.circleQueue = [];
    this.playerToStopOn = '';
  }

  addPlayer(playerName, playerMoney, playerType) {

    if (this.players[playerName]) {
      return false;
    }

    Object.defineProperty(this.players, playerName, {
      value: new Player(playerName, playerMoney, playerType, this.dealer.pot),
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

  refresh() {
    this.cardsOnTable = [];
    this.dealer = new Dealer();
    this.isCircleEnd = true;
    this.playersInRound = [];
    this.gameStage = 'ended';
    this.circleQueue = [];
    this.playerToStopOn = '';
  }

  takeBlindsFromPlayers() {

    let i = 0;
    let j = 1;
    if (this.playersInGame.length < 2) {
      return false;
    }
    if (this.players[this.playersInGame[0]].smallBlind) {
      i = 1;
      j = 0;
    }
    this.players[this.playersInGame[i]].money -= 1;
    this.players[this.playersInGame[i]].smallBlind = true;
    this.dealer.pot[this.players[this.playersInGame[i]].type] += 1;
    this.players[this.playersInGame[j]].money -= 2;
    this.players[this.playersInGame[j]].smallBlind = false;
    this.dealer.pot[this.players[this.playersInGame[j]].type] += 2;
    this.dealer.pot.table += 3;

    this.socket.emit('blinds', {
      player1: {
        name: this.playersInGame[i],
        blind: 'small blind',
        blindMoney: -1,
        money: this.players[this.playersInGame[i]].money
      },
      player2: {
        name: this.playersInGame[j],
        blind: 'big blind',
        blindMoney: -2,
        money: this.players[this.playersInGame[j]].money
      },
      pot: this.dealer.pot
    });

    this.socket.emit('output', [{
      name: 'game',
      message: `${this.playersInGame[i]} got small blind (-1)`
    }, {
      name: 'game',
      message: `${this.playersInGame[j]} got big blind (-2)`
    }]);

    return true;
  }

  go() {
    if (this.gameStarted) {
      this.round();
    }
    console.log(this);
  }

  round() {
    if (this.gameStage === 'ended') {
      this.gameStage = '';
      this.playersInRound = [];
      for (let i = 0; i < this.playersInGame.length; i += 1) {
        this.playersInRound.push(this.playersInGame[i]);
      }
    }
    this.stage();

  }

  stage() {
    console.log(`gameStage: ${this.gameStage}`);
    if (this.isCircleEnd === false) {
      this.circle();
    } else {
      switch (this.gameStage) {
      case '':
        this.gameStage = 'preflop';
        this.takeBlindsFromPlayers();
        this.socket.emit('output', [{
          name: 'game',
          message: 'preflop stage'
        }]);
        this.dealer.dealCardsToPlayers(this.players, this.socket);
        this.isCircleEnd = false;
        break;
      case 'preflop':
        this.gameStage = 'flop';
        this.dealer.dealCardOnTable(this.socket, this.cardsOnTable);
        this.dealer.dealCardOnTable(this.socket, this.cardsOnTable);
        this.dealer.dealCardOnTable(this.socket, this.cardsOnTable);
        this.socket.emit('log', this.cardsOnTable);
        break;
      case 'flop':
        this.gameStage = 'tern';
        this.dealer.dealCardOnTable(this.socket, this.cardsOnTable);
        break;
      case 'tern':
        this.gameStage = 'reaver';
        this.dealer.dealCardOnTable(this.socket, this.cardsOnTable);
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
      this.socket.emit('output', [{
        name: 'game',
        message: `make your choise ${this.circleQueue[0]}!`
      }]);
    }
  }

  circle() {
    console.log(`circle() this.circleQueue[0]:  ${this.players[this.circleQueue[0]].name}`);
    if (this.players[this.circleQueue[0]].action === '') {
      this.players[this.circleQueue[0]].getAction(this.socket, this.dealer.pot);
    }
    this.playerAction(this.players[this.circleQueue[0]].action);
  }

  playerAction(action) {
    console.log(`playerAction(): ${action}`);
    if (!this.dealer.testAction(action, this.socket)) {
      return;
    }
    switch (action) {

    case 'fold':
      this.socket.emit('output', [{
        name: 'game',
        message: `${this.circleQueue[0]} fold`
      }]);
      this.dealer.fold(this.players[this.circleQueue[1]], this.socket);
      this.socket.emit('refresh');
      this.refresh();
      return;

    case 'check':
      this.socket.emit('output', [{
        name: 'game',
        message: `${this.players[this.circleQueue[0]].name} has checked`
      }, {
        name: 'game',
        message: 'press continue'
      }]);
      this.iteratePlayersInCircle();
      break;

    case 'call':
      this.dealer.callBet(this.players[this.circleQueue[0]]);
      this.socket.emit('setMoney', {
        player: this.players[this.circleQueue[0]],
        pot: this.dealer.pot
      });
      this.socket.emit('output', [{
        name: 'game',
        message: `${this.circleQueue[0]} has called`
      }]);
      this.socket.emit('setCall', this.dealer.pot);
      this.players[this.circleQueue[0]].action = '';
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
    if (this.players[this.circleQueue[0]].type === 'bot') {
      console.log('bot tern');
      this.go();
    }
  }

  iteratePlayersInCircle() {
    this.circleQueue.reverse();
    console.log(`iteratePlayersInCircle(): ${this.circleQueue}`);
    if (this.playerToStopOn === '') {
      this.playerToStopOn = this.circleQueue[this.circleQueue.length - 1];
    } else if (this.playerToStopOn === this.circleQueue[0]) {
      this.isCircleEnd = true;
    }
    console.log(`iteratePlayersInCircle(): ${this.isCircleEnd}`);
    console.log(`iteratePlayersInCircle(): ${this.playerToStopOn}`);
  }

  startGame() {
    if (this.players.length <= 1) {
      this.addPlayer('bot', 100, 'bot');
    }
    this.gameStarted = true;
  }

  endGame() {
    this.gameStarted = false;
  }

}

module.exports.Game = Game;
