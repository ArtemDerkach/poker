'use strict';

class Card {

  constructor(rank, suit, cost) {
    this.rank = rank;
    this.suit = suit;
    this.cost = cost;
  }

  compare(card) {
    if (this.cost > card.cost) {
      return 1;
    } else if (this.cost < card.cost) {
      return -1;
    }
    return 0;
  }

  get value() {
    return this.rank + this.suit.symbol;
  }

}

module.exports.Card = Card;
