const express = require('express');
const app = express();
const groupRouter = express.Router();
const Group = require('../models/group')
const Semester = require('../models/semester');
const Subject = require('../models/subject');
const User = require('../models/user')

groupRouter.route('/group/:ids').get(function(req, res) {
    var sb = new Array()
    var iduserlogin = req.params.ids
        // Group.findById(id, function (err, group) {
        //     res.render('group', { group: group });
        //   });
        // const id = req.params.id;

    Semester.findById("5ca35ad3fb6fc01d565f5bff", function(err, semester) {
        User.findById(iduserlogin, function(err, user) {
            Group.find({ semester: semester.semester, year: semester.year }, function(err, group) {
                Subject.find(function(err, subject) {

                    for (var j = 0; j < subject.length; j++) {
                        var check = 0
                        console.log(group.length)
                        for (var i = 0; i < group.length; i++) {
                            console.log(subject[j]._id)
                            console.log(group[i].subject._id)
                            console.log(group.length)
                            var g = group[i].subject._id
                            var s = subject[j]._id
                            if (s.equals(g)) {
                                check = 1
                            }

                        }
                        if (check == 1) {
                            var a = subject[j]._id
                            sb.push(a);
                        }
                    }
                    console.log(sb)

                    res.render('group', { group: group, subject: subject, semester: semester, user: user, sb: sb });
                });
            }).populate('subject')
        });
    });


});

// groupRouter.route('/groupteacher').get(function (req, res) {
//   // const id = req.params.id;
//   // Group.findById(id, function (err, group) {
//   //     res.render('group', { group: group });
//   //   });
//   // const id = req.params.id;
//   Semester.find(function (err, semester) {
//     Group.findOne(function (err, group) {
//       res.render('groupteacher', { group: group, semester: semester });
//     });
//   });
// });
// groupRouter.route('/groupstudent').get(function (req, res) {
//   // const id = req.params.id;
//   // Group.findById(id, function (err, group) {
//   //     res.render('group', { group: group });
//   //   });
//   // const id = req.params.id;
//   Semester.find(function (err, semester) {

//       Group.findOne(function (err, group) {
//         res.render('groupstudent', { group: group, semester: semester, user: user });
//       });

//   });
// });

groupRouter.route('/groupteacher/:id/:ids').get(function(req, res) {
    const id = req.params.id;
    // Group.findById(id, function (err, group) {
    //     res.render('group', { group: group });
    //   });

    User.findById(req.params.ids, function(err, user) {
        Group.findById(id, function(err, group) {
            // console.log(user);
            User.find({ type: "อาจารย์" }, function(err, users) {
                // console.log(users);
                console.log(group);
                res.render('groupteacher', { group: group, user: user, users: users });
            });
        }).populate(['subject', 'teacher'])
    });
});

groupRouter.route('/addteacher/:id/:ids').post(function(req, res) {
    const id = req.params.id;
    var name = req.body.username;
    console.log(id);
    console.log(name);

    Group.findById(id,
        function(err, group) {
            User.findOne({ username: name }, function(err, user) {
                console.log(user);
                group.teacher.push(user._id);
                group.save()
                res.redirect(`/groupRout/groupteacher/${id}/${req.params.ids}`);
            });


        }).populate(['subject', 'teacher'])
});


groupRouter.route('/groupstudent/:id/:ids').get(function(req, res) {
    const id = req.params.id;
    // Group.findById(id, function (err, group) {
    //     res.render('group', { group: group });
    //   });
    User.findById(req.params.ids, function(err, user) {
        Group.findById(id, function(err, group) {
            User.find({ type: "นิสิต" }, function(err, users) {
                res.render('groupstudent', { group: group, user: user, users: users });
            });
        }).populate(['subject', 'student'])
    });
});
///////////////////////////get//////////////////////////////////////////
groupRouter.route('/groupcreate/:ids').get(function(req, res) {
    console.log(req.params.id)
    User.findById(req.params.ids, function(err, user) {
        Subject.find(function(err, subject) {
            console.log(subject)
            res.render('addgroup', { subject: subject, user: user });
        });
    });

});

groupRouter.route('/addstudent/:id/:ids').post(function(req, res) {
    const id = req.params.id;
    var name = req.body.username;
    console.log("test 001")
    Group.findById(id,
        function(err, group) {
            User.findOne({ username: name }, function(err, user) {
                group.student.push(user._id);
                group.save()
                res.redirect(`/groupRout/groupstudent/${id}/${req.params.ids}`);
            });
        }).populate(['subject', 'student'])
});



groupRouter.route('/groupcreate/:ids').post(function(req, res) {

    Semester.findOne(function(err, semester) {

        var group = new Group();

        group.group = req.body.group
        group.max = req.body.max
        group.subject = req.body.subject
        group.semester = semester.semester
        group.year = semester.year
        group.save().then(group => {
            Group.findById(group._id, (err, G) => {
                console.log(G)
                res.redirect(`/groupRout/group/${req.params.ids}`);
            }).populate(['subject'])
        })

    });
});


// groupRouter.route('/editgroup/:id').get(function (req, res) {
//   const id = req.params.id;
//   Group.findById(id, function (err, group) {
//     res.render('editgroup', { group: group });
//   });
// });

groupRouter.route('/updategroup/:id').post(function(req, res) {
    Group.findById(req.params.id, function(err, group) {
        if (!group)
            return next(new Error('Could not load Document'));
        else {
            // do your updates here
            group.ID_Subject = req.body.ID_Subject;
            group.group = req.body.group;
            group.ID_Room = req.body.ID_Room;
            group.teacher = req.body.teacher;
            group.student = req.body.student;
            group.max = req.body.max;
            group.save().then(group => {
                    res.redirect('/groupRout/group/:id');
                })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

groupRouter.route('/deletegroup/:id/:ids').get(function(req, res) {
    Group.findByIdAndRemove(req.params.id,
        function(err, group) {


            if (err) console.log(err)
            else res.redirect(`/groupRout/group/${req.params.ids}`);
        });
});




groupRouter.route('/deleteteacher/:id/:teacher/:ids').get(function(req, res) {

    const id = req.params.id;
    const remove = req.params.teacher;




    Group.findById(id,
        function(err, group) {

            var size = group.teacher.length;


            for (var i = 0; i <= size; i++) {
                if (group.teacher[i] == remove) {
                    group.teacher.splice(i, i + 1);
                }
            }

            // console.log(room[0])
            group.save()
            res.redirect(`/groupRout/groupteacher/${id}/${req.params.ids}`);
        });
});
groupRouter.route('/deletestudent/:id/:student/:ids').get(function(req, res) {

    const id = req.params.id;
    const remove = req.params.student;
    Group.findById(id,
        function(err, group) {

            var size = group.student.length;


            for (var i = 0; i <= size; i++) {
                if (group.student[i] == remove) {
                    group.student.splice(i, i + 1);
                }
            }

            // console.log(room[0])
            group.save()
            res.redirect(`/groupRout/groupstudent/${id}/${req.params.ids}`);
        });
});

module.exports = groupRouter;