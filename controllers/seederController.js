const asyncHandler = require('express-async-handler');

const { Users } = require('../models/users');
const bcrypt = require('bcryptjs');

// @desc Store data in database
// @route GET /api/Seeder
// @access Public
const saveSeeder = asyncHandler(async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const encryptPass = await bcrypt.hash('123456abc', salt);
    // Seed a new user
    const newUser = new Users({
      full_name: 'admin',
      email: 'admin@simplex.com',
      password: encryptPass,
    });

    await newUser.save();
    console.log('User data seeded successfully');

    return res.status(200).send('User Successfully added');
  } catch (error) {
    //error handling
    res.status(res.statusCode ? res.statusCode : 500);
    throw new Error(
      `${
        res.statusCode !== 400
          ? 'Something went wrong during seeding data: '
          : ''
      }${error.message}`
    );
  }
});

module.exports = { saveSeeder };
