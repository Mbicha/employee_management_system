const express = require('express');
const router = express.Router()

const Employee = require("../controllers/employee")

router.post('/', Employee.createEmployee).get('/', Employee.getAllEmployees);
router.get('/:id', Employee.getEmployeeById).patch('/:id', Employee.updateEmployee);
router.delete('/:id', Employee.deleteEmployee);

module.exports = router;
