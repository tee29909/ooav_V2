const express = require('express');
const app = express();
const subjectRouter = express.Router();
const Subjects = require('../models/subject');
const Semester = require('../models/semester');
const User = require('../models/user');
///////////////////subjects////////////////////////////////////////////////
subjectRouter.route('/subjects/:id').get(function (req, res) {
  var iduserlogin = req.params.id
  console.log(iduserlogin)

  
    Semester.find(function (err, semester) {
      Subjects.find( function (err, subjects) {
      User.findById(iduserlogin, function (err, user) {
        res.render('subjects', { semester: semester, user: user, subjects: subjects }); //render collection "users"
      });
    });
  });


});

subjectRouter.route('/subjects').get(function (req, res) {
  Subjects.find(function (err, subjects) {
    if (err) {
      console.log(err);
    }
    else {
      Semester.find(function (err, semester) {
        res.render('subjects', { subjects: subjects, semester: semester });
      });//render collection "users"
    }
  });
});

subjectRouter.route('/groupsubjects').post(function (req, res) {
  const subjects = new Subjects(req.body);

  res.redirect("groupsubjects");

});

subjectRouter.route('/createsubjects/:id').get(function (req, res) {
  User.findById(req.params.id, function (err, user) {
    res.render('createsubjects', { user: user });
  });
});

subjectRouter.route('/createsubjects/:id').post(function (req, res) {
  const subjects = new Subjects(req.body);


  subjects.save()
    .then(subjects => {
      res.redirect(`/subjectRout/subjects/${req.params.id}`);
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});


subjectRouter.route('/editsubjects/:id/:ids').get(function (req, res) {
  const id = req.params.id;
  Subjects.findById(id, function (err, subjects) {
    User.findById(req.params.ids, function (err, user) {
      res.render('editsubjects', { subjects: subjects, user: user });
    });
  });
});

subjectRouter.route('/updatesubjects/:id/:ids').post(function (req, res) {
  Subjects.findById(req.params.id, function (err, subjects) {
    if (!subjects)
      return next(new Error('Could not load Document'));
    else {
      // do your updates here
      subjects.ID = req.body.ID;
      subjects.name = req.body.name;

      subjects.save().then(subjects => {
        res.redirect(`/subjectRout/subjects/${req.params.ids}`);
      })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

subjectRouter.route('/deletesubjects/:id/:ids').get(function (req, res) {
  Subjects.findByIdAndRemove({ _id: req.params.id },
    function (err, subjects) {
      if (err) console.log(err)
      else res.redirect(`/subjectRout/subjects/${req.params.ids}`);
    });
});



module.exports = subjectRouter;