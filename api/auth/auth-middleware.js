const User = require("../users/users-model");

function restricted(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    next({ status: 401, message: "You shall not pass!" });
  }
}

async function checkUsernameFree(req, res, next) {
  const { username } = req.body;
  const [user] = await User.findBy({ username });
  if (user) {
    return next({ status: 422, message: "Username taken" });
  }
  next();
}

async function checkUsernameExists(req, res, next) {
  const { username } = req.body;
  const [user] = await User.findBy({ username });
  if (!user) {
    return next({ status: 401, message: "Invalid credentials" });
  }
  next();
}

function checkPasswordLength(req, res, next) {
  const { password } = req.body;
  if (!password || password.length < 3) {
    return next({
      status: 422,
      message: "Password must be longer than 3 chars",
    });
  }
  next();
}

module.exports = {
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength,
};
