const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//tạo 1 Schema Model (giả)
let pilotModel = new Schema(
  {
    name:{type: String},
    eva:{type: String},
    gender:{type: String},
    love:{type: [String]},
  }, 
  { collection: 'pilots'}           //tên của collection trong MongoDB
);
module.exports = mongoose.model('pilots', pilotModel);