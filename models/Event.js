const mongoose = require('mongoose');
const arrayValidator = require('./dateArrayValidator.js');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 25,
    minlength: 3,
  },
  days: {
    type: [String],
    required: [true, 'Please provide dates allowed'],
    validate: arrayValidator,
  },
});

module.exports = mongoose.model('Event', eventSchema);
