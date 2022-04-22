'use strict';
module.exports = (sequelize, DataTypes) => {
  const {Model} =sequelize.Sequelize
  class Cars extends Model{}
  Cars.init({
    name: DataTypes.STRING,
    sewa: DataTypes.INTEGER,
    ukuran: DataTypes.STRING,
    foto: DataTypes.STRING
  }, {
    sequelize
  });
  return Cars;
};