const express = require('express');
const Location = require('../controllers/location');
const router = express.Router();

router.post('/', Location.createLocation).patch('/:id', Location.updateLocation);

module.exports = router;
