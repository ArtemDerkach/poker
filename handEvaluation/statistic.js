'use strict';

let fs = require('fs');

let winRate = require('./winRate');
let deck = require('./deck');
let deckClass = new deck.Deck();

let winRateFunc = winRate.winRateFunc;
let a = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];

for (let i = 0; i <= a.length - 1; i += 1) {
  deckClass = new deck.Deck();
  deckClass.shuffle();
  deckClass.shuffle();
  deckClass.shuffle();
  let myHand = [];
  myHand.push(deckClass.dealCard({rank: a[i], suit: 'spades'}));
  myHand.push(deckClass.dealCard({rank: a[i], suit: 'diamonds'}));
  let table = [];

  console.log(myHand);
  console.log(winRateFunc(myHand, table, 1, deckClass));
}
