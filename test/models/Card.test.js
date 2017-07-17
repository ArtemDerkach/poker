const random = require('random-js')();
const should = require('chai').should();

const Suit = require('../../models/Card.js').Suit;
const Rank = require('../../models/Card.js').Rank;
const Card = require('../../models/Card.js').Card;

let suit = new Suit('clubs');

describe.only('Card model', () => {
  describe('Suit', () => {
    const suits = [
      { name: 'spades', symbol: '♠' },
      { name: 'hearts', symbol: '♥' },
      { name: 'clubs', symbol: '♣' },
      { name: 'diamonds', symbol: '♦' },
    ];
    // get random suit to test
    const randomSuit = suits[random.integer(0, 3)];
    // create suit with the constructor
    const suit = new Suit(randomSuit.name);

    it('should create suit object', () => {
      suit.should.be.deep.equal(randomSuit);
    });
    it('should be freeezed', () => {
      suit.name = 'name changed';
      suit.should.be.deep.equal(randomSuit);
      suit.prop = 'new property';
      suit.should.be.deep.equal(randomSuit);
    });
    it('should take only valid input', () => {
      should.throw(() => new Suit(4), Error, 'invalid input type');
      should.throw(() => new Suit('aaa'), Error, 'suit "aaa" not exists');
    });
  });

  describe('Rank', () => {
    const ranks = [
      { name: '2', cost: 2 },
      { name: '3', cost: 3 },
      { name: '4', cost: 4 },
      { name: '5', cost: 5 },
      { name: '6', cost: 6 },
      { name: '7', cost: 7 },
      { name: '8', cost: 8 },
      { name: '9', cost: 9 },
      { name: '10', cost: 10 },
      { name: 'J', cost: 11 },
      { name: 'Q', cost: 12 },
      { name: 'K', cost: 13 },
      { name: 'A', cost: 14 },
    ];
    // get random rank to test
    const randomRank = ranks[random.integer(0, 12)];
    // create rank with the constructor
    const rank = new Rank(randomRank.name);

    it('should create rank object', () => {
      rank.should.be.deep.equal(randomRank);
    });
    it('should be freeezed', () => {
      rank.name = 'name changed';
      rank.should.be.deep.equal(randomRank);
      rank.prop = 'new property';
      rank.should.be.deep.equal(randomRank);
    });
    it('should take only valid input', () => {
      should.throw(() => new Rank(4), Error, 'invalid input type');
      should.throw(() => new Rank('aaa'), Error, 'rank "aaa" not exists');
    });
  });

  describe('Card', () => {
    const cards = [
      { suit: { name: 'spades', symbol: '♠' }, rank: { name: '2', cost: 2 } },
      { suit: { name: 'spades', symbol: '♠' }, rank: { name: '3', cost: 3 } },
      { suit: { name: 'spades', symbol: '♠' }, rank: { name: '4', cost: 4 } },
      { suit: { name: 'spades', symbol: '♠' }, rank: { name: '5', cost: 5 } },
      { suit: { name: 'spades', symbol: '♠' }, rank: { name: '6', cost: 6 } },
      { suit: { name: 'spades', symbol: '♠' }, rank: { name: '7', cost: 7 } },
      { suit: { name: 'spades', symbol: '♠' }, rank: { name: '8', cost: 8 } },
      { suit: { name: 'spades', symbol: '♠' }, rank: { name: '9', cost: 9 } },
      { suit: { name: 'spades', symbol: '♠' }, rank: { name: '10', cost: 10 } },
      { suit: { name: 'spades', symbol: '♠' }, rank: { name: 'J', cost: 11 } },
      { suit: { name: 'spades', symbol: '♠' }, rank: { name: 'Q', cost: 12 } },
      { suit: { name: 'spades', symbol: '♠' }, rank: { name: 'K', cost: 13 } },
      { suit: { name: 'spades', symbol: '♠' }, rank: { name: 'A', cost: 14 } },
      { suit: { name: 'hearts', symbol: '♥' }, rank: { name: '2', cost: 2} },
      { suit: { name: 'hearts', symbol: '♥' }, rank: { name: '3', cost: 3} },
      { suit: { name: 'hearts', symbol: '♥' }, rank: { name: '4', cost: 4} },
      { suit: { name: 'hearts', symbol: '♥' }, rank: { name: '5', cost: 5} },
      { suit: { name: 'hearts', symbol: '♥' }, rank: { name: '6', cost: 6} },
      { suit: { name: 'hearts', symbol: '♥' }, rank: { name: '7', cost: 7} },
      { suit: { name: 'hearts', symbol: '♥' }, rank: { name: '8', cost: 8} },
      { suit: { name: 'hearts', symbol: '♥' }, rank: { name: '9', cost: 9} },
      { suit: { name: 'hearts', symbol: '♥' }, rank: { name: '10', cost: 10 } },
      { suit: { name: 'hearts', symbol: '♥' }, rank: { name: 'J', cost: 11 } },
      { suit: { name: 'hearts', symbol: '♥' }, rank: { name: 'Q', cost: 12 } },
      { suit: { name: 'hearts', symbol: '♥' }, rank: { name: 'K', cost: 13 } },
      { suit: { name: 'hearts', symbol: '♥' }, rank: { name: 'A', cost: 14 } },
      { suit: { name: 'clubs', symbol: '♣' }, rank: { name: '2', cost: 2} },
      { suit: { name: 'clubs', symbol: '♣' }, rank: { name: '3', cost: 3} },
      { suit: { name: 'clubs', symbol: '♣' }, rank: { name: '4', cost: 4} },
      { suit: { name: 'clubs', symbol: '♣' }, rank: { name: '5', cost: 5} },
      { suit: { name: 'clubs', symbol: '♣' }, rank: { name: '6', cost: 6} },
      { suit: { name: 'clubs', symbol: '♣' }, rank: { name: '7', cost: 7} },
      { suit: { name: 'clubs', symbol: '♣' }, rank: { name: '8', cost: 8} },
      { suit: { name: 'clubs', symbol: '♣' }, rank: { name: '9', cost: 9} },
      { suit: { name: 'clubs', symbol: '♣' }, rank: { name: '10', cost: 10 } },
      { suit: { name: 'clubs', symbol: '♣' }, rank: { name: 'J', cost: 11 } },
      { suit: { name: 'clubs', symbol: '♣' }, rank: { name: 'Q', cost: 12 } },
      { suit: { name: 'clubs', symbol: '♣' }, rank: { name: 'K', cost: 13 } },
      { suit: { name: 'clubs', symbol: '♣' }, rank: { name: 'A', cost: 14 } },
      { suit: { name: 'diamonds', symbol: '♦' }, rank: { name: '2', cost: 2 } },
      { suit: { name: 'diamonds', symbol: '♦' }, rank: { name: '3', cost: 3 } },
      { suit: { name: 'diamonds', symbol: '♦' }, rank: { name: '4', cost: 4 } },
      { suit: { name: 'diamonds', symbol: '♦' }, rank: { name: '5', cost: 5 } },
      { suit: { name: 'diamonds', symbol: '♦' }, rank: { name: '6', cost: 6 } },
      { suit: { name: 'diamonds', symbol: '♦' }, rank: { name: '7', cost: 7 } },
      { suit: { name: 'diamonds', symbol: '♦' }, rank: { name: '8', cost: 8 } },
      { suit: { name: 'diamonds', symbol: '♦' }, rank: { name: '9', cost: 9 } },
      { suit: { name: 'diamonds', symbol: '♦' }, rank: { name: '10', cost: 10 } },
      { suit: { name: 'diamonds', symbol: '♦' }, rank: { name: 'J', cost: 11 } },
      { suit: { name: 'diamonds', symbol: '♦' }, rank: { name: 'Q', cost: 12 } },
      { suit: { name: 'diamonds', symbol: '♦' }, rank: { name: 'K', cost: 13 } },
      { suit: { name: 'diamonds', symbol: '♦' }, rank: { name: 'A', cost: 14 } }
    ];
    const int = random.integer(0, 51);
    const randomCard = cards[int];
    const randomRank = randomCard.rank.name;
    const randomSuit = randomCard.suit.name;
    const card = new Card(randomRank, randomSuit);
    it('should create card object', () => {
      card.should.be.deep.equal(randomCard);
    });
    it('should be freeezed', () => {
      card.rank = 'name changed';
      card.should.be.deep.equal(randomCard);
      card.prop = 'new property';
      card.should.be.deep.equal(randomCard);
    });
    it('shuld take only valid data', () => {
      should.throw(() => new Card(4, 'spades'), Error, 'invalid input type');
      should.throw(() => new Card('aaa', 'clubs'), Error, 'rank "aaa" not exists');
      should.throw(() => new Card('A', 4), Error, 'invalid input type');
      should.throw(() => new Card('6', 'ddd'), Error, 'suit "ddd" not exists');
    });
  });
});
