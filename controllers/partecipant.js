const {StatusCodes} = require('http-status-codes');
const {
  BadRequestError,
  ConflictError,
  NotFoundError,
} = require('../errors');
const Event = require('../models/Event.js');
const Partecipant = require('../models/Partecipant.js');
const {
  datesFormatValidator,
  datesEventValidator,
} = require('./datesValidation.js');

async function addPartecipant(req, res) {
  const {
    body: {name, available, eventId},
  } = req;
  if (!name || !available || !eventId) {
    throw new BadRequestError(
      'Please provide all of the fields needed (name, available, eventId)');
  }

  // validation of event
  const event = await Event.findById(eventId);
  if (!event) {
    throw new BadRequestError(`No event with id ${eventId}`);
  }

  // validation of dates
  const userDates = datesFormatValidator(available);
  datesEventValidator(userDates, event.days);

  await Partecipant.create({
    ip: req.ip,
    name,
    available: userDates,
    eventId,
  });
  res.status(StatusCodes.CREATED).json({});
}

async function modifyPartecipant(req, res) {
  const {
    body: {name, available, eventId},
  } = req;
  if (!name || !available || !eventId) {
    throw new BadRequestError(
      'Please provide all of the fields needed (name, available, eventId)');
  }
  // validation of event
  const event = await Event.findById(eventId);
  if (!event) {
    throw new BadRequestError(`No event with id ${eventId}`);
  }

  // validation of dates
  const userDates = datesFormatValidator(available);
  datesEventValidator(userDates, event.days);

  // Checking existing data
  const partecipant = await Partecipant.findOne({eventId, name});
  if (!partecipant) {
    throw new NotFoundError(`No user ${name} partecipated to this event`);
  }
  if (! await partecipant.compareIP(req.ip)) {
    throw new ConflictError(
      'Cannot modify partecipant dates from different IP');
  }
  await Partecipant.updateOne({eventId, name},
    {available: userDates},
    {new: true, runValidators: true});
  res.status(StatusCodes.OK).json({});
}

async function deletePartecipant(req, res) {
  const {
    body: {name, eventId},
  } = req;
  if (!name || !eventId) {
    throw new BadRequestError(
      'Please provide all fields needed (name, eventId)');
  }
  const partecipant = await Partecipant.findOne({eventId, name});
  if (!partecipant) {
    throw new NotFoundError(`No user ${name} partecipated to this event`);
  }
  if (! await partecipant.compareIP(req.ip)) {
    throw new ConflictError(
      'Cannot delete partecipant dates from different IP');
  }
  await Partecipant.findByIdAndDelete(partecipant._id);
  res.status(StatusCodes.OK).json({});
}

module.exports = {
  addPartecipant,
  modifyPartecipant,
  deletePartecipant,
};
