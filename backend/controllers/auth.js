const user = require("../models/user");
const jwt = require('jsonwebtoken');
// const { use } = require("../routes/route_auth");

const JWT_TOKEN = "Smart-employee-ManaGement-System-JWT_TOKEN"
const signToken = id => {
  jwt.sign({id: id}, JWT_TOKEN, {
  expiresIn: '7d'
})
}

exports.register = async(req, res) => {
    try {
        const newUser = await user.create({
          first_name: req.body.first_name,
          last_name: req.body.last_name,          
          email: req.body.email,
          phone: req.body.phone,
          password: req.body.password,
          confirm_password: req.body.confirm_password
        });
        
        const jwt_token = signToken(newUser._id);

        res.status(201).json(
          {
            status: 'success',
            jwt_token,
            data: {
              user: newUser
            }
          }
        )
    } catch (error) {
      console.log(error);
        res.status(404).send({ error:error });
    }
}

exports.signin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send({ error: "Provide Email and Password" })
    }

    const existing_user = await user.findOne({email}).select("+password");

    if (!existing_user || !(await existing_user.correctPassword(password, existing_user.password))) {
      res.status(401).send({ error: "Incorrect Email or Password" })
    }


    let token = "";
    if (existing_user) {
      token = signToken(existing_user._id);
    }

    res.status(200).send({
      status: 'success',
      existing_user,
      token
    });
};
  

// All users
exports.getUsers = async(req, res) => {
    try {
        const users = await user.aggregate([
          {
            $project: {
              full_name:{
                $concat: [
                  "$first_name",
                  " ",
                  "$last_name"
                ]
              },
              email: "$email"
            }
          }
        ]);
        res.send({ 
          "num_users": users.length,
          users 
        })
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
  
