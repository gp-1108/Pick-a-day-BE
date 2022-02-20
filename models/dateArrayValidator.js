const dateValidator = [
  {
    validator: maxLengthValidator,
    msg: 'No more than 14 days are allowed per event',
  },
  {
    validator: minLengthValidator,
    msg: 'Each event must have at least one day',
  },
];

function maxLengthValidator(val) {
  return val.length <= 14;
}

function minLengthValidator(val) {
  return val.length > 0;
}

module.exports = dateValidator;
