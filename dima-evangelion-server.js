// đây là Express - Web Server cho website dima-evangelion
const express = require('express');		    //phải mượn Express
const evaRoutes = express.Router();	    //tạo Router để nhận tất cả câu hỏis

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');     //phải mượn Mongoose
                                          //tìm và nói chuyện với MongoDB ở địa chỉ của nó
const PORT = 5000;				                //địa chỉ Phòng

app.use(cors());
app.use(bodyParser.json());
app.use('/eva', evaRoutes);		        //bảo Router chỉ nhận câu hỏi bắt đầu ‘/hanhDong


let evaUnitModel = require('./evaUnit.model');


