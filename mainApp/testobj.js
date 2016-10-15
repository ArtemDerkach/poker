'use strict';

let arrayOfPlayers = [1,2,3,4,5];

// arrayOfPlayers = arrayOfPlayers.shift().concat(arrayOfPlayers[0]);

arrayOfPlayers = arrayOfPlayers.slice(1, arrayOfPlayers.length).concat(arrayOfPlayers.slice(0, 1));

console.log(arrayOfPlayers);
