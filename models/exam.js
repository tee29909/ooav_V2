const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Exam = new Schema({
   ID_Subject: {
      type: Schema.Types.ObjectId,
      ref: 'Subjects'
   },
   date: {
      type: String
   },
   timein: {
      type: String
   },
   timeout: {
      type: String
   },
   ID_Room: [{
      type: Schema.Types.ObjectId,
      ref: 'Room'
   }],
   invigilator: [{
      ID: {
         type: Schema.Types.ObjectId,
         ref: 'User'
      },
      room: {
         type: Schema.Types.ObjectId,
         ref: 'Room'
      }
   }],
   student: [{
      ID: {
         type: Schema.Types.ObjectId,
         ref: 'User'
      },
      room: {
         type: Schema.Types.ObjectId,
         ref: 'Room'
      },
      exam: {
         type: String
      },
      group: {
         type: String
      }
   }],
   type: {
      type: String
   },
   group: [{
      type: Schema.Types.ObjectId,
      ref: 'Group'
   }],
   year: {
      type: String
   },

   semester: {
      type: String
   }
}, {
      collection: 'exam'
   });

module.exports = mongoose.model('Exam', Exam);