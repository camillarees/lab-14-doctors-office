'use strict';

module.exports = (socket) => (payload) =>  {
  setTimeout(() => {
    socket.emit('APPOINTMENT COMPLETE', payload);
  }, 3000);
};