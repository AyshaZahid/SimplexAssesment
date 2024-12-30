const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

const {
  generateToken,
  expressValidatorError,
} = require('../middleware/commonMiddleware');
const { Users, validateUser } = require('../models/users');

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  //validate param data
  expressValidatorError(req);

  try {
    //check user email verification
    const user = await Users.findOne({
      where: { email: req.body.email },
    });
    if (!user) {
      res.status(400);
      throw new Error('No user found!');
    }

    //check password and give token
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      return res.status(200).send({
        token: generateToken(user),
      });
    } else {
      res.status(400);
      throw new Error('Invalid credentials or user not found.');
    }
  } catch (error) {
    //error handling
    res.status(res.statusCode ? res.statusCode : 500);
    throw new Error(
      `${res.statusCode !== 400 ? 'Something went wrong during login: ' : ''}${
        error.message
      }`
    );
  }
});

// @desc get logedin user
// @route GET /api/users/
// @access Private
const getUser = asyncHandler(async (req, res) => {
  res.json(req.result);
});

module.exports = {
  loginUser,
  getUser,
};
