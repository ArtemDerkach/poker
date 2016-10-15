'use strict';

class Action {
  constructor(actionName, bet){
    switch (actionName) {
    case 'call':
      this.action = {
        name: 'call',
        tokens: bet
      };
      break;
    case 'fold':
      this.action = {
        name: 'fold',
        tokens: 0
      }
    default:
      this.action = {
        name: 'check',
        tokens : 0
      }
    }
  }
}
class Player {
  constructor(name, tokens) {
    this.name = name;
    this.tokens = tokens;
    this.cards = [];
    this._won = [];
    this._lost = [];
  }
  action(bet) {
    if(this.tokens - bet >= 0) {
      this.tokens -= bet;
      return new Action('call',bet);
    } else {
      return new Action('fold');
    }
  }
  get won () {
    return this._won.reduce((a,b) => a+b);
  }
  set won (numberOfTokens) {
    this._won.push(numberOfTokens);
  }
  get lost() {
    return this._lost.reduce((a,b) => a+b);
  }
  set lost (numberOfTokens) {
    this._lost.push(numberOfTokens);
  }
}


class Deck {
  constructor () {
    this.cards = [];
    for (let suit in SUITS) {
      for (let card = 2; card <= 14; card++) {
        this.cards.push(new Card(card, suit));
      }
    }
  }
  reset () {
    this.cards = [];
    for (let suit in SUITS) {
      for (let card = 2; card <= 14; card++) {
        this.cards.push(new Card(card, suit));
      }
    }
    return this.cards;
  }
  deal (players) {
    for(let i=0;i<2;i++){
      for(let player in players) {
        let currentPlayer = players[player];
        if(i === 0) {
          currentPlayer.cards = [];
        }
        currentPlayer.cards.push(this.cards.pop());
      }
    }
    return true;
  }
  dealN (number) {
    let cards = [];
    for(let i = 0;i<number;i++) {
      cards.push(this.cards.pop());
    }
    return cards;
  }
  shuffle () {
    let newDeck = [];
    function randomCard(array){
      return array[Math.floor(Math.random()*array.length)];
    }
    while(this.cards.length > 0) {
      newDeck.push(randomCard(this.cards));
      this.cards.pop();
    }
    return this.cards = newDeck;
  }
}
class Table {

  constructor(numberOfSeats){
    this.seats = new Array(numberOfSeats);
  }

  putPlayer(player, seat, hard){
    if(!this.seats[seat-1] || hard){
      return this.seats[seat-1] = player;
    } else {
      return false;
    }
  }

  takePayer(seat){
    this.seats[seat-1] = undefined;
  }
}
class Game {
  constructor (...players) {
    this.deck = new Deck();
    this.players = [];
    this.round = {
      'players' : [],
      'number' : 0
    };
    if(players.lenght > 0){
      var newPlayer = new Player(player.name, player.tokens);
      players.forEach(player => this.players.push(newPlayer));
    }
  }
  start() {
    this.deck.reset();
    this.deck.shuffle();
    this.deck.deal(this.players);
    this.startRound();
  }
  addPlayer(player) {
    this.players.push(player);
  }
  removePlayer(name) {
    let chanded = false;
    let remainingPlayers = [];
    this.players.forEach( (player, index) => {
      if(player.name === name) {
        delete this.players[index];
        chanded = true;
      }
    });
    if(!chanded) {
      return;
    }
    this.players.forEach(player => {
      if(player){
        remainingPlayers.push(player);
      }
    });
    this.players = remainingPlayers;
  }
  turn(players, _bet) {
    let bet = 2;
    let totalBet = 0;
    let playersBet = {};
    let playerAtcions = {};
    let checkAllBets = players => {
      let names = Object.keys(playersBet);
      let summ = 0;
      names.forEach(name => {
        let curAct = playerAtcions[name];
        if(curAct[curAct.length - 1].name != 'fold') {
          summ += playersBet[name];
        } else {
          summ -= playersBet[name];
        }
      });
      return summ/players.length === bet;
    }
    while(!checkAllBets(players) || !(players.length === 1)) {
      for(let player in players) {
        let currentPlater = players[player]
        let name = currentPlater.name;
        let action = currentPlater.action(bet);
        if(!playerAtcions[name]) {
          playerAtcions[name] = [];
        }
        playerAtcions[name] = action;
        playersBet[name] = action.tokens;
      }
    }
  }
  startRound() {
    switch (this.round.number) {
      case 0:

        break;
      default:

    }
  }
  situtation() {

  }
}
//let cardClass = new Card();
//console.log(cardClass);
/*
let deck = new Deck();
let players = [new Player('Artem', 100), new Player('Andrew', 100)];
console.log('Brand new deck');
console.log(deck.cards[0]);
console.log('Shuffle ones');
console.log(deck.shuffle()[0]);
console.log(deck.cards.length);
console.log('Shuffle.twise');
console.log(deck.shuffle()[0]);
console.log(deck.cards.length);
console.log('Give some cards to players');
deck.deal(players);
console.log(players);
console.log(deck.cards.length);
*/
