const express = require('express');
const app = express();
const buildRouter = express.Router();
const Build = require('../models/building')
const Semester = require('../models/semester');
const User = require('../models/user');
////////////////////building/////////////////////////
buildRouter.route('/building/:id').get(function (req, res) {
  var iduserlogin = req.params.id
  console.log(iduserlogin)
  Build.find(function (err, build) {
    User.find(function (err, users) {
      Semester.find(function (err, semester) {
        User.findById(iduserlogin, function (err, user) {
          res.render('building', { users: users, semester: semester, user: user, building: build }); //render collection "users"
        });
      });
    });
  });

});

buildRouter.route('/building').get(function (req, res) {
  Build.find(function (err, building) {
    if (err) {
      console.log(err);
    }
    else {


      Semester.find(function (err, semester) {
        res.render('building', { building: building, semester: semester, user: user });
      }); //render collection "users"

    }
  });
});

buildRouter.route('/createbuilding/:id').get(function (req, res) {
  User.findById(req.params.id, function (err, user) {
    res.render('createbuilding',{user:user});
  });
});

buildRouter.route('/createbuilding/:id').post(function (req, res) {
  const build = new Build(req.body);

  build.save()
    .then(build => {
      res.redirect(`/buildRout/building/${req.params.id}`);
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});


buildRouter.route('/editbuilding/:id/:ids').get(function (req, res) {
  const id = req.params.id;
  Build.findById(id, function (err, build) {
    User.findById(req.params.ids, function (err, user) {
      res.render('editbuilding', { build: build, user: user });
    });
  });
});

buildRouter.route('/updatebuilding/:id/:ids').post(function (req, res) {
  Build.findById(req.params.id, function (err, build) {
    if (!build)
      return next(new Error('Could not load Document'));
    else {
      // do your updates here
      build.ID = req.body.ID;
      build.name = req.body.name;
      build.floor = req.body.floor;
      build.save().then(user => {
        res.redirect(`/buildRout/building/${req.params.ids}`);
      })
      .catch(err => {
        res.status(400).send("unable to update the database");
      });
    }
  });
});

buildRouter.route('/deletebuilding/:id/:ids').get(function (req, res) {
  Build.findByIdAndRemove({ _id: req.params.id },
    function (err, building) {
      if (err) console.log(err)
      else {

        res.redirect(`/buildRout/building/${req.params.ids}`);

      }
    });
});

module.exports = buildRouter;