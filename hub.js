'use strict';

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;
const Queue = require('./lib/queue');

const server = new Server(PORT);
console.log('listening on port', PORT);

const caps = server.of('/caps');
const messageQueue = new Queue();

caps.on('connection', (socket) => {
    console.log('Socket connected to event server', socket.id);
    console.log('Socket connected to caps namespace', socket.id);


    socket.on('ENTER SERVICE DESK', (queueId) => {
        console.log(`You have entered the ${queueId} service desk`);

        socket.onAny((event, payload) => {
            const date = new Date();
            const time = date.toTimeString();
            console.log('EVENT', {event, time, payload});
        });
        socket.emit('ENTER SERVICE DESK', queueId);
    });
    
    socket.on('APPOINTMENT', (payload) => {
        console.log('APPOINTMENT SCHEDULED event', payload);
        let currentQueue = messageQueue.read(payload.queueId);
        if(!currentQueue){
            let queueKey = messageQueue.store(payload.queueId, new Queue());
            currentQueue = messageQueue.read(queueKey);
        }
        currentQueue.store(payload.messageId, payload);
        socket.broadcast.emit('APPOINTMENT SCHEDULED', payload);
    });

    socket.on('PATIENT IS READY', (payload) => {
        caps.emit('PATIENT IS READY', payload);
    });

    socket.on('APPOINTMENT COMPLETE', (payload) => {
        let currentQueue = messageQueue.read(payload.queueId);
        if(!currentQueue){
            let queueKey = messageQueue.store(payalod.queueId, new Queue());
            currentQueue = messageQueue.read(queueKey);
        }
        currentQueue.store(payload.messageId, payload);
        caps.emit('APPOINTMENT COMPLETE', payload);
    });

    // is this recieving a message? How to we relate this to the doctor's office?

    socket.on('RECEIVED', (payload) => {
        console.log('Server RECEIVED event', payload);
        let currentQueue = messageQueue.read(payload.queueId);
        if(!currentQueue){
            throw new Error('no queue created');
        }
        let message = currentQueue.remove(payload.messageId);
        socket.to(payload.queueId).emit('RECEIVED', message);
    });

    // what is going on here I don't understand how this works.

    socket.on('GET_ALL', (payload) => {
        console.log('Get all happened');
        let currentQueue = messageQueue.read(payload.queueId);
        if(currentQueue && currentQueue.data){
            Object.keys(currentQueue.data).forEach(messageId => {
                caps.emit('DELIVERED', currentQueue.read(messageId));
            });
        }
    })
})