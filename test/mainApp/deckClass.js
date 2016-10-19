'use strict';

const chai = require('chai');
const assert = chai.assert;

const Deck = require('../../mainApp/deckClass.js').Deck;
const Card = require('../../mainApp/cardClass.js').Card;

const deckToTest = [
  {rank: '2', suit: {name: 'spades', symbol: '♠'}, cost: 2},
  {rank: '3', suit: {name: 'spades', symbol: '♠'}, cost: 3},
  {rank: '4', suit: {name: 'spades', symbol: '♠'}, cost: 4},
  {rank: '5', suit: {name: 'spades', symbol: '♠'}, cost: 5},
  {rank: '6', suit: {name: 'spades', symbol: '♠'}, cost: 6},
  {rank: '7', suit: {name: 'spades', symbol: '♠'}, cost: 7},
  {rank: '8', suit: {name: 'spades', symbol: '♠'}, cost: 8},
  {rank: '9', suit: {name: 'spades', symbol: '♠'}, cost: 9},
  {rank: '10', suit: {name: 'spades', symbol: '♠'}, cost: 10},
  {rank: 'J', suit: {name: 'spades', symbol: '♠'}, cost: 11},
  {rank: 'Q', suit: {name: 'spades', symbol: '♠'}, cost: 12},
  {rank: 'K', suit: {name: 'spades', symbol: '♠'}, cost: 13},
  {rank: 'A', suit: {name: 'spades', symbol: '♠'}, cost: 14},
  {rank: '2', suit: {name: 'hearts', symbol: '♥'}, cost: 2},
  {rank: '3', suit: {name: 'hearts', symbol: '♥'}, cost: 3},
  {rank: '4', suit: {name: 'hearts', symbol: '♥'}, cost: 4},
  {rank: '5', suit: {name: 'hearts', symbol: '♥'}, cost: 5},
  {rank: '6', suit: {name: 'hearts', symbol: '♥'}, cost: 6},
  {rank: '7', suit: {name: 'hearts', symbol: '♥'}, cost: 7},
  {rank: '8', suit: {name: 'hearts', symbol: '♥'}, cost: 8},
  {rank: '9', suit: {name: 'hearts', symbol: '♥'}, cost: 9},
  {rank: '10', suit: {name: 'hearts', symbol: '♥'}, cost: 10},
  {rank: 'J', suit: {name: 'hearts', symbol: '♥'}, cost: 11},
  {rank: 'Q', suit: {name: 'hearts', symbol: '♥'}, cost: 12},
  {rank: 'K', suit: {name: 'hearts', symbol: '♥'}, cost: 13},
  {rank: 'A', suit: {name: 'hearts', symbol: '♥'}, cost: 14},
  {rank: '2', suit: {name: 'clubs', symbol: '♣'}, cost: 2},
  {rank: '3', suit: {name: 'clubs', symbol: '♣'}, cost: 3},
  {rank: '4', suit: {name: 'clubs', symbol: '♣'}, cost: 4},
  {rank: '5', suit: {name: 'clubs', symbol: '♣'}, cost: 5},
  {rank: '6', suit: {name: 'clubs', symbol: '♣'}, cost: 6},
  {rank: '7', suit: {name: 'clubs', symbol: '♣'}, cost: 7},
  {rank: '8', suit: {name: 'clubs', symbol: '♣'}, cost: 8},
  {rank: '9', suit: {name: 'clubs', symbol: '♣'}, cost: 9},
  {rank: '10', suit: {name: 'clubs', symbol: '♣'}, cost: 10},
  {rank: 'J', suit: {name: 'clubs', symbol: '♣'}, cost: 11},
  {rank: 'Q', suit: {name: 'clubs', symbol: '♣'}, cost: 12},
  {rank: 'K', suit: {name: 'clubs', symbol: '♣'}, cost: 13},
  {rank: 'A', suit: {name: 'clubs', symbol: '♣'}, cost: 14},
  {rank: '2', suit: {name: 'diamonds', symbol: '♦'}, cost: 2},
  {rank: '3', suit: {name: 'diamonds', symbol: '♦'}, cost: 3},
  {rank: '4', suit: {name: 'diamonds', symbol: '♦'}, cost: 4},
  {rank: '5', suit: {name: 'diamonds', symbol: '♦'}, cost: 5},
  {rank: '6', suit: {name: 'diamonds', symbol: '♦'}, cost: 6},
  {rank: '7', suit: {name: 'diamonds', symbol: '♦'}, cost: 7},
  {rank: '8', suit: {name: 'diamonds', symbol: '♦'}, cost: 8},
  {rank: '9', suit: {name: 'diamonds', symbol: '♦'}, cost: 9},
  {rank: '10', suit: {name: 'diamonds', symbol: '♦'}, cost: 10},
  {rank: 'J', suit: {name: 'diamonds', symbol: '♦'}, cost: 11},
  {rank: 'Q', suit: {name: 'diamonds', symbol: '♦'}, cost: 12},
  {rank: 'K', suit: {name: 'diamonds', symbol: '♦'}, cost: 13},
  {rank: 'A', suit: {name: 'diamonds', symbol: '♦'}, cost: 14}
];

