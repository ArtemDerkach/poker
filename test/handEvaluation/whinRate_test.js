'use strict';

let chai = require(`chai`);
let assert = chai.assert;

let winRate = require('../winRate');
let deck = require('../deck');
let deckClass = new deck.Deck();

let winRateFunc = winRate.winRateFunc;
let getHands = winRate.getHands;
let fill = winRate.fill;

let table;
let myHand;
describe('====================== whoWins ======================', function () {
  beforeEach(function () {
    deckClass = new deck.Deck();
    deckClass.shuffle();
    deckClass.shuffle();
    deckClass.shuffle();
    myHand = []; 
    myHand.push(deckClass.dealCard({rank: 'A', suit: 'spades'}));
    myHand.push(deckClass.dealCard({rank: 'A', suit: 'diamonds'}));
    table = [];
    
  });
  describe('winRate function', function () {
    it('should give us our win winRate', function () {
      console.log(myHand);
      console.log(winRateFunc(myHand, table, 3, deckClass));
    });
  });
  describe(`fill function return us array:
    - table whith 5 cards
    - our hand
    - as much enemy hands as we say`, function () {
    beforeEach(function () {
      deckClass = new deck.Deck();
      deckClass.shuffle();
      deckClass.shuffle();
      deckClass.shuffle();
      table = [];
      myHand = deckClass.dealN(2);
    });  
    it('should return array', function () {
      assert.strictEqual(Array.isArray(fill([{}], table, 3, deckClass)), true);
    });
    it('should have length: enemyNum + 2', function () {
      assert.strictEqual(fill(myHand, table, 4, deckClass).length, 6);
    });
    it('should have table var whith 5 cards in it', function () {
      assert.strictEqual(fill(myHand, table, 4, deckClass)[0].hand.length, 5);
    });
  });
  describe('getHands function', function () {
    it('should get array whith length enemyNum + 1', function () {
      assert.strictEqual(getHands(fill(myHand, table, 5, deckClass)).length, 6);
    });
  });
});