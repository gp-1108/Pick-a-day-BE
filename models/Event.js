const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 25,
    minlength: 3,
  },
  days: {
    type: [Date],
    required: [true, 'Please provide dates allowed'],
    validate: [validateLength, 'Cannot submit more than 14 days total'],
  },
});

function validateLength(array) {
  return array.length <= 14;
}

module.exports = mongoose.model('Event', eventSchema);
