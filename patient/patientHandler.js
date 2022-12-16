'use strict';

module.exports = (socket) => (payload) => {

  setTimeout(() => {
    console.log(`Patient is here for their appointment scheduled for ${payload.appointment}`, payload);
    socket.emit('PATIENT IS READY', payload);
  }, 3000);
};