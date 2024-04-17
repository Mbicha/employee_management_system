const express = require('express');

const router = express.Router();
const User = require('../controllers/user');
router
    .get('/:id', User.getPersonalDetails)
    .patch('/:id', User.updatePersonaDetails)
    .delete('/:id', User.deleteUser)

module.exports = router;
