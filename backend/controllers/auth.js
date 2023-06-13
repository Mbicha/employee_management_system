const user = require("../models/user");
const utils = require("../utils");

exports.register = async(req, res) => {

    try {
        const hashed = utils.hashPassword(req.body.password, 10);
        const newUser = await user.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashed
        });
        res.send({ newUser });
    } catch (error) {
        res.status(404).send({ error:error });
    }
}

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const foundUser = await user.findOne({ email });
  
      // If the user does not exist, return an error
      if (!foundUser) {
        return res.status(401).json({ err: 'Wrong Email' });
      }
  
      // Check if the password is correct
      const isMatch = utils.decryptPassword(password, foundUser.password);
  
      // If the password is incorrect, return an error
      if (!isMatch) {
        return res.status(401).json({ err: 'Wrong email or password' });
      }
      
      res.status(200).json({
        message: "Login Successful",
        foundUser,
      })
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: 'Server error' });
    }
};
  

// All users
exports.getUsers = async(req, res) => {
    try {
        const users = await user.find({});
        res.send({ users })
    } catch (err) {
        res.status(400).send({err: err});
    }
};

// User by id
exports.getUserById = async (req, res) => {
    try {
        const user = await user.findById(req.params.id);
        res.send({ user });
    } catch (error) {
        res.status(404).send({ message: `User is not found` });
    }
}

// User by id
exports.getUserByEmail = async (req, res) => {
    try {
      const { email } = req.params;
      const foundUser = await user.findOne({ email });
  
      if (!foundUser) {
        return res.status(404).send({ message: 'User not found' });
      }
  
      res.send({ foundUser });
    } catch (error) {
      res.status(500).send({ message: 'Failed to fetch user' });
    }
  };
  
