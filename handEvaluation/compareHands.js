'use strict';

let handCombination = require('./combination');
let deck = require('./deck');
let combination = require('./combination');

let copyHand = combination.copyHand;

let table;
let result = [];

function whoWins(hands) {

  table = copyTable(hands);
  // console.log(table);
  result =[table[0]];
  for (let i = 0, temp; i < table.length - 1; i += 1) {
    costCompare(result[0], table[i + 1]);
  }
  return result;

}

function costCompare(handBase, handTemp) {
  let diff = handBase.cost - handTemp.cost;
  switch (true) {
    case (diff < 0):
      result = [handTemp];
      return result;
      break;
    case (diff > 0):
      return result;
      break;
    case (diff === 0):
      for (let i = 0, temp; i < 5; i += 1) {
        temp = handBase.hand[i].cost - handTemp.hand[i].cost;
        switch (true) {
          case (temp > 0):
            return result;
            break;
          case (temp < 0):
            result = [handTemp];
            return result;
            break;
          case (temp === 0):
            break;
        }
      }
      result.push(handTemp);
      return result;
      break;
  }
  return result;
}

function copyTable(table) {
  let result = [];
  table.forEach((elem, i) => {
    result.push({});
    for (let p in elem) {
      if (p === 'hand') {
        result[i][p] = copyHand(elem[p]);
      } else {
        result[i][p] = elem[p];
      }

    }
  });
  return result;
}

module.exports.costCompare = costCompare;
module.exports.whoWins = whoWins;
module.exports.copyTable = copyTable;
