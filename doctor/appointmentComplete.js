'use strict';

module.exports = (socket) => (payload) => {
  console.log(`Appointment complete on ${payload.appointment}`);
};