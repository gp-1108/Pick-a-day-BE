/* eslint-disable max-len */
const {BadRequestError} = require('../errors');

function validator(data) {
  let dates = Array.isArray(data) ? data : data.split(',');
  const re = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  dates.forEach((element) => {
    if (!re.test(element)) {
      throw new BadRequestError(
        // eslint-disable-next-line max-len
        'The date input must be a sequence of dates express in format dd/mm/aaaa separated by commas');
    }
  });
  dates = dates.map((element) => {
    if (!re.test(element)) {
      throw new BadRequestError(
        // eslint-disable-next-line max-len
        'The date input must be a sequence of dates express in format dd/mm/aaaa separated by commas');
    }
    const singleDate = element.split('/');
    singleDate[0] = singleDate[0].startsWith('0') ? singleDate[0].slice(-1) : singleDate[0];
    singleDate[1] = singleDate[1].startsWith('0') ? singleDate[1].slice(-1) : singleDate[1];
    return singleDate.join('/');
  });
  return dates;
}

module.exports = validator;
