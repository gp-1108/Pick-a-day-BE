const mongoose = require('mongoose');
const Partecipant = require('./Partecipant.js');
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
  maxDate: {
    type: Date,
    default: calcMaxDate,
  },
});

eventSchema.pre('findOneAndDelete', async function() {
  const eventId = this._conditions._id;
  await Partecipant.deleteMany({eventId});
});

function calcMaxDate() {
  let maxDate;
  this.days.forEach((element) => {
    let tempDate = element.split('/');
    tempDate = new Date(tempDate[2], tempDate[1], tempDate[0]);
    if (!maxDate) {
      maxDate = tempDate;
    } else if (tempDate > maxDate) {
      maxDate = tempDate;
    }
  });
  return maxDate;
}

module.exports = mongoose.model('Event', eventSchema);
