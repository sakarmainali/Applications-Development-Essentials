const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const summarySchema = new Schema({
  book_description:{type: String, required: true }, 
  summary_title: { type: String, required: true },
  summary_body: { type: String, required: true },
  summary_cover: { type: String},
  creator_id: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
  
});

module.exports = mongoose.model('Summary', summarySchema);
