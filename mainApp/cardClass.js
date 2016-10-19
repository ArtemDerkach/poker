'use strict';

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
