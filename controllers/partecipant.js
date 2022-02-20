const {StatusCodes} = require('http-status-codes');
const {
  BadRequestError,
  ConflictError,
  NotFoundError,
} = require('../errors');
const Event = require('../models/Event.js');
const Partecipant = require('../models/Partecipant.js');
const datesValidator = require('./datesValidation.js');

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

  const userDates = datesValidator(available);

  await Partecipant.create({
    ip,
    name,
    available: userDates,
    eventId,
  });
  res.status(StatusCodes.CREATED).json({});
}

async function modifyPartecipant(req, res) {
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
  const userDates = datesValidator(available);

  // Checking existing data
  const partecipant = await Partecipant.findOne({eventId, name});
  if (!partecipant) {
    throw new NotFoundError(`No user ${name} partecipated to this event`);
  }
  console.log(partecipant.compareIP(ip));
  if (! await partecipant.compareIP(ip)) {
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
    body: {ip, name, eventId},
  } = req;
  if (!ip || !name || !eventId) {
    throw new BadRequestError(
      'Please provide all fields needed (ip, name, eventId)');
  }
  const partecipant = await Partecipant.findOne({eventId, name});
  if (!partecipant) {
    throw new NotFoundError(`No user ${name} partecipated to this event`);
  }
  if (! await partecipant.compareIP(ip)) {
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
