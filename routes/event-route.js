const express = require('express');
const router = express.Router();

const {
  createEvent,
  getEvent,
} = require('../controllers/event.js');

router.route('/').post(createEvent);
router.route('/:id').get(getEvent);

module.exports = router;
