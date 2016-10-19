'use strict';

const chai = require('chai');
const assert = chai.assert;

const Card = require('../../mainApp/cardClass.js').Card;

describe('Card Class', () => {

  const aceOfSpades = new Card('A', 'spades');
  const kingOfDiamonds = new Card('K', 'diamonds');
  const kingOfHearts = new Card('K', 'hearts');

  describe('properies', () => {
    describe('rank property', () => {
      it('should be a strig', () => {
        assert.isString(aceOfSpades.rank);
      });
    });
    describe('suit property', () => {
      it('should be an object', () => {
        assert.isObject(aceOfSpades.suit);
      });
      it('should have 2 properties', () => {
        assert.strictEqual(aceOfSpades.suit.name, 'spades');
        assert.strictEqual(aceOfSpades.suit.symbol, '♠');
      });
    });
    describe('cost property', () => {
      it('should be a Number', () => {
        assert.isNumber(aceOfSpades.cost);
      });
      it('should be 14 if A', () => {
        assert.strictEqual(aceOfSpades.cost, 14);
      });
    });
  });

  describe('methods', () => {
    describe('compare method should compare 2 cards be cost', () => {
      it('return 1 if first is bigger ', () => {
        assert.strictEqual(aceOfSpades.compare(kingOfHearts), 1);
      });
      it('return -1 if first card cost is smaller', () => {
        assert.strictEqual(new Card('3', 'clubs').compare(kingOfDiamonds), -1);
      });
      it('return 0 if they are the same', () => {
        assert.strictEqual(kingOfDiamonds.compare(kingOfHearts), 0);
      });
    });
    describe('value method', () => {
      it('should return rank and symbol', () => {
        assert.strictEqual(aceOfSpades.value(), 'A♠');
      });
    });
  });

});
