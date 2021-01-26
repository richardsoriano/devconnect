const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MovieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  director: {
    type: String,
  },
  writer: {
    type: String,
  },
  poster: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  
});
module.exports = Movie = mongoose.model('movie', MovieSchema);
