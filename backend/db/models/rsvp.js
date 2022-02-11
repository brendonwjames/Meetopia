'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rsvp = sequelize.define('Rsvp', {
    eventId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Rsvp.associate = function(models) {
    // associations can be defined here 
    Rsvp.belongsTo(models.Event, { foreignKey: "eventId" })
    Rsvp.belongsTo(models.User, { foreignKey: "userId" })
  };
  return Rsvp;
};