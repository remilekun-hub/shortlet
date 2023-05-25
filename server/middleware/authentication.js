const jwt = require("jsonwebtoken");
const UnAuthenticatedError = require("../errors/unAuthError");
const ForbiddenError = require("../errors/forbiddenError");

const authentication = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    throw new UnAuthenticatedError("token required");
  }

  if (!auth.startsWith("Bearer")) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
  const token = auth.split(" ")[1];

  try {
    const payload = jwt.verify(token, "remi");
    if (!payload) {
      throw new ForbiddenError("token is not valid");
    }
    req.user = {
      ...payload,
    };

    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};

module.exports = { authentication };
