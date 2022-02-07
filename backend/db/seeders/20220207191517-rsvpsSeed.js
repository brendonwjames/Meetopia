'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Rsvps', [   
        { eventId: 1, userId: 1, createdAt: new Date(), updatedAt: new Date()}], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Rsvps', null, {});
  }
};
