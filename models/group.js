const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Group = new Schema({
  
  group: {
    type: String
 },
 
 teacher: [{
   type : Schema.Types.ObjectId ,
   ref : 'User'
 }],
 student:  [{
   type : Schema.Types.ObjectId ,
   ref : 'User'
}],
 max: {
  type: String
}, 
subject : {
   type : Schema.Types.ObjectId ,
   ref : 'Subjects'
},
year : {
  type : String
},
semester : {
  type : String
}
},{
    collection: 'group'
});

module.exports = mongoose.model('Group', Group);