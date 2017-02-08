'use strict';

function printCard(document, img, printDir, n) {
  const selector = `div.${printDir} div.card${n}`;
  document.querySelector(selector).appendChild(img);
}

function printCardTable(document, img) {

  for (let i = 1; i < 5; i += 1) {
    console.log(document.querySelector(`.table .card${i}`));
    if (!document.querySelector(`.table .card${i} img`)) {
      document.querySelector(`.table .card${i}`).appendChild(img);
      return;
    }
  }

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

  const actionButtons = document.querySelector('div.actions.game');
  const newGameButton = document.querySelector('div.newGame');
  const startGameButton = document.querySelector('div button.startGame');

  actionButtons.addEventListener('click', (element) => {
    if (element.target !== element.currentTarget) {
      socket.emit('action', {
        action: element.target.attributes['data-action'].value
      });
    }
  });

  startGameButton.addEventListener('click', () => {
    socket.emit('startGame');
  });

  newGameButton.addEventListener('click', (element) => {
    if (element.target !== element.currentTarget) {
      const name = getPlayerName(document);
      socket.emit('newGame', {name: name});
    }
  });

}

function blinds(document, data) {

  let bot = '';
  let player = '';

  if (data.player1.name === 'bot') {
    bot = data.player1;
    player = data.player2;
  } else {
    player = data.player1;
    bot = data.player2;
  }

  document.querySelector('.bot span').textContent = bot.money;
  document.querySelector('.human span').textContent = player.money;
  document.querySelector('.table span').textContent = data.pot.table;

}

function setMoney(document, data) {

  document.querySelector(`.${data.player.type} span`).textContent = data.player.money;
  document.querySelector('.table span').textContent = data.pot.table;

}

function setCall(document, pot) {
  console.log(`setPot: ${pot}`);
  if (pot.human <= pot.bot) {
    document.querySelector('.call span').textContent = pot.bot - pot.human;
  } else {
    document.querySelector('.call span').textContent = 0;
  }
}

function buttons(document) {
  document.querySelector('.actions').style.visibility = 'visible';
}

function refresh(document) {
  console.log(document.querySelector('.cards'));
  for (let i = 1; i <= 9; i += 1) {
    console.log(document.querySelector(`.cards .c${i} img`));
    if (document.querySelector(`.cards .c${i} img`)) {
      document.querySelector(`.cards .c${i}`).removeChild(document.querySelector(`.cards .c${i} img`));
    }
  }
  document.querySelector('.table span').textContent = 0;

}

function actionsClient(document, socket) {

  sendAction(document, socket);

  socket.on('newGame', () => {
    const gameGrid = document.querySelector('.gameGrid');
    gameGrid.style.visibility = 'visible';
    document.querySelector('.startGame').style.visibility = 'visible';
  });

  socket.on('blinds', (data) => {
    blinds(document, data);
  });

  socket.on('action', () => {
    buttons(document);
  });

  socket.on('card', (data) => {
    console.log(data);
    let img1;
    let img2;

    if (data.type === 'human') {
      img1 = getCardImage(document, data.card1Name);
      img2 = getCardImage(document, data.card2Name);
    } else {
      img1 = getCardImage(document, 'back');
      img2 = getCardImage(document, 'back');
    }
    printCard(document, img1, data.type, 1);
    printCard(document, img2, data.type, 2);

  });

  socket.on('cardTable', (data) => {
    const img = getCardImage(document, data.name);
    printCardTable(document, img);
  });

  socket.on('setCall', (pot) => {
    setCall(document, pot);
  });

  socket.on('setMoney', (data) => {
    setMoney(document, data);
  });

  socket.on('refresh', () => {
    console.log('refresh');
    refresh(document);
  });

  socket.on('log', (data) => {
    console.log(data)
  });

}

function persistence(num) {
  if (num <= 0) {
    return 1;
  } else if (num < 10) {
    return num;
  } else {
    return persistence((num - Math.floor(num / 10)) * persistence(Math.floor(num / 10)))
  }
}
