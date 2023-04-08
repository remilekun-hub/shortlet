const customAPIError = require("./custom-error");
const { StatusCodes } = require("http-status-codes");

class unAuthenticatedError extends customAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = unAuthenticatedError;
