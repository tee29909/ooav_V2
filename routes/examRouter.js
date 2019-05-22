const express = require('express');
const app = express();
const examRouter = express.Router();
const Exam = require('../models/exam');
const Semester = require('../models/semester');
const Subject = require('../models/subject');
const Group = require('../models/group');
const User = require('../models/user');
const Room = require('../models/room');


///////////////////courses//////////////////////////////////bug//////////////
examRouter.route('/exam/:id').get(function(req, res) {
    var iduserlogin = req.params.id




    Semester.find(function(err, semester) {
        Subject.find(function(err, subjects) {
            Group.find({ semester: semester[0].semester, year: semester[0].year }, function(err, group) {
                var idS = new Array();
                idS.push(group[0].subject._id);
                for (var i = 0; i < group.length; i++) {
                    var check = 0;
                    for (var j = 0; j < idS.length; j++) {

                        if (group[i].subject._id.equals(idS[j])) {

                            check = 1;
                        }
                    }
                    if (check == 0) {
                        idS.push(group[i].subject._id);
                    }

                }
                console.log(idS)




                User.findById(iduserlogin, function(err, user) {


                    res.render('exam', { semester: semester, user: user, subjects: subjects, idS: idS }); //render collection "users"

                });



            }).populate('subject')
        });
    });



});


//หน้าจัดการสอบ
examRouter.route('/exam').get(function(req, res) {
    Subject.find(function(err, subjects) {
        if (err) {
            console.log(err);
        } else {
            Semester.find(function(err, semester) {
                res.render('exam', { subjects: subjects, semester: semester });
            }); //render collection "users"
        }
    });
});

//เมื่อกด การสอบ
examRouter.route('/groupexam/:ID/:ids').get(function(req, res) {
    const id = req.params.ID;

    // Group.findById(id, function (err, group) {
    //     res.render('group', { group: group });
    //   });
    // const id = req.params.id;
    console.log(id)
    User.findById(req.params.ids, function(err, user) {

        Semester.findOne(function(err, semester) {
            Exam.find({ ID_Subject: id, semester: semester.semester, year: semester.year }, function(err, exam) {
                console.log(exam);
                res.render('groupexam', {
                    ID_subject: id,
                    exam: exam,
                    semester: semester,
                    user: user
                });
            }).populate(['ID_Subject', 'group',])
        });
    });


});









examRouter.route('/deleteroom/:id/:room/:ids').get(function(req, res) {

    const id = req.params.id;
    const remove = req.params.room;




    Exam.findById(id,
        function(err, exam) {

            var size = exam.ID_Room.length;


            for (var i = 0; i <= size; i++) {
                if (exam.ID_Room[i] == remove) {
                    exam.ID_Room.splice(i, i + 1);
                }
            }

            // console.log(room[0])
            exam.save()

            res.redirect(`/examRout/addexamstuden/${id}/${req.params.ids}`);
        }).populate(['group', 'ID_Room', 'student.room', 'student.ID'])
});

/////////////////////////////////////////////////////////////////////////

examRouter.route('/groupexam/:id/:ids').post(function(req, res) {
    const id = req.params.id;
    console.log(id)



    Semester.find(function(err, semester) {

        var exam = new Exam();
        exam.semester = semester[0].semester
        exam.year = semester[0].year
        exam.type = req.body.type
        exam.timein = req.body.timein
        exam.timeout = req.body.timeout
        exam.date = req.body.date
        exam.ID_Subject = id

        console.log(exam)
            // exam.max = req.body.max
            // exam.semester = subject[0].semester
            // exam.year = subject[0].year
            // exam.type = req.body.type
            // exam.timein = req.body.timein
            // exam.timeout = req.body.timeout
            // exam.date = req.body.date
            // exam.ID_Subject = id




        exam.save().then(exam => {
                res.redirect(`/examRout/groupexam/${id}/${req.params.ids}`);
            })
            .catch(err => {
                console.log(err);
                res.status(400).send("unable to update the database");
            });

    });
});

