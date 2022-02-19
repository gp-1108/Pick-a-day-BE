const {StatusCodes} = require('http-status-codes');
const CustomAPIError = require('./custom-api-error.js');

class ConflictError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.CONFLICT;
  }
}

module.exports = ConflictError;
