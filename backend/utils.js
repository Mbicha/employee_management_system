const bycrypt = require('bcrypt');

// Hash Method
exports.hashPassword = (password, rounds) => {
    const salt = bycrypt.genSaltSync(rounds);
    const hashedPassword = bycrypt.hashSync(password, salt);
    return hashedPassword;
}

exports.decryptPassword = async (inPassword, dbPassword) => {
    return await bycrypt.compare(inPassword, dbPassword);
}
