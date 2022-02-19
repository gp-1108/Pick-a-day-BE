const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 25,
  },
  days: [Date],
});

module.exports = mongoose.model('Event', eventSchema);
