async function createEvent(req, res) {
  res.send('create event');
}

async function getEvent(req, res) {
  res.send('get event');
}

module.exports = {
  createEvent,
  getEvent,
};
