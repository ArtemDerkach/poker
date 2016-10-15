'use strict';

const Deck = require('./deckClass.js').Deck;

class Dealer {

  constructor(deck) {
    this.deck = deck
      ? deck.shuffle()
      : new Deck().shuffle();
  }

  dealCardsToPlayers(players) {
    for (let playerName in players) {
      if (players.hasOwnProperty(playerName)) {
        players[playerName].hand.push(this.deck.deal());
        players[playerName].hand.push(this.deck.deal());
      }
    }
  }

  openCard(cardsOnTable) {
    cardsOnTable.push(this.deck.deal());
  }

  openCards(cardsOnTable, n) {
    for (let i = 0; i < n; i += 1) {
      cardsOnTable.push(this.deck.deal());
    }
  }

}

module.exports.Dealer = Dealer;
