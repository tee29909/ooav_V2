const express = require('express');

const app = express();
const port = 3000;
const userRouter = require('./routes/userRouter');
const buildRouter = require('./routes/buildRouter');
const roomRouter = require('./routes/roomRouter');
const semesterRouter = require('./routes/semesterRouter');
const subjectRouter = require('./routes/subjectRouter');
const groupRouter = require('./routes/groupRouter');
const examRouter = require('./routes/examRouter');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://test:test12345@ds121415.mlab.com:21415/ooad');


app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/examRout', examRouter);
app.use('/userRout', userRouter);
app.use('/buildRout', buildRouter);
app.use('/roomRout', roomRouter);
app.use('/semesterRout', semesterRouter);
app.use('/subjectRout', subjectRouter);
app.use('/groupRout', groupRouter);


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'public', 'index.html'));
});

app.listen(port, function(){
  console.log('Node js Express js Tutorial');
});

