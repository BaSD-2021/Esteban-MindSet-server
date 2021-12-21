const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

const login = async (req, res) => {
  // Check if the user exists
  const user = await Users.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({
      message: 'Invalid user credentials',
    });
  }
  // Check if the passwords march
  const match = await bcrypt.compare(req.body.password, user.password);
  if (match) {
    // Create a new token
    const token = jwt.sign(
      {
        email: user.email,
        // eslint-disable-next-line no-underscore-dangle
        userId: user._id,
      },
      process.env.JWT_KEY,
      {
        /** expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).
         * Eg: 60, "2 days", "10h", "7d" */
        expiresIn: '1d',
      },
    );
    // Save the new token on DB
    const updatedUser = await Users.findOneAndUpdate(
      { email: req.body.email },
      { token },
      { new: true },
    );
    return res.status(200).json({
      message: 'User Logged',
      data: {
        email: updatedUser.email,
        // eslint-disable-next-line no-underscore-dangle
        _id: updatedUser._id,
        token: updatedUser.token,
      },
    });
  }
  return res.status(401).json({
    message: 'Invalid user credentials',
  });
};

module.exports = {
  register,
  login,
};
