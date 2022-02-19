const {StatusCodes} = require('http-status-codes');
const {BadResquestError} = require('../errors');
const Event = require('../models/Event.js');

async function createEvent(req, res) {
  const {
    body: {days, name},
  } = req;
  if (!days || !name) {
    throw new BadResquestError('Please provide both name and dates');
  }
  const dates = days.split(',');
  const event = await Event.create({
    name,
    days: dates,
  });
  res.status(StatusCodes.CREATED).json(event);
}

async function getEvent(req, res) {
  res.send('get event');
}

module.exports = {
  createEvent,
  getEvent,
};
