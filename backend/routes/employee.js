const express = require('express');
const router = express.Router()

const Employee = require("../controllers/employee")

router.post('/', Employee.createEmployee);
router.get('/:id', Employee.getEmployeeById);
router.patch('/:id', Employee.updateEmployee);
router.get('/data/basic-info', Employee.getEmployeeBasicInfo);
router.get('/data/employee/:id', Employee.getEmployeeByUserId);
router.get('/data/employee-salaries', Employee.getEmployeeSalaries);
router.delete('/:id', Employee.deleteEmployee);

module.exports = router;
