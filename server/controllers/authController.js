const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const passport = require('passport');

const User = mongoose.model('User');

exports.userValidationRules = () => {
  return [
    // name is non-null and is 4 to 10 characters
    check('name', 'Enter a name').notEmpty(),
    check('name', 'Name must be between 4 and 10 characters').isLength({
      min: 4,
      max: 10
    }),
    check('email', 'Enter a valid Email')
      .isEmail()
      .normalizeEmail(),
    // password is non-null and is 4 to 10 characters
    check('password', 'Enter a password').notEmpty(),
    check('password', 'Password must be between 4 and 10 characters').isLength({
      min: 4,
      max: 10
    })
  ];
};

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const firstError = errors.array().map(err => err.msg)[0];

  return res.status(422).json(firstError);
};

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  console.log({ name, email, password });

  const user = await new User({ name, email, password });
  await User.register(user, password, (err, user) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
    res.json(user);
  });
};

exports.signin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json(err.message);
    }
    if (!user) {
      return res.status(400).json(info.message);
    }

    req.logIn(user, err => {
      if (err) {
        return res.status(500).json(err.message);
      }

      res.json(user);
    });
  })(req, res, next);
};

exports.signout = (req, res) => {
  res.clearCookie('nexrt-cookie.sid');
  req.logout();
  res.json({ message: 'You are now signed out' });
};

exports.checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/signin');
};
