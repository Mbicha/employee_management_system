const express = require("express");
const router = express.Router();

const user = require("../controllers/auth");

router.post('/register', user.register);
router.post('/login', user.login);
router.get('/', user.getUsers);

module.exports = router;
