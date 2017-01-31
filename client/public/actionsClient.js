'use strict';

function printCard(document, img, printDir) {
  const selector = `div.cards div.${printDir}`;
  document.querySelector(selector).appendChild(img);
}

function getCardImage(document, cardName) {
  const img = document.createElement('img');
  const src = `/cardsimg/${cardName}.png`;
  img.src = src;
  return img;
}

function getPlayerName(document) {
  const name = document.querySelector('.chat .chat-name').value;
  return name;
}

function sendAction(document, socket) {

  const actionButtons = document.querySelector('div.actions button');
  const newGameButton = document.querySelector('div.newGame');
  actionButtons.addEventListener('click', (element) => {
    if (element.target !== element.currentTarget) {
      socket.emit('action', {
        action: element.target.attributes['data-action'].value
      });
    }
  });

  newGameButton.addEventListener('click', (element) => {
    if (element.target !== element.currentTarget) {
      const name = getPlayerName(document);
      socket.emit('newGame', {name: name});
    }
  });

}

function actionsClient(document, socket) {

  sendAction(document, socket);

  socket.on('newGame', () => {
    const gameGrid = document.querySelector('.gameGrid');
    gameGrid.style.visibility = 'visible';
  });

  // socket.on('action', (data) => {
  //   switch (data) {
  //   case 'newGame':
  //     newGameClient(document, socket);
  //     break;
  //   default:
  //
  //   }
  // })

  socket.on('card', (data) => {
    const img = getCardImage(document, data.cardName);
    printCard(document, img, data.printDir);
  });

}
