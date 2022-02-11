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
    Event.belongsToMany(models.User, {
      through: "Rsvp",
      foreignKey: "eventId",
      otherKey: "userId"
    })
    Event.hasMany(models.Rsvp, { foreignKey: "eventId", onDelete: "CASCADE", hooks: true })
  };
  return Event;
};