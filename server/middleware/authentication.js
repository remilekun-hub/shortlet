const jwt = require("jsonwebtoken");
const UnAuthenticatedError = require("../errors/unAuthError");
const ForbiddenError = require("../errors/forbiddenError");

const authentication = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer")) {
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

const verifyUser = async (req, res, next) => {
  const isAdmin = req.user.isAdmin;

  if (req.user.userId === req.params.id || isAdmin) next();
  else {
    throw new ForbiddenError("you are not allowed to perform this action");
  }
};

const verifyAdmin = async (req, res, next) => {
  const isAdmin = req.user.isAdmin;
  if (isAdmin) next();
  else {
    throw new ForbiddenError("you are not allowed to perform this action");
  }
};
module.exports = { authentication, verifyUser, verifyAdmin };
