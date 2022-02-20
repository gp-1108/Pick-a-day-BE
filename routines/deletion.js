const Event = require('../models/Event.js');

async function deleteOldEvents() {
  let minDate = new Date();
  minDate = minDate.setDate(minDate.getDate()-10);
  const events = await Event.find({maxDate: {$lt: minDate}});
  events.forEach(async (event) => {
    await Event.findByIdAndDelete(event._id);
  });
}

module.exports = deleteOldEvents;
