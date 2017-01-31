'use strict';

const http = require('http');

const url = 'http://localhost:2222';

let serverStr = '';

http.get(url, (response) => {
  response.setEncoding('utf8');
  response.on('error', console.error);
  response.on('data', (data) => {
    serverStr += data;
  });
  response.on('end', () => {
    console.log(serverStr.length);
    console.log(serverStr);
  });
}).on('error', console.error);
