'use strict';

let chai = require(`chai`);
let assert = chai.assert;

let combination = require('../combination');
let deck = require('../deck');
let compareHands = require('../compareHands');

let deckClass = new deck.Deck();
let handCombination = combination.handCombination;
let copyTable = compareHands.copyTable;
let costCompare = compareHands.costCompare;
let whoWins = compareHands.whoWins;

let table;

describe(`==================== compareHands ====================`, function () {
  beforeEach(function () {
    deckClass = new deck.Deck();
    deckClass.shuffle();
    deckClass.shuffle();
    deckClass.shuffle();
    table = [];
    let temp;
    for (let i = 0; i < 5; i += 1) {
      temp = handCombination(deckClass.dealN(7));
      temp.name = 'hand' + (i + 1);
      table.push(temp);
    }
  });

  describe('copyTable function', function () {
    it('should return the same array of hands', function () {
      assert.deepEqual(copyTable(table), table);
    });
  });

  describe('whoWins function', function () {
    it('should return array', function () {
      assert.strictEqual(Array.isArray(whoWins(table)), true);
    });
    it('should return hiest cost hand', function () {
      assert.strictEqual(whoWins(table)[0].cost, Math.max(table[0].cost, table[1].cost, table[2].cost, table[3].cost, table[4].cost));
    });
  });

});