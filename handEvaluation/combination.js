'use strict';

// take cards that are in the table and one of the hands
// in form:
//  [
//    {rank: '3', suit: diamonds, cost:3},
//    {rank: '8', suit: spades, cost:8},
//    ......
//    ......
//  ]
//
//  return combination that has a player

function handCombination(tableSituation) {

  // get ordered tableSituation by rank, from biggest to smallest.
  let ordered = highToLow(tableSituation);
  // find the heighest combination
  return straightFlush(ordered) || fourOfAKind(ordered) || fullHouse(ordered) || flush(ordered) || straight(ordered) || threeOfAKind(ordered) || twoPairs(ordered) || pair(ordered) || highCard(ordered);

}

// ==================================
//        additional functions
// ==================================

// making copy of given hand, to have possibilities to change propertys
function copyHand(arr) {
  let copy = [];
  let obj;
  arr.forEach((elem, index) => {
    obj = {};
    for (let p in elem) {
      obj[p] = elem[p];
    }
    copy.push(obj);
  });
  return copy;
}

// take array of cards create new hand,sort it by rank, from high to low
function highToLow(tableSituation) {
  let hand = copyHand(tableSituation);
  let temp;
  for (let i = 0; i < hand.length - 1; i += 1) {
    for (let j = i + 1; j < hand.length; j += 1) {
      if (hand[i].cost < hand[j].cost) {
        temp = hand[i];
        hand[i] = hand[j];
        hand[j] = temp;
      }
    }
  }
  return hand;
}

// take array of cards {rank:.., suit: ...}
// return the sting thet represent difference between rank of nearby card
// get 1 if defffernce equal to RANGE variable
function distance(arr, range) {
  let result = '';
  for (let i = 0, end = arr.length - 1; i < end; i += 1) {
    result += (arr[i].cost === arr[i + 1].cost + range) ? 1 : 0;
  }
  return result;
}

// return combination that we could find,
// (exact pattern that we coul find) in given hand
// l - length of conmbination that we search
// arr - given cards
// distStr - string of matched distancess
// pattern - exact pattern that we want to find if distStr
function combo(hand, distanceStr, pattern, l) {
  // position of matched pattern in string that show distances
  let pos = distanceStr.search(pattern);
  if (pos === -1) {
    return false;
  }
  return {
    hand: hand.slice(pos, pos + l),
    rest: hand.slice(0, pos).concat(hand.slice(pos + l, hand. length))
  };
}

// take array of cards and suit
// return filtered array by given suit
function suitFilter(cards, suit){
  return cards.filter(elem => elem['suit'] === suit);
};

// ==================================
//        combination functions
// ==================================

function straightFlush(tableSituation) {
  let hand = copyHand(tableSituation);
  flush(hand);
  return flush(hand) && straight(flush(hand).hand) ? {
    hand: straight(flush(hand).hand).hand,
    combo: 'straightFlush',
    cost: 9
  } : false;
}

function fourOfAKind(tableSituation) {
  let hand = copyHand(tableSituation);
  let result = combo(hand, distance(hand, 0), /1{3}/, 4);
  return result ? {
    hand: result.hand.concat(result.rest.slice(0, 1)),
    combo: 'fourOfAKind',
    cost: 8
  } : false;
}

function fullHouse(tableSituation) {
  let hand = copyHand(tableSituation);
  let three = combo(hand, distance(hand, 0), /1{2}/, 3);
  if (!three) {
    return false;
  }
  let pair = combo(three.rest, distance(three.rest, 0), /1{1}/, 2);
  return pair ? {
    hand: three.hand.concat(pair.hand),
    combo: 'threeOfAKind',
    cost: 7
  } : false;
}

function flush(tableSituation) {
  let result;
  let possibleFlush;
  // possible suit type
  let suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  // test cards for flush taking all suits one by one
  suits.forEach((elem) => {
    possibleFlush = suitFilter(tableSituation, elem);
    if (possibleFlush.length >= 5) {
      result = possibleFlush.slice(0, 5);
    } else {
      result = false;
    }
  });
  return result ? {
    hand: result,
    combo: 'flush',
    cost: 6
  } : false;
}

function straight(tableSituation) {

  if (!tableSituation) {
    return false;
  }
  let hand = copyHand(tableSituation);
  // if there is an ace in our hand then add ace whith 1 cost
  // to check possible straigt whith 1 cost ace
  if (hand[0].rank === 'A') {
    hand[hand.length] = {
      rank: 'A',
      suit: hand[0].suit,
      cost: 1
    };
  }

  let straightDistance = distance(hand);
  for (let i = 0; i < hand.length - 1; i += 1) {
    if (hand[i].rank === hand[i + 1].rank) {
      hand = hand.slice(0, i).concat(hand.slice(i + 1, hand.length));
      i -= 1;
    }
  }
  for (let i = 0; i + 4 < hand.length ; i += 1) {
    if (hand[i].cost === hand[i + 4].cost + 4) {
      return {
        hand: hand.slice(i, i + 5),
        combo: 'straight',
        cost: 5
      }
    }
  }
  return false;
}

function threeOfAKind(tableSituation) {
  let hand = copyHand(tableSituation);
  let three = combo(hand, distance(hand, 0), /1{2}/, 3);
  if (!three) {
    return false;
  }
  return {
    hand: three.hand.concat(three.rest.slice(0, 2)),
    combo: 'threeOfAKind',
    cost: 4
  };
}

function twoPairs(tableSituation) {
  let hand = copyHand(tableSituation);
  let firstPair = combo(hand, distance(hand, 0), /1{1}/, 2);
  if (!firstPair) {
    return false;
  }
  let secondPair = combo(firstPair.rest, distance(firstPair.rest, 0), /1{1}/, 2);
  if (!secondPair) {
    return false;
  }
  return {
    hand: firstPair.hand.concat(secondPair.hand.concat(secondPair.rest.slice(0, 1))),
    combo: 'twoPairs',
    cost: 3
  };
}

function pair(tableSituation) {
  let hand = copyHand(tableSituation);
  let pair = combo(hand, distance(hand, 0), /1{1}/, 2);
  if (!pair) {
    return false;
  }
  return {
    hand: pair.hand.concat(pair.rest.slice(0, 3)),
    combo: 'pair',
    cost: 2
  };
}

function highCard(tableSituation) {
  return {
    hand: tableSituation.slice(0, 5),
    combo: 'no Combo',
    cost: 1
  };
}

module.exports.handCombination = handCombination;
module.exports.highToLow = highToLow;
module.exports.copyHand = copyHand;
module.exports.distance = distance;
module.exports.suitFilter = suitFilter;

module.exports.straightFlush = straightFlush;
module.exports.fourOfAKind = fourOfAKind;
module.exports.fullHouse = fullHouse;
module.exports.flush = flush;
module.exports.straight = straight;
module.exports.threeOfAKind = threeOfAKind;
module.exports.twoPairs = twoPairs;
module.exports.pair = pair;