examRouter.route('/createexam/:ID/:ids').get(function(req, res) {
    const id = req.params.ID;
    console.log(id);
    User.findById(req.params.ids, function(err, user) {
        Semester.find(function(err, semester) {
            res.render('createexam', {
                ID_subject: id,
                semester: semester,
                user: user
            });
        });
    });
});

// examRouter.route('/groupexam').get(function (req, res) {
//   Semester.find(function (err, semester) {
//     Group.find({ ID_Subject: id }, function (err, group) {
//       res.redirect('groupexam', { group: group, semester: semester });
//     });
//   });
// });

examRouter.route('/createexam/:id').post(function(req, res) {
    const exam = new Exam(req.body);

    exam.save()
        .then(exam => {
            res.redirect(`/examRout/exam/${req.params.id}`);
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

//-------------------------------------------------------------------------
examRouter.route('/addinvigilator/:id/:ids').get(function(req, res) {
    const id = req.params.id;
    // Group.findById(id, function (err, group) {
    //     res.render('group', { group: group });
    //   });

    User.findById(req.params.ids, function(err, user) {
        // console.log(id)
        Exam.findById(id, function(err, exam) {
            // console.log(exam.invigilator[0]._id._id);
            User.find(function(err, users) {
                //  console.log(exam)

                res.render('invigilator', { exam: exam, user: user, users: users });
            });
        }).populate(['ID_Room', 'invigilator.ID'])
    });
});

examRouter.route('/addinvigilator/:id/:ids').post(function(req, res) {
    const id = req.params.id;
    var name = req.body.type;
    var name2 = req.body.type2;
    var num = 0;
    console.log(name);
    Exam.findById(id,
        function(err, exam) {
            User.findOne({ username: name }, function(err, user) {

                for (var i = 0; i < exam.invigilator.length; i++) {

                    if (exam.invigilator[i].ID._id.equals(name)) {
                        num = 1;

                    }
                }

                if (num == 1) {
                    console.log("drgdrgrd==");
                    res.redirect(`/examRout/addinvigilator/${id}/${req.params.ids}`);
                } else {
                    console.log("==========");
                    exam.invigilator.push({ ID: name, room: name2 });

                    exam.save()
                    res.redirect(`/examRout/addinvigilator/${id}/${req.params.ids}`);
                }



            });
        }).populate(['ID_Room', 'invigilator.ID', 'invigilator.room', 'ID_Subject','student.ID','student.room','group'])
});

examRouter.route('/deleteinvigilator/:id/:invigilator/:ids').get(function(req, res) {

    const id = req.params.id;
    const remove = req.params.invigilator;



    console.log(id);
    Exam.findById(id,
        function(err, exam) {
            var num = 0;


            console.log(exam.invigilator.length);

            for (var i = 0; i < exam.invigilator.length; i++) {
               
                if (exam.invigilator[i]._id.equals(remove)) {

                    num = i;
                    console.log(i);
                }
            }
            exam.invigilator.splice(num, num + 1);
            // console.log(room[0])
            exam.save()
            res.redirect(`/examRout/addinvigilator/${id}/${req.params.ids}`);
        }).populate(['ID_Room', 'invigilator.ID', 'invigilator.room', 'ID_Subject','student.ID','student.room','group'])
});
//-------------------------------------------------------------------------

// deleteexam

examRouter.route('/deleteexam/:id/:ids').get(function(req, res) {
    Exam.findById(req.params.id, function(err, exam) {
        var id = exam.ID_Subject

        Exam.findByIdAndRemove(req.params.id, function(err, exam) {
            if (err) console.log(err)
            else res.redirect(`/examRout/groupexam/${id}/${req.params.ids}`);
        });
    });
});


examRouter.route('/addexamstuden/:id/:ids').get(function(req, res) {


    // Group.findById(id, function (err, group) {
    //     res.render('group', { group: group });
    //   });
    // const id = req.params.id;
    Semester.findOne(function(err, semester) {
        Group.find({ semester: semester.semester, year: semester.year }, function(err, group) {
            User.findById(req.params.ids, function(err, user) {

                Exam.findById(req.params.id, function(err, exam) {
                    console.log(req.params.id);
                    console.log(exam);
                    User.find(function(err, users) {

                        res.render('addexamstuden', {
                            exam: exam,
                            semester: semester,
                            user: user,
                            users: users,
                            group: group

                        });
                    });
                }).populate(['ID_Subject', 'ID_Room', 'student.ID', 'student.room'])
            });
        });
    });
});

examRouter.route('/addexamstuden/:id/:ids').post(function(req, res) {
    const id = req.params.id;
    var name = req.body.type;
    var name2 = req.body.type2;

    Exam.findById(id, function(err, exam) {
        var check = 0;
        var yuri = "12345";
        for (var i = 0; i < exam.group.length; i++) {
            if (exam.group[i]._id.equals(name)) {
                check = 1;

            }
        }

        Group.findById(name, function(err, group) {

          
            if (check == 0 && group.student.length != 0) {
                for (var i = 0; i < group.student.length; i++) {
                    
                    var sizestuden = parseInt(exam.student.length)+1
                    console.log(sizestuden)
                    if (Math.floor((sizestuden) / 10) == 0) {
                        yuri = "A" + (sizestuden % 10)
                    } else if (Math.floor((sizestuden) / 10) == 1) {
                        yuri = "B" + (sizestuden  % 10)
                    } else if (Math.floor((sizestuden + 1) / 10) == 2) {
                        yuri = "C" + (sizestuden  % 10)
                    } else if (Math.floor((sizestuden + 1) / 10) == 3) {
                        yuri = "D" + (sizestuden  % 10)
                    } else if (Math.floor((sizestuden + 1) / 10) == 4) {
                        yuri = "E" + (sizestuden  % 10)
                    } else if (Math.floor((sizestuden + 1) / 10) == 5) {
                        yuri = "F" + (sizestuden  % 10)
                    } else if (Math.floor((sizestuden + 1) / 10) == 6) {
                        yuri = "G" + (sizestuden  % 10)
                    } else if (Math.floor((sizestuden + 1) / 10) == 7) {
                        yuri = "H" + (sizestuden  % 10)
                    } else if (Math.floor((sizestuden + 1) / 10) == 8) {
                        yuri = "I" + (sizestuden  % 10)
                    } else if (Math.floor((sizestuden + 1) / 10) == 9) {
                        yuri = "J" + (sizestuden  % 10)
                    }

                    exam.student.push({ ID: group.student[i]._id, room: name2, group: group.group, exam: yuri });
                    exam.save()
                }
                exam.group.push(name);
                exam.save()


            }




            res.redirect(`/examRout/addexamstuden/${id}/${req.params.ids}`);
        }).populate(['student'])



    }).populate(['group', 'ID_Room', 'student.room', 'student.ID'])
});

examRouter.route('/deletestudent/:id/:student/:ids').get(function(req, res) {

    const id = req.params.id;
    const remove = req.params.student;





    Exam.findById(id,
        function(err, exam) {
            var num = 0;
            console.log(remove);
            var check;
            var nam = 0;

            for (var i = 0; i < exam.student.length; i++) {
                


                if (exam.student[i].ID._id == remove) {

                    num = i;
                    check = exam.student[i].group._id;

                    console.log('delete');



                }
            }



            exam.student.splice(num, num + 1);
            exam.save()


            for (var i = 0; i < exam.student.length; i++) {
                console.log(check)
                if (exam.student[i].group._id == check) {
                    nam = 1;


                }
            }
            console.log(nam + " aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
            if (nam == 0) {
                for (var i = 0; i < exam.group.length; i++) {
                    console.log(exam.group[i].group);
                    if (exam.group[i].group._id == check) {

                        exam.group.splice(i, i + 1);
                        exam.save()
                    }
                }
            }
            res.redirect(`/examRout/addexamstuden/${id}/${req.params.ids}`);
        }).populate(['ID_Room', 'invigilator.ID', 'invigilator.room', 'ID_Subject','student.ID','student.room','group'])
});





//-------------------------------------------------------------------------
examRouter.route('/updateexam/:id').post(function(req, res) {
    Exam.findById(req.params.id, function(err, exam) {
        if (!exam)
            return next(new Error('Could not load Document'));
        else {
            // do your updates here
            exam.ID = req.body.ID;
            exam.name = req.body.name;
            exam.save().then(exam => {
                    res.redirect('/examRout/exam');
                })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

examRouter.route('/deleteexam/:id').get(function(req, res) {
    Exam.findByIdAndRemove({ _id: req.params.id },
        function(err, exam) {
            if (err) console.log(err)
            else res.redirect('exam');
        });
});

//-------------------------------------------------------------------------
examRouter.route('/addexamroom/:id/:ids').get(function(req, res) {


    // Group.findById(id, function (err, group) {
    //     res.render('group', { group: group });
    //   });
    // const id = req.params.id;

    Room.find(function(err, room) {
        User.findById(req.params.ids, function(err, user) {
            Semester.findOne(function(err, semester) {
                Exam.findById(req.params.id, function(err, exam) {
                    //  console.log(req.params.id);
                    // console.log(exam);
                    User.find(function(err, users) {

                        res.render('addexamroom', {
                            exam: exam,
                            semester: semester,
                            user: user,
                            room: room,
                            users: users
                        });
                    });
                }).populate(['ID_Subject', 'ID_Room', 'student.ID', 'student.room'])
            });
        });
    });
});

examRouter.route('/addexamroom/:id/:ids').post(function(req, res) {
    const id = req.params.id;
    var name2 = req.body.type2;


    Exam.findById(id, function(err, exam) {
        console.log(name2);

        Exam.find({ _id: id, ID_Room: name2 }, function(err, exam3) {
            console.log(exam3);


            if (exam3.length > 0) {
                console.log("drgdrgrd==");
                res.redirect(`/examRout/addexamroom/${id}/${req.params.ids}`);
            } else {
                console.log("==================");
                exam.ID_Room.push({ _id: name2 });

                exam.save()
                res.redirect(`/examRout/addexamroom/${id}/${req.params.ids}`);

            }



        });
    }).populate(['ID_Subject', 'ID_Room', 'student.ID', 'student.room'])
});

examRouter.route('/deleteexamroom/:id/:room/:ids').get(function(req, res) {

    const id = req.params.id;
    const remove = req.params.room;





    Exam.findById(id,
        function(err, exam) {
            var num = 0;


            console.log(exam.ID_Room.length);

            for (var i = 0; i < exam.ID_Room.length; i++) {
                console.log(exam.ID_Room[i]._id + " " + exam.ID_Room[i].ID);
                console.log(remove + " ------");

                if (exam.ID_Room[i]._id.equals(remove)) {

                    num = i;

                    console.log(i);



                }
            }
            console.log(num);
            exam.ID_Room.splice(num, num + 1);

            exam.save()
            res.redirect(`/examRout/addexamroom/${id}/${req.params.ids}`);
        }).populate(['ID_Room'])
});



///////////////////////test//////////////////////////////////
// examRouter.route('/test').get(function(req, res) {

//     Subject.find(function(err, Subject) {
//         var a = [];
//         for (var i = 0; i < Subject.length; i++) {
//             var name = Subject[i]._id

//             Group.findOne({ subject: name }, function(err, group) {
//                 if (group) {
//                     console.log(Subject.length)
//                     a.push(group.subject._id);
//                 }

//             }).populate('subject')
//         }



//     });
// });


// examRouter.route('/checkexam/:id').get(function(req, res) {

//     User.findById(req.params.id, function(err, user) {


//         Exam.find(function(err, exam) {
//             Semester.find(function(err, semester) {
//                 console.log(exam)

//                 if (user.type == "นักเรียน") {
//                     res.render("userStuden", { exam: exam, user: user, semester, semester });

//                 } else if (user.type == "เจ้าหน้าที่") {
//                     res.render("userTeacher", { exam: exam, user: user, semester, semester });

//                 }


//             });
//         }).populate(['ID_Room', 'invigilator.room', 'invigilator.ID'])


//     });
// });


module.exports = examRouter;