describe('deck class', () => {

  const deck = new Deck();


  describe('properties', () => {
    describe('cardsInDeck property', () => {
      it('should be an object', () => {
        assert.isArray(deck.cardsInDeck);
      });
      it('should be equal to test deck', () => {
        assert.deepEqual(deckToTest, deck.cardsInDeck);
      });
    });
    describe('cardsOutsideDeck property', () => {
      it('should be an array', () => {
        assert.isArray(deck.cardsOutsideDeck);
      });
      it('should have 52 - cardsInDeck length', () => {
        assert.lengthOf(deck.cardsOutsideDeck, 52 - deck.cardsInDeck.length);
      });
    });
    describe('methods', () => {
      describe('shuffle method', () => {
        it('should return cardsInDeck property', () => {
          assert.strictEqual(deck.shuffle(), deck.cardsInDeck);
        });
        it('should not change the deck length', () => {
          assert.strictEqual(deck.cardsInDeck.length, deck.shuffle().length);
        });
        it('should return same members dekc', () => {
          assert.sameDeepMembers(deck.cardsInDeck, deck.shuffle());
        });
      });
      describe('dealTopCard method', () => {
        it('should remove card from deck', () => {
          const dealedCard = deck.dealTopCard();
          assert.notInclude(deck.cardsInDeck, dealedCard);
        });
        it('should added card to cards outside deck', () => {
          const dealedCard = deck.dealTopCard();
          assert.include(deck.cardsOutsideDeck, dealedCard);
        });
      });
      describe('dealNCards method', () => {
        it('should remove n cards from cardsInDeck', () => {
          const numOfCardsBeforeDeal = deck.cardsInDeck.length;
          const dealedCard = deck.dealNCards(5);
          assert.lengthOf(deck.cardsInDeck, numOfCardsBeforeDeal - 5);
        });
        it('should return array of cards', () => {
          assert.lengthOf(deck.dealNCards(6), 6);
        });
      });
      describe('dealCard method', () => {
        it('should remove given card from deck', () => {
          const cardToRemove = new Card('A', 'spades');
          deck.dealCard(cardToRemove);
          assert.notInclude(deck.cardsInDeck, cardToRemove);
        });
        it('should return deleted card', () => {
          const deck = new Deck();
          const cardToRemove = new Card('3', 'diamonds');
          assert.deepEqual(cardToRemove, deck.dealCard(cardToRemove));
        });
        it('shoud return null if no card found', () => {
          assert.isNull(deck.dealCard(new Card('A', 'spades')));
        });
        it('should reduce length of cards in deck by 1', () => {
          const deck = new Deck();
          const cardsBeforeRemoveInDeck = deck.cardsInDeck.length;
          deck.dealCard(new Card('J', 'hearts'));
          assert.lengthOf(deck.cardsInDeck, cardsBeforeRemoveInDeck - 1);
        });
        it('should increase cards outside deck by 1', () => {
          const deck = new Deck();
          const cardsBeforeRemoveOut = deck.cardsOutsideDeck.length;
          deck.dealCard(new Card('7', 'hearts'));
          assert.lengthOf(deck.cardsOutsideDeck, cardsBeforeRemoveOut + 1);
        });
      });
    });
  });
});
