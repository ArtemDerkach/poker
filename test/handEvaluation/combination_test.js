'use strict';

let chai = require(`chai`);
let assert = chai.assert;

let combination = require('../combination');

// deck
let deck = require('../deck');
let deckClass = new deck.Deck();

// additional functions
let copyHand = combination.copyHand;
let distance = combination.distance;
let highToLow = combination.highToLow;
let suitFilter = combination.suitFilter;
let suits = deck.suits;

// function to test combo's
let straightFlush = combination.straightFlush;
let fourOfAKind = combination.fourOfAKind;
let fullHouse = combination.fullHouse;
let flush = combination.flush;
let straight = combination.straight;
let threeOfAKind = combination.threeOfAKind;
let twoPairs = combination.twoPairs;
let pair = combination.pair;

// main function
let handCombination = combination.handCombination;

describe(`===================== combination =====================`, function () {
  describe(`-----------------------------------
    additional functions:`, function () {
    afterEach(function () {
      deckClass = new deck.Deck();
    });
    describe('copyHand function', function () {
      it('should copy given array of objects', function () {
        let fewCards = deckClass.dealN(7);
        assert.deepEqual(combination.copyHand(fewCards), fewCards);
        assert.notStrictEqual(combination.copyHand(fewCards), fewCards);
      });
    });
    describe('highToLow function', function () {
      it('should sort given cards by cost, from high to low', function () {
        let sortedDeck = highToLow(deckClass.dealN(8));
        for (let i = 0; i < 10; i += 1) {
          for (let j = 0; j < sortedDeck.length - 1; j += 1) {
            assert.isAtLeast(sortedDeck[j].cost, sortedDeck[j + 1].cost);
          }
        }
      });
    });
    describe('distance function', function () {
      it('should return the sting thet represent difference between rank of nearby card', function () {
        assert.strictEqual("111011101110111011101110111011101110111011101110111", distance(highToLow(deckClass.deck), 0));
        assert.strictEqual("000100010001000100010001000100010001000100010001000", distance(highToLow(deckClass.deck), 1));
      });
    });
    describe('suitFilter function', function () {
      it('should filter given array of cards and return only those who have chousen suit', function () {
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
    combination functions:`, function () {

    afterEach(function () {
      deckClass = new deck.Deck();
    });

    describe('straightFlush', function () {
      let straightFlushHand;
      before(function () {
        while (!straightFlushHand) {
          deckClass = new deck.Deck();
          deckClass.shuffle();
          straightFlushHand = straight(flush(highToLow(deckClass.dealN(14))).hand).hand;
        }
      });
      it('should have 5 length', function () {
        assert.strictEqual(straightFlushHand.length, 5);
      });
      it('should have equal suits', function () {
        for (let i = straightFlushHand.length - 1; i > 1; i -= 1) {
          assert.strictEqual(straightFlushHand[i].suit, straightFlushHand[i - 1].suit);
        }
      });
      it('should have difference between cards equal to 1', function () {
        assert.strictEqual(distance(straightFlushHand, 1), '1111')
      });    
    });

    describe('fourOfAKind', function () {
      let four;
      let ordered;
      before(function () {
        while (!four) {
          deckClass = new deck.Deck();
          deckClass.shuffle();
          ordered = highToLow(deckClass.dealN(7));
          four = fourOfAKind(ordered).hand;
        }
      });
      it('should have the 5 length', function () {
        assert.strictEqual(four.length, 5);
      });
      it('should have 4 cards whith the same rank', function () {
        assert.strictEqual(distance(four, 0), '1110');
      });
    });

    describe('fullHouse', function () {
      let fullHouseHand;
      before(function () {
      let ordered;
        while (!fullHouseHand) {
          deckClass = new deck.Deck();
          deckClass.shuffle();
          ordered = highToLow(deckClass.dealN(7));
          fullHouseHand = fullHouse(ordered).hand;
        }
      });      
      it('should have the 5 length', function () {
        assert.strictEqual(fullHouseHand.length, 5);
      });
      it('should have three of a kind and a pair', function () {
        assert.strictEqual(distance(fullHouseHand, 0), '1101');
      });
    });

    describe('flush', function () {
      let flushHand;
      before(function () {  
        while (!flushHand) {
          deckClass = new deck.Deck();
          deckClass.shuffle();
          flushHand = flush(highToLow(deckClass.dealN(7))).hand;
        }
      });
      it('should have the 5 length', function () {
        assert.strictEqual(flushHand.length, 5);
      });
      it('should have equal suits', function () {
        for (let i = flushHand.length - 1; i > 1; i -= 1) {
          assert.strictEqual(flushHand[i].suit, flushHand[i - 1].suit);
        }
      });
    });

    describe('straight', function () {
      let straightHand;
      before(function () {
        while (!straightHand) {
          deckClass = new deck.Deck();
          deckClass.shuffle();
          straightHand = straight(highToLow(deckClass.dealN(7))).hand;
        }
      });
      it('should have the 5 length', function () {
        assert.strictEqual(straightHand.length, 5);
      });
      it('should have difference between cards equal to 1', function () {
        assert.strictEqual(distance(straightHand, 1), '1111')
      });
    });

    describe('threeOfAKind', function () {
      let threeOfAKindHand;
      let ordered;
      before(function () {
        while (!threeOfAKindHand) {
          deckClass = new deck.Deck();
          deckClass.shuffle();
          ordered = highToLow(deckClass.dealN(7));
          threeOfAKindHand = threeOfAKind(ordered).hand;
        }
      });
      it('should have the 5 length', function () {
        assert.strictEqual(threeOfAKindHand.length, 5);
      });
      it('should have 3 same cards', function () {
        assert.strictEqual(distance(threeOfAKindHand, 0).slice(0, 2), '11');
      });
    });
    
    describe('two pair', function () {
      let twoPairsHand;
      let ordered;
      before(function () {
        while (!twoPairsHand) {
          deckClass = new deck.Deck();
          deckClass.shuffle();
          ordered = highToLow(deckClass.dealN(7));
          twoPairsHand = twoPairs(ordered).hand;
        }
      });
      it('should have the 5 length', function () {
        assert.strictEqual(twoPairsHand.length, 5);
      });
      it('should have 3 same cards', function () {
        assert.strictEqual(distance(twoPairsHand, 0).slice(0, 1) + distance(twoPairsHand, 0).slice(2, 3), '11');
      });
    });

    describe('pair', function () {
      let pairHand;
      let ordered;
      before(function () {
        while (!pairHand) {
          deckClass = new deck.Deck();
          deckClass.shuffle();
          ordered = highToLow(deckClass.dealN(7));
          pairHand = pair(ordered).hand;
        }
      });    
      it('should have 5 length', function () {
        assert.strictEqual(pairHand.length, 5);
      });
      it('should have 2 same cards', function () {
        assert.strictEqual(distance(pairHand, 0).slice(0, 1), '1');
      });
    });
  });
  describe(`-----------------------------------
    handCombination function`, function () {
    afterEach(function () {
      deckClass = new deck.Deck();
    });
    it('should have the 5 length', function () {
      deckClass.shuffle();
      let tableSituation = deckClass.dealN(7);
      let handCombinationHand = handCombination(tableSituation);
      assert.strictEqual(handCombinationHand.hand.length, 5);
    });
  });

});