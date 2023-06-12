const express = require("express");
const router = express.Router();

const user = require("../controllers/auth");

router.post('/', user.register);

module.exports = router;
