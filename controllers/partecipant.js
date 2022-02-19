const {StatusCodes} = require('http-status-codes');
const {
  BadRequestError,
  ConflictError,
} = require('../errors');
const Event = require('../models/Event.js');
const Partecipant = require('../models/Partecipant.js');

async function addPartecipant(req, res) {
  const {
    body: {ip, name, available, eventId},
  } = req;
  if (!ip || !name || !available || !eventId) {
    throw new BadRequestError(
      'Please provide all of the fields needed (ip, name, available, eventId)');
  }
  // validation of event
  const event = await Event.findById(eventId);
  if (!event) {
    throw new BadRequestError(`No event with id ${eventId}`);
  }

  // Validation of dates submitted
  const re = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  const userDates = available.split(',');
  userDates.forEach((element) => {
    if (!re.test(element)) {
      throw new BadRequestError(
        'Dates submitted do not match dd/mm/aaaa format');
    } else if (!event.days.includes(element)) {
      throw new ConflictError(
        'Cannot submit dates not present in main event');
    }
  });

  await Partecipant.create({
    ip,
    name,
    available: userDates,
    eventId,
  });
  res.status(StatusCodes.CREATED).json({});
}

async function modifyPartecipant(req, res) {
  res.send('mod partecipant');
}

async function deletePartecipant(req, res) {
  res.send('delete partecipant');
}

module.exports = {
  addPartecipant,
  modifyPartecipant,
  deletePartecipant,
};
