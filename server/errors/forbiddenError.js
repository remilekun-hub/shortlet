const customAPIError = require("./custom-error");
const { StatusCodes } = require("http-status-codes");

class ForbiddenError extends customAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = ForbiddenError;
