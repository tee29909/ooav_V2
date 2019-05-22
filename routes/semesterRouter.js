const express = require('express');
const app = express();
const semesterRouter = express.Router();
const Semester = require('../models/semester');
const User = require('../models/user');

semesterRouter.route('/semester/:id').get(function (req, res) {
  var iduserlogin = req.params.id
  console.log(iduserlogin)
  
    Semester.find(function (err, semester) {
      User.findById(iduserlogin, function (err, user) {
        res.render('semester', {  semester: semester, user: user }); //render collection "users"
      });
    });
  

});

semesterRouter.route('/semester').get(function (req, res) {
    Semester.find(function (err, semester) {
      if (err) {
        console.log(err);
      }
      else {
        res.render('semester', { semester: semester }); 
      }
    });
  });
  
  semesterRouter.route('/createsemester').get(function (req, res) {
    res.render('createsemester');
  });
  
  semesterRouter.route('/createsemester').post(function (req, res) {
    const semester = new Semester(req.body);
    
    semester.save()
      .then(semester => {
        res.redirect('/semesterRout/semester');
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
  });
  
  
  semesterRouter.route('/editsemester/:id').get(function (req, res) {
    const id = req.params.id;
    Semester.findById(id, function (err, semester) {
      res.render('editsemester', { semester: semester });
    });
  });
  
  semesterRouter.route('/updatesemester/:id/:ids').post(function (req, res) {
    Semester.findById(req.params.id, function (err, semester) {
      if (!semester)
        return next(new Error('Could not load Document'));
      else {
       
        semester.year = req.body.year;
        semester.semester = req.body.semester;
        
        semester.save().then(semester => {
          res.redirect(`/semesterRout/semester/${req.params.ids}`);
        })
          .catch(err => {
            res.status(400).send("unable to update the database");
          });
      }
    });
  });
  
  semesterRouter.route('/deletesemester/:id').get(function (req, res) {
    Semester.findByIdAndRemove({ _id: req.params.id },
      function (err, semester) {
        if (err) console.log(err)
        else res.redirect('semester');
      });
  });
  
  module.exports = semesterRouter;