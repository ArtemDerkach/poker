'use strict';

function chatServer(io, socket, database) {

  const chatCollection = database.collection('chat');
  const chatStartMsgLimit = 15;

  chatCollection.find().limit(chatStartMsgLimit).sort({_id: -1}).toArray((err, res) => {
    if (err) {
      throw err;
    }
    socket.emit('output', res);
  });

  function sendStatus(s) {
    socket.emit('status', s);
  }

  socket.on('input', (data) => {
    const name = data.name;
    const message = data.message;
    const whitespacePattern = /^\s*$/;

    if (whitespacePattern.test(name) || whitespacePattern.test(message)) {
      sendStatus('invalid name or message');
    } else {
      chatCollection.insert({name: name, message: message}, () => {
        io.sockets.emit('output', [data]);
        sendStatus({
          message: 'message sended',
          clear: true
        });
      });
    }
  });
}

module.exports = chatServer;
