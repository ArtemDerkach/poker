'use strict';

const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const path = require('path');
const mongo = require('mongodb').MongoClient;

const app = express();
const server = http.createServer(app);
const io = socketIo.listen(server);

const Input = require('./chatServer.js').Input;

const port = 8080;
const indexPath = path.join(__dirname, '../client/index.html');

app.use(express.static(path.join(__dirname, '../client/public')));

app.get('/', (req, res) => {
  res.sendFile(indexPath);
});

server.listen(port, () => {
  console.log(`server is listening on port:${port}`);
});

mongo.connect('mongodb://127.0.0.1/poker', (err, database) => {
  if (err) {
    console.log('mongo is not connected');
  } else {
    console.log('mongo connected');
  }

  io.sockets.on('connection', (socket) => {
    console.log('dummy client connected');

    socket.on('chatInput', (data) => {
      const chatCollection = database.collection('chat');
      const input = new Input(data);

      if (input.isValid()) {
        const output = input.getOutput();
        if (chatCollection) {
          chatCollection.insert(output);
        }
        io.sockets.emit('chatOutput', output);
      } else {
        const error = input.getError();
        socket.emit('chatOutput', error);
      }
    });
  });
});
