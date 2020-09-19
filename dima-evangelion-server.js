// đây là Express - Web Server cho website dima-evangelion
const express = require('express');		    //phải mượn Express
const evaRoutes = express.Router();	    //tạo Router để nhận tất cả câu hỏi

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');     //phải mượn Mongoose
                                          //tìm và nói chuyện với MongoDB ở địa chỉ của nó
const PORT = 5000;				                //địa chỉ Phòng

app.use(cors());
app.use(bodyParser.json());
app.use('/eva', evaRoutes);		        //bảo Router chỉ nhận câu hỏi bắt đầu ‘/hanhDong

let evaUnitModel = require('./evaUnit.model');  // tạo model mới tên là evaUnitModel
                                                  // tạo từ five evaUnit.model Dima tự viết
                                                  // trong đó nó giống hệt cái thật của DB
let angelModel = require('./angel.model');
let peopleModel = require('./people.model');
let pilotModel = require('./pilot.model');


evaRoutes.route('/eva_units/').get(function(req, res) {
  console.log('đã nhận câu hỏi eva_units')
    evaUnitModel.find({}, function(err, ketQuaTimRobot){
      if (err) {
        console.log(err);
      } 
      else {
        console.log('đã tìm thấy ', ketQuaTimRobot);
        res.json(ketQuaTimRobot)
      }
    })
});

evaRoutes.route('/pilots/').get(function(req, res) {
  console.log('đã nhận câu hỏi pilots')
    pilotModel.find({}, function(err, ketQuaTimPhiCong){
      if (err) {
        console.log(err);
      } 
      else {
        console.log('đã tìm thấy ', ketQuaTimPhiCong);
        res.json(ketQuaTimPhiCong)
      }
    })
});

evaRoutes.route('/angel/').get(function(req, res) {
  console.log('đã nhận câu hỏi angel')
    angelModel.find({}, function(err, ketQuaTimAngel){
    if (err) {
      console.log(err);
    } 
    else {
      console.log('đã tìm thấy ', ketQuaTimAngel);
      res.json(ketQuaTimAngel)
    }
  })
});

evaRoutes.route('/people/').get(function(req, res) {
  console.log('đã nhận câu hỏi people')
    peopleModel.find({}, function(err, ketQuaTimNguoi){
      if (err) {
        console.log(err);
      } 
      else {
        console.log('đã tìm thấy ', ketQuaTimNguoi);
        res.json(ketQuaTimNguoi)
      }
    })
  });





    // dùng mongoose để bắt đầu kết nối với mongoDB ở địa chỉ máy này ở phòng 27017
mongoose.connect('mongodb://127.0.0.1:27017/dima-evangelion-db', { useNewUrlParser: true })
        .catch(error => console.log('không kết nối được với mongoDB: ' + error));
        // nếu không kết nối được thì thông báo lỗi
const connection = mongoose.connection; //  <=> giữa server và DB

// sau đó, mở kết nối để 2 bên nói chuyện
// hiện ra, thông báo là nói chuyện đc rồi
connection.once('open', function() {
  console.log("Đã nói chuyện với MongoDB");
})


// server bắt đầu nghe và đợi câu hỏi ở phòng PORT 5000
app.listen(PORT, function() {		          //chạy Web Server ở địa chỉ phòng này
  console.log("dima-evangelion-server đang chạy ở phòng Port: " + PORT);
});


evaRoutes.route('/angel/xoa/').get(function(req, res) { // nhận câu hỏi từ browser
  let id = req.query.id; // để id mới và ngắn ngọn
  angelModel.findByIdAndDelete(id, function (err) { // để tìm trong danh sách đúng hình nộm angelModel để xóa
    if (err) {
      console.log(err); // hiện ra thông báo ở server bị lỗi
    }
    else {
      console.log('đã xóa ' + id); // hiện ra thông báo ở server đã xóa
      angelModel.find({}, function(err, ketQuaTimAngel){res.json(ketQuaTimAngel)}) // sau khi tìm được rồi gửi câu trả lời cho browser
    }
  });
});

evaRoutes.route('/eva_units/xoa/').get(function(req, res) {
  let id = req.query.id;
  evaUnitModel.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('đã xóa ' + id);
      evaUnitModel.find({}, function(err, ketQuaTimEvaUnit){res.json(ketQuaTimEvaUnit)})
    }
  });
});

