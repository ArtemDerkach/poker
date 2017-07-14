'use strict';

function Suit(suitName) {
  const suitSymbols = { spades: '♠', hearts: '♥', clubs: '♣', diamonds: '♦' };

  // check input data vor validation
  if (!suitSymbols.hasOwnProperty(suitName)) throw Error(`suit ${suitName} not exists`);
  
  this.name = suitName;
  this.symbol = suitSymbols[suitName];

  // freeze object to make it immutable
  Object.freeze(this);
}

function Rank(rankName) {
  const rankCosts = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
    'J': 11, 'Q': 12, 'K': 13, 'A': 14,
  };

  // check input data vor validation
  if (!rankCosts.hasOwnProperty(rankName)) throw Error(`suit ${rankName} not exists`);
  
  this.name = rankName;
  this.cost = rankCosts[rankName];

  // freeze object to make it immutable
  Object.freeze(this);
}

function Card(rankName, suitName) {
  this.rank = new Rank(rankName);
  this.suit = new Suit(suitName);

  // freeze object to make it immutable
  Object.freeze(this);
}

function Deck() {
  const suits = ['spades', 'hearts', 'clubs', 'diamonds'];
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

  // create a deck of cards
  const deck = suits.reduce((deck, suit) => deck.concat(ranks.map(rank => new Card(rank, suit))), []);

  // define getter for deck, for user not to have possibility to change it
  Object.defineProperty(this, 'deck', { get: () => deck }, );
}







const symbols = {spades: '♠', hearts: '♥', clubs: '♣', diamonds: '♦'};
const rankToCost = {J: 11, Q: 12, K: 13, A: 14};

class Card {

  constructor(rank, suit) {
    this.rank = rank;
    this.suit = {
      name: suit,
      symbol: symbols[suit]
    };
    this.cost = Number(rank) || rankToCost[rank];
  }

  compare(card) {
    if (this.cost > card.cost) {
      return 1;
    } else if (this.cost < card.cost) {
      return -1;
    }
    return 0;
  }

  value() {
    return this.rank + this.suit.symbol;
  }

}

module.exports.Card = Card;
