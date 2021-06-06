const {  Model, DataTypes } = require('sequelize');
const sequelize = require('../dbConnect')
class answer extends Model {}
answer.init({
  name: {type:DataTypes.TEXT},
  answer: {type:DataTypes.TEXT},
  isTrue:{type:DataTypes.BOOLEAN}



}, { sequelize, modelName: 'answer',  timestamps: true,
});
module.exports = answer;

