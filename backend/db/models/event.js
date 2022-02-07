'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    hostId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    eventName: DataTypes.STRING,
    date: DataTypes.DATE,
    capacity: DataTypes.INTEGER
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
    Event.belongsTo(models.User, { foreignKey: "hostId" })
  };
  return Event;
};