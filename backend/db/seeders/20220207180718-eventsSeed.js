'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Events', [
        { hostId: 1, categoryId: 0, eventName: "GamerCon", date: new Date(), capacity: 200, createdAt: new Date(), updatedAt: new Date() },
        { hostId: 2, categoryId: 0, eventName: "Official George R.R. Martin Needs To Write Faster Picket Line", date: new Date(), capacity: 500, createdAt: new Date(), updatedAt: new Date() },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Events', null, {});
  }
};
