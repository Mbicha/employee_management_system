const express = require("express");
const router = express.Router();

const Designation = require("../controllers/designation");

router.post('/', Designation.createDesignation);
router.get('/', Designation.getAllDesignations);
router.get('/:id', Designation.getDesignationById);
router.patch('/:id', Designation.updateDesignation);
router.delete('/:id', Designation.deleteDesignation);

module.exports = router;
