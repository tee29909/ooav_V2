const express = require('express');
const app = express();
const roomRouter = express.Router();
const Room = require('../models/room');
const Semester = require('../models/semester');
const User = require('../models/user');
const Building = require('../models/building');
///////////////////////////room/////////////////////////////
roomRouter.route('/room/:id').get(function (req, res) {
  var iduserlogin = req.params.id
  console.log(iduserlogin)
  Room.find(function (err, room) {
 
    Building.find(function (err, building) {
    Semester.find(function (err, semester) {
      User.findById(iduserlogin, function (err, user) {
        res.render('room', { semester: semester, user: user ,room: room , building: building}); //render collection "users"
      });
    });
  });
});
});

roomRouter.route('/room').get(function (req, res) {
    Room.find(function (err, room) {
      if (err) {
        console.log(err);
      }
      else {
        Semester.find(function (err, semester) {
        res.render('room', { room: room ,semester: semester});
        }); //render collection "users"
      }
    });
  });
  
  roomRouter.route('/createroom/:id').get(function (req, res) {
    Building.find(function (err, building) {
    User.findById(req.params.id, function (err, user) {
    console.log(building);
    res.render('createroom',{user:user, building: building});
  });
});  
  });
  
  roomRouter.route('/createroom/:id').post(function (req, res) {
    const room = new Room(req.body);
    
    room.save()
      .then(room => {
        res.redirect(`/roomRout/room/${req.params.id}`);
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
  });
  
  
  roomRouter.route('/editroom/:id/:ids').get(function (req, res) {
    const id = req.params.id;
    Room.findById(id, function (err, room) {
      User.findById(req.params.ids, function (err, user) {
      res.render('editroom', { room: room ,user: user});
    });
  });
  });
  
  roomRouter.route('/updateroom/:id/:ids').post(function (req, res) {
    Room.findById(req.params.id, function (err, room) {
      if (!room)
        return next(new Error('Could not load Document'));
      else {
        // do your updates here
        room.ID = req.body.ID;
        room.floor = req.body.floor;
        room.building = req.body.building;
        room.save().then(user => {
          res.redirect(`/roomRout/room/${req.params.ids}`);
        })
          .catch(err => {
            res.status(400).send("unable to update the database");
          });
      }
    });
  });
  
  roomRouter.route('/deleteroom/:id/:ids').get(function (req, res) {
    Room.findByIdAndRemove({ _id: req.params.id },
      function (err, room) {
        if (err) {console.log(err)
        }else {
          res.redirect(`/roomRout/room/${req.params.ids}`);
        }
      });
  });

  module.exports = roomRouter;