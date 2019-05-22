const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Semester = new Schema({
  year: {
     type: String
  },
  semester: {
    type: String
 }
},{
    collection: 'semester'
});

module.exports = mongoose.model('Semester', Semester);