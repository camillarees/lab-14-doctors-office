'use strict';

let socket = require('../hub');

jest.mock('../hub', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});
console.log = jest.fn();
describe('Patient', () => {
  it('Confirms scheduled appointment as expected', () => {
    const payload = {
        doctor: 'Doctor Flores',
        patientId: 'test1234',
        name: 'Camilla',
        appointment: '12.18.22',
    };
    socket.emit('APPOINTMENT SCHEDULED', payload);
    expect(console.log).toHaveBeenCalledWith('Your appointment has been scheduled', payload.appointment)
    expect(console.log).toHaveBeenCalledWith(`You saw patient number ${payload.patientId}`);
  })
})