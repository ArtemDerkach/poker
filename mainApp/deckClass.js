'use strict';

const Card = require('./cardClass.js').Card;

class Deck {

  constructor() {
    this.symbols = {spades: '♠', hearts: '♥', clubs: '♣', diamonds: '♦'};
    this.suits = ['spades', 'hearts', 'clubs', 'diamonds'];
    this.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    this.cardsInDeck = (() => {
      const createdDeck = [];
      for (let i = 0; i < this.suits.length; i += 1) {
        for (let j = 0; j < this.ranks.length; j += 1) {
          createdDeck.push(new Card(this.ranks[j], this.suits[i], j + 1));
        }
      }
      return createdDeck;
    })();
    this.cardsOutsideDeck = [];
  }

  // delete given elements from deck
  // take [{rank:.., suit:..}, {rank:.., suit:..}, .... ]
  delete(arr) {
    arr.forEach((elem) => {
      for (let j = 0; j < this.deck.length; j += 1) {
        if (elem.rank === this.deck[j].rank && elem.suit === this.deck[j].suit) {
          this.deck = this.deck.slice(0, j).concat(this.deck.slice(j + 1, this.deck.length));
          break;
        }
      }
    });
    return this.deck;
  }

  shuffle() {
    let temp;
    let rnd;
    this.cardsInDeck.forEach((elem, i) => {
      rnd = Math.floor(Math.random() * i);
      temp = this.cardsInDeck[rnd];
      this.cardsInDeck[rnd] = this.cardsInDeck[i];
      this.cardsInDeck[i] = temp;
    });
    return this.cardsInDeck;
  }

  // move one card from cardsInDeck to cardsOutsideDeck
  // and return those card
  dealTopCard() {
    if (this.deck.length === 0) {
      throw new Error('no deck left');
    }
    const cardToDeal = this.deck[0];
    this.cardsOutsideDeck.push(cardToDeal);
    this.cardsInDeck = this.cardsInDeck.slice(1, this.deck.length);
    return cardToDeal;
  }

  // deal n cards
  dealN(n) {
    const result = [];
    for (let i = n; i > 0; i -= 1) {
      result.push(this.deal());
    }
    return result;
  }

  dealCard(card) {
    let temp;
    for (let i = 0; i < this.deck.length; i += 1) {
      if (card.suit === this.deck[i].suit && card.rank === this.deck[i].rank) {
        temp = this.deck[0];
        this.deck[0] = this.deck[i];
        this.deck[i] = temp;
        return this.deal();
      }
    }
    return null;
  }
}

module.exports.Deck = Deck;
