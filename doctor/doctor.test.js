'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3002/doctorsoffice');

jest.mock('../hub.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});
console.log = jest.fn();

describe('Handle PATIENT IS READY', () => {
  test('emit PATIENT IS READY to receive console log', () => {
    socket.emit('PATIENT IS READY', payload);
    expect(console.log).toHaveBeenCalledWith(`Patient number ${payload.patientId} is ready to be seen by Doctor Flores`);
  });
});