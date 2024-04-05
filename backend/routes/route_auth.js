const express = require("express");
const router = express.Router();

const user = require("../controllers/auth");

router.post('/register', user.register);
router.post('/signin', user.signin);
router.get('/', user.getUsers);

module.exports = router;
