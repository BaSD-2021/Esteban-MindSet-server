const bcrypt = require('bcrypt');
const Users = require('../models/Users');

// USING PROMISES

/*
const register = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hashedPassword) => {
      const userCreated = new Users({
        email: req.body.email,
        password: hashedPassword,
      });
      userCreated.save((error, user) => {
        if (error) {
          return res.status(400).json({ message: error });
        }
        return res.status(201).json({
          message: 'User created',
          data: user,
        });
      });
    }).catch((error) => {
      res.status(400).json({ message: error });
    });
};
*/

// USING ASYNC AWAIT

const register = async (req, res) => {
  try {
    // Encrypt password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // Create new user
    const userCreated = new Users({
      email: req.body.email,
      password: hashedPassword,
    });
    // Save the new user on DB
    const userSaved = await userCreated.save();
    // Response with the new user created
    return res.status(201).json({
      message: 'User created',
      data: userSaved,
    });
  } catch (error) {
    // Return error
    return res.status(400).json({ message: error });
  }
};

module.exports = {
  register,
};
