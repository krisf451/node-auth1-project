const router = require("express").Router();
const bcrypt = require("bcryptjs");
const {
  checkPasswordLength,
  checkUsernameExists,
  checkUsernameFree,
} = require("./auth-middleware");
const User = require("../users/users-model");

router.post(
  "/register",
  checkUsernameFree,
  checkPasswordLength,
  async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const hash = bcrypt.hashSync(password, 6);
      const newUser = { username, password: hash };
      const result = await User.add(newUser);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/login", checkUsernameExists, async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const [user] = await User.findBy({ username });
    const goodPass = bcrypt.compareSync(password, user.password);
    if (!goodPass) {
      return next({ status: 401, message: "invalid credentials" });
    }
    req.session.user = user;
    res.json({
      message: `welcome ${user.username}!`,
      username: user.username,
      cookie: Boolean(req.session.user),
    });
  } catch (error) {
    next(error);
  }
});

router.get("/logout", (req, res, next) => {
  if (!req.session.user) {
    return res.json({ message: "no session" });
  }
  req.session.destroy((err) => {
    if (err) {
      return res.json({ message: "something went wrong with logging out" });
    }
    res.json({ message: "logged out" });
  });
});

module.exports = router;

/**
  3 [GET] /api/auth/logout

  response for logged-in users:
  status 200
  {
    "message": "logged out"
  }

  response for not-logged-in users:
  status 200
  {
    "message": "no session"
  }
 */

// Don't forget to add the router to the `exports` object so it can be required in other modules
