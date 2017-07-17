/**
 * create suit object
 * @param       {string} suitName name of the suit
 * @constructor
 */
function Suit(suitName) {
  // conformity of <suitName> and symbol
  const suitSymbols = { spades: '♠', hearts: '♥', clubs: '♣', diamonds: '♦' };

  // check input data vor validation
  if (typeof suitName !== 'string') throw Error('invalid input type');
  if (!suitSymbols.hasOwnProperty(suitName))
    throw Error(`suit "${suitName}" not exists`);

  this.name = suitName;
  this.symbol = suitSymbols[suitName];

  // freeze object to make it immutable
  Object.freeze(this);
}

/**
 * create rank object
 * @param       {string} rankName name of the rank
 * @constructor
 */
function Rank(rankName) {
  const rankCosts = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
    'J': 11, 'Q': 12, 'K': 13, 'A': 14,
  };

  // check input data vor validation
  if (typeof rankName !== 'string') throw Error('invalid input type');
  if (!rankCosts.hasOwnProperty(rankName))
    throw Error(`rank "${rankName}" not exists`);

  this.name = rankName;
  this.cost = rankCosts[rankName];

  // freeze object to make it immutable
  Object.freeze(this);
}

/**
 * create card object
 * @param       {stirng} rankName name of the suit
 * @param       {string} suitName name of the rank
 * @constructor
 */
function Card(rankName, suitName) {
  this.rank = new Rank(rankName);
  this.suit = new Suit(suitName);

  // freeze object to make it immutable
  Object.freeze(this);
}


module.exports.Suit = Suit;
module.exports.Rank = Rank;
module.exports.Card = Card;
