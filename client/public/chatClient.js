'use strict';

function chatClient(document, io, socket) {

  function getNode(selector) {
    return document.querySelector(selector);
  }

  const status = getNode('.chat-status span');
  const statusDefault = status.textContent;
  const textarea = getNode('.chat textarea');
  const chatName = getNode('.chat-name');
  const messages = getNode('.chat-messages');

  function setStatus(s) {
    status.textContent = s;
    if (s !== statusDefault) {
      const delay = setTimeout(() => {
        setStatus(statusDefault);
        clearInterval(delay);
      }, 5000);
    }
  }

  if (socket) {
    socket.on('output', (data) => {
      if (data.length) {
        for (let i = data.length - 1; i >= 0; i -= 1) {
          const message = document.createElement('div');
          message.setAttribute('class', 'chat-message');
          message.textContent = `${data[i].name} : ${data[i].message}`;
          messages.appendChild(message);
          messages.insertBefore(message, messages.firstChild);
        }
      }
    });

    socket.on('status', (data) => {
      setStatus(typeof data === 'object' ? data.message : data);
        if (data.clear === true) {
          textarea.value = '';
        }
    });

    textarea.addEventListener('keydown', (event) => {
      const message = textarea.value;
      const name = chatName.value;
      if (event.which === 13 && event.shiftKey === false) {
        socket.emit('input', {
          name: name,
          message: message
        });
        console.log('sended');
        event.preventDefault();
      }
    });
  }
}
