'use strict';

// const Deck = require('../mainApp/deckClass.js').Deck;
const Game = require('../mainApp/gameProcesses.js').Game;

function isPlayerNameValid(name) {
  const whitespacePattern = /^\s*$/;
  if (whitespacePattern.test(name)) {
    return false;
  }
  return true;
}

function newGame(data, socket) {

  const name = 'server';
  let message = '';

  if (isPlayerNameValid(data.name)) {
    message = `${data.name}, the game is waiting for you`;
    socket.emit('newGame', {
      name: name
    });
    socket.emit('output', [{
      name: name,
      message: message
    }]);
    socket.emit('output', [{
      name: 'game',
      message: 'press continue'
    }]);
  } else {
    message = 'invalid name';
    socket.emit('output', [{
      name: name,
      message: message
    }]);
  }



  return isPlayerNameValid(data.name);

}

function actionsServer(io, socket, database) {

  const chatCollection = database.collection('chat');

  socket.on('newGame', (data) => {
    if (newGame(data, socket, chatCollection)) {
      const game = new Game(socket);
      game.addPlayer(data.name, 100, 'human');
      game.addPlayer('bot', 100, 'bot');
      const name = data.name;

      socket.on('startGame', () => {
        if (game.gameStarted === false) {
          game.gameStarted = true;
        }
        game.go();
        socket.emit('setCall', game.dealer.pot);
      });

      socket.on('continue', () => {

      });

      socket.on('action', (act) => {
        game.players[name].action = act.action;
        game.go();
      });

    }
  });



}

module.exports = actionsServer;
