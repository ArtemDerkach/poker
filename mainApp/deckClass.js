'use strict';

const Card = require('./cardClass.js').Card;

const suits = ['spades', 'hearts', 'clubs', 'diamonds'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

class Deck {

  constructor() {
    this.cardsInDeck = (() => {
      const createdDeck = [];
      for (let i = 0; i < suits.length; i += 1) {
        for (let j = 0; j < ranks.length; j += 1) {
          createdDeck.push(new Card(ranks[j], suits[i]));
        }
      }
      return createdDeck;
    })();
    this.cardsOutsideDeck = [];
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

  dealTopCard() {
    if (this.cardsInDeck.length === 0) {
      throw new Error('no cards left');
    }
    const cardToDeal = this.cardsInDeck.pop();
    this.cardsOutsideDeck.push(cardToDeal);
    return cardToDeal;
  }

  dealNCards(n) {
    const result = [];
    for (let i = n; i > 0; i -= 1) {
      result.push(this.dealTopCard());
    }
    return result;
  }

  dealCard(card) {
    let cardToRemove;
    for (let i = 0; i < this.cardsInDeck.length; i += 1) {
      if (card.rank === this.cardsInDeck[i].rank && card.suit.name === this.cardsInDeck[i].suit.name) {
        cardToRemove = this.cardsInDeck.splice(i, 1)[0];
        this.cardsOutsideDeck.push(cardToRemove);
        return cardToRemove;
      }
    }
    return null;
  }
}

module.exports.Deck = Deck;
