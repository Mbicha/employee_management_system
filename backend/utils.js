const bycrypt = require('bcrypt');

// Hash Method
const hashPassword = (password, rounds) => {
    const salt = bycrypt.genSaltSync(rounds);
    const hashedPassword = bycrypt.hashSync(password, salt);
    return hashedPassword;
}
