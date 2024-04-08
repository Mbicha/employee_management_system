const express = require('express');
const router = express.Router()

const Employee = require("../controllers/employee")

router.post('/', Employee.createEmployee);
router.get('/:id', Employee.getEmployeeById);
router.patch('/:id', Employee.updateEmployee);
router.get('/data/basic-info', Employee.getEmployeeBasicInfo);
router.delete('/:id', Employee.deleteEmployee);

module.exports = router;
