async function addPartecipant(req, res) {
  res.send('add partecipant');
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
