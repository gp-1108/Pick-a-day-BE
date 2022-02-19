const express = require('express');
const {
  addPartecipant,
  deletePartecipant,
  modifyPartecipant,
} = require('../controllers/partecipant');
const router = express.Router();

router.route('/').post(addPartecipant)
  .delete(deletePartecipant).patch(modifyPartecipant);

module.exports = router;
