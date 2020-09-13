const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//tạo 1 Schema Model (giả)
let peopleModel = new Schema(
  {
    name:{type: String},
    gender:{type: String}
  }, 
  { collection: 'people'}           //tên của collection trong MongoDB
);
module.exports = mongoose.model('people', peopleModel);