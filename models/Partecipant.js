const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const arrayValidator = require('./dateArrayValidator.js');

const partecipantSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: 15,
    minlength: 3,
    required: [true, 'Please provide name'],
  },
  ip: {
    type: String,
    trim: true,
    required: [true, 'Please provide IP address'],
  },
  available: {
    type: [String],
    required: true,
    validate: arrayValidator,
  },
  eventId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide eventId'],
  },
});

partecipantSchema.index({name: 1, eventId: 1}, {unique: true});

partecipantSchema.pre('save', async function() {
  const salt = await bcrypt.genSalt(10);
  this.ip = await bcrypt.hash(this.ip, salt);
});

partecipantSchema.methods.compareIP = async function(candidateIP) {
  const match = await bcrypt.compare(candidateIP, this.ip);
  return match;
};

module.exports = mongoose.model('Partecipant', partecipantSchema);
