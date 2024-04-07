const express = require("express");
const router = express.Router();

const Department = require("../controllers/department");

router.post('/', Department.createDepartment);
router.get('/', Department.getAllDepartments);
router.get('/:id', Department.getDepartmentById);
router.patch('/:id', Department.updateDeparment);
router.delete('/:id', Department.deleteDepartment);

module.exports = router;
