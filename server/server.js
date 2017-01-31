'use strict';

const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const path = require('path');
const mongo = require('mongodb').MongoClient;

const app = express();
const server = http.createServer(app);
const io = socketIo.listen(server);

const Deck = require('../mainApp/deckClass.js').Deck;
const Game = require('../mainApp/gameProcesses.js').Game;

const chatServer = require('./chatServer.js');
const actionsServer = require('./actionsServer.js');

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
    throw err;
  } else {
    console.log('mongo connected');
  }

  io.sockets.on('connection', (socket) => {

    console.log('dummy client connected');

    chatServer(io, socket, database);
    actionsServer(io, socket, database);

  });

});
