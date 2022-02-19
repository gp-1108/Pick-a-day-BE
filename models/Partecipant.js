const mongoose = require('mongoose');
const arrayValidator = require('./dateArrayValidator.js');

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
    validate: arrayValidator,
  },
});

module.exports = mongoose.model('Partecipant', partecipantSchema);
