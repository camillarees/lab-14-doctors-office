'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3002/doctorsoffice');

const MessageClient = require('../lib/messageClient');
const patient = new MessageClient('patient');

patient.publish('GET_ALL',  { queueId: 'appointment'});

patient.subscribe('APPOINTMENT SCHEDULED', payload => {
  console.log('Your appointment has been scheduled', payload.appointment);
  patient.publish('PATIENT IS READY', payload)
  console.log('Patient is here for their appointement scheduled for', payload.appointment);
  patient.publish('APPOINTMENT COMPLETE', payload);
});

socket.on('connect', () => {
  console.log(socket.id);
});