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
module.exports.getUserById = async (req, res) => {
    try {
        const user = await user.findById(req.params.id);
        res.send({ user });
    } catch (error) {
        res.status(404).send({ message: `User is not found` });
    }
}
