'use strict';

const { io } = require('socket.io-client');
const SOCKET_URL = process.env.SOCKET_URL || 'http://localhost:3002/caps';

// I dont understand what the queueId is for or what it represents

class MessageClient {
  constructor(queueId){
    this.queueId = queueId;
    this.socket = io(SOCKET_URL);
    this.socket.emit('ENTER SERVICE DESK', queueId);
    this.socket.on('ENTER SERVICE DESK', (id) => {
      console.log('Entered Patient Queue', id);
    });
  }

  publish(event, payload){
    this.socket.emit(event, {...payload, queueId: this.queueId});
  }

  subscribe(event, callback){
    this.socket.on(event, callback);
  }
}

module.exports = MessageClient;