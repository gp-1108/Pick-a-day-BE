const dateValidator = [
  {validator: lengthValidator, msg: 'No more than 14 days are allowed'},
  {validator: formatValidator,
    msg: 'The input does not respect the dd/mm/yyyy format'},
];

function lengthValidator(val) {
  return val.length <= 14;
}

function formatValidator(val) {
  const re = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  let isValid = true;
  val.forEach((element) => {
    isValid = isValid && re.test(element);
  });
  return isValid;
}

module.exports = dateValidator;
