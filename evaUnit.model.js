const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//tạo 1 Schema Model (giả)
let evaUnitModel = new Schema(
  {
    name:{type: String},
    pilot:{type: String}
  }, 
  { collection: 'eva_units'}           //tên của collection trong MongoDB
);
module.exports = mongoose.model('eva_units', evaUnitModel);