'use strict';

let socket = require('../hub');

jest.mock('../hub', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});
console.log = jest.fn();
describe('Doctor', () => {
  it('Emits appointment as expected', () => {
    const payload = {
        doctor: 'Doctor Flores',
        patientId: 'test1234',
        name: 'Camilla',
        appointment: '12.18.22',
    };
    socket.emit('PATIENT IS READY', payload);
    expect(console.log).toHaveBeenCalledWith(`Patient number ${payload.patientId} is ready to be seen by Doctor Flores`);
  })
  it('Confirms completed appointment as expected', () => {
    const payload = {
        doctor: 'Doctor Flores',
        patientId: 'test1234',
        name: 'Camilla',
        appointment: '12.18.22'
    };
    socket.emit('APPOINTMENT COMPLETE', payload);
    expect(console.log).toHaveBeenCalledWith(`You saw patient number ${payload.patientId}`);
  })
})