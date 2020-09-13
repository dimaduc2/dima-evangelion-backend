const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//tạo 1 Schema Model (giả)
let angelModel = new Schema(
  {
    name:{type: String},
    number:{type: String}
  }, 
  { collection: 'angels'}           //tên của collection trong MongoDB
);
module.exports = mongoose.model('angels', angelModel);