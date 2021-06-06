const {  Model, DataTypes } = require('sequelize');
const sequelize = require('../dbConnect')
class user extends Model {}
user.init({
  username: {type:DataTypes.TEXT},
  email: {type:DataTypes.TEXT},
  password: {type:DataTypes.TEXT },


}, { sequelize, modelName: 'user',  timestamps: true,
});
module.exports = user;