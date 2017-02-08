'use strict';

let deck = require('./deck');
let deckClass = new deck.Deck();
let compareHands = require('./compareHands');
let combination = require('./combination');

let handCombination = combination.handCombination;
let whoWins = compareHands.whoWins;

// return the winner
function winRate(hand, table, enemyNum, deckClassFrom) {

  let winner;
  let winNum = 0;
  let hands;
  let filled;
  for (let i = 0; i < 100000; i += 1) {
    deckClassFrom.shuffle();
    deckClassFrom.shuffle();
    deckClass.deck = deckClass.copyDeck(deckClassFrom.deck);
    filled = fill(hand, table, 1, deckClass);
    hands = getHands(filled);

    let name;
    hands.forEach((elem, i) => {
      name = elem['name'];
      hands[i] = handCombination(elem.hand);
      hands[i]['name'] = name;
    });

    winner = whoWins(hands);
    if (winner.length !== 1) {
    } else {
      if (winner[0].name === 'myHand') {
        winNum += 1;
      }
    }
  }
  return winNum * 100 / 100000 + '%';
}

// make hands data as:
// [
//  {name: Myhand, hand: [card1, card2......]},
//  {name: eneMyhand1m hand: [card1, card2......]}
//  .......
// ]
function getHands(tableSituation) {
  let result = [];
  for (let i = 1; i < tableSituation.length; i += 1) {
    result.push({
      name: tableSituation[i].name,
      hand: tableSituation[i].hand.concat(tableSituation[0].hand)
    });
  }

  return result;
}

// fill table (5 cards) and enemy hands (2 cards)
// to get:
// [{name: table, cards: [card1, card2, card3, card4, card5]},
//  name: myHand, cards: [card1, card2],
//  name: enemyHand1, ....
//  ...........]
function fill(myHand, table, enemyNum, deck) {

  let result = [];
  result.push({name: 'table', hand: table.concat(deck.dealN(5 - table.length))});
  result.push({name: 'myHand', hand: myHand});

  // fill each enemy hand
  for (let i = 1; i <= enemyNum; i += 1) {
    result.push({name: 'enemyHand' + i, hand: deck.dealN(2)});
  }

  return result;
}

module.exports.winRateFunc = winRate;
module.exports.getHands = getHands;
module.exports.fill = fill;
