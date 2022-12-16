'use strict';

const { io } = require('socket.io-client');
const Chance = require('chance');
const MessageClient = require('../lib/messageClient');

const socket = io('http://localhost:3002/caps');
const chance = new Chance();

const doctorFlores = new MessageClient('Doctor Flores');
const doctorGrey = new MessageClient('Doctor Grey');

doctorFlores.subscribe('PATIENT IS READY', (payload) => {
    console.log(`Patient number ${payload.patientId} is ready to be seen by Doctor Flores`);

});

doctorFlores.subscribe('APPOINTMENT COMPLETE', payload => {
    console.log(`You saw patient number ${payload.patientId}`);
    doctorFlores.publish('RECEIVED', payload);
});

setInterval(() => {
    const payload = {
        doctor: 'Doctor Flores',
        patientId: chance.guid(),
        name: chance.name(),
        appointment: chance.date(),
    }

    console.log('-------------new appointment scheduled--------------', payload);
    doctorFlores.publish('APPOINTMENT SCHEDULED', payload);

}, 7000);

doctorGrey.subscribe('PATIENT IS READY', (payload) => {
    console.log(`Patient number ${payload.patientId} is ready to be seen by Doctor Grey`);
});

doctorGrey.subscribe('APPOINTMENT COMPLETE', payload => {
    console.log(`You saw patient number ${payload.patientId}`);
    doctorGrey.publish('RECEIVED', payload);
});

setInterval(() => {
    const payload = {
        doctor: 'Doctor Grey',
        patientId: chance.guid(),
        name: chance.name(),
        appointment: chance.date(),
    }

    console.log('------------new appointment scheduled------------', payload);
doctorGrey.publish('APPOINTMENT SCHEDULED', payload);
}, 7000);