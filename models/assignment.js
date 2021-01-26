const Schema = mongoose.Schema;

const AssignmentSchema = new Schema({
  teacher: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  body: {
    type: String,
  },
});
module.exports = Assignment = mongoose.model('assignment', AssignmentSchema);
