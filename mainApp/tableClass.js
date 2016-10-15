'use strict';

class Table {

  constructor(player) {
    this.cardsOnTable = [];
    this.playerToStopStageIn = player;
  }

  stage(dealer, gameStage) {
    switch (gameStage) {
    case 'flop':
      dealer.openCards(this.cardsOnTable, 3);
      break;
    case 'tern':
      dealer.openCard(this.cardsOnTable);
      break;
    case 'reaver':
      dealer.openCard(this.cardsOnTable);
      break;
    default:
    }
  }

}

module.exports.Table = Table;
