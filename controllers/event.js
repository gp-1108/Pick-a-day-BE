const {StatusCodes} = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors');
const Event = require('../models/Event.js');
const Partecipant = require('../models/Partecipant');

async function createEvent(req, res) {
  const {
    body: {days, name},
  } = req;
  if (!days || !name) {
    throw new BadRequestError('Please provide both name and dates');
  }
  const dates = days.split(',');
  const event = await Event.create({
    name,
    days: dates,
  });
  res.status(StatusCodes.CREATED).json({
    _id: event._id,
    days: event.days,
    name: event.name,
  });
}

async function getEvent(req, res) {
  const {
    params: {id: eventId},
  } = req;
  const event = await Event.findById(eventId);
  if (!event) {
    throw new NotFoundError(`No event with ID ${eventId}`);
  }
  const partecipants = await Partecipant.find({eventId});
  const response = {
    name: event.name,
    days: event.days,
    partecipants: {},
  };
  partecipants.forEach((person) => {
    response.partecipants[person.name] = person.available;
  });
  res.status(StatusCodes.OK).json(response);
}

module.exports = {
  createEvent,
  getEvent,
};
