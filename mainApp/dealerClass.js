'use strict';

const Deck = require('./deckClass.js').Deck;

class Dealer {

  constructor() {
    this.pot = 0;
    this.deck = new Deck().shuffle();
  }

  dealCardsToPlayers(players) {
    for (let playerName in players) {
      if (players.hasOwnProperty(playerName)) {
        players[playerName].hand.push(this.deck.deal());
        players[playerName].hand.push(this.deck.deal());
      }
    }
  }

  dealCardOnTable(cardsOnTable) {
    cardsOnTable.push(this.deck.deal());
  }

  playerAction(action) {
    switch (action) {
      case fold:

        break;
      default:

    }
  }

}

module.exports.Dealer = Dealer;