evaRoutes.route('/pilots/xoa/').get(function(req, res) {
  let id = req.query.id;
  pilotModel.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('đã xóa ' + id);
      pilotModel.find({}, function(err, ketQuaTimPilot){res.json(ketQuaTimPilot)})
    }
  });
});

evaRoutes.route('/people/xoa/').get(function(req, res) {
  let id = req.query.id;
  peopleModel.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('đã xóa ' + id);
      peopleModel.find({}, function(err, ketQuaTimPeople){res.json(ketQuaTimPeople)})
    }
  });
});






evaRoutes.route('/angel/add').post(function(req, res) { // để nhận được câu hỏi tìm thêm quái vật mới
  console.log('đã nhận câu hỏi: ' + req.body.name + ' và ' + req.body.number); // để hiện thông báo trong server
  let angelMoi = new angelModel(req.body); // để tạo model mới, tên là angelMoi tạo từ angelModel như cái khuôn
                            // bánh mới (angelMoi) có nhân (req.body    body => thông tin gửi từ browser)
  angelMoi.save() // để lưu vào quái vật mới vào DB
  .then(angelMoi => { // để đợi lưu xong, sau đó
    console.log('đã cho thêm tên Angel mới: ' + angelMoi.name + ' và số Angel mới: ' + angelMoi.number);
    // để hiện thông báo trong server
    // res.status(200).send('đã thêm tên Angel mới: ' + angelMoi.name + ' và số Angel mới: ' + angelMoi.number);
    // để server gửi câu trả lời (đã xong việc rồi) cho browser

    angelModel.find({}, function(err, tatCaThongTinQuaiVat){ // để tìm trong dach sách DB đúng angelMoi
      res.json(tatCaThongTinQuaiVat) // để gửi câu trả lời cho browser
    })
  })
});

evaRoutes.route('/evaUnit/add').post(function(req, res) {
  console.log('đã nhận câu hỏi: ' + req.body.name + ' và ' + req.body.pilot);
  let evaUnitMoi = new evaUnitModel(req.body);
  evaUnitMoi.save() 
  .then(evaUnitMoi => {
    console.log('đã cho thêm tên EvaUnit mới: ' + evaUnitMoi.name + ' và tên phi công mới: ' + evaUnitMoi.pilot);
    // res.status(200).send('đã thêm tên EvaUnit mới: ' + evaUnitMoi.name + ' và tên phi công mới: ' + evaUnitMoi.pilot);
    
    evaUnitModel.find({}, function(err, tatCaThongTinRobot){
      res.json(tatCaThongTinRobot)
    })
  })
});

evaRoutes.route('/pilot/add').post(function(req, res) {
  console.log('đã nhận câu hỏi: ' + req.body.name + ' và ' + req.body.eva + ' và ' + req.body.gender + ' và ' + req.body.love);
  let pilotMoi = new pilotModel(req.body);
  pilotMoi.save() 
  .then(pilotMoi => {
    console.log('đã cho thêm tên mới: ' + pilotMoi.name + ', Eva mới: ' + pilotMoi.eva + ', giới tinh: ' + pilotMoi.gender + ', tình yêu' +pilotMoi.love);
    // res.status(200).send('đã thêm tên mới: ' + pilotMoi.name + ', Eva mới: ' + pilotMoi.eva + ', giới tinh: ' + pilotMoi.gender + ', tình yêu' +pilotMoi.love);


  })
});

evaRoutes.route('/people/add').post(function(req, res) {
  console.log('đã nhận câu hỏi: ' + req.body.name + ' và ' + req.body.gender + ' và ' + req.body.love);
  let peopleMoi = new peopleModel(req.body);
  peopleMoi.save() 
  .then(peopleMoi => {
    console.log('đã cho thêm tên mới: ' + peopleMoi.name +  + ', giới tinh: ' + peopleMoi.gender + ', tình yêu' +peopleMoi.love);
    // res.status(200).send('đã thêm tên mới: ' + peopleMoi.name  + ', giới tinh: ' + peopleMoi.gender + ', tình yêu' +peopleMoi.love);


  })
});










  // lưu trong database
// todoRoutes.route('/EvaUnit').get(function(req, res) {
//   console.log('EvaUnit');
// });


// todoRoutes.route('/Angel').get(function(req, res) {
//   console.log('Angel');
// });

// todoRoutes.route('/Pilot').get(function(req, res) {
//   console.log('Pilot');
// });

// todoRoutes.route('/People').get(function(req, res) {
//   console.log('People');
// });