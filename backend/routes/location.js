const express = require('express');
const Location = require('../controllers/location');
const router = express.Router();

router.post('/', Location.createLocation).patch('/:id', Location.updateLocation);
router.get('/', Location.getEmployeeLocationContact);
router.get('/employee/:id', Location.getEmployeeLocationByUserId);

module.exports = router;
