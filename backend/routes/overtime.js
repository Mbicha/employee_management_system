const express = require("express");
const router = express.Router();

const Overtime = require("../controllers/overtime");

router.post('/', Overtime.createOvertime);
router.get('/', Overtime.getAllOvertime);
router.get('/:id', Overtime.getOvertimeById);
router.patch('/:id', Overtime.updateOvertime);
router.delete('/:id', Overtime.deleteOvertime);

module.exports = router;