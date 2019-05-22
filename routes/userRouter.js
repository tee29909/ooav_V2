const express = require('express');
const app = express();
const userRouter = express.Router();
const User = require('../models/user');
const Semester = require('../models/semester');
const Group = require('../models/group');
const Exam = require('../models/exam');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');







userRouter.route('/users/:id').get(function (req, res) {
    var iduserlogin = req.params.id
    console.log(iduserlogin)

    User.find(function (err, users) {
        Semester.find(function (err, semester) {
            User.findById(iduserlogin, function (err, user) {
                res.render('users', { semester: semester, user: user, users: users }); //render collection "users"
            });
        });
    });


});
userRouter.route('/staff/:id').get(function (req, res) {
    var iduserlogin = req.params.id
    console.log(iduserlogin)
    Exam.find(function (err, exam) {
        User.find(function (err, users) {
            Semester.find(function (err, semester) {
                User.findById(iduserlogin, function (err, user) {
                    res.render('userstaff', { semester: semester, user: user, users: users, exam: exam }); //render collection "users"
                });
            });
        });
    }).populate(['group', 'ID_Subject', 'ID_Room', 'student.room', 'student.ID', 'invigilator.room'])


});
userRouter.route('/Teacher/:id').get(function (req, res) {
    var iduserlogin = req.params.id
    console.log(iduserlogin)
    Exam.find(function (err, exam) {
        User.find(function (err, users) {
            Semester.find(function (err, semester) {
                User.findById(iduserlogin, function (err, user) {
                    res.render('userTeacher', { semester: semester, user: user, users: users, exam: exam }); //render collection "users"
                });
            });
        });
    }).populate(['group', 'ID_Subject', 'ID_Room', 'student.room', 'student.ID', 'invigilator.room'])


});
userRouter.route('/studen/:id').get(function (req, res) {
    var iduserlogin = req.params.id
    console.log(iduserlogin)
    Exam.find(function (err, exam) {
        User.find(function (err, users) {
            Semester.find(function (err, semester) {
                User.findById(iduserlogin, function (err, user) {
                    res.render('userStuden', { semester: semester, user: user, users: users, exam: exam }); //render collection "users"
                });
            });
        });
    }).populate(['group', 'ID_Subject', 'ID_Room', 'student.room', 'student.ID', 'invigilator.room'])


});
userRouter.route('/examstuden/:id').get(function (req, res) {
    var iduserlogin = req.params.id
    console.log(iduserlogin)
    Exam.find(function (err, exam) {
        User.find(function (err, users) {
            Semester.find(function (err, semester) {
                User.findById(iduserlogin, function (err, user) {
                    res.render('examStuden', { semester: semester, user: user, users: users, exam: exam }); //render collection "users"
                });
            });
        });
    }).populate(['group', 'ID_Subject', 'ID_Room', 'student.room', 'student.ID', 'invigilator.room'])


});





userRouter.route('/create/:id').get(function (req, res) {
    var iduserlogin = req.params.id
    User.findById(iduserlogin, function (err, user) {
        res.render('create', { user: user });
    });

});

userRouter.route('/create/:id').post(function (req, res) {
    const user = new User();
    user.username = req.body.username;
    user.password = cryptr.encrypt(req.body.password);
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.type = req.body.type;
    var iduserlogin = req.params.id;

    user.save()
        .then(user => {

            res.redirect(`/userRout/users/${iduserlogin}`);

        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });

});


userRouter.route('/edit/:id/:user').get(function (req, res) {
    const id = req.params.id;
    User.findById(id, function (err, user) {
        var iduserlogin = req.params.user;
        var password = cryptr.decrypt(user.password);
        User.findById(iduserlogin, function (err, id) {
            res.render('edit', { id: id, user: user ,password:password});
        });
    });
});

userRouter.route('/update/:id/:user').post(function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (!user)
            return next(new Error('Could not load Document'));
        else {
            // do your updates here
            user.username = req.body.username;
            user.firstName = req.body.firstName;
            user.password = cryptr.encrypt(req.body.password);
            user.lastName = req.body.lastName;
            user.type = req.body.type;

            user.save().then(user => {
                res.redirect(`/userRout/users/${req.params.user}`);
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

userRouter.route('/delete/:id/:iduser').get(function (req, res) {
    User.findByIdAndRemove({ _id: req.params.id },
        function (err, coin) {
            if (err) console.log(err)
            else res.redirect(`/userRout/users/${req.params.iduser}`);
        });
});

userRouter.route('/').get(function (req, res) {
    res.render('login', { err: false });
});

userRouter.route("/login").post(function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username)


    User.find({username: username}, function (err, users) {
        console.log(users.length)

        var dePassword = "";
        for (var i=0;i< users.length;i++){
            if(username == users[i].username & password == cryptr.decrypt(users[i].password)){
                dePassword = users[i].password;
            }
        }
        User.findOne({ username: username, password: dePassword }, function (err, user) {
            if (err) {
                res.status(404).send("No have user");
                res.render("login", { err: true });
            } else if (user) {
                console.log(user)

                if (user.type == "นิสิต") {

                    res.redirect(`/userRout/studen/${user._id}`);

                } else if (user.type == "เจ้าหน้าที่") {

                    res.redirect(`/userRout/staff/${user._id}`);

                } else {

                    res.redirect(`/userRout/Teacher/${user._id}`);
                }


            } else {

                res.render("login", { err: true });
            }
        });
    });

});





module.exports = userRouter;