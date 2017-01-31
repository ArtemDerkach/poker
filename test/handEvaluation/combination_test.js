'use strict';

const chai = require(`chai`);
const assert = chai.assert;

const combination = require('../../handEvaluation/combination.js');

// deck
const deck = require('../../mainApp/deckClass.js');
let deckClass = new deck.Deck();

// additional functions
const copyHand = combination.copyHand;
const distance = combination.distance;
const highToLow = combination.highToLow;
const suitFilter = combination.suitFilter;
const suits = deck.suits;

// function to test combo's
const straightFlush = combination.straightFlush;
const fourOfAKind = combination.fourOfAKind;
const fullHouse = combination.fullHouse;
const flush = combination.flush;
const straight = combination.straight;
const threeOfAKind = combination.threeOfAKind;
const twoPairs = combination.twoPairs;
const pair = combination.pair;

// main function
const handCombination = combination.handCombination;

describe('===================== combination =====================', () => {
  describe(`-----------------------------------
    additional functions:`, () => {
    afterEach(() => {
      deckClass = new deck.Deck();
    });
    describe('copyHand function', () => {
      it('should copy given array of objects', () => {
        const fewCards = deckClass.dealN(7);
        assert.deepEqual(combination.copyHand(fewCards), fewCards);
        assert.notStrictEqual(combination.copyHand(fewCards), fewCards);
      });
    });
    describe('highToLow function', () => {
      it('should sort given cards by cost, from high to low', () => {
        let sortedDeck = highToLow(deckClass.dealN(8));
        for (let i = 0; i < 10; i += 1) {
          for (let j = 0; j < sortedDeck.length - 1; j += 1) {
            assert.isAtLeast(sortedDeck[j].cost, sortedDeck[j + 1].cost);
          }
        }
      });
    });
    describe('distance function', () => {
      it('should return the sting thet represent difference between rank of nearby card', () => {
        assert.strictEqual("111011101110111011101110111011101110111011101110111", distance(highToLow(deckClass.deck), 0));
        assert.strictEqual("000100010001000100010001000100010001000100010001000", distance(highToLow(deckClass.deck), 1));
      });
    });
    describe('suitFilter function', () => {
      it('should filter given array of cards and return only those who have chousen suit', () => {
        let filtered;
        suits.forEach((elem) => {
          filtered = suitFilter(deckClass.deck, elem);
          for (let i = 0; i < filtered.length; i += 1) {
            assert.strictEqual(filtered[i].suit, elem);
          }
        });
      });
    });
  });
  describe(`-----------------------------------
    combination functions:`, () => {

    afterEach(() => {
      deckClass = new deck.Deck();
    });

    describe('straightFlush', () => {
      let straightFlushHand;
      before(() => {
        while (!straightFlushHand) {
          deckClass = new deck.Deck();
          deckClass.shuffle();
          straightFlushHand = straight(flush(highToLow(deckClass.dealN(14))).hand).hand;
        }
      });
      it('should have 5 length', () => {
        assert.strictEqual(straightFlushHand.length, 5);
      });
      it('should have equal suits', () => {
        for (let i = straightFlushHand.length - 1; i > 1; i -= 1) {
          assert.strictEqual(straightFlushHand[i].suit, straightFlushHand[i - 1].suit);
        }
      });
      it('should have difference between cards equal to 1', () => {
        assert.strictEqual(distance(straightFlushHand, 1), '1111')
      });
    });

    describe('fourOfAKind', () => {
      let four;
      let ordered;
      before(() => {
        while (!four) {
          deckClass = new deck.Deck();
          deckClass.shuffle();
          ordered = highToLow(deckClass.dealN(7));
          four = fourOfAKind(ordered).hand;
        }
      });
      it('should have the 5 length', () => {
        assert.strictEqual(four.length, 5);
      });
      it('should have 4 cards whith the same rank', () => {
        assert.strictEqual(distance(four, 0), '1110');
      });
    });

    describe('fullHouse', () => {
      let fullHouseHand;
      before(() => {
      let ordered;
        while (!fullHouseHand) {
          deckClass = new deck.Deck();
          deckClass.shuffle();
          ordered = highToLow(deckClass.dealN(7));
          fullHouseHand = fullHouse(ordered).hand;
        }
      });
      it('should have the 5 length', () => {
        assert.strictEqual(fullHouseHand.length, 5);
      });
      it('should have three of a kind and a pair', () => {
        assert.strictEqual(distance(fullHouseHand, 0), '1101');
      });
    });

    describe('flush', () => {
      let flushHand;
      before(() => {
        while (!flushHand) {
          deckClass = new deck.Deck();
          deckClass.shuffle();
          flushHand = flush(highToLow(deckClass.dealN(7))).hand;
        }
      });
      it('should have the 5 length', () => {
        assert.strictEqual(flushHand.length, 5);
      });
      it('should have equal suits', () => {
        for (let i = flushHand.length - 1; i > 1; i -= 1) {
          assert.strictEqual(flushHand[i].suit, flushHand[i - 1].suit);
        }
      });
    });

    describe('straight', () => {
      let straightHand;
      before(() => {
        while (!straightHand) {
          deckClass = new deck.Deck();
          deckClass.shuffle();
          straightHand = straight(highToLow(deckClass.dealN(7))).hand;
        }
      });
      it('should have the 5 length', () => {
        assert.strictEqual(straightHand.length, 5);
      });
      it('should have difference between cards equal to 1', () => {
        assert.strictEqual(distance(straightHand, 1), '1111')
      });
    });

    describe('threeOfAKind', () => {
      let threeOfAKindHand;
      let ordered;
      before(() => {
        while (!threeOfAKindHand) {
          deckClass = new deck.Deck();
          deckClass.shuffle();
          ordered = highToLow(deckClass.dealN(7));
          threeOfAKindHand = threeOfAKind(ordered).hand;
        }
      });
      it('should have the 5 length', () => {
        assert.strictEqual(threeOfAKindHand.length, 5);
      });
      it('should have 3 same cards', () => {
        assert.strictEqual(distance(threeOfAKindHand, 0).slice(0, 2), '11');
      });
    });

    describe('two pair', () => {
      let twoPairsHand;
      let ordered;
      before(() => {
        while (!twoPairsHand) {
          deckClass = new deck.Deck();
          deckClass.shuffle();
          ordered = highToLow(deckClass.dealN(7));
          twoPairsHand = twoPairs(ordered).hand;
        }
      });
      it('should have the 5 length', () => {
        assert.strictEqual(twoPairsHand.length, 5);
      });
      it('should have 3 same cards', () => {
        assert.strictEqual(distance(twoPairsHand, 0).slice(0, 1) + distance(twoPairsHand, 0).slice(2, 3), '11');
      });
    });

    describe('pair', () => {
      let pairHand;
      let ordered;
      before(() => {
        while (!pairHand) {
          deckClass = new deck.Deck();
          deckClass.shuffle();
          ordered = highToLow(deckClass.dealN(7));
          pairHand = pair(ordered).hand;
        }
      });
      it('should have 5 length', () => {
        assert.strictEqual(pairHand.length, 5);
      });
      it('should have 2 same cards', () => {
        assert.strictEqual(distance(pairHand, 0).slice(0, 1), '1');
      });
    });
  });
  describe(`-----------------------------------
    handCombination function`, () => {
    afterEach(() => {
      deckClass = new deck.Deck();
    });
    it('should have the 5 length', () => {
      deckClass.shuffle();
      let tableSituation = deckClass.dealN(7);
      let handCombinationHand = handCombination(tableSituation);
      assert.strictEqual(handCombinationHand.hand.length, 5);
    });
  });

});
