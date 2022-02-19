const mongoose = require('mongoose');

const partecipantSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 15,
    minlength: 3,
    required: [true, 'Please provide name'],
  },
  ip: {
    type: String,
    required: [true, 'Please provide IP address'],
  },
  available: {
    type: [Date],
    required: true,
  },
  eventId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide eventId'],
    validate: [validateLength, 'Cannot submit more than 14 days'],
  },
});

function validateLength(array) {
  return array.length <= 14;
}

module.exports = mongoose.model('Partecipant', partecipantSchema);
