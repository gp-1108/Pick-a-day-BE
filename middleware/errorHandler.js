const {StatusCodes} = require('http-status-codes');

function errorHandler(err, req, res, next) {
  console.log(err);
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong',
  };

  // Validation Error
  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',');
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // CastError eventId
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.msg = 'The eventId field must be a valid ID';
  }

  // Duplicates name-eventId partecipant error
  if (err.code === 11000) {
    customError.statusCode = StatusCodes.CONFLICT;
    customError.msg = 'No name duplicates allowed per event';
  }
  return res.status(customError.statusCode).json({msg: customError.msg});
}

module.exports = errorHandler;
