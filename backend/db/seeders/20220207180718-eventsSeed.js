'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Events', [
        { hostId: 1, categoryId: 0, eventName: "GamerCon", image: "https://images.entertainment.ie/storage/images_content/rectangle/620x372/Screen-Shot-2017-03-18-at-132845.png?w=1280&h=768&q=high", date: new Date(), capacity: 200, createdAt: new Date(), updatedAt: new Date() },
        { hostId: 2, categoryId: 0, eventName: "Official George R.R. Martin Needs To Write Faster Picket Line", image: "https://preview.redd.it/1f5q3wkv2wr21.jpg?auto=webp&s=e5d9f7bca98fff27daedc4c76e2e7589e536db55", date: new Date(), capacity: 500, createdAt: new Date(), updatedAt: new Date() },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Events', null, {});
  }
};
