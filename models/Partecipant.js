const mongoose = require('mongoose');

const partecipantSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 15,
    minlength: 3,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  available: {
    type: [Date],
    required: true,
  },
  event: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model('Partecipant', partecipantSchema);
