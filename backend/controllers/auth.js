const user = require("../models/user.js");
const utils = require("../utils.js");

// module.exports.register = async(req, res) => {
//     const users = [
//         {
//             first_name: "Charles",
//             last_name: "Mbithi",
//             email: "mbithicharlse@mail.com",
//             phone: "0792907708",
//             password: "Mbit@1234"
//         },
//         {
//             first_name: "Polinah",
//             last_name: "Ndanu",
//             email: "ndanu@mail.com",
//             phone: "0746xxx940",
//             password: "polY1234"
//         },
//         {
//             first_name: "Nelly",
//             last_name: "Kamenya",
//             email: "nelly@mail.com",
//             phone: "079xxxxxx08",
//             password: "768Nelly"
//         },
//         {
//             first_name: "Jamo",
//             last_name: "Vundi",
//             email: "jemo@mail.com",
//             phone: "07xxxx07708",
//             password: "jemo@1234"
//         },
//     ]
//     try {
//         for (let i = 0; i < users.length; i++) {
//             const hashed = utils.hashPassword();
//             const newUser = await user.create
//         }
//     }
// }

// All users
module.exports.getUsers = async(req, res) => {
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
