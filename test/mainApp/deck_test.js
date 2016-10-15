'use strict';

const chai = require('chai');
const assert = chai.assert;

const deck = require('../deck');

const deckClass = new deck.Deck();
const ranks = deck.ranks;
const suits = deck.suits;
const combineSuitRank = deck.combineSuitRank;

const deckToTest = [
  {suit: 'spades', rank: '2', cost: 2},
  {suit: 'spades', rank: '3', cost: 3},
  {suit: 'spades', rank: '4', cost: 4},
  {suit: 'spades', rank: '5', cost: 5},
  {suit: 'spades', rank: '6', cost: 6},
  {suit: 'spades', rank: '7', cost: 7},
  {suit: 'spades', rank: '8', cost: 8},
  {suit: 'spades', rank: '9', cost: 9},
  {suit: 'spades', rank: '10', cost: 10},
  {suit: 'spades', rank: 'J', cost: 11},
  {suit: 'spades', rank: 'Q', cost: 12},
  {suit: 'spades', rank: 'K', cost: 13},
  {suit: 'spades', rank: 'A', cost: 14},
  {suit: 'clubs', rank: '2', cost: 2},
  {suit: 'clubs', rank: '3', cost: 3},
  {suit: 'clubs', rank: '4', cost: 4},
  {suit: 'clubs', rank: '5', cost: 5},
  {suit: 'clubs', rank: '6', cost: 6},
  {suit: 'clubs', rank: '7', cost: 7},
  {suit: 'clubs', rank: '8', cost: 8},
  {suit: 'clubs', rank: '9', cost: 9},
  {suit: 'clubs', rank: '10', cost: 10},
  {suit: 'clubs', rank: 'J', cost: 11},
  {suit: 'clubs', rank: 'Q', cost: 12},
  {suit: 'clubs', rank: 'K', cost: 13},
  {suit: 'clubs', rank: 'A', cost: 14},
  {suit: 'hearts', rank: '2', cost: 2},
  {suit: 'hearts', rank: '3', cost: 3},
  {suit: 'hearts', rank: '4', cost: 4},
  {suit: 'hearts', rank: '5', cost: 5},
  {suit: 'hearts', rank: '6', cost: 6},
  {suit: 'hearts', rank: '7', cost: 7},
  {suit: 'hearts', rank: '8', cost: 8},
  {suit: 'hearts', rank: '9', cost: 9},
  {suit: 'hearts', rank: '10', cost: 10},
  {suit: 'hearts', rank: 'J', cost: 11},
  {suit: 'hearts', rank: 'Q', cost: 12},
  {suit: 'hearts', rank: 'K', cost: 13},
  {suit: 'hearts', rank: 'A', cost: 14},
  {suit: 'diamonds', rank: '2', cost: 2},
  {suit: 'diamonds', rank: '3', cost: 3},
  {suit: 'diamonds', rank: '4', cost: 4},
  {suit: 'diamonds', rank: '5', cost: 5},
  {suit: 'diamonds', rank: '6', cost: 6},
  {suit: 'diamonds', rank: '7', cost: 7},
  {suit: 'diamonds', rank: '8', cost: 8},
  {suit: 'diamonds', rank: '9', cost: 9},
  {suit: 'diamonds', rank: '10', cost: 10},
  {suit: 'diamonds', rank: 'J', cost: 11},
  {suit: 'diamonds', rank: 'Q', cost: 12},
  {suit: 'diamonds', rank: 'K', cost: 13},
  {suit: 'diamonds', rank: 'A', cost: 14}
];


describe('======================== deck ========================', () => {
  describe('deck properties', () => {
    it('cardsInDeck and cardsOutsideDeck should have 52 length', () => {
      assert.equal(deckToTest, )
    });
  });
});
