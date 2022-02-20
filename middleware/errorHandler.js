const {StatusCodes} = require('http-status-codes');

function errorHandler(err, req, res, next) {
  console.log(err);
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong',
  };
  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',');
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  return res.status(customError.statusCode).json({msg: customError.msg});
}

module.exports = errorHandler;
