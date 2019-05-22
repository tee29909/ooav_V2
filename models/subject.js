const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Subjects = new Schema({
  ID: {
     type: String
  },
  name: {
    type: String
 },
 year: {
  type: String
},
semester: {
    type: String
 }
 
},{
    collection: 'subjects'
});

module.exports = mongoose.model('Subjects', Subjects);