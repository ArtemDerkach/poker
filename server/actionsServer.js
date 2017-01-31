'use strict';

function isPlayerNameValid(name) {
  const whitespacePattern = /^\s*$/;
  if (whitespacePattern.test(name)) {
    return false;
  }
  return true;
}

function newGame(data, socket, chatCollection) {
  const name = 'server';
  let message = '';
  if (isPlayerNameValid(data.name)) {
    message = `${data.name}, the game is waiting for you`;
    socket.emit('newGame', {
      name: name
    });
  } else {
    message = 'invalid name';
  }
  chatCollection.insert({name: name, message: message}, () => {
    socket.emit('output', [{
      name: name,
      message: message
    }]);
  });

}

function actionsServer(io, socket, database) {

  const chatCollection = database.collection('chat');

  socket.on('newGame', (data) => {
    newGame(data, socket, chatCollection);
  });

  socket.on('action', (data) => {
    console.log(data);

    switch (data.action) {
    case 'card':
      card();
      break;
    case 'fold':
      fold();
      break;
    case 'raise':
      raise();
      break;
    case 'call':
      call();
      break;
    case 'check':
      check();
      break;
    default:
      break;
    }



    if (data.action === 'newGame') {
      newGame();
    }
    if (data.action === 'card') {
      io.sockets.emit('card', {
        cardName: 'A-of-spades',
        printDir: 'myHand'
      });
      console.log('sended');
    }
  });

}

module.exports = actionsServer;
