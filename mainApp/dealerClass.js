'use strict';

const Deck = require('./deckClass.js').Deck;

class Dealer {

  constructor() {
    this.pot = {
      table: 0,
      human: 0,
      bot: 0
    };
    this.deck = (new Deck()).shuffle();
  }

  testAction(action, socket) {
    if (this.pot.human < this.pot.bot && action === 'check') {
      socket.emit('output', [{
        name: 'game',
        message: `you cant ${action}`
      }]);
      return false;
    }
    return true;
  }

  dealCardOnTable(socket, table) {
    const card = this.deck.dealTopCard();
    table.push(card);
    socket.emit('cardTable', {
      name: `${card.rank}-of-${card.suit.name}`
    });
    socket.emit('output', [{
      name: 'game',
      message: `${card.rank}-of-${card.suit.name} are on table`
    }]);
  }

  dealCardsToPlayers(players, socket) {
    for (const playerName in players) {
      if (players.hasOwnProperty(playerName)) {
        const hand = players[playerName].hand;
        hand.push(this.deck.dealTopCard());
        players[playerName].hand.push(this.deck.dealTopCard());

        socket.emit('card', {
          type: players[playerName].type,
          card1Name: `${hand[0].rank}-of-${hand[0].suit.name}`,
          card2Name: `${hand[1].rank}-of-${hand[1].suit.name}`
        });
        socket.emit('output', [{
          name: 'game',
          message: `player ${players[playerName].name} got 2 cards`
        }]);
      }
    }
  }

  callBet(player) {

    const sumToBet = this.pot.table - 2 * this.pot[player.type];

    player.money -= sumToBet;
    this.pot.table += sumToBet;
    this.pot.human += sumToBet;

  }

  fold(player, socket) {
    player.money += this.pot.table;
    socket.emit('setMoney', {
      player: player,
      pot: this.pot
    });
  }

}

module.exports.Dealer = Dealer;
