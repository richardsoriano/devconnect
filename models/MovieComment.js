const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MovieCommentSchema = new Schema({
  movie: {
    type: Schema.Types.ObjectId,
    ref: 'movie',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
  }],
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  }

  // c_dude_with_a_problem: {
  //   type: Boolean,
  //   default: false
  // },
  // c_golden_fleece: {
  //   type: Boolean,
  //   default: false
  // },
  // c_superhero: {
  //   type: Boolean,
  //   default: false
  // },
  // g_introduction: {
  //   type: Boolean,
  //   default: false
  // },
  // b_introduction : {
  //   type: Boolean,
  //   default: false
  // },
  // g_character: {
  //   type: Boolean,
  //   default: false
  // },
  // b_character : {
  //   type: Boolean,
  //   default: false
  // },
  // g_dialogue : {
  //   type: Boolean,
  //   default: false
  // },
  // b_dialogue: {
  //   type: Boolean,
  //   default: false
  // },

});
module.exports = MovieComment = mongoose.model('moviecomment', MovieCommentSchema);
