const express = require("express");
const router = express.Router();

const Salary = require("../controllers/salary");

router.post('/', Salary.createSalary);
router.get('/', Salary.getAllSalaries);
router.get('/data/employee-salaries', Salary.getEmployeeSalaries);
router.get('/:id', Salary.getSalaryById);
router.patch('/:id', Salary.updateSalary);
router.delete('/:id', Salary.deleteSalary);

module.exports = router;
