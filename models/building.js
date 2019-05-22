const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Build = new Schema({
  ID: {
     type: String
  },
  name: {
    type: String
 },
 floor: {
  type: String
}
},{
    collection: 'building'
});

module.exports = mongoose.model('Build', Build);